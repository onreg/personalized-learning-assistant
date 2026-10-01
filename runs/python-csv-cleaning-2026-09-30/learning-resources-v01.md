# Learning resources

Run ID: python-csv-cleaning-2026-09-30
Artifact type: resources
Revision: v01
Status: proposed
Inputs: runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md

## Purpose

Support the confirmed goal: in four weeks at four hours per week, learn enough Python to clean one real CSV on Windows with a reproducible script and checks of its output. The learner knows variables, loops, and functions but has not used pandas. The proposed route teaches a small pandas workflow because its table operations directly cover inspection, cleaning, and CSV output. This is a teaching choice, not a new learner requirement; the confirmed brief leaves the library choice open. All recommended pages below were accessible as free English-language documentation on 2026-09-30.

## Evidence

- Confirmed learner input: `runs/python-csv-cleaning-2026-09-30/requirements-brief-v02.md`, including the exact confirmation of v01. The `brief-completeness` and `confirmation-fidelity` gates for v02 pass in `runs/python-csv-cleaning-2026-09-30/workflow-state.json`.
- Web search on 2026-09-30 used targeted queries for the official Python `csv` and `venv` docs, Microsoft Windows Python setup, and pandas getting-started, CSV input/output, missing values, duplicates, text cleaning, numeric conversion, and testing docs. Each recommended URL was then opened with the web tool; page content, not search snippets alone, supports the observations below.
- The configured `mcp__learning_resources__inspect_learning_page` checked the supported [Microsoft Windows Python page](https://learn.microsoft.com/en-us/windows/dev-environment/python) and [Python `venv` page](https://docs.python.org/3/library/venv.html) on 2026-09-30. It returned `fetched`, HTTP 200, title, and description for each. Its distinct contribution was a live fetch/status and metadata check. The web opens supplied the substantive page content. The MCP also fetched the [Python `csv` page](https://docs.python.org/3/library/csv.html), HTTP 200, for an excluded alternative below. The MCP allowlist does not cover `pandas.pydata.org`, so pandas content was checked by web opens only.
- Reading times mentioned below are planning estimates, not publisher claims. They mean focused reading and trying the cited examples, not completing all linked documentation.

## Recommended resources

### 1. Windows Python setup, if needed

- Source: [Set up your Python development environment on Windows — Microsoft Learn](https://learn.microsoft.com/en-us/windows/dev-environment/python)
- What it covers: PowerShell installation and `python --version` verification; a virtual environment tip for package installation; guidance on Windows file paths and `pathlib`.
- Relevance: Use only if Python or the command line needs setup, then use the path advice in the final script. Allow about 15 minutes if Python already runs, or reserve more of week 1 setup time if it does not. VS Code is presented there but is not required by the brief.
- Evidence route: Web search led to the page; web open exposed the setup steps and Windows path FAQ. The learning-resources MCP independently fetched the canonical URL with HTTP 200, title, and description.
- Page check: 2026-09-30, successful web open of the canonical page and successful MCP fetch.

### 2. Isolate the project environment

- Source: [Python `venv` documentation](https://docs.python.org/3/library/venv.html)
- What it covers: Create an isolated package environment; the page lists Windows PowerShell activation and says the environment's Python can be invoked directly without activation.
- Relevance: A local environment makes the pandas dependency easier to reproduce on Windows. Focus on creation and Windows use (about 20 minutes); the rest of the reference is unnecessary for this goal.
- Evidence route: Web search and successful web open supplied the Windows instructions. The learning-resources MCP independently returned HTTP 200 plus page title and description.
- Page check: 2026-09-30, successful web open and MCP fetch.

### 3. First pandas table and installation

- Source: [What kind of data does pandas handle? — pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html); companion [pandas getting-started page](https://pandas.pydata.org/docs/getting_started/)
- What it covers: A `DataFrame` as a table, a `Series` as one column, column selection, and small table operations. The companion page shows `pip install pandas`.
- Relevance: This starts at zero pandas knowledge while using familiar Python dictionaries and functions. Try the examples and install into the project's environment (about 30–40 minutes); avoid the unrelated plotting and database branches.
- Evidence route: Both official pages appeared in web search and were opened successfully. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, both pages successfully opened by web.

### 4. Read and inspect a CSV

- Source: [How do I read and write tabular data? — pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html)
- What it covers: `pd.read_csv`, checking initial rows, column types, and `DataFrame.info()` on a real Titanic CSV example. Its later export example uses Excel rather than CSV.
- Relevance: Read through the CSV import and inspection examples, then apply the same checks to a small practice file and later the learner's chosen CSV (about 25–30 minutes). Use the separate `to_csv` source for the capstone output.
- Evidence route: Found by web search and opened; the `read_csv`, type, and `info()` examples were visible. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 5. Select rows and columns deliberately

- Source: [How do I select a subset of a DataFrame? — pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html)
- What it covers: Selecting columns, filtering rows with conditions, and using `loc` for labeled selection and assignment.
- Relevance: These are prerequisites for applying a cleaning rule only where it belongs. Work the simplest selection and condition examples (about 25 minutes); advanced indexing can wait.
- Evidence route: Web search and successful web open showed conditional filtering and `loc`. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 6. Normalize text values

- Source: [How to manipulate textual data — pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/10_text_data.html); companion [`Series.str.strip` reference](https://pandas.pydata.org/docs/reference/api/pandas.Series.str.strip.html)
- What it covers: The tutorial applies `Series.str` methods element by element and shows value mapping with `replace`; the API page specifies leading/trailing whitespace removal and warns that non-string values become missing values.
- Relevance: Use only the string-accessor and replacement examples, then strip one text column if the actual CSV needs it (about 25 minutes). Inspect column types before string operations.
- Evidence route: The tutorial appeared in web search and both pages were opened successfully. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, both pages successfully opened by web.

### 7. Handle missing data with an explicit rule

- Source: [Working with missing data — pandas](https://pandas.pydata.org/docs/user_guide/missing_data.html)
- What it covers: Missing-value detection, `dropna()`, and `fillna()` examples.
- Relevance: Select a rule per relevant column instead of silently dropping every incomplete row. Read only the detection, dropping, and filling sections and try one example (about 25–35 minutes).
- Evidence route: Found by web search and opened successfully; dropping and filling examples were visible. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 8. Decide which duplicate rows to remove

- Source: [`DataFrame.drop_duplicates` reference — pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html)
- What it covers: Removing duplicate rows, optionally using a subset of columns and choosing which occurrence to keep.
- Relevance: This is a short targeted reference for a common messy-CSV issue. Define the duplicate key from the real CSV before applying it (about 15 minutes).
- Evidence route: Web search and successful web open exposed the parameter definitions and examples. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 9. Convert suspect numeric text

- Source: [`pandas.to_numeric` reference](https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html)
- What it covers: Converting values to numeric types; `errors="raise"` surfaces bad input and `errors="coerce"` turns invalid input into missing values.
- Relevance: Use only if the chosen CSV has numbers stored as text. Prefer an explicit policy for invalid values, and test it on a tiny fixture (about 15 minutes).
- Evidence route: Found by web search and opened successfully; both error modes were visible. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 10. Write the cleaned CSV

- Source: [`DataFrame.to_csv` reference — pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html)
- What it covers: Writing a CSV, output path, column selection, encoding, and `index=False`; an example writes a CSV without an index column.
- Relevance: Use `to_csv` to create a separate output file and reread it for checks, avoiding accidental extra index columns (about 15 minutes). The learner can keep the raw file as the repeatable input.
- Evidence route: The official API page was opened successfully by web and its parameters and example were visible. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

### 11. Compare expected and actual output

- Source: [`pandas.testing.assert_frame_equal` reference](https://pandas.pydata.org/docs/reference/api/pandas.testing.assert_frame_equal.html)
- What it covers: Comparing two DataFrames and reporting differences; the docs describe it as mainly intended for unit tests.
- Relevance: Use for one small known-input fixture and expected cleaned table, alongside simpler assertions on output columns, row count, missing values, and duplicates (about 20 minutes). Check the saved CSV after rereading it, not just the in-memory table.
- Evidence route: Found by web search and opened successfully; the purpose and unit-test use were visible. The learning-resources MCP does not support the pandas host.
- Page check: 2026-09-30, successful web open.

## Missing or unusable sources

- [Python `csv` module reference](https://docs.python.org/3/library/csv.html): Verified by web open and learning-resources MCP fetch (HTTP 200) on 2026-09-30. It documents `DictReader` and `DictWriter` and is a viable standard-library alternative. It is excluded from the focused recommended route because learning two cleaning APIs would split the 16-hour practice budget; return to it only if installing pandas is impractical or the chosen CSV needs explicit dialect handling.
- No failed fetches or paywalled pages were used as recommendations.

## Limitations

- The learner's real CSV, its data sensitivity, dialect, encoding, size, and desired cleaning rules are still unknown. Examples here cannot establish which rows to drop, values to fill, columns to convert, or duplicate key to use.
- pandas documentation is a moving current-version site; page contents and supported Python versions may change. Confirm installation and example behavior on the learner's Windows environment during week 1.
- The Microsoft page shows a generic authorization notice in the web-rendered header, although the guide body was visible and the MCP returned HTTP 200. If the learner cannot view it, the Python `venv` and pandas pages still support the project setup once Python is installed.
- The long missing-data guide and API references are lookup material, not assigned cover-to-cover reading. Reading estimates are local planning estimates; actual setup time depends on the learner's machine.
