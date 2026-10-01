# Learning execution plan

Run ID: python-csv-cleaning-2026-09-30
Artifact type: execution-plan
Revision: v01
Status: active
Inputs: runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md

## Purpose

Build a checked, practice-integrated four-week learning draft for the confirmed goal of cleaning a real CSV with a reproducible Python script and checking its output. Omit a separate starting-level diagnosis: the learner has stated a sufficient starting point for placing introductory CSV and pandas work (variables, loops, and functions; no pandas experience). The sequence will begin at that level and include a short self-check rather than assume prior data-library knowledge.

## Evidence

External sources: none.

- Confirmed brief: `runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md`.
- `runs/python-csv-cleaning-2026-09-30/workflow-state.json` records passing `brief-completeness` and `confirmation-fidelity` gates for that revision.

## Agent selection

| Agent | Run or omit | Reason tied to confirmed need | Owned artifact |
| --- | --- | --- | --- |
| requirements-formalizer | run, completed | Recorded the learner's confirmed requirements | `requirements-brief-v02.md` |
| resource-researcher | run | Find checked, free English-language Python/CSV resources usable on Windows | `learning-resources-v01.md` |
| starting-level-diagnostician | omit | The confirmed starting level is specific enough for an introductory sequence; no materially uncertain placement remains | none |
| learning-path-planner | run | Allocate prerequisites and milestones across four weeks and 16 hours | `learning-sequence-v01.md` |
| practice-assessor | run | Supply observable exercises and checks for each milestone | `learning-practice-v01.md` |
| learning-plan-synthesizer | run | Combine passing artifacts into one practice-integrated draft | `learning-draft-v01.md` |
| learning-plan-validator | run after synthesis | Independently judge the complete draft against six named gates | gate findings for `learning-draft-v01.md`; no content artifact |

## Dependency edges and release gates

1. The confirmed brief v02 passed `brief-completeness` and `confirmation-fidelity`; this releases resource research. Diagnosis is omitted, so there is no parallel diagnosis artifact.
2. Resource research must pass `source-page-checks` and `resource-fit` before the planner starts. Sequence inputs are the exact passing brief and resources.
3. The sequence must pass `goal-coverage`, `prerequisite-order`, `source-links`, and `schedule-feasibility` before practice starts.
4. Practice must pass `exercise-alignment`, `observable-assessment`, and `schedule-feasibility` before synthesis starts.
5. After draft inspection, the independent validator alone judges `required-artifact-structure`, `goal-coverage`, `credible-citations`, `prerequisite-order`, `schedule-feasibility`, and `exercise-alignment`. The learner reviews that validated revision before any final write.

## Limitations

- The specific real CSV and its actual cleaning rules are not yet known. The sequence and exercises can use safe sample data until the learner selects the capstone file.
- The learner has not required pandas or the standard library specifically. Resource and sequence choices should justify the tool they teach.
