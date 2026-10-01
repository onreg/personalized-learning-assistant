# Learning resources

Run ID: csharp-unit-testing-2026-09-30
Artifact type: resources
Revision: v01
Status: proposed
Inputs: runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md

## Purpose

Find free English material for a learner who has written some C# but whose test-design starting level is still uncertain. The confirmed outcome is a small .NET service with meaningful automated tests runnable locally on Windows. The time limit is three hours per week for six weeks (18 hours total). These are selected page sections and reference pages, not a requirement to read every article end to end; milestone placement awaits the short assessment.

## Evidence

- Confirmed input: `runs/csharp-unit-testing-2026-09-30/requirements-brief-v02.md`, which records the learner's 2026-09-30 confirmation of v01 and their request to assess before placing milestones.
- Web search on 2026-09-30 used queries for Microsoft Learn xUnit setup, unit-testing best practices, `dotnet test`, Windows SDK installation, dependency injection, code coverage, and a short C# methods refresher. The resource pages below were then **opened individually**; the observed topics are from their article bodies, not search snippets.
- The configured `learning_resources.inspect_learning_page` tool was called on each recommended URL on 2026-09-30. Its distinct contribution was a live fetch result for each page: HTTP 200, page title, description, and a UTC check time. It did not inspect tutorial steps or judge teaching quality; the web-opened article bodies supplied those observations.
- Each recommended page's body was available in English without a payment step during this check. This establishes public page access, not a guarantee that the learner's machine already has the SDK or restored NuGet packages.

## Recommended resources

### Install .NET on Windows (setup reference)

- Source: [Install .NET on Windows — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/install/windows)
- What it covers: Distinguishes SDK from runtime, lists Windows installation routes including installer, WinGet, and PowerShell, and explains that the SDK is used to create apps. [Source](https://learn.microsoft.com/en-us/dotnet/core/install/windows)
- Relevance: Use only the SDK installation and validation sections if `dotnet` is not already available locally; there is no need to study the full installation matrix. The page fits the Windows and local-run constraints.
- Evidence route: Web search found the page and a web open exposed the installation article body. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:22Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### Unit testing C# in .NET using dotnet test and xUnit (hands-on core)

- Source: [Unit testing C# in .NET using dotnet test and xUnit — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit)
- What it covers: Builds a source project and separate xUnit test project; creates a failing `[Fact]`, runs `dotnet test`, and uses `[Theory]` with `[InlineData]` for multiple cases. It includes a Windows command sequence. [Source](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit)
- Relevance: Gives a compact, locally executable first test loop. Its PrimeService is a practice example; the final service can use a different domain after diagnosis.
- Evidence route: Web search located the tutorial and a web open exposed its project and test steps. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:15Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### Unit testing best practices for .NET (test-design guide)

- Source: [Unit testing best practices for .NET — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
- What it covers: Describes fast, isolated, repeatable, self-checking tests; gives examples of behavior-revealing names, Arrange–Act–Assert, minimal inputs, avoiding infrastructure in unit tests, and cautions that coverage percentage does not establish test quality. [Source](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
- Relevance: Directly addresses the learner's uncertainty about what makes a test useful. Focused sections can guide case selection and review of the final service tests within the 18-hour budget.
- Evidence route: Web search located the article and a web open exposed its advice and examples. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:11Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### Dependency injection guidelines (selective service-design reference)

- Source: [Dependency injection guidelines — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines)
- What it covers: Advises against constructing dependent classes inside services and recommends small, easily tested services. [Source](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines)
- Relevance: The “Design services for dependency injection” section can help the learner create one testable boundary for a small service when it has an external dependency. The container and lifetime details are outside the core unit-testing goal.
- Evidence route: Web search found the page and a web open exposed the service-design guidance. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:26Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### dotnet test command (local execution reference)

- Source: [dotnet test — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test)
- What it covers: Defines `dotnet test` as the CLI driver that builds and runs tests and explains that options depend on the selected runner; it identifies VSTest as the current default and describes MTP selection in .NET 10 and later. [Source](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test)
- Relevance: A concise reference when documenting how to rerun the completed test suite locally. The xUnit tutorial supplies the first command, so this page need not be read in full.
- Evidence route: Web search located the CLI reference and a web open exposed the current runner behavior. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:18Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### Write your first C# method (conditional refresher)

- Source: [Write your first C# method — Microsoft Learn Training](https://learn.microsoft.com/en-us/training/modules/write-first-c-sharp-method/)
- What it covers: A beginner module on method syntax, extracting reusable tasks, and organizing code into methods. The page lists prerequisites including variables, types, conditionals, loops, and VS Code use. [Source](https://learn.microsoft.com/en-us/training/modules/write-first-c-sharp-method/)
- Relevance: Use only if the starting-level assessment finds that method structure is a blocker. It is a narrow repair path, not a presumed prerequisite or an added milestone.
- Evidence route: Web search found the module and a web open exposed objectives and prerequisites. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:58Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

### Use code coverage for unit testing (optional diagnostic reference)

- Source: [Use code coverage for unit testing — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage)
- What it covers: Explains line and branch coverage and shows Coverlet collection with `dotnet test --collect:"XPlat Code Coverage"`; the xUnit test template includes the collector. [Source](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage)
- Relevance: A selective tool for finding unexercised branches after behavior-focused tests exist. Use only if there is time; coverage percentage alone is not a quality target, per the [best-practices page](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices).
- Evidence route: Web search located the page and a web open exposed its collector example. The MCP page inspector separately returned HTTP 200, title, and description at 2026-09-30T17:03:08Z.
- Page check: 2026-09-30; direct web open succeeded and MCP fetch returned HTTP 200.

## Missing or unusable sources

- [Unit test controller logic in ASP.NET Core — Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/testing?view=aspnetcore-10.0): Opened on 2026-09-30 and excluded from the core set. Its substantial MVC controller, model-state, and Moq examples assume a web-controller design that the learner has not chosen and would add scope to a six-week introductory unit-testing run.
- No paywalled or failed-fetch candidate is included as a recommendation.

## Limitations

- The starting-level assessment is unanswered. The conditional C# refresher and the depth of dependency-boundary work must be decided after diagnosis; this artifact places no milestones.
- The service domain, .NET version, and test framework are not specified by the confirmed brief. The xUnit tutorial is a verified resource option, not a final framework decision. Confirm the learner's installed SDK before following version-specific commands.
- The web reader displayed a generic authorization notice in the chrome of several Microsoft Learn pages, but their article bodies loaded and the MCP inspector returned HTTP 200 for every recommended page. This check does not establish that every embedded interactive feature works without sign-in.
