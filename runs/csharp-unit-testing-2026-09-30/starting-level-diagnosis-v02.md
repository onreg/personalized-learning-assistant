# Starting-level diagnosis

Run ID: csharp-unit-testing-2026-09-30
Artifact type: diagnosis
Revision: v02
Supersedes: runs/csharp-unit-testing-2026-09-30/starting-level-diagnosis-v01.md
Status: assessed; starting milestone placed
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md

## Purpose

Place the first learning milestone using the learner's answers to three short, original prerequisite tasks. The confirmed brief says the learner has written some C# but is uncertain about designing useful tests. This assessment checks C# behavior reading, behavior-focused case selection, and assertion quality without requiring .NET installation or a test framework.

## Evidence

External sources: none. The diagnostic tasks are original. The sole upstream input is the confirmed `requirements-brief-v02.md`. The prompts, expected evidence, and advance placement criteria are in the superseded diagnosis v01.

Exact learner answer transcript, received in the conversation on 2026-09-30 after the coordinator presented the three tasks:

> 1. SeatsLeft(5, 2) returns 3, SeatsLeft(5, 5) returns 0, and SeatsLeft(5, 6) throws ArgumentOutOfRangeException because 6 reserved seats exceed the capacity of 5. 2. I would test member=true with subtotal 120m expecting 108m; member=false with 120m expecting 120m; and member=true with 20m expecting 20m. I am not sure what fourth case would be most useful. 3. The >= 0 check would also pass if the discount were missing. I would assert that the result is exactly 90m; that would catch returning 100m. Please record my answers, place my starting milestone, and continue through a validated draft for my review.

## Diagnostic tasks

### Task 1 — Read C# behavior

- Prompt: For the `SeatsLeft(int capacity, int reserved)` method in v01, state what `SeatsLeft(5, 2)`, `SeatsLeft(5, 5)`, and `SeatsLeft(5, 6)` return or throw, and explain the third answer.
- Expected evidence: `3`, `0`, and `ArgumentOutOfRangeException`, with the last call invalid because reserved exceeds capacity.
- Learner answer: Exact answer 1 in the transcript above.
- Result: **Pass.** All three outcomes and the exception reason are correct. This demonstrates the needed method-level control-flow and boundary reasoning for the starting exercises.

### Task 2 — Choose behavior-focused cases

- Prompt: For `FinalPrice(decimal subtotal, bool member)`, choose up to four tests with inputs and exact expected behavior. A negative subtotal is rejected; members receive a 10% discount at subtotals of at least `100m`.
- Expected evidence: Distinguish member and nonmember behavior, the exact `100m` threshold and a value just below it, and negative-input rejection, each with concrete expectations.
- Learner answer: Exact answer 2 in the transcript above.
- Result: **Partial.** The proposed expectations for `120m` with and without membership and `20m` with membership are correct and distinguish two conditions. No case checks the exact `100m` boundary or its near neighbor, and no case checks negative-input rejection. The learner explicitly expressed uncertainty about the fourth case. This is a test-selection gap; it does not negate the correct cases already chosen.

### Task 3 — Strengthen an assertion

- Prompt: Explain why `Assert.True(result >= 0)` is weak for `FinalPrice(100m, true)`, replace it with a precise assertion, and name a caught fault.
- Expected evidence: Explain that wrong nonnegative results pass; assert `90m`; name a fault such as a missing discount.
- Learner answer: Exact answer 3 in the transcript above.
- Result: **Pass.** The learner correctly explains the false-positive risk, states the exact expected result, and names the missing-discount behavior the stronger assertion catches. The answer is in plain English, as permitted by the prompt.

## Placement

**Recommended first milestone: test-case design and clear assertions for a small pure service method.** This follows the v01 placement rule: Task 1 is sound; Task 2 gives valid ordinary examples but misses the threshold and invalid-input behavior; Task 3 shows precise assertion reasoning. Start by turning a short method contract into a compact behavior table, including the exact threshold, just-below threshold, membership condition, and rejected input. Then write and run tests for that table before introducing service dependencies.

Demonstrated: C# method reading at this level, calculation of simple expected results, and recognition of a weak assertion. Still uncertain: systematic selection of boundary and invalid-input cases. Neither framework syntax, .NET project setup, nor successful local test execution was measured.

## Limitations

- Three written answers cannot establish whether the learner can create a .NET project, write compiling test code, debug failures, or run tests on Windows.
- The example is a pure method, so dependency isolation and integration testing remain untested.
- The recommendation is placement for the first milestone, not a claim that every later milestone has been mastered.
