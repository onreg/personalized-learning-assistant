# Learning sequence

Run ID: python-file-automation-2026-09-30
Artifact type: sequence
Revision: v01
Status: proposed
Inputs: runs/python-file-automation-2026-09-30/requirements-brief-v03.md (confirmed; passing brief hash 34961494f392ed7688bab46666aae91563a99f7fe44cf8d528b5f4ee981deedc); runs/python-file-automation-2026-09-30/learning-resources-v01.md (passing resources hash 07a1147cd59170667cb06a887ed12e1c1a1f952899d95361e480145988381560)

## Purpose

Build toward the confirmed outcome: a tested Windows command-line script that previews extension-based sorting and then moves **only disposable copies** from a deliberately created sample Downloads folder. The sequence puts path inspection and a no-write plan before any file operation, then adds the command-line interface and tests. It uses five two-hour milestones (10 hours total).

## Evidence

- The confirmed `requirements-brief-v03.md` supplies the learner's prior Python knowledge, Windows environment, five-week time limit, free English resource constraint, disposable-file boundary, and desired script. The resource artifact `learning-resources-v01.md` passed both resource gates and identifies the checked official Python pages used below.
- [`pathlib` reference](https://docs.python.org/3/library/pathlib.html): `Path.iterdir()` inspects directory entries, `Path.is_file()` excludes directories, `Path.suffix` gives the last suffix (or an empty string), and `Path.mkdir()` creates directories. These support top-level classification and later execution.
- [`shutil` reference](https://docs.python.org/3/library/shutil.html): `shutil.move()` performs the chosen operation; a destination name collision needs an explicit skip rule because file operations do not supply this project's no-overwrite policy.
- [Argparse tutorial](https://docs.python.org/3/howto/argparse.html): a positional folder argument and an optional Boolean flag provide a small CLI with generated help.
- [`unittest` reference](https://docs.python.org/3/library/unittest.html) and [`tempfile` reference](https://docs.python.org/3/library/tempfile.html): built-in tests and temporary directories support isolated assertions about preview and execution. On Windows, fixture files should be closed before temporary-directory cleanup.

## Starting point and prerequisites

The learner knows variables, loops, and functions, so no general Python restart is needed. Filesystem APIs are new. Start with paths and extension classification, then represent intended moves as source/destination pairs without writing, then add the explicit execution path, then test the behavior and integrate it. No separate diagnosis was selected because the confirmed starting level is specific enough; the Week 1 inspection task provides an early progress check.

Project design choice resolving the brief's copy/move ambiguity: make a separate `sample-Downloads` directory containing **copies of invented toy files**; the sorter moves those exercise copies into its own extension subfolders. The learner never points it at the real Downloads folder or personal files. Scope is the immediate files in that sample directory; skip subdirectories. Use the final suffix, lowercased, as the folder name (`notes.TXT` → `txt`, `archive.tar.gz` → `gz`); use `_no_extension` when `Path.suffix` is empty. Sort entries by filename for stable preview output. If a destination filename already exists, report `SKIP collision` in preview and execution and never overwrite it. If a proposed move has any other preflight error, stop before executing that move.

Safety invariant: planning and default CLI invocation only inspect files and print intended actions; they do not create directories, move files, or alter contents. An explicit `--apply` invocation prints the same plan first and requires a `y` confirmation before creating destination directories and moving non-colliding files. The automated tests will check the preview leaves a complete before/after directory snapshot unchanged and that declining confirmation leaves it unchanged.

## Schedule

Five weeks × 2 hours = 10 hours. Weekly allocations include selective reading, setup and coding, and a check of the observable deliverable. Reading totals 3 hours, setup and hands-on work 5 hours 45 minutes, and checks 1 hour 15 minutes.

| Week | Reading | Setup and hands-on work | Deliverable check | Total |
| --- | ---: | ---: | ---: | ---: |
| 1 | 45 min | 60 min | 15 min | 120 min |
| 2 | 30 min | 75 min | 15 min | 120 min |
| 3 | 45 min | 60 min | 15 min | 120 min |
| 4 | 45 min | 60 min | 15 min | 120 min |
| 5 | 15 min | 90 min | 15 min | 120 min |
| **Total** | **180 min** | **345 min** | **75 min** | **600 min** |

## Milestones

### 1. Week 1 — Inspect a disposable sample folder

- Outcome link: Learn to identify the exact files the sorter may handle and the extension folder each would use.
- Prerequisites: Variables, loops, functions; no filesystem API experience assumed.
- Resources: [`pathlib` reference](https://docs.python.org/3/library/pathlib.html) — selectively read basic use, `Path.iterdir()`, `Path.is_file()`, and `PurePath.suffix`; use `Path` to create and inspect an invented `sample-Downloads` fixture.
- Schedule: 45 min reading; 15 min setup of the toy folder; 45 min path exploration/classifier; 15 min checking sample results = 120 min.
- Deliverable: A small classifier or worksheet showing deterministic extension categories for top-level `.txt`, `.JPG`, `.tar.gz`, extensionless, and subdirectory examples, with subdirectories excluded.

### 2. Week 2 — Compute a no-write move plan

- Outcome link: Produce the dry run before any file operation, including visible collision decisions.
- Prerequisites: Week 1 path iteration, file filtering, and suffix classification.
- Resources: [`pathlib` reference](https://docs.python.org/3/library/pathlib.html) — `Path.exists()` and destination path construction; [`shutil` reference](https://docs.python.org/3/library/shutil.html) — read the `move` section to understand why a separate no-overwrite preflight is needed.
- Schedule: 30 min reading; 75 min writing a deterministic plan and preview printer; 15 min checking the folder remains unchanged = 120 min.
- Deliverable: A callable planning function and sample preview listing source → destination or `SKIP collision` for every eligible top-level file. No directory creation or move occurs in this milestone.

### 3. Week 3 — Add the CLI and explicit execution

- Outcome link: Turn the checked plan into the intended command-line program while retaining preview as the safe default.
- Prerequisites: Week 2 side-effect-free plan and collision classification.
- Resources: [Argparse tutorial](https://docs.python.org/3/howto/argparse.html) — positional path, `--apply` using `store_true`, and generated `--help`; [`pathlib` reference](https://docs.python.org/3/library/pathlib.html) — `Path.mkdir()`; [`shutil` reference](https://docs.python.org/3/library/shutil.html) — `shutil.move()`.
- Schedule: 45 min selective reading; 60 min CLI and execution wiring; 15 min manual check with disposable sample files = 120 min.
- Deliverable: `--help`, default preview, and an `--apply` path that prints the plan, asks for `y`, then creates needed extension folders and moves only planned, non-colliding exercise copies. Declining leaves the folder untouched.

### 4. Week 4 — Test preview, routing, and collisions

- Outcome link: Provide automated proof for the core behavior and the no-write safety invariant.
- Prerequisites: Week 3 runnable CLI and separable planning/execution functions.
- Resources: [`unittest` reference](https://docs.python.org/3/library/unittest.html) — basic `TestCase` and test discovery; [`tempfile` reference](https://docs.python.org/3/library/tempfile.html) — `TemporaryDirectory()` fixture lifetime and Windows cleanup caution.
- Schedule: 45 min reading; 60 min test writing; 15 min running and interpreting the suite = 120 min.
- Deliverable: Discoverable tests covering extension and extensionless routing, skipped subdirectories, stable preview, unchanged full fixture snapshot after preview and declined confirmation, a successful apply, and a collision that preserves the existing destination.

### 5. Week 5 — Integrate and demonstrate the sorter

- Outcome link: Finish the tested command-line script and show its safe use on a fresh disposable sample folder.
- Prerequisites: Week 4 test suite and Week 3 CLI.
- Resources: [`unittest` reference](https://docs.python.org/3/library/unittest.html) — rerun with `python -m unittest discover`; [Argparse tutorial](https://docs.python.org/3/howto/argparse.html) — verify help text and command examples.
- Schedule: 15 min targeted rereading; 90 min fixing test findings and performing a fresh end-to-end sample run; 15 min final review = 120 min.
- Deliverable: Script, discoverable passing tests, a short README with Windows commands for creating toy copies, preview, apply/confirmation, and test discovery, plus a saved preview and final sample-folder listing that match the same planned moves.

## Limitations

- The move-of-prepared-copies interpretation is a project design choice, not a newly confirmed learner requirement. The learner can request a copy-preserving execution design during draft review; that would require updating the dependent practice and draft.
- This ten-hour scope covers immediate files and the last suffix only. Recursive traversal, compound-extension rules, arbitrary real Downloads folders, and robust recovery from mid-run I/O failures are outside the initial project.
- The recommended pages were checked on 2026-09-30. The learner should select the Python documentation version matching their installed Python if an example differs.
