# Artifact contract

Each content agent writes a numbered, human-readable Markdown artifact using its matching template. Preserve the learner's statements, name exact local inputs, cite source-backed claims beside the claims, and list limitations. The coordinator uses the reusable artifact-validator skill at each handoff. These files are read by humans and agents; they need no programmatic schema or JSON parsing.

The brief has a `Revision:` line and becomes `Status: confirmed` only after explicit learner confirmation. Other artifacts retain `Revision:`, `Inputs:`, `## Evidence`, and `## Limitations`. The CLI reads only revision and the brief's confirmed status, then hashes the full file. A content edit changes its hash and makes dependent work stale. Gate results live in `workflow-state.json`.
