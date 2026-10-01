# Quality gates

The coordinator records inspected artifacts, SHA-256 hashes, input hashes, attempts, and named findings in `workflow-state.json` using `scripts/learning-workflow.mjs`. Agents judge Markdown content; the script checks dependencies, retries, hashes, and approval. The artifact-validator skill is reused at each handoff. For the draft, it supplies a structural handoff check; the independent learning-plan-validator alone reports all six named draft gates after inspection. Record each gate once per inspected revision.

| Stage | Owner | Named gates |
| --- | --- | --- |
| brief | requirements-formalizer | brief-completeness, confirmation-fidelity |
| resources | resource-researcher | source-page-checks, resource-fit |
| diagnosis, when selected | starting-level-diagnostician | answer-provenance, placement |
| sequence | learning-path-planner | goal-coverage, prerequisite-order, source-links, schedule-feasibility |
| practice | practice-assessor | exercise-alignment, observable-assessment, schedule-feasibility |
| draft | learning-plan-synthesizer, reviewed by learning-plan-validator | required-artifact-structure, goal-coverage, credible-citations, prerequisite-order, schedule-feasibility, exercise-alignment |

Record a concrete finding for each pass or fail. A source-page failure belongs to the resource researcher, then sequence, practice, and draft that used it become stale. An integration-only draft failure belongs to the synthesizer. A validator finding in an upstream artifact goes to that artifact's owner. Each repair is a new numbered revision. Reinspect and rejudge it, then regenerate only affected descendants. Three inspections per stage is the limit; unresolved failures stop dependent execution and are reported to the learner.

For `observable-assessment` and draft `exercise-alignment`, check every claimed fault detector and recovery step against the actual exercise rules. Give a concrete permitted input, correct result, faulty result, and the assertion that distinguishes them. If the results cannot differ under those rules, choose an observable fault or explicitly identify the equivalent behavior; a green suite alone does not establish detection. These are planned checks unless learner evidence shows an actual run.

To return a passing upstream stage or a rejected passing draft to repair, use `start runs/<run-id> <stage> "<finding or feedback>"`; see `CLAUDE.md` under Repair and resume. This invalidates dependent work and previous approval immediately, preserves history and inspection counts, and requires a new revision and fresh gate findings.

Before dispatch, `start` requires all parent stages to pass. The required edges are brief → resources and optional diagnosis; brief + resources + optional diagnosis → sequence; sequence → practice; practice → draft. The state records exact passing input hashes. Resources and selected diagnosis may run in parallel because neither consumes the other.
