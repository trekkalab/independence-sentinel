# Lessons Learned

Accumulated knowledge from this codebase — bugs, patterns, gotchas, and rules. Read at the start of every session. Update after every meaningful commit and every deploy.

<!-- New lessons go at the bottom, numbered sequentially: L01, L02, L03... -->

### L01 — `graphify-out/` is committed instead of ignored, so every graph rebuild dirties the tree
**Problem:** A 2026-07-29 audit found 13 uncommitted files here, and every one is graphify output: `graphify-out/graph.json`, `graph.html`, `GRAPH_REPORT.md`, `manifest.json`, `cache/stat-index.json`, `.graphify_labels.json`, plus untracked AST cache blobs under `graphify-out/cache/ast/`. No source file was modified.
**Root cause:** `graphify-out/` was committed (via `feat: add graphify knowledge graph`, 2026-06-08) and never added to `.gitignore`. It's a regenerated build artifact, so `graphify update .` rewrites it every run and permanently dirties `git status`.
**Lesson:** A generated directory that is committed rather than ignored makes `git status` useless — real uncommitted work becomes invisible in the noise.
**Preventive check:** `grep -q 'graphify-out' .gitignore || echo MISSING`. If missing, add it and `git rm -r --cached graphify-out/`. Same defect exists in `smart-agency` and `three-trails-lofts` — all three got graphify on the same day.
