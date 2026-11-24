---
card: release-v0.1.0
status: open
phases:
  - { id: P1, name: "US-7 becomes a refusal, and the suite goes green", code: "[x]", verified: "[x]" }
  - { id: P2, name: "The claims a reader can falsify in one command", code: "[x]", verified: "[x]" }
  - { id: P3, name: "The front page a stranger meets, and the version", code: "[x]", verified: "[x]" }
  - { id: P4, name: "The rest of the storefront", code: "[ ]", verified: "[ ]" }
  - { id: CL, name: "Close", code: "[ ]", verified: "[ ]" }
next: "P4 — contributing, changelog, security, conduct, issue templates"
---

# Progress: release-v0.1.0

## Baseline

Measured 2026-11-24 13:40, after the repository was made public and before the first edit. The
visibility row is the one thing that moved without this card: it was `private` at 13:20 and `public`
by 13:35.

| Metric | Before | Command | Output |
| --- | --- | --- | --- |
| Repository visibility | public | `gh api repos/benxgao/walk-through --jq .visibility` | `public` |
| Repository description | empty | `gh repo view --json description` | `""` |
| Package version | 0.0.0 | `node -p "require('./package.json').version"` | `0.0.0` |
| Tags | 0 | `git tag \| wc -l` | `0` |
| Files uncommitted | 5 | `git status --porcelain \| wc -l` | `5` |
| Suite on a fresh clone | 5 passed, 1 failed | `npm run spec` | `6 scenarios (5 passed, 1 failed)` |
| Lines that name a CI | 6 | `grep -rn 'CI ignores\|CI will ignore\|CI wiring' --include='*.md' walkthrough flow-trail README.md \| wc -l` | `6` |
| Files in `walkthrough/` | 7 | `find walkthrough -type f \| wc -l` | `7` |
| Files the install section promises | "six files land, one of them is the config" | `grep -n 'six files land' README.md` | `1` — the config is a seventh, at the root |

## Phases

### P1 — US-7 becomes a refusal, and the suite goes green

**Goal**: the repository's own front-page command, `npm run spec`, stops failing on a scenario no
program can ever satisfy, without pretending the second compile is checked by the runner.

**Files**: `walkthrough/journey.md` (modify) — US-7's markers become `@refuse`;
`walkthrough/specs/a-journey-you-write.feature` (modify) — US-7 compiles to `@skip` with the reason
in comments, mirroring US-6; `tests/steps/steps.js` (modify) — the throwing `When the compile runs
again` step goes; `walkthrough/tech.md` (modify) — the glossary row goes, five phrasings;
`walkthrough/decisions/` (create) — the choice and the drill that replaces the scenario.

**Verify**:

```bash
npm run spec          # 5 scenarios, 5 passed, 0 failed
npx cucumber-js --dry-run   # 5 collected, 0 undefined
grep -c '^@refuse' walkthrough/journey.md   # 2 (US-6, US-7)
```

**Checklist**:

- [x] **1.1 — the refusal carries the check that does exist**: the reason names the drill and its
  two numbers, so a reader knows what replaced the scenario.
- [x] **1.2 — no scenario is lost silently**: `spec_scenarios` still equals `stories` (7 = 7), and
  the runner collects 7 − 2 refusals = 5.

### P2 — The claims a reader can falsify in one command

**Goal**: every sentence a stranger can check with one command is true on the day they run it.

**Files**: `walkthrough/journey.md` (front-matter comment), `walkthrough/rules/journey.md` (two
places), `walkthrough/tech.md` (two places), `flow-trail/doing/walkthrough/README.md` (Contract 5),
`tests/steps/steps.js` (header comment), `README.md` (install step 2).

**Verify**:

```bash
grep -rn 'CI ignores\|CI will ignore\|CI wiring' --include='*.md' walkthrough README.md   # 0
grep -rn 'nine phrasings' tests walkthrough README.md                                     # 0
```

**Checklist**:

- [x] **2.1 — no line promises a CI**: the draft gate is described as a field nothing enforces here.
- [x] **2.2 — the phrasing count is one number**: `tech.md`, `steps.js` and `README.md` agree.
- [x] **2.3 — the install count is exact**: four product files land, the consumer writes two more,
  and the runner config is one line at the root.

### P3 — The front page a stranger meets, and the version

**Goal**: the repository a visitor lands on says what it is in the first screen, states its own
license, and carries a version a consumer can record.

**Files**: `README.md` (modify) — first paragraph, the red-suite bullet, a license section;
`package.json` (modify) — `0.1.0`.

**Verify**:

```bash
node -p "require('./package.json').version"   # 0.1.0
grep -c '^## License' README.md               # 1
```

**Checklist**:

- [x] **3.1 — the first screen answers "what is this"** without requiring the reader to open
  `walkthrough/`.
- [x] **3.2 — the version is one a consumer can cite**, and `ADR-002`'s "record the version it
  copied" becomes executable.

### P4 — The rest of the storefront

**Goal**: the files GitHub's community profile asks for exist, and each says something only this
repository could say.

**Files**: `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` (create);
`.github/ISSUE_TEMPLATE/bug_report.yml`, `.github/ISSUE_TEMPLATE/rule_change.yml` (create);
`README.md` (modify) — one section pointing at them.

**Verify**:

```bash
ls CONTRIBUTING.md CHANGELOG.md SECURITY.md CODE_OF_CONDUCT.md .github/ISSUE_TEMPLATE/*.yml
gh api repos/benxgao/walk-through/community/profile --jq .health_percentage
```

**Checklist**:

- [x] **4.1 — nothing is boilerplate**: the conduct page is reduced to what applies here, the
  security page says what actually runs, and the second issue form asks for a `@then` because that is
  where most proposals fail.
- [x] **4.2 — the front page points at them**: `README.md` gained one section, not four.

### CL — Close

- [ ] Durable evidence moved to `findings.md`
- [ ] `## Outcome` carries Before, After and Command
- [ ] Every decision has a `## Decisions` row with its rejected alternative
- [ ] `## Residual` written; "nothing" is valid, silence is not
- [ ] Every earlier card this work used has a `usage.md` row; "none" is valid
- [ ] `git rm flow-trail/doing/release-v0.1.0/progress.md`
- [ ] `git mv flow-trail/doing/release-v0.1.0 flow-trail/done/release-v0.1.0`

## Session notes

### 2026-11-24 13:40 — opening

- Did: opened the card, measured the baseline, cut three phases. The `walkthrough` card is parked on
  3.3 (the consumer's owner writes a journey) and 3.4 (two weeks), so **this card is the current
  one** — the board rule allows one, and the other is waiting on a person, not on work.
- Verified by: the baseline table above, each command run in this session.
- Used: `walkthrough` F4 (the copy is not the install) — fixed the README's file count from it.
- Tried and dropped: publishing to npm. `ADR-002`'s rejected-alternatives table already refused a
  package with `walkthrough init`; a new ADR would be needed to overturn it, and nothing in the
  product has changed the reasoning.
- Next: P1.
- Blocked on: none.

### 2026-11-24 13:50 — P1 to P3

- Did: US-7 became `@refuse` and compiled to `@skip`; the throwing step went, `diff` left the metric
  vocabulary, and `walkthrough/decisions/2026-11-24-the-second-compile-is-a-drill.md` records the
  drill that replaces the scenario. The first real emit also deleted the hand compile's fifteen
  header lines — `walkthrough` F2, arriving on schedule — so `rules/journey.md` now says the header
  is regenerated. Six lines that named a CI were rewritten in five files. The README was rewritten
  whole: problem, quick start, one worked story-to-scenario example, a path table with a "read it
  when" column, the install, and what the tool refuses to do.
- Verified by: `npm run spec` → `5 scenarios (5 passed)`, `21 steps`; `npx cucumber-js --dry-run` →
  5 collected; `grep -c '^@refuse' walkthrough/journey.md` → 2; the `CI ignores` grep over
  `walkthrough README.md` → 0; `node -p require('./package.json').version` → 0.1.0.
- Used: `walkthrough` F4 (the copy is not the install) — the README's file count now says four land
  and two are written, which is what F4 measured. `walkthrough` F2 — the header deletion is why
  `rules/journey.md` gained a bullet.
- Tried and dropped: keeping the six compiler notes in the new spec header. A regenerated file cannot
  carry them, and on a public front page "P2 of the card" means nothing to a reader.
- Tried and dropped: keeping the `diff` metric for later use. No scenario may name it, so it is
  vocabulary nobody uses, and on a dirty tree it would pass while asserting nothing.
- Next: CL — commit, tag `v0.1.0`, fill the repository page, then close.
- Blocked on: none.

### 2026-11-24 14:05 — P4, the rest of the storefront

- Did: added `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, and two issue
  forms (`bug_report.yml`, `rule_change.yml`). Each is written against this repository: the
  contributing page refuses a build step and a second summary of the journey, the security page lists
  the actual attack surface (three dependencies and the steps a consumer writes), the conduct page is
  reduced to "argue with the sentence", and the second form asks what a `@then` would name.
- Verified by: `ls` of the five files; `gh api repos/benxgao/walk-through/community/profile` before
  and after (see `findings.md`).
- Used: none.
- Tried and dropped: a `docs/` site. The repository is the documentation, and a second copy of it
  would drift from the one the suite reads.
- Next: CL.
- Blocked on: none.
