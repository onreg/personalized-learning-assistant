---
name: final-learning-plan
description: Process learner review of a validated learning draft and deliver the approved final Markdown plan.
---

# Final learning plan

1. Run `node scripts/learning-workflow.mjs status runs/<run-id>`. Present the passing draft's exact revision and content. Ask the learner to respond with the standalone sentence `I approve validated draft vNN.` using the current revision, or give rejection feedback. Wait for the actual response.
2. On rejection, record it with `node scripts/learning-workflow.mjs reject runs/<run-id> <revision> "<verbatim feedback>"`. Route the defect to its owner, revise and revalidate affected artifacts and descendants, and present the new passing draft for review.
3. On exact approval, record the learner's words verbatim with `node scripts/learning-workflow.mjs approve runs/<run-id> <revision> "I approve validated draft vNN."`. Run `node scripts/learning-workflow.mjs write runs/<run-id>`. Check `status` reports approval and final both passed, then deliver `learning-plan-final.md`.

The CLI verifies the current draft, input hashes, plan, all named gates, and the exact approval phrase before writing. The PreToolUse hook applies the same approval check to Claude Code Write and Edit on the final path.
