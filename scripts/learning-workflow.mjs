#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { closeSync, existsSync, lstatSync, openSync, readFileSync, realpathSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';

const FINAL = 'learning-plan-final.md';
const GATES = {
  brief: ['brief-completeness', 'confirmation-fidelity'],
  resources: ['source-page-checks', 'resource-fit'],
  diagnosis: ['answer-provenance', 'placement'],
  sequence: ['goal-coverage', 'prerequisite-order', 'source-links', 'schedule-feasibility'],
  practice: ['exercise-alignment', 'observable-assessment', 'schedule-feasibility'],
  draft: ['required-artifact-structure', 'goal-coverage', 'credible-citations', 'prerequisite-order', 'schedule-feasibility', 'exercise-alignment'],
};
const OWNERS = {
  brief: 'requirements-formalizer', resources: 'resource-researcher',
  diagnosis: 'starting-level-diagnostician', sequence: 'learning-path-planner',
  practice: 'practice-assessor', draft: 'learning-plan-synthesizer',
};
const FILES = {
  brief: /^requirements-brief-v\d+\.md$/, resources: /^learning-resources-v\d+\.md$/,
  diagnosis: /^starting-level-diagnosis-v\d+\.md$/, sequence: /^learning-sequence-v\d+\.md$/,
  practice: /^learning-practice-v\d+\.md$/, draft: /^learning-draft-v\d+\.md$/,
};
const [command, runArg, ...args] = process.argv.slice(2);
function fail(message) { throw new Error('BLOCKED: ' + message); }
function hash(value) { return createHash('sha256').update(value).digest('hex'); }
function read(path) { return readFileSync(path, 'utf8'); }
function save(path, value) {
  const temporary = path + '.tmp';
  writeFileSync(temporary, JSON.stringify(value, null, 2) + '\n');
  renameSync(temporary, path);
}
function withStateLock(runDir, action) {
  const lock = join(runDir, 'workflow-state.lock');
  const deadline = Date.now() + 10000;
  while (true) {
    try {
      const descriptor = openSync(lock, 'wx');
      closeSync(descriptor);
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      // A process interrupted during a write may leave the lock behind.
      const age = Date.now() - statSync(lock, { throwIfNoEntry: false })?.mtimeMs;
      if (age > 30000) {
        const stale = lock + '.stale-' + process.pid + '-' + Date.now();
        try { renameSync(lock, stale); unlinkSync(stale); } catch (renameError) {
          if (!['ENOENT', 'EEXIST'].includes(renameError.code)) throw renameError;
        }
        continue;
      }
      if (Date.now() >= deadline) fail('Run state is busy; retry after the active write finishes');
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
    }
  }
  try { return action(); } finally { unlinkSync(lock); }
}
function file(runDir, name) {
  if (typeof name !== 'string' || !name || basename(name) !== name || name === '.' || name === '..') fail('Expected a filename inside the run');
  return join(runDir, name);
}
function finalPath(runDir) {
  if (basename(dirname(runDir)) !== 'runs') fail('Run must be inside project runs/<run-id>');
  const realRun = realpathSync(runDir);
  if (realpathSync(dirname(runDir)) !== dirname(realRun)) fail('Run path escapes project runs directory');
  const target = join(runDir, FINAL);
  if (lstatSync(target, { throwIfNoEntry: false })?.isSymbolicLink()) fail('Final file cannot be a symlink');
  return target;
}
function load(runDir) {
  const path = join(runDir, 'workflow-state.json');
  if (!existsSync(path)) fail('Run state missing; use init');
  const state = JSON.parse(read(path));
  if (state.version !== 1 || state.runId !== basename(runDir)) fail('Unsupported or mismatched run state');
  return state;
}
function deps(stage, state) {
  const base = {
    brief: [], resources: ['brief'], diagnosis: ['brief'],
    sequence: ['brief', 'resources'], practice: ['brief', 'resources', 'sequence'],
    draft: ['brief', 'resources', 'sequence', 'practice'],
  }[stage];
  if (!base) fail('Unknown stage: ' + stage);
  return state.plan?.diagnosis === 'run' && ['sequence', 'practice', 'draft'].includes(stage)
    ? [...base, 'diagnosis'] : base;
}
function planValid(state, runDir) {
  return state.plan && existsSync(file(runDir, state.plan.artifact))
    && hash(read(file(runDir, state.plan.artifact))) === state.plan.hash;
}
function status(stage, state, runDir) {
  if (stage === 'diagnosis' && state.plan?.diagnosis === 'omit') return 'omitted';
  const item = state.stages[stage];
  if (!item) return 'missing';
  if (!item.artifact) return item.started ? 'in-progress' : 'missing';
  if (!item.revising && (!existsSync(file(runDir, item.artifact)) || hash(read(file(runDir, item.artifact))) !== item.hash)) return 'stale';
  if (stage !== 'brief') {
    if (!planValid(state, runDir)) return 'stale';
    const parents = deps(stage, state);
    const inputs = item.revising ? item.dispatchInputs : item.inputs;
    if (inputs?.length !== parents.length) return 'stale';
    for (const parent of parents) {
      const current = state.stages[parent], saved = inputs.find(input => input.stage === parent);
      if (!saved || !current || saved.artifact !== current.artifact || saved.hash !== current.hash
        || status(parent, state, runDir) !== 'passed') return 'stale';
    }
  }
  // Old gates remain as evidence, but cannot validate a revision in progress.
  if (item.revising) return 'in-progress';
  if (Object.values(item.gates ?? {}).some(gate => gate.result === 'fail')) return item.attempts >= 3 ? 'exhausted' : 'failed';
  if (GATES[stage].every(gate => item.gates?.[gate]?.result === 'pass')) return 'passed';
  return item.attempts >= 3 ? 'exhausted' : 'pending';
}
function fingerprint(state, runDir) {
  if (!planValid(state, runDir)) return null;
  const stages = Object.keys(GATES).filter(stage => stage !== 'diagnosis' || state.plan.diagnosis === 'run');
  if (stages.some(stage => status(stage, state, runDir) !== 'passed')) return null;
  return hash(JSON.stringify({
    plan: state.plan,
    inputs: stages.map(stage => ({ stage, artifact: state.stages[stage].artifact, hash: state.stages[stage].hash })),
    gates: stages.map(stage => state.stages[stage].gates),
  }));
}
function sync(state, runDir) {
  const current = fingerprint(state, runDir);
  if (state.approval?.status === 'approved' && state.approval.fingerprint !== current) {
    state.approval.status = 'stale';
    state.approval.reason = 'Draft, input, plan, or gate evidence changed';
  }
  const target = join(runDir, FINAL), finalHash = existsSync(target) ? hash(read(target)) : null;
  return {
    stages: Object.fromEntries(Object.keys(GATES).map(stage => [stage, {
      status: status(stage, state, runDir), attempts: state.stages[stage]?.attempts ?? 0,
      artifact: state.stages[stage]?.artifact ?? null,
    }])),
    plan: state.plan ?? null, approval: state.approval?.status ?? 'pending',
    final: finalHash && state.approval?.status === 'approved' && state.final?.fingerprint === current
      && state.final?.hash === finalHash ? 'passed' : finalHash ? 'stale' : 'missing',
  };
}
function approvalReady(state, runDir) {
  const current = fingerprint(state, runDir), draft = state.stages.draft;
  if (!current || state.approval?.status !== 'approved' || state.approval.fingerprint !== current
    || state.approval.hash !== draft.hash || state.approval.revision !== draft.revision
    || state.approval.evidence !== 'I approve validated draft ' + draft.revision + '.') {
    fail('Current validated draft needs explicit learner approval');
  }
  return current;
}
async function hook() {
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;
  const event = JSON.parse(raw);
  if (!['Write', 'Edit'].includes(event.tool_name)) return;
  const target = event.tool_input?.file_path;
  if (typeof target !== 'string' || !isAbsolute(target)) fail('Hook requires absolute file_path');
  const absoluteTarget = resolve(target);
  const runDir = dirname(absoluteTarget);
  if (basename(dirname(runDir)).toLowerCase() !== 'runs') return;
  // The hook script can live in a different checkout from Claude's active worktree.
  // Derive the project from the target's runs/<run-id> path, not event.cwd.
  const root = dirname(dirname(runDir));
  const validProject = existsSync(join(root, '.claude', 'settings.json'))
    && existsSync(join(root, 'scripts', 'learning-workflow.mjs'));
  if (event.hook_event_name === 'PreToolUse' && basename(absoluteTarget).toLowerCase() === FINAL.toLowerCase()) {
    try {
      if (!validProject) fail('Cannot identify the project that owns this final file');
      finalPath(runDir);
      const state = load(runDir);
      sync(state, runDir);
      approvalReady(state, runDir);
      console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow' } }));
    } catch (error) {
      console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: error.message } }));
    }
  }
  if (!validProject) return;
  if (event.hook_event_name === 'PostToolUse' && existsSync(join(runDir, 'workflow-state.json'))) {
    withStateLock(runDir, () => {
      const state = load(runDir), current = sync(state, runDir);
      state.events.push({ action: 'post-write', artifact: basename(absoluteTarget), approval: current.approval });
      save(join(runDir, 'workflow-state.json'), state);
    });
    console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: 'Run state updated for ' + basename(absoluteTarget) } }));
  }
}
function main() {
  if (!command || !runArg) fail('Usage: learning-workflow.mjs <init|plan|start|inspect|gate|approve|reject|write|status|hook> <run-dir> ...');
  const runDir = resolve(runArg);
  if (!existsSync(runDir)) fail('Run directory missing');
  finalPath(runDir);
  return withStateLock(runDir, () => mainLocked(runDir));
}
function mainLocked(runDir) {
  const statePath = join(runDir, 'workflow-state.json');
  if (command === 'init') {
    if (existsSync(statePath)) fail('Run already initialized');
    save(statePath, { version: 1, runId: basename(runDir), plan: null, stages: {}, approval: null, final: null, events: [] });
    console.log('Initialized ' + statePath);
    return;
  }
  const state = load(runDir);
  sync(state, runDir);
  if (command === 'plan') {
    const [decision, artifact] = args;
    if (!['run', 'omit'].includes(decision) || !/^execution-plan-v\d+\.md$/.test(artifact ?? '')) fail('Usage: plan <run-dir> <run|omit> <execution-plan-vNN.md>');
    if (status('brief', state, runDir) !== 'passed') fail('Confirmed brief must pass before planning');
    state.plan = { diagnosis: decision, artifact, hash: hash(read(file(runDir, artifact))) };
    state.events.push({ action: 'plan', ...state.plan });
  } else if (command === 'start') {
    const [stage, ...reasonWords] = args;
    const reason = reasonWords.join(' ').trim();
    if (!GATES[stage]) fail('Unknown stage');
    if (stage !== 'brief' && !planValid(state, runDir)) fail('Current execution plan missing or changed');
    if (stage === 'diagnosis' && state.plan.diagnosis === 'omit') fail('Diagnosis omitted by plan');
    if (status(stage, state, runDir) === 'passed' && !reason) fail('Stage already passing; supply a repair reason: start <run-dir> <stage> "<reason>"');
    if ((state.stages[stage]?.attempts ?? 0) >= 3) fail('Stage retry limit reached');
    const parents = deps(stage, state);
    if (parents.some(parent => status(parent, state, runDir) !== 'passed')) fail('Dependent stage has unpassed inputs');
    const inputs = parents.map(parent => ({ stage: parent, artifact: state.stages[parent].artifact, hash: state.stages[parent].hash }));
    const old = state.stages[stage];
    state.stages[stage] = { ...(old ?? {}), started: true, revising: Boolean(old?.artifact), dispatchInputs: inputs };
    state.events.push({ action: 'start', stage, owner: OWNERS[stage], inputs, ...(reason ? { reason } : {}) });
  } else if (command === 'inspect') {
    const [stage, artifact] = args;
    if (!GATES[stage] || !FILES[stage].test(artifact ?? '')) fail('Unknown stage or artifact filename');
    if (stage !== 'brief' && !planValid(state, runDir)) fail('Current execution plan missing or changed');
    if (stage === 'diagnosis' && state.plan.diagnosis === 'omit') fail('Diagnosis omitted by plan');
    const parents = deps(stage, state);
    if (parents.some(parent => status(parent, state, runDir) !== 'passed')) fail('Inputs are missing, failed, or stale');
    const text = read(file(runDir, artifact)), revision = text.match(/^Revision:\s*(v\d+)\s*$/m)?.[1];
    if (!revision || !artifact.includes('-' + revision + '.md')) fail('Revision metadata does not match filename');
    if (stage === 'brief' && !/^Status:\s*confirmed\s*$/m.test(text)) fail('Brief must be confirmed');
    const old = state.stages[stage];
    if (!old?.started) fail('Record stage start before inspection');
    if (old?.attempts >= 3) fail('Three inspections used; stop this stage');
    const inputs = parents.map(parent => ({ stage: parent, artifact: state.stages[parent].artifact, hash: state.stages[parent].hash }));
    if (old.dispatchInputs?.length !== inputs.length || inputs.some((input, index) =>
      old.dispatchInputs[index]?.stage !== input.stage || old.dispatchInputs[index]?.artifact !== input.artifact || old.dispatchInputs[index]?.hash !== input.hash)) {
      old.started = false;
      delete old.dispatchInputs;
      old.invalidRevisions = [...new Set([...(old.invalidRevisions ?? []), revision])];
      state.events.push({ action: 'start-inputs-changed', stage, rejectedRevision: revision });
      save(statePath, state);
      fail('Inputs changed after stage start; start and delegate this stage again with a new artifact revision');
    }
    if (old.revision === revision || old.invalidRevisions?.includes(revision)) fail('A retry needs a new numbered artifact revision');
    state.stages[stage] = { artifact, revision, hash: hash(text), attempts: (old?.attempts ?? 0) + 1, inputs, gates: {}, started: false, invalidRevisions: old.invalidRevisions ?? [] };
    state.events.push({ action: 'inspect', stage, artifact, revision, attempt: state.stages[stage].attempts });
  } else if (command === 'gate') {
    const [stage, gate, result, ...finding] = args;
    if (!GATES[stage]?.includes(gate) || !['pass', 'fail'].includes(result) || !finding.join(' ').trim()) fail('Usage: gate <run-dir> <stage> <named-gate> <pass|fail> <finding>');
    if (!['pending', 'failed', 'exhausted'].includes(status(stage, state, runDir)) || !state.stages[stage]?.artifact) fail('Stage needs current inspected artifact');
    if (state.stages[stage].gates[gate]) fail('Gate already judged for this inspection; repair requires a new revision');
    state.stages[stage].gates[gate] = { result, finding: finding.join(' ') };
    state.events.push({ action: 'gate', stage, gate, result, finding: finding.join(' ') });
  } else if (command === 'approve') {
    const [revision, evidence] = args, current = fingerprint(state, runDir), draft = state.stages.draft;
    if (!current || !draft || revision !== draft.revision || evidence !== 'I approve validated draft ' + revision + '.') fail('Record only the learner exact standalone approval of the current passing revision');
    if (state.approval?.status === 'rejected' && state.approval.revision === revision) fail('Rejected revision needs repair and new revision');
    state.approval = { status: 'approved', revision, hash: draft.hash, fingerprint: current, evidence };
    state.events.push({ action: 'approve', revision, evidence });
  } else if (command === 'reject') {
    const [revision, ...feedback] = args;
    if (!revision || !feedback.join(' ').trim() || state.stages.draft?.revision !== revision) fail('Usage: reject <run-dir> <current-revision> <learner-feedback>');
    state.approval = { status: 'rejected', revision, feedback: feedback.join(' ') };
    state.events.push({ action: 'reject', revision, feedback: feedback.join(' ') });
  } else if (command === 'write') {
    const current = approvalReady(state, runDir), target = finalPath(runDir);
    const draft = read(file(runDir, state.stages.draft.artifact));
    if (hash(draft) !== state.stages.draft.hash) fail('Draft changed after approval');
    // Normalize presentation only; approved requirements and exercises stay intact.
    const final = draft.replace(/^# .+$/m, '# Personalized learning plan')
      .replace(/^Artifact type: draft\r?$/m, 'Artifact type: final')
      .replace(/^Status:[^\r\n]*$/m, 'Status: approved')
      .replace(/^- This is a draft for review\. /m, '- This is an approved learning plan. ')
      .replace(/^- This is a proposed learning plan\. /m, '- This is an approved learning plan. ')
      .replace('this draft does not claim a new live check.', 'this plan does not claim a new live check.')
      .replace('can change at review while preserving the boundary-first progression.',
        'can change through a revised, validated plan with fresh approval while preserving the boundary-first progression.');
    writeFileSync(target, final);
    state.final = { hash: hash(final), fingerprint: current };
    state.events.push({ action: 'write', artifact: FINAL });
  } else if (command !== 'status') fail('Unknown command: ' + command);
  const current = sync(state, runDir);
  save(statePath, state);
  console.log(JSON.stringify(current, null, 2));
}
try { if (command === 'hook') await hook(); else main(); }
catch (error) { console.error(error.message); process.exitCode = 1; }
