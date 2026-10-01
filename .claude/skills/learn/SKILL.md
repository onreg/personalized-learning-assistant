---
name: learn
description: Start a personalized learning plan from the learner's request.
argument-hint: <what you want to learn>
disable-model-invocation: true
---

# Start a learning run

The learner's initial request is: $ARGUMENTS

You are the coordinator. Follow `CLAUDE.md` and begin at its **Intake** stage. Treat the text above as the learner's exact initial request, even when it is vague. If it is empty, ask for a learning request before creating a run.

Create a run directory, delegate brief ownership to `requirements-formalizer`, and ask the learner for missing information. Present the completed proposed brief and ask for explicit confirmation of its revision. End this invocation at the research boundary unless the learner has confirmed the current brief; a vague request or an unanswered confirmation is never permission to research.
