# Learning plan draft: C# unit testing for a small .NET service

Run ID: csharp-unit-testing-2026-09-30
Artifact type: draft
Revision: v02
Supersedes: runs/csharp-unit-testing-2026-09-30/learning-draft-v01.md
Status: proposed for learner review
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md; runs/csharp-unit-testing-2026-09-30/learning-resources-v01.md; runs/csharp-unit-testing-2026-09-30/starting-level-diagnosis-v02.md; runs/csharp-unit-testing-2026-09-30/learning-sequence-v03.md; runs/csharp-unit-testing-2026-09-30/learning-practice-v03.md

## Purpose

Learn to design and write useful C# unit tests by building a small .NET service whose automated tests you can run locally on Windows. The intended finish is a service, a passing test suite, and clear commands for reproducing both the example run and the tests.

## Evidence

- The confirmed `requirements-brief-v02.md` fixes the learner's goal and constraints: some prior C#, three hours per week for six weeks, Windows, free English resources, and a small locally runnable service with meaningful tests.
- The passing `starting-level-diagnosis-v02.md` records correct reading of `SeatsLeft`, correct ordinary discount cases, and recognition that an exact `90m` assertion catches a missing discount. The learner did not include the exact `100m` boundary, a just-below case, or negative-input rejection when selecting tests. This places the first milestone at behavior-table design and exact assertions. SDK setup, xUnit syntax, and local test runs remain unmeasured.
- The passing `learning-resources-v01.md` records direct article-body opens and separate `learning_resources.inspect_learning_page` checks for the recommended free English Microsoft Learn pages on 2026-09-30. The [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) supplies source/test project setup, separate `[Fact]` tests, and the first `dotnet test` loop. The [test-design guide](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) supports behavior-focused names, exact assertions, isolation, and review. The [Windows installation guide](https://learn.microsoft.com/en-us/dotnet/core/install/windows) covers SDK checks and installation if needed. The [`dotnet test` reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) supports the documented local test command.
- The passing `learning-sequence-v03.md` fixes prerequisite order and six three-hour allocations. The passing `learning-practice-v03.md` supplies the exercises, expected evidence, pass criteria, and recovery steps integrated below. This revision replaces Week 3's unobservable recovery with the delivery boundary and public negative-input checks and preserves the prospective detector evidence. None of those exercises has been completed yet.

## Goal and starting point

You can read a small C# method, calculate simple expected results, and explain why an imprecise assertion might miss a fault. Start with the skill the assessment left uncertain: choosing tests for a threshold, its near neighbor, and rejected input. Then learn the xUnit and .NET command-line loop while applying those cases to a pure method. Expand that method into one service, check whether the tests catch deliberate faults, and finish with a local sample runner and a reproducible handoff.

**Proposed practice domain:** a toy checkout quote service using invented values. This is a plan choice, not a domain you supplied. `FinalPrice(decimal subtotal, bool member)` rejects negative subtotals; members receive 10% off only when the *original* subtotal is at least `100m`, while nonmembers pay the subtotal. `GetQuote` adds a delivery fee of `5m` when the original subtotal is below `50m`, otherwise `0m`, and returns `Discount`, `DeliveryFee`, and `Total`. The proposed negative-input exception is `ArgumentOutOfRangeException`. The implementation is a small local service class with an xUnit test project and a console sample, with no web server or database.

## Schedule

Six weeks × three hours = **18 hours**. Each allocation includes its focused reading, writing or revising code, and checking the result. The starting assessment already happened and is outside these 18 hours. Use an installed supported .NET SDK and record the actual version in Week 1. If it is already installed, use the setup allowance to rehearse the first failing-to-passing test loop.

The detector tables below explain the existing cases within their case-design, review, and recovery allocations. They add no learner task, milestone, or required mutation run; only Week 4 requires the two deliberate fault trials.

| Week | Milestone | Time |
| --- | --- | ---: |
| 1 | Case design, setup, first exact assertion | 3 h |
| 2 | Complete the pure pricing rule | 3 h |
| 3 | Extend the service to quote breakdowns | 3 h |
| 4 | Check that tests catch faults | 3 h |
| 5 | Add a local runnable example | 3 h |
| 6 | Final behavior review and reproducible handoff | 3 h |

## Milestones

### 1. Week 1 — Case design, setup, and first exact assertion

- **Outcome link:** Establish the missing test-selection skill and a local test loop for the final service.
- **Prerequisites:** Your assessed C# method reading and exact-result reasoning. No SDK or xUnit fluency is assumed.
- **Resources:** Read the focused naming, Arrange–Act–Assert, and assertion sections of [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices). Check or install the SDK using [Install .NET on Windows](https://learn.microsoft.com/en-us/dotnet/core/install/windows). Follow the source/test project and first `[Fact]` steps in [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit), adapted to the checkout rule.
- **Schedule:** 0.75 h behavior table; 0.75 h SDK check and source/test setup; 1.5 h first failing then passing test and local run. **3 h.**
- **Practice and deliverable:** Write four `FinalPrice` rows with a likely fault beside each: `(99.99m, true) → 99.99m`, `(100m, true) → 90m`, `(100m, false) → 100m`, and negative subtotal → rejection. Record the actual SDK version. Create separate source and xUnit test projects, write a named `[Fact]` for the `100m` member case, observe it fail for missing behavior, implement the rule, and rerun `dotnet test`.
- **Expected evidence and pass criterion:** Keep the four-row table, project files, and short failing/passing command outputs or log. Pass when all rows match the rule, the test asserts `90m` exactly, and the local test run passes.
- **Recovery:** If a row is wrong, recompute `100m × 0.9` and compare `99.99m` with `100m` before changing code. For setup or compiler errors, return to the relevant SDK verification or xUnit project step and retry the same single test within this milestone.

### 2. Week 2 — Complete the pure pricing rule

- **Outcome link:** Convert the case table into tests that distinguish correct behavior from threshold and validation faults.
- **Prerequisites:** Week 1's correct table and working xUnit test loop.
- **Resources:** Adapt the separate `[Fact]` and `dotnet test` examples from the [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) to decimal inputs; use [unit-testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) for minimal inputs and behavior-revealing names. Write separate `[Fact]` methods for these decimal cases.
- **Schedule:** 0.5 h refine cases; 1.75 h tests and implementation; 0.75 h run and simplify. **3 h.**
- **Practice and deliverable:** Test exact results for `(99.99m, true) → 99.99m`, `(100m, true) → 90m`, and `(120m, false) → 120m`. Specify `ArgumentOutOfRangeException` as this toy service's negative-subtotal contract and test `(-1m, true)` for it. Implement `FinalPrice`, run the full suite, and note one plausible fault each case catches.
- **Expected evidence and pass criterion:** Keep four distinct behavior-named tests, the implementation, fault notes, and a passing `dotnet test` result. Pass when the near-boundary pair distinguishes the threshold, the nonmember keeps the subtotal, the negative test would fail if validation were removed, and all four tests pass.
- **Recovery:** Correct expected values from the written rule before changing implementation. If a test would not catch its named fault, sharpen its input or assertion and rerun; keep boundary and exception cases separate.

#### Planned pricing detector evidence for Weeks 1, 2, and 6

These checks derive from the toy contract and are prospective. Use them for the existing fault notes and final explanations; record an actual failure only after observing a run. The `100m` member row also supplies the first failing-to-passing comparison in Week 1.

| Named fault | Input | Correct result | Faulty result | Distinguishing assertion |
| --- | --- | --- | --- | --- |
| Discount starts at `99m` | `FinalPrice(99.99m, true)` | `99.99m` | `89.991m` | `Assert.Equal(99.99m, result)` |
| Discount requires `> 100m`, or is absent at `100m` | `FinalPrice(100m, true)` | `90m` | `100m` | `Assert.Equal(90m, result)` |
| Membership ignored | `FinalPrice(100m, false)` (Week 1) / `FinalPrice(120m, false)` (Week 2) | `100m` / `120m` | `90m` / `108m` | `Assert.Equal(100m, result)` / `Assert.Equal(120m, result)` |
| Pricing path no longer rejects negative input | `FinalPrice(-1m, true)` | `ArgumentOutOfRangeException` | Returns `-1m` | `Assert.Throws<ArgumentOutOfRangeException>(() => service.FinalPrice(-1m, true))` |

### 3. Week 3 — Extend the same service to quotes

- **Outcome link:** Grow the tested pricing method into a coherent service that returns a useful breakdown.
- **Prerequisites:** Week 2's pricing rule and passing boundary, nonmember, and exception tests.
- **Resources:** Use the [test-design guide](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) to assert public outcomes and keep tests isolated; reuse the separate `[Fact]` and local run pattern from the [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit).
- **Schedule:** 0.5 h quote contract; 1.75 h result type, implementation, and tests; 0.75 h full run and cleanup. **3 h.**
- **Practice and deliverable:** Add `GetQuote` and a result containing `Discount`, `DeliveryFee`, and `Total`. Test nonmember quotes at `49.99m → (0m, 5m, 54.99m)` and `50m → (0m, 0m, 50m)`, a member quote at `100m → (10m, 0m, 90m)`, and negative-input rejection through the public quote operation. Calculate delivery from the original subtotal.
- **Expected evidence and pass criterion:** Keep the result type, service code, four named quote tests with exact property or exception assertions, and a passing full-suite result. Pass when the two delivery cases distinguish the `50m` boundary, the member quote has the expected discount and total, negative input is rejected, and Weeks 2–3 tests pass together.
- **Recovery:** Hand-calculate each breakdown, then use the detector table below to locate an observable fault. At `50m`, check `< 50m` against `<= 50m` and assert delivery `0m` and total `50m`. For `GetQuote(-1m, true)`, assert `ArgumentOutOfRangeException` and restore rejection on the complete public quote path if arithmetic is reached. Check the `100m` discount separately. Correct the specific rule or expectation and rerun the full suite within the existing run/cleanup allowance.

#### Planned quote detector and recovery evidence

Tuples are `(Discount, DeliveryFee, Total)`. Assert literal expected properties on the returned public-operation result; do not duplicate the internal calculation as the action or assertion.

| Named fault | Input | Correct result | Faulty result | Distinguishing assertion |
| --- | --- | --- | --- | --- |
| Delivery always free | `GetQuote(49.99m, false)` | `(0m, 5m, 54.99m)` | `(0m, 0m, 49.99m)` | `Assert.Equal(5m, quote.DeliveryFee)` and `Assert.Equal(54.99m, quote.Total)` |
| Delivery uses `<= 50m` | `GetQuote(50m, false)` | `(0m, 0m, 50m)` | `(0m, 5m, 55m)` | `Assert.Equal(0m, quote.DeliveryFee)` and `Assert.Equal(50m, quote.Total)` |
| Member discount absent at `100m` | `GetQuote(100m, true)` | `(10m, 0m, 90m)` | `(0m, 0m, 100m)` | `Assert.Equal(10m, quote.Discount)` and `Assert.Equal(90m, quote.Total)` |
| Complete quote path allows negative input to reach arithmetic | `GetQuote(-1m, true)` | `ArgumentOutOfRangeException` | `(0m, 5m, 4m)` | `Assert.Throws<ArgumentOutOfRangeException>(() => service.GetQuote(-1m, true))` |

The last faulty result assumes rejection is absent throughout the public quote path, including any shared validator. Removing an outer check while an inner check still throws preserves observable behavior; it does not demonstrate missing validation. Restore rejection wherever it protects the public operation.

Calculating delivery after the discount is also behaviorally equivalent under these rules: discounted nonnegative subtotals are at least `90m`, still above `50m`, and smaller subtotals receive no discount. Keep delivery's stated contract based on original subtotal, but do not claim these cases detect that equivalent implementation. The table is a planned explanation and recovery aid; no additional Week 3 mutation trial is required.

### 4. Week 4 — Check whether the tests catch real faults

- **Outcome link:** Demonstrate that the green suite protects behavior and remains readable.
- **Prerequisites:** Week 3's working service and passing tests.
- **Resources:** Review intent, names, and isolation with [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices). If time remains, use [Use code coverage for unit testing](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage) to look for unexercised branches; use coverage as a diagnostic, with no percentage target.
- **Schedule:** 0.5 h contract/test review; 1.5 h two fault trials and restoration; 1 h cleanup and final run. **3 h.**
- **Practice and deliverable:** Temporarily change `< 50m` to `<= 50m`, run `dotnet test`, note the failing test, and restore the code. Separately disable the discount at `100m`, run and record the relevant failure, and restore it. Improve unclear names or redundant assertions, then run the restored full suite.
- **Expected evidence and pass criterion:** Keep two short fault notes naming the edit, failing test, and reason, plus a final passing run. Compare each failure with the quote detector table: at `50m`, the delivery/total assertions expect `0m`/`50m` but the comparator fault gives `5m`/`55m`; at `100m`, the member discount/total assertions expect `10m`/`90m` but the disabled discount gives `0m`/`100m`. The pricing test may also catch the latter if the rule is shared. Pass when each deliberate fault produces a relevant failure, both are restored, and the full suite passes; review source or diff to confirm neither fault remains.
- **Recovery:** If a fault leaves the suite green, sharpen the exact `50m` delivery or `100m` member assertion in the table and repeat the same trial. Compare correct and faulty values before selecting an alternative fault. If the suite remains red after restoration, restore `< 50m` and the member discount at `100m`, then rerun the full suite.

### 5. Week 5 — Integrate a local runnable example

- **Outcome link:** Make the service easy to invoke and its tests easy to reproduce on Windows.
- **Prerequisites:** Week 4's restored service and trustworthy suite.
- **Resources:** Use the project layout and local test loop in the [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit), the [`dotnet test` command reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test), and the [Windows SDK page](https://learn.microsoft.com/en-us/dotnet/core/install/windows) for README prerequisites.
- **Schedule:** 0.5 h sample and expected output; 1.5 h console integration; 1 h README and two local checks. **3 h.**
- **Practice and deliverable:** Add a minimal console entry point calling the same service with invented `(120m, true)` input. Print subtotal `120m`, discount `12m`, delivery `0m`, and total `108m`. Write a short README with the actual SDK version, solution-folder `dotnet test` command, and `dotnet run --project <actual-project-path>` command. Run both commands from the documented folder.
- **Expected evidence and pass criterion:** Keep the console source, sample output, README, and successful run/test outputs. Run both commands from the documented Windows folder and check all four printed numbers. For example, printing original subtotal as total gives faulty `120m` rather than correct `108m`; the output check `printed Total == 108m` distinguishes that wiring fault. Verify the console calls the tested service; a green unit suite alone does not establish console wiring. Pass when printed numbers match the quote, the suite passes, and a reader can copy commands using real paths without guessing the working folder.
- **Recovery:** Correct the README's folder or path from the actual layout. If output differs, ensure the console calls the tested service implementation, then rerun both documented commands.

### 6. Week 6 — Final behavior review and reproducible handoff

- **Outcome link:** Finish with a small service and meaningful automated tests that can be run and explained locally.
- **Prerequisites:** Week 5's sample runner and documented commands.
- **Resources:** Apply the behavior and clarity checks in [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices); use the [`dotnet test` reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) for the final full-suite run and the [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) if a project-loop problem needs repair.
- **Schedule:** 0.75 h rule/test comparison; 1.5 h fresh build, sample run, full test run, and targeted fixes; 0.75 h results and handoff note. **3 h.**
- **Practice and deliverable:** Compare test names with the Week 1 table and the quote contract; repair only genuinely missing behavior checks. From the documented solution folder, build, run the sample, and run the full suite. Write a handoff note with the actual SDK version, commands and observed outputs, and what the `99.99m`/`100m` discount pair, `49.99m`/`50m` delivery pair, nonmember case, and negative-input case protect. Match those explanations to the detector tables and Week 5 console check: state the chosen fault, input, correct result, faulty result, and distinguishing assertion. Claim actual fault-run results only where output or a learner log supplies evidence.
- **Expected evidence and pass criterion:** Keep final source, tests, README, and handoff note. Pass when the service builds and runs locally, the full suite passes, exact tests cover both thresholds, nonmember behavior, and rejected negative input, and the commands and test purposes are clear enough to reproduce and explain.
- **Recovery:** Identify the failing command or uncovered rule, apply a targeted fix or add its missing test, then repeat build, run, and full-suite checks. If a prerequisite remains unresolved within the schedule, record that limit in the handoff rather than claiming a successful run.

## Limitations

- This is a draft for review. The checkout domain and exact rules are proposed practice choices and can change at review while preserving the boundary-first progression.
- The short assessment did not measure compiling C#, xUnit fluency, SDK installation, package restore, or local execution. Week 1 checks these; the installed SDK version and Windows environment have not been observed.
- No exercise, service implementation, test run, or sample output in this plan has been reported as completed. The pass criteria describe future evidence.
- Source access checks were performed on 2026-09-30, as recorded in resources v01; this draft does not claim a new live check. English article bodies loaded without payment, but generic authorization notices appeared around some pages and embedded interactive features were not established as usable without sign-in. Local SDK installation and xUnit package restore remain unverified.
