# Learning practice and assessment

Run ID: python-csv-cleaning-2026-09-30
Artifact type: practice
Revision: v01
Status: proposed
Inputs: runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md; runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md; runs/python-csv-cleaning-2026-09-30/learning-sequence-v01.md

## Purpose

Give the learner one observable exercise per weekly milestone, moving from pandas CSV inspection through rule selection and a repeatable cleaner to checks of its saved real output. The exercises start with invented records, so practice and any shared evidence are safe even if the learner's eventual real CSV is private. The real CSV and its rules remain the learner's choices after inspection. No exercise is reported as completed.

## Evidence

- The confirmed starting point, Windows environment, four hours per week for four weeks, free English-language resources, and final script outcome come from `runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md` (confirmed).
- The checked resource inventory is `runs/python-csv-cleaning-2026-09-30/learning-resources-v01.md`; its source-page-checks and resource-fit gates pass in `runs/python-csv-cleaning-2026-09-30/workflow-state.json`.
- The four matching milestones, prerequisites, deliverables, and weekly time allocations come from `runs/python-csv-cleaning-2026-09-30/learning-sequence-v01.md`; all four sequence gates pass in `workflow-state.json`. Diagnosis was omitted by `execution-plan-v01.md`.
- These are original exercises. The fictional CSV values and expected results below are task data, not claims about the learner's real CSV. The source pages used for learning are linked beside each milestone in the sequence.

External sources: none.

## Milestone practice

### 1. Week 1 — Set up, read, and inspect a small CSV

- Exercise: Create `csv-practice/data/sample-messy.csv` with this entirely fictional content (including the spaces around `Ada`):

  ```csv
  row_id,label,quantity
  1," Ada ",2
  2,,oops
  2,Bo,3
  2," Bea ",4
  3,Cy,bad
  ```

  In `csv-practice/inspect.py`, read it with pandas and print `columns`, `head()`, `dtypes`, and `info()` or equivalent missing-value counts. Before running, write down the predicted row count, columns, and which field appears missing. Keep a short note of the Windows Python/environment commands used.
- Expected evidence: The CSV, an inspection script that runs in the project environment, console output, and a note comparing the prediction with the observed result. The output should show five rows, columns `row_id`, `label`, `quantity`, one missing `label`, and a nonnumeric `quantity` column because it contains `oops` and `bad`.
- Progress check: Rerun the script from the documented environment; compare the printed row count and missing-value result with the CSV text, and explain why `quantity` is not a clean numeric column.
- Pass criterion: The script reads the file without an error and identifies all three column names, the five rows, the missing label, and the suspect quantity type. The setup and run commands are recorded sufficiently to repeat the inspection.
- If missed: Recreate the exact five-row file, repeat the `read_csv` and inspection examples linked in week 1 of the sequence, then rerun and reconcile one observation at a time.
- Time: 1.5 hours of week 1 practice plus 0.5 hour of capstone integration for commands/notes = **2 hours within its 4 hours**; the other 2 hours remain the sequence's setup and reading time.

### 2. Week 2 — Choose the real CSV and write its cleaning rules

- Exercise: On the fictional CSV from week 1, use column and conditional row selection to identify the blank `label`, repeated `row_id` value, spaces around `Ada` and `Bea`, and `oops`/`bad` in `quantity`. In a separate scratch copy, try `str.strip`, missing-value detection, `duplicated(subset=["row_id"])`, and numeric conversion, recording each before/after observation. These are *fictional practice rules*, not assumed rules for the real file. Then select one local real CSV, inspect its columns, row count, types, missing values, and candidate duplicates, and write a rule sheet: for each issue actually present, name the target, intended change, and corresponding output check. Record absent issue types as “no rule needed.” Keep its raw file unchanged and separate from the proposed output path.
- Expected evidence: A small scratch script or notebook printout that locates the fictional problems, plus a local real-file inventory and rule sheet. The fictional inspection should identify the blank label on the first `row_id` 2 row, three rows with `row_id` 2, and `oops`/`bad` as values needing an explicit numeric policy if quantity must be numeric. The real-file inventory need not be shared if private; a fictionalized summary can demonstrate the method.
- Progress check: Compare each fictional finding against the five raw rows. For the real file, check that every proposed rule is tied to an observed example or count and that every rule has a testable expected property; review that no raw input was overwritten.
- Pass criterion: All four fictional issues are located; the real inventory includes columns, row count, type concerns, missing-value counts, and candidate duplicate keys or an explicit “none observed”; each selected real-file rule has an affected field/condition, expected change, and output check. The raw and output paths differ.
- If missed: Revisit only the relevant week 2 selection or cleaning reference, rerun that one operation on the fictional rows, and re-inspect the real column before deciding its rule. If duplicate identity is ambiguous, leave it unresolved rather than deleting rows.
- Time: 1.25 hours of week 2 practice on fictional rows plus 1.5 hours of capstone integration for the real-file inventory/rule sheet = **2.75 hours within its 4 hours**; 1.25 hours remains for focused reading.

### 3. Week 3 — Build the repeatable cleaning script

- Exercise: Implement a small cleaning function or equivalent reusable step sequence. First run it on a *copy* of the fictional CSV with explicit practice rules in this order: strip `label`, convert `quantity` with `errors="coerce"`, drop rows with missing `label`, and treat repeated `row_id` as duplicates keeping the last occurrence. Then apply only the separately justified week 2 rule sheet to the chosen real CSV. The script reads the unchanged raw file, writes a different cleaned CSV with no accidental index column, and records the Windows environment, dependency, input, output, and run commands.
- Expected evidence: A script and a fictional cleaned file with header `row_id,label,quantity` and data rows for `1,Ada,2`, `2,Bea,4`, and `3,Cy,<missing>`. Pandas may serialize the valid quantities as `2.0` and `4.0` after coercion creates a missing numeric value, so compare numeric values after rereading rather than requiring integer-looking CSV text. The five input rows cause each fictional rule to have a visible effect: `oops` becomes missing before its row is dropped, `bad` becomes missing and remains visible in the saved result, and the `Bo` row is removed by the duplicate rule. A separate real cleaned file and command log show the actual chosen rules were applied without replacing the raw file.
- Progress check: Inspect the fictional saved CSV text and reread it to check its header and three rows, including the missing `quantity` for `Cy`. Run the real-file path twice from the documented raw input and verify the script exits successfully and writes its expected output path both times; compare its observed columns and selected rule effects with the rule sheet.
- Pass criterion: The fictional output matches the stated header and three rows; the real script runs twice from the raw input without manual edits, writes to a separate path with no extra index column, and every real cleaning step maps to a week 2 rule. Documented commands identify how to invoke the project environment and script.
- If missed: Reduce the script to one transformation on the fictional copy, inspect its before/after rows, fix the first mismatch, and only then restore the remaining steps and retry the real run.
- Time: 1.25 hours of week 3 practice on fictional rows plus 2 hours of capstone integration for the real script/reruns = **3.25 hours within its 4 hours**; 0.75 hour remains for reference reading.

### 4. Week 4 — Check the saved output and repeat the run

- Exercise: Build a tiny **fictional** known-input/expected-output fixture using the *same columns and rules as the selected real CSV*, with invented values and at least one row that exercises each selected rule. Write the expected cleaned rows independently before running the script; use the same transformation on the fixture and compare actual with expected, for example with `assert_frame_equal` after accounting for explicitly expected types. For the real CSV, rerun from the unchanged raw input, reread the **saved** cleaned file, and assert expected columns plus each applicable rule-specific property from the week 2 sheet. Run the documented commands a second time and compare both saved outputs, or their hashes, to check repeatability. The week 3 `row_id,label,quantity` fictional example can be reused only if its rules genuinely match the real cleaner; otherwise adapt the fixture to the real rule sheet.
- Expected evidence: A fictional input of a few rows, a separately written expected output, a passing comparison or a precise mismatch to fix, and a check script or assertion block that rereads the saved real output. A run log records both real runs and a matching output comparison. The real data and expected real output values need not be shared.
- Progress check: Intentionally perturb one expected fictional value or one rule-specific assertion and observe a failing check, then restore it; this confirms the checks can catch an error. Verify the final checks run on the reread file rather than only the in-memory DataFrame. Compare the real saved output after two runs from the same raw input.
- Pass criterion: The fictional actual output exactly matches its independently written expected rows and each selected cleaning rule is exercised; the deliberate perturbation fails and the corrected check passes; the saved real CSV is reread, has the expected columns, satisfies every applicable rule-specific assertion, and is identical across two documented reruns from the unchanged raw file. The learner can explain at least one observed change per selected rule.
- If missed: Start with a one-rule fictional fixture, compare the first differing row/value, repair the cleaning step or expectation against the rule sheet, then expand the fixture and rerun saved-file assertions. If two real outputs differ, inspect ordering and unstable inputs before claiming reproducibility.
- Time: 1 hour of week 4 practice for the fictional fixture plus 2.5 hours of capstone integration for saved real-output checks and reruns = **3.5 hours within its 4 hours**; 0.5 hour remains for focused reading.

## Limitations

- The learner has not supplied the real CSV, its sensitivity, or its cleaning rules. The week 2–4 real-file checks are conditional on that inspection; fictional examples must not be applied mechanically to it.
- The learner has not attempted these exercises, so no completion, proficiency, or passing result is claimed.
- Actual setup and rule complexity may vary; if a selected file needs more work than the four-week budget permits, use a smaller representative CSV or narrower justified rule set while retaining a real raw input and saved-output checks.
