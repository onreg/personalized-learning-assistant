# Learning practice and assessment

Run ID: csharp-unit-testing-2026-09-30
Artifact type: practice
Revision: v03
Supersedes: runs/csharp-unit-testing-2026-09-30/learning-practice-v01.md
Status: proposed
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md; runs/csharp-unit-testing-2026-09-30/learning-resources-v01.md; runs/csharp-unit-testing-2026-09-30/learning-sequence-v03.md; runs/csharp-unit-testing-2026-09-30/starting-level-diagnosis-v02.md

## Purpose

Give the learner six observable, three-hour weekly exercises that build a small .NET checkout quote service and meaningful automated tests runnable on Windows. The first check targets the diagnosed gap: choosing the exact threshold, its near neighbor, and rejected input, even though the learner can already read a short C# method and recognize a weak assertion. All prices and customer choices below are invented practice data. The service domain and rules are a plan choice, not a learner-supplied requirement.

## Evidence

- The confirmed `requirements-brief-v02.md` fixes the goal, 3 hours per week for 6 weeks, free English resources, Windows, and a locally runnable tested-service outcome.
- The passing `starting-level-diagnosis-v02.md` records correct method reading and the exact `90m` assertion. Its placement points to the missing threshold and negative-input cases; it does not establish SDK, xUnit, or local-run fluency.
- The passing `learning-sequence-v03.md` fixes this six-milestone order, the checkout rules, and each week's 3-hour allocation. The passing `learning-resources-v01.md` checked the relevant free English Microsoft Learn pages. The [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) supplies the separate source/test project and `[Fact]` plus `dotnet test` loop; the [unit-testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) support exact, isolated, behavior-named tests. Use separate `[Fact]` methods for decimal examples, rather than decimal `[InlineData]` arguments.

No learner exercise below has been attempted or passed. The expected evidence, fault-detector examples, and pass criteria are prospective checks. Revision v03 replaces the unobservable Week 3 recovery in v01 and makes the distinguishing inputs, faulty results, and assertions explicit.

## Planned fault-detector evidence for Weeks 1, 2, and 6

These are original checks derived from the written toy contract. Each row names a specific faulty behavior; the learner must record actual observations only after running it. `FinalPrice` examples use the selected `ArgumentOutOfRangeException` contract. The negative value is permitted as a test input for a rejected-input check, not as a valid purchase.

| Named fault | Test input | Correct result | Result with that fault | Distinguishing assertion |
| --- | --- | --- | --- | --- |
| Discount starts too early, at `99m` | `FinalPrice(99.99m, true)` | `99.99m` | `89.991m` | `Assert.Equal(99.99m, result)` |
| Discount uses `> 100m` instead of `>= 100m`, or discount is absent at `100m` | `FinalPrice(100m, true)` | `90m` | `100m` | `Assert.Equal(90m, result)` |
| Membership is ignored, so qualifying nonmembers receive a discount | `FinalPrice(100m, false)` (Week 1 table) / `FinalPrice(120m, false)` (Week 2 test) | `100m` / `120m` | `90m` / `108m` | `Assert.Equal(100m, result)` / `Assert.Equal(120m, result)` |
| Negative rejection is removed from the pricing path | `FinalPrice(-1m, true)` | `ArgumentOutOfRangeException` | Returns `-1m` | `Assert.Throws<ArgumentOutOfRangeException>(() => service.FinalPrice(-1m, true))` |

Use these rows when naming a likely mistake in Week 1, explaining each Week 2 test, sharpening an undetected named fault, and writing the Week 6 handoff. The `100m` row also supplies the exact result for the first red–green check: a no-discount implementation returns `100m`, so the `90m` assertion fails. Setup/compilation recovery remains a local command check, with success established by recorded SDK and test output.

## Milestone practice

### 1. Week 1 — Case design, setup, and first exact assertion

- Exercise: Write a behavior table for `FinalPrice(decimal subtotal, bool member)`: negative subtotal is rejected, and a member gets 10% off only when the original subtotal is at least `100m`. Include `99.99m` with `member=true` → `99.99m`, `100m` with `member=true` → `90m`, `100m` with `member=false` → `100m`, and `-1m` → rejected. Beside each row, name one likely mistake it would reveal. Check for an installed .NET SDK on Windows; if needed, use the [Windows SDK instructions](https://learn.microsoft.com/en-us/dotnet/core/install/windows). Create a source project and separate xUnit test project following the [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit). Write one named `[Fact]` for the `100m` member row, see it fail before implementing the rule, then make it pass with `Assert.Equal(90m, result)`.
- Expected evidence: The four-row table with exact outputs/rejection and fault notes; recorded SDK version; source and test projects; the one test's failing and passing `dotnet test` results (command and short output or written log).
- Progress check: Compare the table with the stated rule and run `dotnet test` from the solution folder. Confirm the test failure came from the absent behavior, then confirm the exact assertion passes after implementation.
- Pass criterion: All four table rows are correct, including the exact `100m` threshold and negative input; the named `[Fact]` asserts `90m` exactly; a local `dotnet test` run passes. Record the installed SDK rather than assuming a version.
- If missed: Recompute `100m × 0.9`, contrast `99.99m` with `100m`, and revise the table first. For setup or compiler failures, follow the relevant SDK verification or xUnit project step, then retry the same single test within this milestone.
- Time: 0.75 h table; 0.75 h SDK check/setup; 1.5 h red–green test and local run. **3 h.**

### 2. Week 2 — Complete the pure pricing rule

- Exercise: Turn the behavior table into separate, behavior-named xUnit `[Fact]` tests, one per decimal case. Check `FinalPrice(99.99m, true) == 99.99m`, `FinalPrice(100m, true) == 90m`, and `FinalPrice(120m, false) == 120m` using exact assertions. Document that this toy service rejects a negative subtotal with `ArgumentOutOfRangeException`, then test `FinalPrice(-1m, true)` for that exception. Implement the rule and run the suite. Use the [xUnit tutorial's `[Fact]` and `dotnet test` loop](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit), without decimal `[InlineData]`.
- Expected evidence: Four distinct test methods and implementation, exact assertions or exception assertion, a passing local test result, and one sentence beside each case naming the faulty behavior it can expose.
- Progress check: Run `dotnet test`; compare each result with the Week 1 table. Read the test names and fault sentences without looking at the implementation to see whether the intended behavior is clear.
- Pass criterion: All four tests pass; each has a concrete expected result or exception; the `99.99m` and `100m` member tests distinguish the threshold; the negative test fails if input validation is removed; nonmembers keep the full subtotal.
- If missed: Fix any incorrect expected value using the written rule before changing code. If a test does not detect its named fault, strengthen its input or assertion and rerun the suite; keep the boundary and exception cases separate.
- Time: 0.5 h refine cases; 1.75 h tests and implementation; 0.75 h run and simplify. **3 h.**

### 3. Week 3 — Extend the same service to quotes

- Exercise: Extend the tested service with `GetQuote`, returning `Discount`, `DeliveryFee`, and `Total`. Calculate delivery from the *original* subtotal: `5m` below `50m`, otherwise `0m`; total is subtotal minus discount plus delivery. Write separate `[Fact]` tests for a nonmember quote at `49.99m` → `(0m, 5m, 54.99m)`, a nonmember quote at `50m` → `(0m, 0m, 50m)`, and a member quote at `100m` → `(10m, 0m, 90m)`. Also test negative-subtotal rejection through the public `GetQuote` operation. Use [test-isolation and outcome advice](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) when reviewing the assertions.
- Expected evidence: A quote result type and `CheckoutQuoteService`; four named tests with exact expected properties or exception; a passing `dotnet test` result.
- Progress check: Inspect each returned property against the stated arithmetic and run the whole suite, including Week 2 tests. Verify that the quote tests call the public operation rather than duplicate its internal calculation as the action under test.
- Pass criterion: At `49.99m` delivery is `5m`, at `50m` it is `0m`, and at `100m` membership gives a `10m` discount and `90m` total; negative input is rejected through `GetQuote`; all Week 2 and 3 tests pass.
- If missed: Hand-calculate each triple, then use the Week 3 detector table below to locate an observable fault. At `50m`, check that delivery uses `< 50m`, not `<= 50m`; assert `DeliveryFee == 0m` and `Total == 50m`. For negative input, assert `ArgumentOutOfRangeException` from `GetQuote(-1m, true)` and restore rejection on the complete public quote path if arithmetic is reached. Check the `100m` discount assertions separately. Correct the specific rule or expectation and rerun the full suite. Do not treat using discounted subtotal for delivery as a detectable fault under these rules: every discounted nonnegative subtotal is at least `90m`, so it remains above `50m`, and lower subtotals are not discounted.
- Time: 0.5 h quote contract; 1.75 h result type, implementation, and tests; 0.75 h run and cleanup. **3 h.**

#### Week 3 detector and recovery examples

For quote rows, tuples are `(Discount, DeliveryFee, Total)`. Assert properties directly on the returned public-operation result; do not reproduce the calculation inside the assertion.

| Named fault | Test input | Correct result | Result with that fault | Distinguishing assertion |
| --- | --- | --- | --- | --- |
| Delivery always free | `GetQuote(49.99m, false)` | `(0m, 5m, 54.99m)` | `(0m, 0m, 49.99m)` | `Assert.Equal(5m, quote.DeliveryFee)` and `Assert.Equal(54.99m, quote.Total)` |
| Delivery comparison is `<= 50m` | `GetQuote(50m, false)` | `(0m, 0m, 50m)` | `(0m, 5m, 55m)` | `Assert.Equal(0m, quote.DeliveryFee)` and `Assert.Equal(50m, quote.Total)` |
| Discount absent at the member threshold | `GetQuote(100m, true)` | `(10m, 0m, 90m)` | `(0m, 0m, 100m)` | `Assert.Equal(10m, quote.Discount)` and `Assert.Equal(90m, quote.Total)` |
| Complete quote path allows `-1m` to reach arithmetic instead of rejecting it | `GetQuote(-1m, true)` | `ArgumentOutOfRangeException` | `(0m, 5m, 4m)` | `Assert.Throws<ArgumentOutOfRangeException>(() => service.GetQuote(-1m, true))` |

For the negative fault, the faulty result assumes the public quote path no longer rejects `-1m`, including any shared validator. Removing an outer check while an inner check still throws has equivalent observable behavior and does not count as detected missing validation. Restore rejection wherever it protects the public operation. Recovery uses these existing four cases and the allotted run/cleanup time; it adds no milestone or required mutation run to Week 3.

### 4. Week 4 — Check whether the tests catch real faults

- Exercise: Review the contract against the test names. Temporarily change the delivery comparison from `< 50m` to `<= 50m` and run `dotnet test`; restore it. Separately disable the discount at `100m` and run the tests; restore it. Record the failing test names and why they failed. Improve any unclear names or redundant assertions, then rerun the restored code. The [best-practices guide](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) is the review reference. If time remains, the checked [coverage guide](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage) can reveal unexercised branches; no coverage percentage is a target.
- Expected evidence: Two brief fault notes (edit, relevant failing test, reason), the restored source, readable test names, and a final passing `dotnet test` result.
- Progress check: Compare each observed failure with the Week 3 detector table: `GetQuote(50m, false)` must assert delivery `0m` and total `50m`, while the `<=` fault gives `5m` and `55m`; `GetQuote(100m, true)` must assert discount `10m` and total `90m`, while disabling the discount gives `0m` and `100m`. The pricing `100m` assertion may also detect the latter if the rule is shared. Review the final diff or source to ensure neither deliberate fault remains.
- Pass criterion: Each of the two deliberate faults produces at least one relevant test failure; both are restored; the complete suite passes afterward. The notes explain what the failing assertion protects, rather than reporting only a test count.
- If missed: If a deliberate fault leaves all tests green, sharpen the exact `50m` delivery or `100m` member assertion named in the progress check and repeat that same fault trial. Compare correct and faulty values in the Week 3 table before selecting any alternative fault. If the suite stays red after restoration, restore `< 50m` and the `100m` member discount, then rerun the complete suite before proceeding.
- Time: 0.5 h contract/test review; 1.5 h two fault trials and restoration; 1 h test cleanup and final run. **3 h.**

### 5. Week 5 — Integrate a local runnable example

- Exercise: Add a minimal console entry point that calls the same `CheckoutQuoteService` with invented `120m, member=true` input and prints subtotal `120m`, discount `12m`, delivery `0m`, and total `108m`. Write a short Windows README with the actual SDK version checked in Week 1, the solution-folder `dotnet test` command, and the console project's `dotnet run --project <actual-project-path>` command. Use the checked [`dotnet test` reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) and [Windows SDK page](https://learn.microsoft.com/en-us/dotnet/core/install/windows) for command and prerequisite details.
- Expected evidence: Console project or entry point, captured sample output with the four exact numbers, README commands using the learner's actual paths, and successful local run and test results.
- Progress check: Run both README commands from the documented folder in a Windows terminal; compare the four printed values with `(120m, 12m, 0m, 108m)` and verify that the existing test project still runs. For example, if the console prints the original subtotal as total, its faulty total is `120m`; the output check `printed Total == 108m` distinguishes that wiring fault. Check the printed output and that the console calls the tested service; a green unit suite alone does not establish correct console wiring.
- Pass criterion: `dotnet run` prints the expected invented quote, `dotnet test` passes, and another reader can identify the required SDK and copy the documented commands without guessing a project path.
- If missed: Fix the README working folder or project path using the actual solution layout; if the output is wrong, compare it with the tested service and make the console call that same implementation. Rerun both documented commands.
- Time: 0.5 h sample and expected output; 1.5 h console integration; 1 h README and two local command checks. **3 h.**

### 6. Week 6 — Final behavior review and reproducible handoff

- Exercise: Compare the final test list with the Week 1 behavior table and quote contract; add or repair a test only for a genuinely missing rule. From the documented solution folder, perform a fresh local build, run the console sample, and run the whole test suite. Record the commands, results, and a short explanation of what the `99.99m`/`100m` discount pair, `49.99m`/`50m` delivery pair, nonmember case, and negative-input case protect. Use the [best-practices guide](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) for the final test-quality review and the [`dotnet test` reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) for the final local test command.
- Expected evidence: Final source, tests, README, and a concise handoff note with the SDK version, build/run/test commands and observed outcomes, and the purpose of each key test.
- Progress check: Follow the README from the solution folder on Windows; verify a successful build, the `120m` member sample output, and a passing `dotnet test` result. Match each contract rule to the exact assertion or exception check in the planned detector tables above and the console check in Week 5. The handoff must state the chosen fault, input, correct result, faulty result, and distinguishing assertion for each explanation. Actual fault-run results are claimed only where output or a learner log supplies evidence.
- Pass criterion: The service builds and the console sample runs locally; the full test suite passes; exact tests cover the discount threshold, delivery threshold, nonmember behavior, and rejected negative input; the handoff gives reproducible Windows commands and explains which plausible fault each key test detects.
- If missed: Identify the failing command or uncovered rule, apply a targeted fix or add the missing behavior test, then repeat the build, run, and full-suite checks. Leave a limitation in the handoff if a local prerequisite cannot be resolved within the scheduled time; do not claim a successful local run without output.
- Time: 0.75 h behavior/test review; 1.5 h fresh build, run, test, and targeted fixes; 0.75 h evidence and handoff note. **3 h.**

## Limitations

- Exercises, SDK installation, project creation, tests, and local runs are planned; the learner has not reported completing any of them. Passing criteria are future observations, not current results.
- The installed SDK version and ability to restore xUnit packages on the learner's Windows machine are unverified. Week 1 checks both before later work depends on them.
- The checkout domain and exact toy rules can be changed at draft review while retaining the boundary-first test progression. `ArgumentOutOfRangeException` is a proposed exception contract for this exercise, not a requirement from the learner.
