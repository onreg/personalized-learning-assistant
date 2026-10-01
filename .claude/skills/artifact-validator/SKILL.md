---
name: artifact-validator
description: Review each learning workflow artifact at handoff for a readable structure, exact inputs, evidence, and its stage-specific semantic gates.
---

# Artifact validator

1. Read `workflow/artifact-contract.md`, the relevant template, the current candidate, and its recorded passing inputs in `workflow-state.json`.
2. Check that the artifact is readable and complete for its stage. Verify the revision and named inputs against the actual files. Check source links beside claims, limitations, and the type-specific fields in the template.
3. For brief, resources, diagnosis, sequence, and practice, judge each named gate in `workflow/quality-gates.md`. Open sources for resource claims; check prerequisite order and schedule arithmetic for sequence; check observable evidence and pass criteria for practice, including the concrete fault-detection checks specified in the quality gates. A link's syntax alone is not proof of source quality.
4. Return a pass or fail with a concrete finding for every gate and identify the owner of each defect. The coordinator records these results with `scripts/learning-workflow.mjs gate`. A dependent agent starts only after all required gates pass.

For a draft handoff, check its readable structure, revision, exact passing inputs, and integration of practice. Return any defects to the synthesizer before inspection. The independent learning-plan-validator alone reports the six named draft gate results after the coordinator inspects the draft; the coordinator records each result once.

This skill is reused at every handoff. Human-readable Markdown is the artifact format; no structural checker parses it.
