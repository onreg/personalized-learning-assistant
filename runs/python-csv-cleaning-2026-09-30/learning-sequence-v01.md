# Learning sequence

Run ID: python-csv-cleaning-2026-09-30

Artifact type: sequence

Revision: v01

Status: proposed

Inputs: runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md; runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md

## Purpose

Move from basic Python variables, loops, and functions with no pandas experience to a reproducible script that cleans one real CSV and checks its saved output. Four prerequisite-ordered weekly milestones use 16 hours total on Windows. The learner chooses the real CSV after learning to inspect a small fictional one; its cleaning rules are based on observed problems.

## Evidence

- `runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md` is the confirmed source for the goal, starting point, Windows and free English-language constraints, four hours per week for four weeks, and final outcome. Its `brief-completeness` and `confirmation-fidelity` gates pass in `workflow-state.json`.
- `runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md` is the checked source inventory. Its `source-page-checks` and `resource-fit` gates pass in `workflow-state.json`. The linked official pages below are those it checked. Pandas is a sequence choice for table-shaped cleaning, not a requirement added to the brief.
- [Microsoft's Windows Python setup guide](https://learn.microsoft.com/en-us/windows/dev-environment/python) covers checking Python on Windows; [Python's `venv` documentation](https://docs.python.org/3/library/venv.html) covers project environments and their Windows use. [Pandas' introductory table tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html) starts with DataFrames and columns, and the [getting-started page](https://pandas.pydata.org/docs/getting_started/) gives the installation command. These support a short setup and orientation before CSV work.

## Starting point and prerequisites

The learner already knows variables, loops, and functions. They first need a working Python command and isolated project environment, then a basic mental model of a DataFrame, CSV input and inspection, conditional row/column operations, and only then cleaning rules for a selected real file. Writing a separate cleaned CSV precedes rereading and checking it. [Pandas' CSV tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) demonstrates reading and inspecting columns and types; its [subset tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html) introduces conditional selection. The execution plan omits a separate diagnosis because the confirmed starting level is specific enough. A week 1 self-check provides a chance to revisit the introductory examples if needed.

## Schedule

Four weeks at four hours per week: **16 hours total**. Each week includes focused reading, hands-on practice, and work toward the capstone; setup is included in week 1. Time allocations are planning estimates and can shift within a week while preserving its four-hour budget.

| Milestone | Setup | Focused reading | Practice | Capstone integration | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Week 1: set up and inspect | 1 h | 1 h | 1.5 h | 0.5 h | 4 h |
| Week 2: select and specify | 0 h | 1.25 h | 1.25 h | 1.5 h | 4 h |
| Week 3: write the cleaner | 0 h | 0.75 h | 1.25 h | 2 h | 4 h |
| Week 4: verify and rerun | 0 h | 0.5 h | 1 h | 2.5 h | 4 h |
| **Total** | **1 h** | **3.5 h** | **5 h** | **6.5 h** | **16 h** |

## Milestones

### 1. Week 1 — Set up, read, and inspect a small CSV

- Outcome link: Establish a repeatable Windows environment and learn to see rows, columns, missing entries, and column types before changing data.
- Prerequisites: The stated basic Python knowledge; no pandas knowledge assumed.
- Resources: [Microsoft Windows Python setup](https://learn.microsoft.com/en-us/windows/dev-environment/python) for checking the Python command; [Python `venv`](https://docs.python.org/3/library/venv.html) for a local environment; [pandas getting started](https://pandas.pydata.org/docs/getting_started/) for installation; [the pandas table tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html) for DataFrames and columns; [the pandas CSV tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) for `read_csv`, initial rows, types, and `info()`.
- Schedule: 1 hour setup and installation, 1 hour focused reading and trying examples, 1.5 hours making and inspecting a small fictional CSV, 0.5 hour capturing commands and observations for later reruns; **4 hours**.
- Deliverable: A small fictional practice CSV at `csv-practice/data/sample-messy.csv` and a runnable inspection script at `csv-practice/inspect.py` that reads it and prints the column names, a few rows, and data types. These are proposed paths for the learner's practice project, not existing run artifacts. A short note records the Python command, environment setup command, and one observation the inspection revealed. If any of these are unfamiliar, repeat the cited CSV tutorial example before moving on.

### 2. Week 2 — Choose the real CSV and write its cleaning rules

- Outcome link: Turn an actual small-project file into an explicit input and a bounded set of defensible transformations instead of guessing what “clean” means.
- Prerequisites: Week 1 environment, DataFrame concept, and ability to inspect a CSV.
- Resources: [Pandas' subset tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html) for column and conditional row selection; [text tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/10_text_data.html) and [`str.strip` reference](https://pandas.pydata.org/docs/reference/api/pandas.Series.str.strip.html) for relevant text columns; [missing-data guide](https://pandas.pydata.org/docs/user_guide/missing_data.html) for detecting, dropping, or filling missing values; [`drop_duplicates` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html) for duplicate keys; [`to_numeric` reference](https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html) only if numeric values are stored as text.
- Schedule: 1.25 hours focused reading of the portions matching observed problems, 1.25 hours trying two or three tiny fictional transformations and checking their effects, 1.5 hours selecting and inventorying one real CSV and documenting its rules; **4 hours**.
- Deliverable: An inventory of the selected real CSV's columns, row count, suspected types, missing values, and possible duplicates, plus a short rule sheet. For each proposed rule, record the affected column or row condition, expected change, and how to check it. Choose only rules justified by the file; explicitly record issues not present as “no rule needed.” Keep the real input separate and unchanged, for example as `csv-practice/data/raw/selected.csv`, with a distinct cleaned output path. If the file is private, use fictional rows for shared examples and keep the real data local.

### 3. Week 3 — Build the repeatable cleaning script

- Outcome link: Put the observed rules into one script that can read the same raw CSV and write a separate clean CSV again.
- Prerequisites: Week 2 real-file inventory and rule sheet; familiarity with selecting and transforming only relevant data.
- Resources: [Pandas CSV reading tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) for input and inspection; [Python `venv`](https://docs.python.org/3/library/venv.html) for invoking the project environment; [`DataFrame.to_csv` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html) for an explicit output path and `index=False`. Revisit only the week 2 cleaning references that match the chosen rules.
- Schedule: 0.75 hour focused reference reading, 1.25 hours implementing and trying individual rules against fictional rows, 2 hours assembling and running the script on the real CSV and documenting input/output paths and environment steps; **4 hours**.
- Deliverable: A Python script with an identifiable input CSV path, ordered cleaning steps justified by the rule sheet, and a separate output CSV path. It runs from the documented Windows environment, produces a file with no unintended index column, and can be rerun from the unchanged raw input. Record the pandas dependency and a concise command sequence to recreate the environment and run it.

### 4. Week 4 — Check the saved output and repeat the run

- Outcome link: Complete the confirmed outcome by proving that the script's saved CSV reflects the chosen rules and can be reproduced.
- Prerequisites: A running week 3 script, unchanged real input, and an explicit rule sheet.
- Resources: [`pandas.testing.assert_frame_equal`](https://pandas.pydata.org/docs/reference/api/pandas.testing.assert_frame_equal.html) for comparing one small known-input fictional fixture with its expected result; [`DataFrame.to_csv`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html) for the saved file; [pandas' CSV reading tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) for rereading and inspecting that file. Revisit the [missing-data guide](https://pandas.pydata.org/docs/user_guide/missing_data.html) or [`drop_duplicates` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html) only when those rules were selected.
- Schedule: 0.5 hour focused reading, 1 hour building and checking a tiny fictional input/expected-output fixture, 2.5 hours adding checks for the saved real output, rerunning the documented commands, and reviewing the rule sheet against results; **4 hours**.
- Deliverable: The final reproducible script and its documented run commands; one real cleaned CSV produced from the original input; and checks that reread the saved output and assert its expected columns plus rule-specific conditions (for example, no blanks in a required field or no duplicate keys only if those rules were selected). A small fictional fixture has a stated expected output and a comparison check. The learner can rerun from the original input, observe all checks pass, and explain which rows or values each rule changed.

## Limitations

- The real CSV is not yet identified. Its actual cleaning rules, expected columns, row count, and suitable assertions must be chosen after week 2 inspection; the examples above do not presume any particular defect.
- Installation time depends on the learner's Windows setup. If setup consumes extra time, narrow week 1 toy-data practice while retaining the ability to read and inspect a CSV before week 2.
- The sequence teaches pandas as a pragmatic route from table inspection to CSV export. The confirmed brief did not require a specific library, and no claimed solution fits every CSV dialect or data size.
