---
name: commit-message-policy-approved
description: Approved repository/workflow rule — commits must be clean, professional, and contain no AI/Claude/Anthropic attribution anywhere in message body or trailers. Same "approved, don't reopen" tier as design decisions, but a repo-workflow rule, not a visual one.
metadata:
  type: project
---

**Status:** Approved decision. Repository/workflow-policy category — distinct in kind
from [[gold-system-approved]], [[background-system-approved]], and
[[homepage-visual-system-approved]] (those are visual/design decisions), but recorded at
the same "approved, do not reopen without a specific reason" tier. Recorded 2026-08-31
at the coordinator's explicit instruction.

**Verbatim policy — BrightPath repository commit-message policy (approved):**

All commits to this repository must use clean, professional commit messages that
describe the work only. Do NOT add: Claude, Anthropic, AI, or model-name references;
"Generated with Claude Code" or similar generated-by notices; "Co-Authored-By: Claude" or
any AI co-author trailer; or any other AI-identifying text, in either the commit message
body or commit trailers/metadata. This applies to all future commits in this repository,
across all future sessions.

**Verification context (not part of the rule itself, but why it's on record now):** the
orchestrating session audited the raw git commit objects (via `git cat-file -p`, not just
`git log`, so full metadata/trailers were checked, not just the summary line) for four
commits created in this session and confirmed none contain any AI attribution — no
"Co-Authored-By: Claude," no model names, no "Generated with Claude Code," no Anthropic
references. This was a verification pass, not a fix — no history was rewritten because
nothing needed fixing. The four commits audited and confirmed clean (independently
cross-checked by this steward against `git log --oneline` on 2026-08-31 and found to
match): `f4ce9d16d5011f9d2814b8d978c1e0e5fc2d3211` ("chore: add BrightPath project
steward memory"), `93d6fa2e778b5383b9ee0f7658608e96ee4b7797` ("docs: record portfolio
metrics policy"), `e94c2358622381e518ea2c0c7116dbfa0335ea1d` ("fix: portfolio
evidence-integrity cleanup (Phase 1)"), `08e91fec0967259f845cb400173ff6db77db8148`
("docs: update steward memory for Phase 1 and deferred Dale Tiffany social review").

**Important operational note for future sessions:** this is a project-level convention
recorded in memory, not a technical enforcement mechanism — there is no commit-msg git
hook or CI check in this repository that blocks a violation. A future session (or this
steward, if ever asked to review a commit before it's made) needs to actively apply this
rule when composing or reviewing commit messages; it will not be caught automatically.

**How to apply:** if this steward is ever asked to review a proposed commit message, or
notices one already made, check it against this policy and flag any AI/Claude/Anthropic
attribution in the subject, body, or trailers (e.g. `Co-Authored-By:`, `Claude-Session:`
lines) as a violation to correct before/after the fact — but per this steward's own hard
constraints, never amend, rewrite, or force-push commit history without the user's
explicit instruction to do so.
