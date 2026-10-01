# Learning execution plan

Run ID: csharp-unit-testing-2026-09-30
Artifact type: execution-plan
Revision: v01
Status: proposed
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md

## Purpose

Select a short starting-level diagnosis before milestone placement. The learner has written some C# but cannot yet judge their ability to design useful tests. The six-week plan will be placed after their answers establish a starting point.

## Evidence

External sources: none.

The confirmed `requirements-brief-v02.md` preserves the learner's request for a short assessment and records their explicit confirmation of v01 on 2026-09-30. The brief's `brief-completeness` and `confirmation-fidelity` gates both pass in `workflow-state.json`.

## Agent selection

| Agent | Run or omit | Reason tied to confirmed need | Owned artifact |
| --- | --- | --- | --- |
| requirements-formalizer | run | Record the confirmed goal and constraints | requirements-brief-v02.md |
| resource-researcher | run | Find free English sources suitable for C# unit testing on Windows | learning-resources-v01.md |
| starting-level-diagnostician | run | Short tasks must resolve the uncertain C# and test-design starting point before milestone placement | starting-level-diagnosis-vNN.md |
| learning-path-planner | run | Order milestones within three hours per week for six weeks, after diagnosis and resources pass | learning-sequence-v01.md |
| practice-assessor | run | Define observable exercises and checks for the locally runnable service | learning-practice-v01.md |
| learning-plan-synthesizer | run | Combine the passing sequence and practice into a complete draft | learning-draft-v01.md |
| learning-plan-validator | run after synthesis | Independently judge all six draft gates | Gate findings for learning-draft-vNN.md; no content artifact |

## Dependency edges and release gates

- The confirmed brief releases resource research and diagnosis after `brief-completeness` and `confirmation-fidelity` pass. These stages have the same brief input and separate outputs, so they can run concurrently.
- Diagnosis requires the learner's answers before `answer-provenance` and `placement` can pass. Milestone placement waits for those gates.
- The sequence waits for the brief, resources (`source-page-checks`, `resource-fit`), and diagnosis (`answer-provenance`, `placement`) to pass. It then requires `goal-coverage`, `prerequisite-order`, `source-links`, and `schedule-feasibility`.
- Practice waits for the passing sequence and requires `exercise-alignment`, `observable-assessment`, and `schedule-feasibility`.
- Synthesis waits for the passing practice. The independent validator judges `required-artifact-structure`, `goal-coverage`, `credible-citations`, `prerequisite-order`, `schedule-feasibility`, and `exercise-alignment` on the integrated draft.

## Limitations

- The learner has not answered the assessment, so placement is pending.
- The service domain, .NET version, and test framework are still open and will be selected during planning using checked resources.
