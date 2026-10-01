# Learning resources

Run ID: python-file-automation-2026-09-30
Artifact type: resources
Revision: v01
Status: proposed
Inputs: runs/python-file-automation-2026-09-30/requirements-brief-v03.md (confirmed; passing brief hash 34961494f392ed7688bab46666aae91563a99f7fe44cf8d528b5f4ee981deedc)

## Purpose

Support a Windows learner who knows Python variables, loops, and functions but is new to filesystem APIs. In two hours per week for five weeks, the learner will build and test a command-line sorter that works only with disposable copies in a sample Downloads folder, previews changes before any move, and organizes files by extension. The confirmed brief leaves open whether the final action copies source files or moves copies prepared for the exercise; the learning path should settle that project choice without treating either as a confirmed requirement.

## Evidence

- Checked on 2026-09-30. Web search used `site:docs.python.org/3/library/pathlib.html pathlib Path.iterdir suffix mkdir Python`, `site:docs.python.org/3/library/shutil.html shutil.move copy2`, `site:docs.python.org/3/howto/argparse.html argparse tutorial`, `site:docs.python.org/3/library/unittest.html unittest discover test cases assertEqual`, and `site:docs.python.org/3/library/tempfile.html TemporaryDirectory context manager`. I then opened each of the five recommended source pages with web page access and read the sections named below. This route establishes the *actual instructional content* of each page.
- The configured `mcp__learning_resources__inspect_learning_page` separately fetched each of those five exact HTTPS URLs on 2026-09-30 at about 17:16 UTC. Each returned `status: fetched`, HTTP 200, a Python documentation title, and a description. This route independently confirms page availability and identity; its short description alone does not establish the details of an API or tutorial.
- All recommended pages are freely readable, English-language official Python documentation. Their `/3/` paths displayed Python 3.14.7 at check time; the learner should use the documentation matching the Python version installed for examples with version-specific behavior.

## Recommended resources

### Python `pathlib` reference: paths, suffixes, and directory entries

- Source: [pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)
- What it covers: `Path` adapts to the running operating system; `Path.iterdir()` yields directory entries; `PurePath.suffix` returns the last extension or an empty string; `Path.mkdir()` creates folders. The page also shows `Path.is_file()` and `Path.write_text()`, useful for disposable fixtures.
- Relevance: Read the `Basic use`, `PurePath.suffix`, `Path.iterdir()`, and `Path.mkdir()` sections selectively, then classify several sample filenames. `Path` handles Windows paths without manual slash construction. Budget about 45–60 minutes of the ten hours, including a small exploration.
- Evidence route: Web search located the official page; the opened page supplied the method behavior and examples. The learning-resources MCP independently returned HTTP 200 and the `pathlib` documentation title for this exact URL.
- Page check: 2026-09-30; web open succeeded and MCP returned `fetched` / HTTP 200.
- Limitation: This is a long API reference, not a guided sorter exercise. `suffix` is only the final suffix (`archive.tar.gz` becomes `.gz`), and extensionless files need an explicit project rule. `iterdir()` is unordered, so sorting may help make preview output stable.

### Python `shutil` reference: carrying out the chosen file operation

- Source: [shutil — High-level file operations](https://docs.python.org/3/library/shutil.html)
- What it covers: `shutil.copy()` and `copy2()` copy files, while `shutil.move()` moves files. The page states that copying to an existing file path replaces it, and a move to an existing non-directory destination may overwrite depending on rename behavior.
- Relevance: Use the `copy`, `copy2`, and `move` sections after deciding whether execution copies original samples or moves exercise copies. Budget about 30–40 minutes. The learner can first compute intended source/destination pairs and show those pairs in a dry run, then call the selected operation only in apply mode.
- Evidence route: Web search located the official page; the opened page supplied operation and overwrite behavior. The learning-resources MCP independently returned HTTP 200 and the `shutil` documentation title for this exact URL.
- Page check: 2026-09-30; web open succeeded and MCP returned `fetched` / HTTP 200.
- Limitation: The documentation does not provide a ready-made dry-run sorter or protect this project from name collisions. The learner must define collision behavior and test that preview mode makes no filesystem changes. The confirmed copy/move choice remains open.

### Python `argparse` tutorial: a small command-line interface

- Source: [Argparse Tutorial](https://docs.python.org/3/howto/argparse.html)
- What it covers: A gentle introduction to positional arguments, optional arguments, generated `--help`, and a Boolean switch with `action="store_true"`.
- Relevance: Read the opening basics and the optional-argument example, then add a sample-folder path argument and a flag for the explicitly chosen execution mode while keeping preview as the safe default. Budget about 35–45 minutes.
- Evidence route: Web search located the official tutorial; the opened page supplied the `add_argument` and `store_true` examples. The learning-resources MCP independently returned HTTP 200 and the `Argparse Tutorial` title for this exact URL.
- Page check: 2026-09-30; web open succeeded and MCP returned `fetched` / HTTP 200.
- Limitation: Examples use small demonstration programs, not file safety logic; the tutorial does not itself implement preview or restrict paths to disposable fixtures.

### Python `unittest` reference: automated behavior checks

- Source: [unittest — Unit testing framework](https://docs.python.org/3/library/unittest.html)
- What it covers: A short `TestCase` example using assertions, test fixtures, and command-line test discovery with `python -m unittest discover`.
- Relevance: Read `Basic example` and `Test Discovery`, then test extension routing, dry-run output and unchanged files, real execution on disposable samples, and collision handling. It is built into Python and needs no package installation. Budget about 45–60 minutes to learn the basics, with more project time for writing tests.
- Evidence route: Web search located the official page; the opened page supplied assertion and test-discovery examples. The learning-resources MCP independently returned HTTP 200 and the `unittest` documentation title for this exact URL.
- Page check: 2026-09-30; web open succeeded and MCP returned `fetched` / HTTP 200.
- Limitation: The full page is a large reference. Its sample tests do not cover filesystem side effects; pair it with temporary directories and explicitly assert that preview mode leaves both source and destination untouched.

### Python `tempfile` reference: isolated test directories

- Source: [tempfile — Generate temporary files and directories](https://docs.python.org/3/library/tempfile.html)
- What it covers: `TemporaryDirectory()` creates a temporary directory, works as a context manager, and removes the directory and its contents when the context exits. The page notes possible cleanup errors from open files on Windows.
- Relevance: Use temporary directories for automated tests and write disposable fixture files inside them; keep all practical runs inside a deliberately created sample Downloads folder. Budget about 20–30 minutes to learn the relevant section.
- Evidence route: Web search located the official page; the opened page supplied context-manager and cleanup behavior. The learning-resources MCP independently returned HTTP 200 and the `tempfile` documentation title for this exact URL.
- Page check: 2026-09-30; web open succeeded and MCP returned `fetched` / HTTP 200.
- Limitation: This is a test-fixture aid, not the sorter implementation. On Windows, close any opened files before leaving the temporary-directory context so cleanup can complete.

## Missing or unusable sources

- [Python 3.16.0a0 `tempfile` page](https://docs.python.org/3.16/library/tempfile.html) appeared in search, but it is a prerelease-version reference and was not opened or checked with the learning-resources MCP. It is not a verified recommendation for a beginner's installed Python version.
- No single checked page teaches the complete safe sorter with a dry run. The plan must combine the verified API sections above and make the preview/no-write invariant an explicit exercise and test criterion.

## Limitations

- Page checks establish that these pages were reachable and what they documented on 2026-09-30, not that the learner's installed Python version has been checked. Use the version selector if examples differ.
- The suggested reading times total roughly 3–4 hours at the high end, leaving project and test practice within the ten-hour budget; they are estimates, not source claims.
- No resource resolves the confirmed brief's copy-versus-move ambiguity. The sequence should state one safe exercise interpretation or offer a bounded design decision before implementation.
