# Findings: release-v0.1.0

What this card learned. Conclusions live in [`README.md`](./README.md). Ordered by what it costs a
reader **not** to know — not by when it was found. Each entry ends with what cites it, so a claim
that has stopped mattering can be found and retired instead of outliving its usefulness.

## F1 — A red scenario and a broken repository look the same from outside

- **Saw** (2026-11-24, `npm run spec` on a clean clone) — `6 scenarios (5 passed, 1 failed)`, the
  failure being US-7, whose step definition throws on purpose. The card that opened the story called
  the red "the only thing keeping the promise honest"; the front page called it "red on purpose".
  Neither is visible in the exit code, and `npm run spec` exits non-zero.
- **Means** — the honesty was carried by prose around the failure, and prose is what a stranger reads
  last. The same fact, told as a `@refuse` with a reason, survives in the suite as a `@skip` and in
  `decisions/` as a number — and stops the exit code from lying.
- **Cost if unknown** — a visitor's first command fails, they assume the repository is mid-refactor,
  and the distinction between "we chose this" and "nobody has fixed it" costs the project the only
  reader it gets.
- **Not in the code because** — an intentional failure and an accidental one are the same three
  lines of output; only the surrounding document says which. Nothing reads the surrounding document.
- **Cited by** — `README.md` first screen, `walkthrough/journey.md` US-7
- **Check** — `npm run spec; echo $?` exits `0` while the refusal stays counted.

## Reference — what a visitor can check in one command, measured 2026-11-24

| Claim | Command | Before | After |
| --- | --- | --- | --- |
| the suite passes | `npm run spec` | 5 passed, 1 failed | 5 passed, 0 failed |
| refusals are counted | `grep -c '^@refuse' walkthrough/journey.md` | 1 | 2 |
| no CI is promised | `grep -rn 'CI ignores\|CI will ignore\|CI wiring' --include='*.md' walkthrough README.md \| wc -l` | 6 | 0 |
| one phrasing count | `grep -rn 'nine phrasings' tests walkthrough README.md \| wc -l` | 1 | 0 |
| a version exists | `node -p "require('./package.json').version"` | 0.0.0 | 0.1.0 |

## F2 — GitHub's community profile reports a file missing while it is at master

- **Saw** (2026-11-24, `gh api repos/benxgao/walk-through/community/profile`) — `health_percentage`
  85, with `.files.security` and `.files.issue_template` null, while
  `contents/SECURITY.md` and `contents/.github/ISSUE_TEMPLATE/bug_report.yml` both answer 200 and
  render on the website.
- **Means** — the profile endpoint is computed from a cache, so the checklist it feeds answers a
  question about GitHub's index rather than about the repository. A number read there right after a
  push is not evidence of anything.
- **Cost if unknown** — someone re-adds or renames files to satisfy an API that has not refreshed,
  and ends up with two `SECURITY.md` and a second set of issue forms.
- **Not in the code because** — nothing in the repository records when GitHub reindexes it.
- **Dies when** — the endpoint reports both files without a commit in between; on 2026-11-24 it had
  not, an hour after the push.
- **Cited by** — nothing yet.
