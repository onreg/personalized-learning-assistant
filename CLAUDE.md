# Personalized learning assistant

`/learn <request>` starts a learning run. This Claude Code session is the coordinator: it asks for missing facts, selects agents, records gates, and talks with the learner. Content agents alone write their named Markdown artifacts.

| Agent | Work |
| --- | --- |
| requirements-formalizer | Numbered requirements briefs |
| resource-researcher | Opened and checked source pages, using web search and the learning_resources MCP |
| starting-level-diagnostician | Optional short tasks and placement |
| learning-path-planner | Prerequisite-ordered learning sequence |
| practice-assessor | Exercises, evidence, pass criteria, recovery steps |
| learning-plan-synthesizer | One practice-integrated learning draft |
| learning-plan-validator | Independent read-only review of six draft gates |

The five core content agents and validator run every complete workflow. Select diagnosis only when the confirmed starting level is materially uncertain. Record the selection and reason in `execution-plan-vNN.md`. Resource research and selected diagnosis can run concurrently. Sequence waits for both; practice waits for sequence; synthesis waits for practice.

## Intake

1. Preserve the learner's wording. Create `runs/<run-id>/`; run `node scripts/learning-workflow.mjs init runs/<run-id>`.
2. Run `node scripts/learning-workflow.mjs start runs/<run-id> brief` before delegation. Delegate `requirements-brief-vNN.md` to requirements-formalizer. Clarify the goal, current knowledge, available time, constraints, and intended outcome. Ask the learner to confirm the latest proposed revision explicitly.
3. Have the same agent write a confirmed revision with the exact confirmation evidence. Use the artifact-validator skill, then `inspect`, and both named `gate` decisions for `brief`. Research starts after the brief passes.

## Plan and execution

Write `execution-plan-vNN.md` from the confirmed brief: selection, reasons, dependencies, and owners. Record diagnosis choice with `node scripts/learning-workflow.mjs plan runs/<run-id> <run|omit> execution-plan-vNN.md`.

Before delegating each stage, run `node scripts/learning-workflow.mjs start runs/<run-id> <stage>`. Stages are `resources`, optional `diagnosis`, `sequence`, `practice`, and `draft`. The CLI records exact passing input hashes and blocks a dependent stage with unpassed parents. Research opens actual pages, records MCP contribution, and separates unusable sources.

At each return, use artifact-validator, then `node scripts/learning-workflow.mjs inspect runs/<run-id> <stage> <artifact-filename>`. For stages before `draft`, record every named result with `node scripts/learning-workflow.mjs gate runs/<run-id> <stage> <gate-name> <pass|fail> "<finding>"`. The script stores findings; the agent judges content. See `workflow/quality-gates.md` for the names and owners.

The synthesizer receives the passing brief, resources, optional diagnosis, sequence, and practice. It writes one integrated draft. Use artifact-validator for a structural handoff check, then `inspect` the draft. The dedicated learning-plan-validator reads the exact inspected draft and all passing inputs and alone reports all six draft gates. Record each result once with `gate` before presenting the draft to the learner.

## Repair and resume

A failed gate or learner rejection goes to the owner of the smallest defective artifact. If that stage already passes, reopen it with `node scripts/learning-workflow.mjs start runs/<run-id> <stage> "<concrete validator finding or learner feedback>"`. The reason is required for a passing stage and recorded in history. Failed, missing, or stale stages use the usual `start` command.

Restarting an inspected stage marks it in progress immediately: its old gate findings remain historical evidence, dependent artifacts become stale, and any previous approval becomes stale. Have the owner write a new numbered revision, inspect and judge it, then regenerate and revalidate only affected descendants. Old revisions and state are preserved; the CLI handles invalidation. If inputs change between `start` and `inspect`, delegate against the new inputs and require another artifact revision. Each stage permits at most three inspections; reopening does not reset the count. At the limit, stop dependent work and report the gate, finding, owner, affected artifacts, and attempts.

Run `node scripts/learning-workflow.mjs status runs/<run-id>` on restart and before dispatch. Read `workflow-state.json` and the latest plan. Reuse an artifact only while its file hash, gate results, and parent hashes pass. An interrupted `start` can be redispatched. The PostToolUse hook updates state after Claude Code writes; `status` detects external edits.

## Approval and final result

Final export normalizes the title, artifact type, status, and known legacy review wording while preserving the approved learning content. Planned exercises remain future work. Keep approval phase in draft metadata; body limitations must remain true after approval.

After all six draft gates pass, use the final-learning-plan skill. Ask the learner to review its exact revision and answer `I approve validated draft vNN.` or give rejection feedback. Record only their actual response. Rejection returns affected work through repair and fresh validation. The CLI deterministically checks the recorded approval against the current draft, inputs, plan, and gates before writing `learning-plan-final.md`. The PreToolUse hook guards Claude Code writes to that path. A changed checked file or gate makes approval stale. The final Markdown copies the approved draft under a final title and status.
