import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('./learning-workflow.mjs', import.meta.url));
const gates = {
  brief: ['brief-completeness', 'confirmation-fidelity'],
  resources: ['source-page-checks', 'resource-fit'],
  sequence: ['goal-coverage', 'prerequisite-order', 'source-links', 'schedule-feasibility'],
  practice: ['exercise-alignment', 'observable-assessment', 'schedule-feasibility'],
  draft: ['required-artifact-structure', 'goal-coverage', 'credible-citations', 'prerequisite-order', 'schedule-feasibility', 'exercise-alignment'],
};
const names = { brief: 'requirements-brief', resources: 'learning-resources', sequence: 'learning-sequence', practice: 'learning-practice', draft: 'learning-draft' };

function fixture(t) {
  const base = resolve(tmpdir());
  const root = mkdtempSync(join(base, 'learning-workflow test-'));
  t.after(() => {
    assert.equal(dirname(resolve(root)), base);
    rmSync(root, { recursive: true, force: true });
  });
  const run = join(root, 'runs', 'synthetic-regression');
  mkdirSync(run, { recursive: true });
  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, '.claude'));
  const copiedCli = join(root, 'scripts', 'learning-workflow.mjs');
  copyFileSync(cli, copiedCli);
  const settingsPath = join(root, '.claude', 'settings.json');
  copyFileSync(fileURLToPath(new URL('../.claude/settings.json', import.meta.url)), settingsPath);
  function invoke(...args) {
    return spawnSync(process.execPath, [copiedCli, args[0], run, ...args.slice(1)], { cwd: root, encoding: 'utf8', timeout: 10000 });
  }
  function ok(...args) {
    const result = invoke(...args);
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    return result.stdout.startsWith('{') ? JSON.parse(result.stdout) : result.stdout;
  }
  function blocked(pattern, ...args) {
    const result = invoke(...args);
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, pattern);
  }
  const state = () => JSON.parse(readFileSync(join(run, 'workflow-state.json'), 'utf8'));
  const finalContent = () => readFileSync(join(run, readdirSync(run).find(name => name.endsWith('-final.md'))), 'utf8');
  function artifact(stage, revision) {
    const name = `${names[stage]}-${revision}.md`;
    const artifactStatus = stage === 'brief' ? 'confirmed' : stage === 'draft' ? 'proposed for learner review' : 'proposed';
    const reviewNotes = stage === 'draft'
      ? '\nArtifact type: draft\n\n## Limitations\n- This is a draft for review. The rules can change at review while preserving the boundary-first progression.\n- This is a proposed learning plan. The learner has not attempted or passed its exercises.\n- Source check remains dated; exercises describe future work.\n- Sources were checked earlier; this draft does not claim a new live check.\n'
      : '';
    writeFileSync(join(run, name), `# Synthetic automated regression fixture\nRevision: ${revision}\nStatus: ${artifactStatus}\n\nNot a real learner run or approval.\n${reviewNotes}`);
    return name;
  }
  function inspect(stage, revision) { ok('inspect', stage, artifact(stage, revision)); }
  function judge(stage, failedGate) {
    for (const gate of gates[stage]) ok('gate', stage, gate, gate === failedGate ? 'fail' : 'pass', 'Synthetic regression evidence');
  }
  function complete(stage, revision = 'v01') {
    ok('start', stage);
    inspect(stage, revision);
    judge(stage);
  }
  ok('init');
  complete('brief');
  writeFileSync(join(run, 'execution-plan-v01.md'), '# Synthetic plan\nDiagnosis omitted for this fixture.\n');
  ok('plan', 'omit', 'execution-plan-v01.md');
  for (const stage of ['resources', 'sequence', 'practice', 'draft']) complete(stage);
  const approve = revision => ok('approve', revision, `I approve validated draft ${revision}.`);
  function hook(eventName, target, cwd = run, toolName = 'Write') {
    const settings = JSON.parse(readFileSync(settingsPath, 'utf8'));
    const configured = settings.hooks[eventName][0].hooks[0];
    assert.equal(configured.type, 'command');
    assert.equal(configured.command, 'node');
    assert.ok(Array.isArray(configured.args), 'Exercise the configured exec-form command');
    const result = spawnSync(process.execPath, configured.args, {
      cwd: root, encoding: 'utf8', timeout: 15000,
      input: JSON.stringify({ hook_event_name: eventName, tool_name: toolName, cwd, tool_input: { file_path: target } }),
    });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    return JSON.parse(result.stdout).hookSpecificOutput;
  }
  const finalTarget = join(run, ['learning', 'plan', 'final.md'].join('-'));
  return { root, run, ok, blocked, state, artifact, inspect, judge, approve, finalContent, finalTarget, hook };
}

test('upstream repair after a failed draft can reopen passing practice without losing history', t => {
  const f = fixture(t);
  f.ok('start', 'draft', 'Synthetic validator re-review');
  f.inspect('draft', 'v02');
  f.judge('draft', 'exercise-alignment');
  const before = f.state().stages.practice;
  const current = f.ok('start', 'practice', 'Validator found an unobservable recovery exercise');
  assert.equal(current.stages.practice.status, 'in-progress');
  assert.equal(current.stages.draft.status, 'stale');
  assert.equal(current.stages.sequence.status, 'passed');
  assert.equal(current.stages.resources.status, 'passed');
  assert.equal(current.stages.practice.attempts, before.attempts);
  assert.deepEqual(f.state().stages.practice.gates, before.gates);
  assert.equal(f.state().events.at(-1).reason, 'Validator found an unobservable recovery exercise');
  f.blocked(/new numbered artifact revision/, 'inspect', 'practice', 'learning-practice-v01.md');
  f.blocked(/current inspected artifact/, 'gate', 'practice', 'observable-assessment', 'pass', 'Cannot reuse old gates');
  f.inspect('practice', 'v02');
  f.blocked(/unpassed inputs/, 'start', 'draft');
  f.judge('practice');
  assert.equal(f.ok('start', 'draft').stages.draft.status, 'in-progress');
  f.inspect('draft', 'v03');
  f.judge('draft');
  assert.equal(f.ok('status').stages.draft.status, 'passed');
  f.blocked(/explicit learner approval/, 'write');
});

test('reopening invalidates approval and the saved final immediately, before file edits', t => {
  const f = fixture(t);
  f.approve('v01');
  f.ok('write');
  const final = f.finalContent();
  assert.match(final, /^Status: approved$/m);
  const current = f.ok('start', 'practice', 'Synthetic upstream correction');
  assert.equal(current.approval, 'stale');
  assert.equal(current.final, 'stale');
  f.blocked(/explicit learner approval/, 'write');
  assert.equal(f.finalContent(), final);
  f.inspect('practice', 'v02');
  f.judge('practice');
  f.ok('start', 'draft');
  f.inspect('draft', 'v02');
  f.judge('draft');
  f.blocked(/explicit learner approval/, 'write');
  f.approve('v02');
  assert.equal(f.ok('write').final, 'passed');
});

test('learner rejection of a passing draft requires a newly inspected and approved revision', t => {
  const f = fixture(t);
  f.ok('reject', 'v01', 'Synthetic learner asks for a different exercise');
  f.ok('start', 'draft', 'Address synthetic rejection feedback');
  f.blocked(/current passing revision/, 'approve', 'v01', 'I approve validated draft v01.');
  f.inspect('draft', 'v02');
  f.judge('draft');
  f.blocked(/explicit learner approval/, 'write');
  f.approve('v02');
  assert.equal(f.ok('write').final, 'passed');
});

test('passing stages require a nonempty repair reason and blocked starts preserve state', t => {
  const f = fixture(t);
  const before = readFileSync(join(f.run, 'workflow-state.json'), 'utf8');
  f.blocked(/repair reason/, 'start', 'practice');
  f.blocked(/repair reason/, 'start', 'practice', '   ');
  assert.equal(readFileSync(join(f.run, 'workflow-state.json'), 'utf8'), before);
});

test('reopening never resets the three-inspection limit', t => {
  const f = fixture(t);
  for (const revision of ['v02', 'v03']) {
    f.ok('start', 'practice', 'Synthetic correction');
    f.inspect('practice', revision);
    f.judge('practice');
  }
  f.blocked(/retry limit/, 'start', 'practice', 'Fourth correction must stop');
  assert.equal(f.state().stages.practice.attempts, 3);
});

test('changed inputs during repair require redispatch and another artifact revision', t => {
  const f = fixture(t);
  f.ok('start', 'practice', 'Synthetic correction');
  f.ok('start', 'sequence', 'Synthetic upstream correction during dispatch');
  f.inspect('sequence', 'v02');
  f.judge('sequence');
  assert.equal(f.ok('status').stages.practice.status, 'stale');
  f.blocked(/Inputs changed after stage start/, 'inspect', 'practice', f.artifact('practice', 'v02'));
  assert.equal(f.ok('start', 'practice').stages.practice.status, 'in-progress');
  f.blocked(/new numbered artifact revision/, 'inspect', 'practice', 'learning-practice-v02.md');
  f.inspect('practice', 'v03');
  f.judge('practice');
  assert.equal(f.ok('status').stages.practice.status, 'passed');
});

test('final presentation changes preserve the approved draft and future-work limitations', t => {
  const f = fixture(t);
  const draftPath = join(f.run, f.state().stages.draft.artifact);
  const draft = readFileSync(draftPath, 'utf8');
  f.approve('v01');
  const approval = f.state().approval;
  f.ok('write');
  const final = f.finalContent();
  assert.match(final, /^Artifact type: final$/m);
  assert.match(final, /^Status: approved$/m);
  assert.doesNotMatch(final, /This is a draft for review|This is a proposed learning plan|can change at review|this draft does not claim/);
  assert.match(final, /this plan does not claim a new live check\./);
  assert.match(final, /The learner has not attempted or passed its exercises\./);
  assert.match(final, /Source check remains dated; exercises describe future work\./);
  assert.equal(readFileSync(draftPath, 'utf8'), draft);
  assert.deepEqual(f.state().approval, approval);
  assert.equal(f.ok('write').final, 'passed');
  assert.equal(f.finalContent(), final, 'Export is deterministic');
});

test('configured hooks guard approval and persist writes in an isolated checkout', t => {
  const f = fixture(t);
  const decision = () => f.hook('PreToolUse', f.finalTarget);
  assert.equal(decision().permissionDecision, 'deny');
  f.approve('v01');
  assert.equal(decision().permissionDecision, 'allow');
  f.ok('write');
  const response = f.hook('PostToolUse', f.finalTarget);
  assert.match(response.additionalContext, /Run state updated/);
  assert.equal(f.state().events.at(-1).action, 'post-write');
  assert.equal(f.ok('status').final, 'passed');
  const input = join(f.run, f.state().stages.resources.artifact);
  writeFileSync(input, readFileSync(input, 'utf8') + '\nSynthetic external edit.\n');
  f.hook('PostToolUse', input, f.run, 'Edit');
  assert.equal(f.state().approval.status, 'stale');
  assert.equal(decision().permissionDecision, 'deny');
  assert.equal(f.ok('status').final, 'stale');
  assert.equal(f.hook('PreToolUse', f.finalTarget, dirname(f.root)).permissionDecision, 'deny', 'Missing active checkout fails closed');
});
