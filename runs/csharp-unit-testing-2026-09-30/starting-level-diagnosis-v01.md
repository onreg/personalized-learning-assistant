# Starting-level diagnosis

Run ID: csharp-unit-testing-2026-09-30
Artifact type: diagnosis
Revision: v01
Status: proposed; learner answers pending
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md

## Purpose

The learner has written some C#, but their ability to reason about a method's behavior and choose useful tests is uncertain. These three original, framework-independent questions take about 10 minutes in total. Their answers will determine the first milestone before the six-week sequence is placed.

## Evidence

External sources: none. Diagnostic tasks are original.

The confirmed `requirements-brief-v02.md` records the learner's C# experience, uncertain test-design level, and request for a short assessment. The learner requested the assessment again when confirming the brief on 2026-09-30. No learner answers have been received. Answer provenance is pending; the coordinator should cite the exact answer transcript in the next revision.

## Diagnostic tasks

Please answer from your current knowledge, without looking anything up. Short answers are enough. You do not need a .NET installation or a particular test framework.

### Task 1 — Read C# behavior (about 2 minutes)

- Prompt: What does each call return or throw? Give a brief reason for the third answer.

  ```csharp
  static int SeatsLeft(int capacity, int reserved)
  {
      if (capacity < 0 || reserved < 0 || reserved > capacity)
          throw new ArgumentOutOfRangeException();
      return capacity - reserved;
  }
  ```

  Calls: `SeatsLeft(5, 2)`, `SeatsLeft(5, 5)`, `SeatsLeft(5, 6)`.
- Expected evidence: `3`, `0`, and `ArgumentOutOfRangeException` respectively; the third call throws because reserved seats exceed capacity. This demonstrates basic control-flow, comparison, subtraction, and exception reasoning.
- Learner answer: pending.
- Result: pending; no answer yet.

### Task 2 — Choose behavior-focused cases (about 5 minutes)

- Prompt: A `FinalPrice(decimal subtotal, bool member)` method must reject a negative subtotal. It gives members a 10% discount only when the subtotal is at least `100m`; otherwise it returns the subtotal. List up to four tests you would write. For each, give the input values and the exact expected result or exception. Choose cases that reveal different possible mistakes.
- Expected evidence: Tests distinguish the `100m` threshold from a value just below it (for example, member `99m → 99m` and member `100m → 90m`), distinguish a nonmember from a member at the threshold (nonmember `100m → 100m`), and check that a negative subtotal is rejected. Equivalent values and an explicitly named exception behavior are acceptable. The diagnostic concern is whether the learner selects boundaries, conditions, and invalid input with concrete expected behavior, rather than several ordinary examples of the same branch.
- Learner answer: pending.
- Result: pending; no answer yet.

### Task 3 — Strengthen an assertion (about 3 minutes)

- Prompt: Consider this proposed test for the same method: `var result = FinalPrice(100m, true); Assert.True(result >= 0);`. Why is its assertion weak? Replace it with one precise assertion, in C# or plain English, and name one faulty change it would catch.
- Expected evidence: Explains that many incorrect nonnegative results pass, asserts the exact `90m` result (for example, `Assert.Equal(90m, result)`), and identifies a caught fault such as omitting the discount or applying the wrong percentage. Framework-specific syntax is optional.
- Learner answer: pending.
- Result: pending; no answer yet.

## Placement

Pending learner answers. Apply the following criteria after recording their exact answers:

| Evidence | Recommended starting milestone |
| --- | --- |
| Task 1 has material errors in control flow, boundary, or exception reasoning | C# method behavior and simple boundary examples, then the first unit test |
| Task 1 is sound, but Task 2 misses the threshold, membership condition, or invalid input, or Task 3 cannot distinguish a precise assertion from a weak one | Test-case design and clear assertions for a small pure service method |
| Task 1 is sound, Task 2 covers the distinct behaviors with concrete expected outcomes, and Task 3 gives a precise assertion and plausible caught fault | Build the small service and its initial local automated test suite; introduce service dependencies only as needed |

Mark partial evidence explicitly. Do not infer framework fluency, project setup ability, or test execution from written answers. Placement remains pending until the learner responds.

## Limitations

- This brief written check cannot establish whether the learner can create a .NET project, write compiling test code, debug failures, or run tests on Windows.
- The test-design examples use a pure method; they do not measure dependency isolation or integration testing.
- The learner may answer in plain English, so syntax alone should not determine placement.
