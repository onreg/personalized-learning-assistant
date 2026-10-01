# Python file automation: five-week learning plan

Run ID: python-file-automation-2026-09-30
Artifact type: draft
Revision: v01
Status: proposed for learner review
Inputs: runs/python-file-automation-2026-09-30/requirements-brief-v03.md (confirmed; SHA-256 34961494f392ed7688bab46666aae91563a99f7fe44cf8d528b5f4ee981deedc); runs/python-file-automation-2026-09-30/learning-resources-v01.md (passing; SHA-256 07a1147cd59170667cb06a887ed12e1c1a1f952899d95361e480145988381560); runs/python-file-automation-2026-09-30/learning-sequence-v01.md (passing; SHA-256 ea02b234dbb4c6b00d464facf96dee38d10a4729cfe8e7b8778cd855f9764fcd); runs/python-file-automation-2026-09-30/learning-practice-v01.md (passing; SHA-256 b3b58f73097412e0bed723f9344af1dc7af4174d32c19eb9ccc8c6e926c576ad)

## Purpose

In five weeks, build a Windows command-line Python script that previews extension-based sorting, then moves **only prepared, disposable copies** from a deliberately created `sample-Downloads` folder into extension subfolders after explicit confirmation. Finish with automated tests and a short README. Practice only on invented sample files or temporary test files; never aim the script at your real Downloads folder or personal files.

## Evidence

- The [confirmed brief](requirements-brief-v03.md) records your goal, starting knowledge, two hours per week for five weeks, Windows, free English resources, dry run, and tests. The [checked resources](learning-resources-v01.md), [sequence](learning-sequence-v01.md), and [practice](learning-practice-v01.md) are the passing inputs integrated here. A separate starting-level diagnosis was omitted because your stated Python background is specific enough for Week 1 placement.
- The five recommended, freely readable official Python pages were opened and separately checked for availability on 2026-09-30: [`pathlib`](https://docs.python.org/3/library/pathlib.html), [`shutil`](https://docs.python.org/3/library/shutil.html), the [argparse tutorial](https://docs.python.org/3/howto/argparse.html), [`unittest`](https://docs.python.org/3/library/unittest.html), and [`tempfile`](https://docs.python.org/3/library/tempfile.html). Read the named sections below rather than the full references. If an example differs from your installed Python, select that version of the documentation.

## Goal and starting point

You already know Python variables, loops, and functions. You have little experience with filesystem APIs, so start by **inspecting paths**, then compute a move plan without writes, add the command-line execution branch, and finally test and demonstrate the whole flow.

The brief says both “sorts copies of files” and “before moving anything.” This plan makes a project design choice: first prepare **copies of invented toy files** in `sample-Downloads`; the sorter then moves those exercise copies within that folder. The script handles immediate files only and skips subdirectories. It uses the lowercased **last suffix** as the folder name: `photo.JPG` → `jpg`, `archive.tar.gz` → `gz`, and a file without a suffix → `_no_extension`. [`Path.suffix`](https://docs.python.org/3/library/pathlib.html) supplies that final suffix. Sort names for a repeatable preview. For an existing destination filename, print `SKIP collision` and leave both files untouched.

**Safety rule:** Planning and the default CLI command only inspect and print; they do not create directories or change files. `--apply` first prints the same plan, then requires an explicit `y` before creating folders and moving non-colliding files. Any other preflight error stops that proposed move. Keep creation and moves confined to this confirmed execution branch; [`Path.mkdir()`](https://docs.python.org/3/library/pathlib.html) and [`shutil.move()`](https://docs.python.org/3/library/shutil.html) are the operations to study. Test the no-write rule with complete before/after snapshots of relative paths, directories, and file bytes.

## Schedule

Study **2 hours per week for 5 weeks**, or **10 hours total**. Each week's practice time includes its deliverable check. Reading is selective, leaving most time to build and verify the script.

| Week | Reading | Building and practice | Check | Total |
| --- | ---: | ---: | ---: | ---: |
| 1 | 45 min | 60 min | 15 min | 120 min |
| 2 | 30 min | 75 min | 15 min | 120 min |
| 3 | 45 min | 60 min | 15 min | 120 min |
| 4 | 45 min | 60 min | 15 min | 120 min |
| 5 | 15 min | 90 min | 15 min | 120 min |
| **Total** | **180 min** | **345 min** | **75 min** | **600 min** |

## Milestones

### 1. Week 1 — Inspect and classify disposable files

- **Outcome link:** Identify which files the sorter may handle and their destination folders before planning moves.
- **Prerequisites:** Variables, loops, and functions. No filesystem API experience assumed.
- **Resource and reading (45 min):** In the [`pathlib` reference](https://docs.python.org/3/library/pathlib.html), focus on basic use, `Path.iterdir()`, `Path.is_file()`, and `PurePath.suffix`. These support immediate-entry inspection, filtering out folders, and final-suffix classification.
- **Practice and deliverable (60 min):** Spend about 15 min making a disposable `sample-Downloads` with invented-content copies named `note.txt`, `photo.JPG`, `archive.tar.gz`, and `README`, plus `keep/inside.txt`. Spend 45 min writing a classifier function or worksheet that prints the eligible files and their target folders. Do not move files or create destination folders.
- **Progress check (15 min):** Save the printed routes. **Pass** when they are `note.txt → txt`, `photo.JPG → jpg`, `archive.tar.gz → gz`, and `README → _no_extension`, with `keep` and its child excluded and all original toy files still in place. Explain why `.tar.gz` yields `gz`. **If missed**, print each immediate entry's name, `is_file()` result, and suffix; reread the cited `pathlib` sections and redo the four routes.

### 2. Week 2 — Build a no-write move plan

- **Outcome link:** Produce a dry run that shows each intended destination and collision decision before any move.
- **Prerequisites:** Week 1 path inspection, file filtering, and suffix classification.
- **Resources and reading (30 min):** Review `Path.exists()` and path construction in [`pathlib`](https://docs.python.org/3/library/pathlib.html), then the `move` section of [`shutil`](https://docs.python.org/3/library/shutil.html). Apply this project's explicit collision rule; do not assume a file operation protects an existing destination.
- **Practice and deliverable (75 min):** Turn the classifier into a callable function returning source/destination decisions. Add an existing `txt/note.txt` with **different bytes** to the disposable fixture. Print planned moves and `SKIP collision`; run the planner twice. Keep all directory creation and moving out of the planner.
- **Progress check (15 min):** Save both previews and a before/after inventory of relative paths, directories, and file bytes. **Pass** when every eligible top-level file has one decision, `note.txt` is skipped, the other three target `jpg`, `gz`, and `_no_extension`, both previews match in order and content, and the full inventory is unchanged. **If missed**, separate any writing code from planning, inspect `Path.exists()` and `shutil.move()` in the linked pages, rebuild the toy fixture, and rerun.

### 3. Week 3 — Add the CLI and confirmed apply

- **Outcome link:** Make the no-write preview the default command and allow an explicit, confirmed sort.
- **Prerequisites:** Week 2's side-effect-free plan and collision decisions.
- **Resources and reading (45 min):** Use the [argparse tutorial](https://docs.python.org/3/howto/argparse.html) for a positional sample-folder path, a Boolean `--apply` flag using `store_true`, and generated `--help`. Refer to [`Path.mkdir()`](https://docs.python.org/3/library/pathlib.html) and [`shutil.move()`](https://docs.python.org/3/library/shutil.html) for the confirmed execution branch.
- **Practice and deliverable (60 min):** Wire the CLI to print the plan in default mode. `--apply` must also print it, ask for confirmation, and accept only an explicit `y` before creating needed folders and moving non-colliding prepared copies. Try `--help`, default preview, `--apply` followed by `n`, and `--apply` followed by `y` on **fresh disposable fixtures**, each with a collision.
- **Progress check (15 min):** Save console output and before/after inventories. **Pass** when the plan appears before the prompt, default and `n` leave the full fixture unchanged, `y` moves only non-colliding top-level exercise copies, and both the colliding source and existing destination stay intact. `--help` describes the path and `--apply`. **If missed**, return to Week 2's no-write planner, keep `mkdir()` and `move()` inside the confirmed branch, rebuild the fixture, and retry each mode.

### 4. Week 4 — Automate the behavior checks

- **Outcome link:** Show repeatable evidence that preview is safe and confirmed execution follows the plan.
- **Prerequisites:** A runnable Week 3 CLI with separable planning and execution.
- **Resources and reading (45 min):** Read the basic `TestCase` and test-discovery sections in [`unittest`](https://docs.python.org/3/library/unittest.html), plus `TemporaryDirectory()` in [`tempfile`](https://docs.python.org/3/library/tempfile.html). Close toy files before cleanup on Windows.
- **Practice and deliverable (60 min):** Write discoverable `test_*.py` tests in temporary disposable directories. Assert four routes and skipped nested file, stable preview order, **full** unchanged path/directory/bytes snapshots after default preview and declined apply, a successful confirmed move, and a collision that preserves the existing destination and unmoved source. Exercise confirmation through a callable entry point with injected input/output or a subprocess with supplied input.
- **Progress check (15 min):** Run `python -m unittest discover` (or `py -m unittest discover` on your Windows setup). Deliberately make one expected route or snapshot assertion fail, restore it, and rerun. **Pass** when discovery finds the tests and all pass after restoration, with assertions for behavior rather than exit status alone. **If missed**, start from one `TestCase` and one `TemporaryDirectory()` fixture, add a snapshot helper, rerun the failing test, then full discovery.

### 5. Week 5 — Integrate and demonstrate

- **Outcome link:** Deliver the tested script, usage instructions, and a traceable disposable-folder demonstration.
- **Prerequisites:** Week 3 CLI and Week 4 automated tests.
- **Resources and reading (15 min):** Revisit [`unittest` test discovery](https://docs.python.org/3/library/unittest.html) and the [argparse tutorial](https://docs.python.org/3/howto/argparse.html) where needed to verify your final test and help commands.
- **Practice and deliverable (90 min):** Fix findings from Week 4. Prepare a fresh `sample-Downloads` of invented toy copies with a collision. Run discovery and `--help`, save default preview and declined-apply outputs and full before/after inventories, then confirm `--apply` on a fresh equivalent fixture and save its final listing. Write a short README with Windows commands to make toy copies, preview, apply and confirm, and run tests.
- **Progress check (15 min):** Follow the README once on a disposable fixture. **Pass** when tests are discoverable and pass, default and decline preserve complete snapshots, confirmed output matches the saved preview for non-colliding files, collision files remain intact, and no real Downloads or personal files were used. **If missed**, fix the first mismatched plan, snapshot, or assertion using a fresh fixture; rerun that check, full discovery, and the demonstration. Record any remaining gap rather than claiming completion.

## Limitations

- This is a proposed plan for review. The exercises have not been completed and no test result is claimed.
- Moving prepared copies is a design choice that resolves the brief's open copy-versus-move detail. If you want execution to preserve those copies, the sequence, practice, and draft need revision.
- The ten-hour project covers immediate files and the final suffix only. It does not cover recursive traversal, compound-extension grouping, real Downloads folders, personal files, or recovery from a failure partway through an apply run.
