# Personalized learning plan

Run ID: python-csv-cleaning-2026-09-30
Artifact type: final
Revision: v01
Status: approved
Inputs: runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md; runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md; runs/python-csv-cleaning-2026-09-30/learning-sequence-v01.md; runs/python-csv-cleaning-2026-09-30/learning-practice-v01.md

## Purpose

In four weeks, learn enough Python for small-project CSV cleaning and finish with a reproducible script that cleans **one real CSV** and checks the **saved output**. Begin with a small fictional file, choose the real file and its rules after inspection, then implement and verify those rules. Pandas is the teaching route chosen for this plan, not a requirement added to the confirmed brief.

## Evidence

- `runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md` is the confirmed brief. It records the learner's explicit confirmation of v01 and fixes the goal, starting point, time, Windows setting, free English-language resources, and intended outcome.
- `runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md` is the checked resource inventory. Its official source pages were opened and its resource gates passed. The [Microsoft Windows Python guide](https://learn.microsoft.com/en-us/windows/dev-environment/python) and [Python `venv` documentation](https://docs.python.org/3/library/venv.html) support setup; the [pandas getting-started page](https://pandas.pydata.org/docs/getting_started/) gives the installation route. The pandas pages linked within each week support that week's operations.
- `runs/python-csv-cleaning-2026-09-30/learning-sequence-v01.md` supplies the passing prerequisite order and 16-hour schedule. `runs/python-csv-cleaning-2026-09-30/learning-practice-v01.md` supplies the passing exercises, evidence, checks, recovery steps, and matching time allocations. `runs/python-csv-cleaning-2026-09-30/execution-plan-v01.md` omits a separate diagnosis because the stated Python starting level is specific enough; week 1 includes a self-check instead.

## Goal and starting point

You already know basic Python variables, loops, and functions and have **not used pandas**. Work on Windows with free English-language resources. The final observable result is a script with documented setup and run commands that reads an unchanged real CSV, writes a separate cleaned CSV, rereads that saved file, and checks its output against the rules chosen from inspection. Keep any private real data local; the shared practice examples use invented rows.

## Schedule

Study **4 hours per week for 4 weeks, 16 hours total**. Focus on the linked sections needed for that week's work rather than reading entire reference guides. These are planning estimates; shift time within a week if setup or the chosen file needs it while keeping the four-hour weekly limit.

| Week | Setup | Focused reading | Practice | Capstone integration | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1. Set up and inspect | 1 h | 1 h | 1.5 h | 0.5 h | **4 h** |
| 2. Choose and specify rules | 0 h | 1.25 h | 1.25 h | 1.5 h | **4 h** |
| 3. Write the cleaner | 0 h | 0.75 h | 1.25 h | 2 h | **4 h** |
| 4. Verify and rerun | 0 h | 0.5 h | 1 h | 2.5 h | **4 h** |
| **Total** | **1 h** | **3.5 h** | **5 h** | **6.5 h** | **16 h** |

The paths under `csv-practice/` below are proposed files for your own practice project, not files already created by this learning run.

## Milestones

### 1. Week 1 — Set up, read, and inspect a small CSV

- **Outcome link:** Establish a repeatable Windows environment and learn to observe a table's rows, columns, missing entries, and types before changing it.
- **Prerequisites:** Your stated variables, loops, and functions knowledge; no pandas experience assumed. A separate starting-level diagnosis is omitted. Use the inspection self-check below before moving to week 2.
- **Resources:** Use the [Microsoft Windows Python guide](https://learn.microsoft.com/en-us/windows/dev-environment/python) to check your Python command and [Python `venv` documentation](https://docs.python.org/3/library/venv.html) to create and use a project environment. Use [pandas getting started](https://pandas.pydata.org/docs/getting_started/) for installation, [its table tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html) for DataFrames and columns, and [its CSV tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) for `read_csv`, initial rows, types, and `info()`.
- **Schedule:** 1 h setup, 1 h focused reading and examples, 1.5 h fictional-file practice, 0.5 h recording commands and observations = **4 h**. The exercise and command record use **2 h** of this allocation.
- **Deliverable and exercise:** Create `csv-practice/data/sample-messy.csv` with the five invented rows below. Before running code, predict its row count, columns, and missing field. Write `csv-practice/inspect.py` to read it and print columns, `head()`, `dtypes`, and `info()` or missing-value counts. Record the Windows Python, environment, and run commands.

  ```csv
  row_id,label,quantity
  1," Ada ",2
  2,,oops
  2,Bo,3
  2," Bea ",4
  3,Cy,bad
  ```

- **Expected evidence:** The fictional CSV, runnable inspection script, console output, and a note comparing prediction with observation. The output identifies five rows, columns `row_id`, `label`, `quantity`, one missing `label`, and a suspect nonnumeric `quantity` column due to `oops` and `bad`.
- **Pass criterion:** Rerun from the recorded environment without error; identify all three names, five rows, missing label, and quantity type concern, and explain them against the CSV text.
- **If missed:** Recreate the exact five-row file, repeat the linked CSV tutorial's import and inspection examples, and reconcile one observation at a time before proceeding.

### 2. Week 2 — Choose the real CSV and write its cleaning rules

- **Outcome link:** Turn one actual small-project file into a bounded, testable set of transformations. The real file, its defects, and the cleaning rules are still unknown.
- **Prerequisites:** Week 1 environment and self-check: you can read a CSV and inspect a DataFrame's columns, rows, missing values, and types.
- **Resources:** Use the [pandas subset tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html) for conditional selection; the [text tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/10_text_data.html) and [`Series.str.strip` reference](https://pandas.pydata.org/docs/reference/api/pandas.Series.str.strip.html) if text needs trimming; the [missing-data guide](https://pandas.pydata.org/docs/user_guide/missing_data.html) if blanks matter; [`drop_duplicates`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html) if a justified duplicate key exists; and [`to_numeric`](https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html) only if numeric text requires conversion. Read the portions matching observed issues.
- **Schedule:** 1.25 h focused reading, 1.25 h fictional transformations, 1.5 h real-file inventory and rules = **4 h**. The exercise uses **2.75 h** of this allocation.
- **Deliverable and exercise:** On week 1's fictional rows, locate the blank `label`, repeated `row_id`, spaces around `Ada` and `Bea`, and `oops`/`bad` in `quantity`. On a scratch copy, try stripping, missing-value detection, `duplicated(subset=["row_id"])`, and numeric conversion; record before/after effects. Then select one local real CSV and inventory its columns, row count, suspected types, missing values, and candidate duplicate keys. For each real-file rule, write its target or condition, intended change, and saved-output check. Record absent issue types as “no rule needed.” Keep raw and output paths distinct; leave the raw input unchanged. If the real file is private, keep it local and share only a fictionalized summary.
- **Expected evidence:** A fictional scratch script or printout and a real-file inventory plus rule sheet. The fictional inspection finds the missing label on the first `row_id` 2 row, three rows with `row_id` 2, and two invalid numeric-looking values. The real inventory ties each proposed rule to an observed example or count.
- **Pass criterion:** Locate all four fictional issue types. Record real columns, row count, type concerns, missing counts, and candidate duplicate keys or “none observed”; give every selected rule a target, expected change, and output check; verify the raw and output paths differ.
- **If missed:** Revisit only the relevant linked reference, retry that one operation on fictional rows, and re-inspect the real column. If duplicate identity is ambiguous, leave deletion unresolved until its key can be justified.

### 3. Week 3 — Build the repeatable cleaning script

- **Outcome link:** Make the observed, justified rules repeatable in one script that reads the same unchanged raw file and writes a separate cleaned file.
- **Prerequisites:** Week 2 inventory, rule sheet, and ability to select and transform relevant rows or columns.
- **Resources:** Revisit the [pandas CSV reading tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) for input, [Python `venv`](https://docs.python.org/3/library/venv.html) for the project environment, and [`DataFrame.to_csv`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html) for a distinct output path with `index=False`. Reopen only the week 2 cleaning references for rules actually chosen.
- **Schedule:** 0.75 h targeted reading, 1.25 h fictional rule practice, 2 h real script and command record = **4 h**. The exercise and real-file integration use **3.25 h**.
- **Deliverable and exercise:** Write a cleaning function or ordered step sequence. First run it on a copy of the fictional CSV with explicit *practice* rules: strip `label`, convert `quantity` with `errors="coerce"`, drop missing `label`, then treat repeated `row_id` as duplicates keeping the last. Separately apply **only** week 2's justified rules to the real CSV. Document the Windows environment, pandas dependency, raw input path, separate output path, and commands to set up and run the script. Use `index=False` so the CSV has no unintended index column. [The `to_csv` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html) documents that export option.
- **Expected evidence:** A script; a fictional saved CSV with header `row_id,label,quantity` and rows equivalent to `1,Ada,2`, `2,Bea,4`, and `3,Cy,<missing>`; a separate real cleaned CSV; and a command log. Numeric serialization may show `2.0` and `4.0` after coercion, so compare parsed values rather than requiring integer-looking text. The fictional `oops` becomes missing before its row is dropped, `bad` becomes missing and remains in `Cy`'s row, and the `Bo` row is removed by the stated duplicate rule.
- **Pass criterion:** Reread the fictional saved CSV and confirm its header and three expected rows. Run the real script **twice** from unchanged raw input without manual edits; it writes the separate expected path, adds no index column, and every real transformation maps to a week 2 rule. The recorded commands let you repeat the runs.
- **If missed:** Reduce the fictional script to one transformation, inspect before and after, repair the first mismatch, restore the remaining steps, then retry the real run.

### 4. Week 4 — Check the saved output and repeat the run

- **Outcome link:** Prove the final real CSV reflects the selected rules and that the script can reproduce it from the unchanged input.
- **Prerequisites:** Week 3 running script, unchanged real raw CSV, and week 2 rule sheet.
- **Resources:** Use [`pandas.testing.assert_frame_equal`](https://pandas.pydata.org/docs/reference/api/pandas.testing.assert_frame_equal.html) for a small known-input comparison, the [`to_csv` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html) for saved output, and the [pandas CSV tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) to reread it. Consult the [missing-data guide](https://pandas.pydata.org/docs/user_guide/missing_data.html) or [`drop_duplicates` reference](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html) only if the real rule sheet selected those operations.
- **Schedule:** 0.5 h focused reading, 1 h fictional fixture, 2.5 h saved real-output checks and reruns = **4 h**. The exercise and integration use **3.5 h**.
- **Deliverable and exercise:** Create a tiny **fictional known-input fixture** with the same columns and rules as the selected real file and at least one row exercising each selected rule. Write its expected cleaned rows independently before running the cleaner; compare actual with expected, accounting only for explicitly expected type differences. Reuse week 3's fictional fixture only if its rules genuinely match the real cleaner. Then run the real script from unchanged raw input, **reread the saved real CSV**, and assert expected columns **and every selected cleaning rule's output property** from week 2. For example, assert no missing values in a required field only if that was a chosen rule; assert unique keys only if the key and duplicate rule were chosen. Run the documented commands again and compare the two saved real outputs or their hashes.
- **Expected evidence:** Fictional input and independently written expected output, passing comparison, a check script or assertion block that rereads the saved real file, and a run log showing two real runs with matching outputs. Real data and expected real values need not be shared.
- **Pass criterion:** The fictional actual rows match expected rows and each selected rule is exercised. Deliberately perturb one expected fictional value or rule assertion and see a failure, restore it and see a pass. The reread real output has the expected columns and passes **each** applicable rule-specific assertion; two runs from unchanged raw input produce identical saved output. Explain at least one observed change per selected rule.
- **If missed:** Start with a one-rule fictional fixture, compare the first differing row or value, repair the cleaner or expected result against the rule sheet, then expand and rerun saved-file checks. If the real outputs differ across runs, inspect ordering and unstable inputs before claiming reproducibility.

## Limitations

- The real CSV, its privacy level, encoding, dialect, size, expected columns, and justified cleaning rules have not been supplied. Week 2 determines them; the fictional operations above are practice, not assumptions about that file.
- This is an approved learning plan. The learner has not attempted or passed its exercises, and no real script or cleaned file is claimed to exist yet.
- Windows installation time and actual file complexity may vary. If the selected file exceeds the 16-hour scope, choose a smaller representative real CSV or a narrower justified rule set while retaining an unchanged raw input and saved-output checks.
- The linked documentation is free English-language material checked for the resource artifact on 2026-09-30. Pandas documentation and supported versions can change; confirm installation and example behavior in the week 1 environment.
