# Learning practice and assessment

Run ID: python-file-automation-2026-09-30
Artifact type: practice
Revision: v01
Status: proposed
Inputs: runs/python-file-automation-2026-09-30/requirements-brief-v03.md (confirmed; passing hash 34961494f392ed7688bab46666aae91563a99f7fe44cf8d528b5f4ee981deedc); runs/python-file-automation-2026-09-30/learning-resources-v01.md (passing hash 07a1147cd59170667cb06a887ed12e1c1a1f952899d95361e480145988381560); runs/python-file-automation-2026-09-30/learning-sequence-v01.md (passing hash ea02b234dbb4c6b00d464facf96dee38d10a4729cfe8e7b8778cd855f9764fcd)

## Purpose

Give the learner one observable exercise per sequence milestone, progressing from file classification to a tested Windows command-line sorter. All hands-on runs use invented, disposable toy files in a deliberately created `sample-Downloads` folder or temporary test directories. The sorter moves only those prepared copies. No exercise uses a real Downloads folder or personal files. These are proposed checks; no learner work or test result is claimed yet.

## Evidence

- The confirmed [requirements brief](requirements-brief-v03.md) supplies the learner's starting point (variables, loops, functions; little filesystem API experience), Windows environment, five weeks at two hours per week, free English resources, dry run, extension sorting, tests, and disposable-only boundary.
- The passing [resources artifact](learning-resources-v01.md) identifies checked official Python pages. [`pathlib`](https://docs.python.org/3/library/pathlib.html) supports inspection, final suffix classification, path construction, and folder creation; [`shutil`](https://docs.python.org/3/library/shutil.html) documents moving and the need for this project's collision guard; the [argparse tutorial](https://docs.python.org/3/howto/argparse.html) supports the path argument, Boolean `--apply`, and `--help`; [`unittest`](https://docs.python.org/3/library/unittest.html) and [`tempfile`](https://docs.python.org/3/library/tempfile.html) support discoverable tests and isolated temporary fixtures. The exercises and acceptance criteria below are original tasks, not claims that these pages supply a complete sorter.
- The passing [sequence](learning-sequence-v01.md) fixes the project choices and time boxes: inspect immediate files only; use the lowercased final suffix (`archive.tar.gz` routes to `gz`), `_no_extension` for no suffix, stable filename ordering, `SKIP collision` without overwrite, side-effect-free default preview, and an explicit `--apply` followed by `y` before any move. Weekly practice and check time is 75, 90, 75, 75, and 105 minutes respectively, with separate reading time completing each two-hour week.

## Milestone practice

### 1. Week 1 — Inspect a disposable sample folder

- Exercise: In a newly created `sample-Downloads`, put disposable copies named `note.txt`, `photo.JPG`, `archive.tar.gz`, and `README`, each containing short invented text; add a `keep` subfolder with `inside.txt`. Write a small function or worksheet that inspects immediate entries and assigns each file its destination folder from the final suffix. Do not move or create destination folders yet.
- Expected evidence: A classifier script or worksheet plus its printed table/list: `note.txt → txt`, `photo.JPG → jpg`, `archive.tar.gz → gz`, `README → _no_extension`; `keep` and `keep/inside.txt` are absent from the eligible-file list.
- Progress check: Compare the recorded input names and four routes with the sample folder and explain aloud or in one sentence why `.tar.gz` goes to `gz` and the nested file is excluded.
- Pass criterion: All four immediate files route exactly as shown; neither the subfolder nor its child is treated as an eligible file. The original toy files remain in place.
- If missed: Revisit `Path.iterdir()`, `Path.is_file()`, and `Path.suffix` in the checked `pathlib` page; print each entry's name, file status, and suffix, then redo the four routes.
- Time: 75 min total: 15 min toy-folder setup, 45 min exploration/classifier, 15 min check. Together with 45 min reading in the sequence, Week 1 stays at 120 min.

### 2. Week 2 — Compute a no-write move plan

- Exercise: Extend the classifier into a function that returns source/destination decisions without creating folders or moving files. For each eligible file, print a planned move or `SKIP collision`. Add an existing `txt/note.txt` containing distinct text to the disposable fixture, so `note.txt` has a collision. Run the planner twice on the unchanged fixture.
- Expected evidence: A callable planning function, two identical previews covering the four top-level files, and a before/after inventory of relative paths and file contents. The `note.txt` decision is `SKIP collision`; the other three point to `jpg`, `gz`, and `_no_extension` destinations under `sample-Downloads`. The pre-existing `txt/note.txt` retains its distinct contents.
- Progress check: Compare both previews for identical order and decisions, then compare the complete folder inventory before and after the previews, including all relative file paths, bytes, and existing directories.
- Pass criterion: Every eligible top-level file has exactly one decision; the colliding destination is skipped; both previews are identical; the inventory is unchanged and no new destination folder is created.
- If missed: Separate the planning function from execution calls; review `Path.exists()` in the checked `pathlib` page and the `move` section of `shutil`, then repeat on a rebuilt toy fixture.
- Time: 90 min total: 75 min planning/preview code, 15 min inventory check. Together with 30 min reading in the sequence, Week 2 stays at 120 min.

### 3. Week 3 — Add the CLI and explicit execution

- Exercise: Wire the plan to a command-line script accepting the sample-folder path and an optional `--apply` flag. Run `--help` and the default command on a fresh disposable fixture; both preview and an `--apply` run must print the plan before any move. On one fresh fixture answer `n` to the confirmation; on another answer `y`. Keep a pre-existing collision in each fixture.
- Expected evidence: Captured `--help`, default preview, `--apply` with `n`, and `--apply` with `y` output, plus before/after inventories for each fixture. The `n` fixture is unchanged. The `y` fixture has non-colliding toy files in their extension folders, no longer at their top-level source paths; the colliding source remains and the pre-existing destination keeps its original contents.
- Progress check: Follow the actual console order: plan first, confirmation second, mutation only after `y`. Compare fixture inventories before/after default preview, decline, and confirmed apply. Check that each reported `SKIP collision` corresponds to an untouched existing destination.
- Pass criterion: Default invocation and `n` create no directory and change no file or contents; `--apply` requires an explicit `y` after displaying the plan; `y` moves only non-colliding prepared copies to the planned folders; `--help` describes path and `--apply`.
- If missed: Return to the Week 2 no-write planner; keep `Path.mkdir()` and `shutil.move()` only in the confirmed execution branch, rebuild the disposable fixture, and retry the three modes.
- Time: 75 min total: 60 min CLI/execution wiring, 15 min manual checks. Together with 45 min reading in the sequence, Week 3 stays at 120 min.

### 4. Week 4 — Test preview, routing, and collisions

- Exercise: Write discoverable `unittest` tests using `TemporaryDirectory()` and closed toy files. Test the four extension routes and skipped subdirectory; stable preview order; a full relative-path, directory, and file-bytes snapshot unchanged after default preview and after declined `--apply`; successful confirmed apply; and a collision that preserves the existing destination and leaves the colliding source unmoved. Use either a callable CLI entry point with injectable confirmation/output or subprocess input to exercise the actual confirmation path.
- Expected evidence: A `test_*.py` file, the command `python -m unittest discover` (or equivalent `py -m unittest discover` on the learner's Windows setup), and the resulting test report. Each test creates its own disposable temporary fixture and states its expected behavior in assertions.
- Progress check: Run discovery from the project directory, inspect every reported test result, and deliberately change one expected route or snapshot assertion once to see the suite fail; restore the assertion and rerun. The deliberate failure is a check of the test, not a finished-project failure.
- Pass criterion: Discovery finds the tests and all pass after the assertion is restored. The assertions prove the four required routes, excluded nested file, repeatable preview, full no-write behavior for preview and decline, confirmed move, and collision preservation, rather than merely checking that commands exit successfully.
- If missed: Start with one small `TestCase` from the checked `unittest` page, create one fixture under `TemporaryDirectory()`, add a snapshot helper, and rerun only the failing test before full discovery. Close files before temporary-directory cleanup on Windows.
- Time: 75 min total: 60 min test writing, 15 min discovery and interpretation. Together with 45 min reading in the sequence, Week 4 stays at 120 min.

### 5. Week 5 — Integrate and demonstrate the sorter

- Exercise: Fix findings from Week 4, then build a fresh `sample-Downloads` from invented toy copies including a collision. Run test discovery, `--help`, default preview, a declined `--apply`, and a confirmed `--apply` on a fresh equivalent fixture. Save the preview and final folder listing; write a short README with Windows commands for making toy copies, previewing, applying/confirming, and running tests. Keep all demonstrations within disposable folders.
- Expected evidence: Script, README, passing discovery report, saved command output, a complete before/after inventory for default and declined runs, and a final listing for the confirmed run. The final listing matches the saved plan for non-colliding files and retains both source and destination for the skipped collision.
- Progress check: Compare the saved preview with actual destinations after confirmation, verify default and declined snapshots match their starting fixtures exactly, and rerun discovery after the final edit. Follow the README commands once on a disposable fixture to check they are usable.
- Pass criterion: Tests are discoverable and pass; the README commands work on the sample fixture; preview precedes confirmation, default and decline preserve snapshots, confirmed execution matches the plan without overwriting a collision, and no real Downloads or personal files are used.
- If missed: Fix the first mismatched plan, snapshot, or test assertion using a fresh disposable fixture; rerun the affected check, then full discovery and the final demonstration. Record any remaining gap instead of claiming completion.
- Time: 105 min total: 90 min integration, fixes, documentation, and sample run; 15 min final review. Together with 15 min targeted reading in the sequence, Week 5 stays at 120 min.

## Limitations

- Learner performance is unknown. Passing criteria describe evidence to collect; they do not report completed exercises or passing tests.
- Moving prepared copies is the sequence's exercise design choice resolving the brief's copy/move ambiguity. A request to preserve those copies during execution would change the design and require revised dependent artifacts.
- This practice covers immediate files and the final suffix only. It does not assess recursion, compound-extension grouping, personal files, or recovery from a failure partway through an apply run.
