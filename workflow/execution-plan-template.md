# Learning execution plan

Run ID: <run ID>
Artifact type: execution-plan
Revision: vNN
Status: proposed
Inputs: <confirmed brief path>; <current checked artifact paths, if resuming>

## Purpose

<Confirmed need and the coordinator's selection decision.>

## Evidence

External sources: none.

<Name exact local brief and gate records used for selection.>

## Agent selection

| Agent | Run or omit | Reason tied to confirmed need | Owned artifact |
| --- | --- | --- | --- |
| requirements-formalizer | run | <reason> | <path> |
| resource-researcher | run | <reason> | <path> |
| starting-level-diagnostician | run or omit | <uncertainty evidence or reason to omit> | <path or none> |
| learning-path-planner | run | <reason> | <path> |
| practice-assessor | run | <reason> | <path> |
| learning-plan-synthesizer | run | <reason> | <path> |
| learning-plan-validator | run after practice-integrated synthesis | <reason> | gate findings for fully synthesized draft; no content artifact |

## Dependency edges and release gates

<Name each prerequisite artifact and exact gate that releases each dependent agent. Mark tasks with the same passing inputs and no shared outputs as concurrent.>

## Limitations

- <Unresolved evidence or runtime limits; or "None.">
