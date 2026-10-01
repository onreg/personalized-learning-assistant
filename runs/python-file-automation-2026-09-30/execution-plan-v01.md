# Learning execution plan

Run ID: python-file-automation-2026-09-30
Artifact type: execution-plan
Revision: v01
Status: proposed
Inputs: runs/python-file-automation-2026-09-30/requirements-brief-v03.md

## Purpose

Build a five-week, ten-hour learning plan for a Windows command-line file sorter with a dry run and automated tests. The confirmed brief gives a usable starting level, so a separate diagnostic task would take time away from the small project.

## Evidence

External sources: none.

The confirmed `requirements-brief-v03.md` passed `brief-completeness` and `confirmation-fidelity` in `workflow-state.json` on 2026-09-30. It specifies Python variables, loops, and functions as prior knowledge, with little filesystem API experience.

## Agent selection

| Agent | Run or omit | Reason tied to confirmed need | Owned artifact |
| --- | --- | --- | --- |
| requirements-formalizer | run | Capture and confirm the learner's exact constraints and outcome. | `requirements-brief-v03.md` |
| resource-researcher | run | Check free English sources for Windows Python file handling, command-line arguments, dry runs, and tests. | `learning-resources-v01.md` |
| starting-level-diagnostician | omit | The learner states concrete prior knowledge; the sequence can begin with filesystem basics and check progress through practice. | none |
| learning-path-planner | run | Fit prerequisites and project milestones into ten hours. | `learning-sequence-v01.md` |
| practice-assessor | run | Define safe disposable-file exercises and observable pass checks. | `learning-practice-v01.md` |
| learning-plan-synthesizer | run | Integrate the sequence and practice into one reviewable draft. | `learning-draft-v01.md` |
| learning-plan-validator | run after synthesis | Independently judge all six draft gates. | Gate findings for the complete draft; no content artifact |

## Dependency edges and release gates

The confirmed brief's `brief-completeness` and `confirmation-fidelity` gates release resource research. Diagnosis is omitted. Passing resource `source-page-checks` and `resource-fit`, together with the passing brief, release sequence planning. Passing sequence `goal-coverage`, `prerequisite-order`, `source-links`, and `schedule-feasibility` releases practice. Passing practice `exercise-alignment`, `observable-assessment`, and `schedule-feasibility` releases synthesis. A checked draft then goes to independent validation of all six draft gates. Only a passing draft is presented for learner approval.

## Limitations

- The brief leaves copy versus move mechanics open as a project design choice. The sequence and exercises must choose a safe interpretation consistent with disposable-only practice and record it.
