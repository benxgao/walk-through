# Card: publish walk-through at v0.1.0

The repository is public and a stranger's first three commands each returned something false: the
suite is red, the front page promises a CI that does not exist, and there is no version to record
what was copied. This card makes those three true and puts a tag on the result.

Detail behind these conclusions: [`findings.md`](./findings.md).

## Outcome

Published 2026-11-24 as `v0.1.0`. The suite is green because the one story no program could satisfy
is refused with its reason instead of failing, the counts a reader can check in one command are the
counts that are written, and the front page says what the tool is, how to install it, and what it
will not do.

| Metric | Before | After | Command | Verify |
| --- | --- | --- | --- | --- |
| Suite on a fresh clone | 5 passed, 1 failed | 5 passed, 0 failed | `npm run spec` | `npm run spec \| grep -q '5 passed'` |
| Refused stories | 1 | 2 | `grep -c '^@refuse' walkthrough/journey.md` | `= 2` |
| Lines that name a CI | 6 | 0 | `grep -rn 'CI ignores\|CI will ignore\|CI wiring' --include='*.md' walkthrough README.md \| wc -l` | `= 0` |
| Phrasing count written down | 6 in `tech.md`, 9 in `steps.js` | 5 in both | `grep -c '^\| `' <(sed -n '/^## Step glossary/,/^## What/p' walkthrough/tech.md)` | `= 5` |
| Package version | 0.0.0 | 0.1.0 | `node -p "require('./package.json').version"` | `= 0.1.0` |
| Tags | 0 | 1 | `git tag \| wc -l` | `>= 1` |
| Repository description | empty | one sentence | `gh repo view --json description -q .description` | non-empty |
| Storefront files | 1 (README) + LICENSE | 6 + two issue forms | `ls CONTRIBUTING.md CHANGELOG.md SECURITY.md CODE_OF_CONDUCT.md` | all present |

## Contract

What holds once this card is done.

1. **`npm run spec` is green on a fresh clone.** The one scenario that cannot pass is not a scenario
   any more — gate: `npm run spec` → `0 failed`.
2. **A refusal is visible, not deleted.** US-7 stays in the journey with its ID and compiles to a
   `@skip` scenario whose content is the reason — gate: `grep -c '^@refuse' walkthrough/journey.md`
   → `2`.
3. **Nothing in the repository names a CI.** The draft gate is described as a field that nothing here
   enforces — gate: the `CI ignores` grep above → `0`.
4. **The install's file count is exact.** Six files inside the folder after the three deletions, the
   runner config is the seventh at the consumer's root — gate: `find walkthrough -type f | wc -l`
   here → `7`, minus the three instance files.
5. **A consumer can attribute its copy.** `v0.1.0` exists and `CHANGELOG`-free versioning is the
   `package.json` field — gate: `git tag --points-at HEAD` → `v0.1.0`.

## Decisions

| Decision | Why | Rejected alternative | Enforced by |
| --- | --- | --- | --- |
| US-7 becomes `@refuse`, not a passing scenario | The compile is a skill verb with no program behind it, so no step definition can run it twice; `walkthrough` card 2.4 fixed that, and a red scenario is a permanent red | Leave it red and say so on the front page; or invent a program so the step has something to call | `walkthrough/journey.md` US-7, `walkthrough/decisions/` |
| The second compile is checked by a drill, recorded, not by the runner | The drill already produced the number that matters (0 scenario lines moved, 15 comment lines gone); the runner cannot reproduce it, so a compiled green would assert nothing | A `diff` metric asserting `= 0`, which would pass on any run where the compile never happened | `walkthrough/decisions/` |
| `0.1.0`, not `1.0.0` | Three of the five checks a reader can make were false yesterday; one consumer has installed it and its journey is still a draft | Stay at `0.0.0` until the first approved journey | `package.json`, the tag |
| No npm package | `ADR-002` refused a package with `walkthrough init`: four markdown files and one skill do not need a version resolver, and the copy's diff is readable | `npm publish` plus an `init` command | `sddio_docs/adr/adr_200.md` |

## Lessons

None yet.

## Residual

- **The skill's firing is still untested** — two symlinks exist; whether the `description` starts the
  skill needs a session restart (`walkthrough` card, Residual).
- **`walkthrough` card 3.3 and 3.4 stay open** — a person writing a journey before reading the rules,
  and two weeks of use. They live in `flow-trail/doing/walkthrough/`, waiting on a person, not work.
- **No CI, deliberately** — nothing runs the suite on push. If a consumer wants that gate, it is
  theirs to wire; this repository states that instead of implying it.

## Where the proof lives

| Question | Where |
| --- | --- |
| Does the suite pass? | `npm run spec` |
| What was refused, and why? | `walkthrough/journey.md` US-6, US-7; `walkthrough/decisions/` |
| How was the second compile checked? | `walkthrough/decisions/2026-11-24-the-second-compile-is-a-drill.md` |
| What did we actually see? | [`findings.md`](./findings.md) |
