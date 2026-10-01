# Learning sequence

Run ID: csharp-unit-testing-2026-09-30
Artifact type: sequence
Revision: v02
Supersedes: runs/csharp-unit-testing-2026-09-30/learning-sequence-v01.md
Status: proposed
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md; runs/csharp-unit-testing-2026-09-30/learning-resources-v01.md; runs/csharp-unit-testing-2026-09-30/starting-level-diagnosis-v02.md

## Purpose

Move from selecting behavior-focused cases for one pure C# method to a small .NET checkout quote service with meaningful automated tests that the learner can run locally on Windows. The confirmed limit is three hours each week for six weeks, using free English resources. This sequence defines milestone order and time; the practice artifact will specify detailed exercises and assessment criteria.

## Evidence

- The confirmed `requirements-brief-v02.md` records the learner's C# experience, six-week and 18-hour limit, Windows and resource constraints, and locally runnable tested-service outcome.
- The passing `starting-level-diagnosis-v02.md` records correct method reading and a precise `90m` assertion. The learner gave valid ordinary discount cases but omitted the exact `100m` threshold and negative-input rejection. It places the first milestone at behavior-focused case selection and precise assertions for a pure method; framework setup fluency remains unmeasured.
- The passing `learning-resources-v01.md` checked the linked English Microsoft Learn pages by web open and separate `learning_resources.inspect_learning_page` fetches on 2026-09-30. The [xUnit tutorial](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) supplies separate source/test projects, `[Fact]`, and the first `dotnet test` loop. The [unit-testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) guide behavior names, precise assertions, Arrange–Act–Assert, isolation, and test review. The [Windows installation page](https://learn.microsoft.com/en-us/dotnet/core/install/windows) supplies SDK installation and validation guidance if needed. The [`dotnet test` reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) supports the repeatable local run command.
- Microsoft Learn's [valid attribute arguments](https://learn.microsoft.com/en-us/dotnet/standard/attributes/applying-attributes#valid-attribute-arguments) section explicitly excludes `decimal` as an attribute parameter type. That page and the xUnit tutorial's `[Fact]` example were opened directly on 2026-09-30. The decimal pricing cases below therefore use separate `[Fact]` methods with decimal literals inside each test body, not decimal values in `[InlineData]`.

## Starting point and prerequisites

The learner can read a small C# method, calculate expected values, and recognize a weak assertion. Their short assessment did not show systematic selection of boundary or rejected-input cases. Begin with a written behavior table for a pure `FinalPrice(decimal subtotal, bool member)` method, including below/at/above the membership threshold and invalid subtotal, then turn selected rows into exact assertions. Setup comes within this first milestone because the assessment did not measure SDK or xUnit fluency. Later milestones rely on working source and test projects, then build out one coherent service and its local execution path.

**Toy-domain plan choice, not a learner-supplied requirement:** build a checkout quote service using safe invented prices, without workplace or personal data. The core rule is that negative subtotals are rejected and members receive 10% off when the original subtotal is at least `100m`; nonmembers do not. Extend it with a delivery fee of `5m` when the original subtotal is below `50m`, otherwise `0m`. Return a quote breakdown containing discount, delivery fee, and total. A tiny console entry point may print a sample quote, while an xUnit project tests the service logic. This is intentionally a local service class and sample runner, with no web server, network, database, or mock framework. Use an installed supported .NET SDK and record its version; the exact version is a setup observation, not a presumed learner fact. xUnit is the chosen free test framework because the checked tutorial supplies the complete local loop.

## Schedule

Six weekly milestones at **3 hours each = 18 hours total**. Allocations include reading only relevant sections of the checked pages, Windows setup if required, test writing, implementation, review, and final local runs. If the SDK is already installed, use the reserved setup time to rehearse the first red–green test loop. The assessment itself preceded this schedule.

## Milestones

### 1. Week 1 — Case design, setup, and first exact assertion

- Outcome link: Establish the missing case-selection skill and a local xUnit loop for the final service.
- Prerequisites: The assessed ability to read the method and compute exact results; no framework or SDK setup ability is assumed.
- Resources: [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — focused test naming, Arrange–Act–Assert, and precise assertion examples; [Install .NET on Windows](https://learn.microsoft.com/en-us/dotnet/core/install/windows) — SDK install/verification only if `dotnet` is absent; [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) — project creation, first `[Fact]`, and Windows test command, adapted to the checkout example.
- Schedule: 0.75 h to write the `FinalPrice` behavior table; 0.75 h for SDK check/install and source/test project setup; 1.5 h for one failing then passing xUnit test with an exact expected decimal and a `dotnet test` run. **3 h total.**
- Deliverable: A behavior table with member/nonmember, just-below/at-threshold, and rejected-input rows; a solution with source and test projects; one named passing test that asserts an exact result; a recorded local `dotnet test` command and result.

### 2. Week 2 — Complete the pure pricing rule

- Outcome link: Turn the diagnosis gap into tests that distinguish correct behavior from common boundary and validation mistakes.
- Prerequisites: Week 1 behavior table and passing xUnit loop.
- Resources: [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) — its `[Fact]` example and `dotnet test` loop, adapted to separate decimal pricing tests; [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — minimal inputs, behavior-revealing names, and isolated tests.
- Schedule: 0.5 h to refine expected cases; 1.75 h to write separate `[Fact]` tests and implement `FinalPrice`; 0.75 h to rerun and simplify tests/code. **3 h total.**
- Deliverable: Passing exact-result tests for `99.99m` and `100m` member cases, a nonmember case, and a test expecting negative-subtotal rejection. The learner can explain which wrong branch or missing validation each test detects.

### 3. Week 3 — Extend the same service to quotes

- Outcome link: Grow the tested pure rule into a small coherent service that returns a price breakdown.
- Prerequisites: Week 2 pricing rule and boundary/exception tests pass.
- Resources: [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — isolate business rules and assert useful outcomes; [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) — additional separate `[Fact]` tests and the local test loop.
- Schedule: 0.5 h to define quote inputs, delivery rule, and expected breakdowns; 1.75 h to implement the quote result and test below/at the `50m` delivery threshold plus a discounted quote; 0.75 h for local run and cleanup. **3 h total.**
- Deliverable: A `CheckoutQuoteService` that returns discount, delivery fee, and total, with passing exact assertions for delivery at `49.99m` and `50m`, a member quote at `100m`, and negative-input rejection through the public quote operation.

### 4. Week 4 — Check whether the tests catch real faults

- Outcome link: Make the suite meaningful rather than merely green, and keep it readable as the service grows.
- Prerequisites: Week 3 service behavior and passing tests.
- Resources: [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — test intent, Arrange–Act–Assert, test isolation, and why coverage alone does not establish quality; [Use code coverage for unit testing](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage) — optional line/branch collection only if time remains after behavior review.
- Schedule: 0.5 h to review the contract against the test list; 1.5 h to deliberately change one threshold comparator and one discount result in turn, observe the relevant failures, and restore the code; 1 h to improve names, remove redundant cases, and rerun the suite. **3 h total.**
- Deliverable: A clean passing suite plus a short note showing the two deliberate faults, which tests failed, and the final restored run. Optional coverage is diagnostic only, with no percentage target.

### 5. Week 5 — Integrate a local runnable example

- Outcome link: Make the service easy to invoke on Windows and give another person a reproducible way to run its tests.
- Prerequisites: Week 4 service and trustworthy suite.
- Resources: [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) — solution/project structure and repeatable test run; [`dotnet test`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) — command behavior and invocation from the solution; [Install .NET on Windows](https://learn.microsoft.com/en-us/dotnet/core/install/windows) — SDK prerequisite for a Windows README.
- Schedule: 0.5 h to choose and document one invented sample input; 1.5 h for a minimal console entry point that calls the service and prints its quote breakdown; 1 h for a README with SDK check, local run, and test commands and a successful run of both commands. **3 h total.**
- Deliverable: Source, xUnit tests, a console sample that calls the same service logic, and a README with working `dotnet run` and `dotnet test` instructions for Windows.

### 6. Week 6 — Final behavior review and reproducible handoff

- Outcome link: Complete the small service with automated tests the learner can run locally and explain as useful.
- Prerequisites: Week 5 runnable sample and documented commands.
- Resources: [Unit testing best practices for .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — final behavior, isolation, and clarity review; [`dotnet test`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test) — final local test run; [Unit testing C# in .NET using dotnet test and xUnit](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit) — troubleshooting the xUnit project loop if needed.
- Schedule: 0.75 h to compare tests with the written rule table and fill any uncovered behavior; 1.5 h for a fresh local build/run/test from the solution folder and targeted fixes; 0.75 h to record final commands, test results, and what each key test protects. **3 h total.**
- Deliverable: A locally runnable checkout quote service, a passing xUnit suite covering discount threshold, delivery threshold, nonmember behavior, and invalid input, plus reproducible Windows commands and a concise explanation of why those tests matter.

## Limitations

- The checkout domain and rules are a proposed toy project, not requirements supplied by the learner; the practice and draft should preserve this status and can swap the domain if the learner requests it during review while retaining the same testing progression.
- The learner's installed SDK and package restore access are unverified. Week 1 includes a setup check; its reserved time may need adjustment if installation is unusually difficult, without exceeding three hours in that week.
- The short diagnosis did not measure compilation, xUnit syntax, or test-running fluency. Week 1 verifies these before later work depends on them.
