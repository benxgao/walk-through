---
card: walkthrough
status: open
phases:
  - { id: P1, name: "One journey, compiled by hand once", code: "[x]", verified: "[x]" }
  - { id: P2, name: "The compile verb and its rules", code: "[x]", verified: "[x]" }
  - { id: P3, name: "Install test in the consumer", code: "[x]", verified: "[ ]" }
  - { id: CL, name: "Close", code: "[ ]", verified: "[ ]" }
next: "P3.3 — the consumer's owner rewrites its journey in their own words; P3.4 waits two weeks"
---

# Progress: walkthrough

## Baseline

Measured 2026-11-23, before the first edit, in `small-talk-agents`. `walkthrough/` did not exist; the
whole design lived in one chat and in `sddio_docs/adr/adr_100.md`.

| Metric | Before | Command | Output |
| --- | --- | --- | --- |
| Files under `walkthrough/` | 0 | `find walkthrough -type f 2>/dev/null \| wc -l` | `0` |
| Documents stating a product direction | 0 | `grep -rl '^## Not now' --include='*.md' AGENTS.md flow-trail sddio_docs walkthrough 2>/dev/null \| wc -l` | `0` |
| Cards in `doing/` | 0 | `ls -d flow-trail/doing/*/ 2>/dev/null \| wc -l` | `0` |

> Not measurable yet: how often a direction gets re-derived. The card's own trigger, so it cannot be
> the baseline.
>
> The three zeroes carried to this repository on 2026-11-24: the card moved, the product did not exist
> yet, and the numbers were still true on the other side of the move.

## Phases

Re-cut 2026-11-24, third time. The first cut was a recording system; the second compiled scenarios the
moment a discussion settled; this one reverses the direction of generation — the journey is source, the
specs are output — and adds the move: the product's home is its own repository, so P3 stops being an
extraction drill and becomes an install.

### P1 — One journey, compiled by hand once

**Done 2026-11-24.** Seven stories about this product, one `.feature` written by hand from them, one
scenario red for the right reason.

**Files**: `walkthrough/journey.md`, `walkthrough/specs/a-journey-you-write.feature`,
`walkthrough/tech.md`, `tests/steps/`.

**Verify** (run, output recorded in `findings.md`):

```bash
grep -c '^### US-' walkthrough/journey.md                  # 7
grep -h '^  Scenario' walkthrough/specs/*.feature | wc -l   # 7
npx cucumber-js --dry-run                                   # 6 collected, 0 undefined, US-6 @skip
npm run spec                                                # 5 passed, 1 failed — US-7
```

**Checklist**:

- [x] **1.1 — every story is accounted for**: seven stories, `unaccounted = 0` passes, one `@refuse`
  compiled to `@skip`. Counts are in the session note below, so the next compile has something to
  differ against.
- [x] **1.2 — the journey is one person in order**, four steps, and its prose carries what stories
  cannot: the first minute, the week-later return, why a deletion has to leave a gap.
- [x] **1.3 — `tech.md` names one runner, one language, and a step glossary** of six phrasings, plus
  the twelve metrics those phrasings may name.
- [x] **1.4 — the hand-written feature carries a note per place the compile was not obvious**: six
  numbered notes in the header, and `F2` records that the first real compile deletes them.

### P2 — The compile verb and its rules

**Verified 2026-11-24, in a copy under `/tmp/p2-drill`.** The verb is a skill, so the drill is a person
following `SKILL.md` on a copy of the folder: emit once (the hand spec was the baseline), emit again
with nothing changed, then change one `@then` and emit a third time. The real `specs/` was never
touched — the drill's output is evidence, not the product.

**Verify** (run, numbers in `findings.md`):

```bash
diff hand-written.spec emitted.spec        # 15 comment lines gone, 0 scenario lines changed
# change `@then routes = 4` to `>= 4`, emit again
diff compile1.spec compile3.spec           # 2 lines, one scenario, no other story moved
```

**Checklist**:

- [x] **2.1 — an unchanged journey produces no diff.** Unchanged stories were emitted byte-identically;
  what the emit does *not* keep is the header, and that is `F2`.
- [x] **2.2 — a changed `@then` changes one scenario**, two lines, and no other story moves.
- [x] **2.3 — a story with no observable `@then` is reported, not compiled.** `F3` says the report is
  the only place this is visible: the suite drops `@skip` scenarios before it runs.
- [x] **2.4 — the compiler stays a skill verb with no program behind it.** The only code is
  `tests/steps/`, which reads the folder and cannot write to it.

### P3 — Install test in the consumer

**Installed 2026-11-24; two checks open.** The skill is linked into both harness directories and reads
from both; `small-talk-agents` got the folder, the runner, one config file and a journey of its own.

```bash
cp -r walkthrough ../small-talk-agents/walkthrough      # then delete the three instance files
ln -sfn <repo>/walkthrough/skill ~/.agents/skills/walkthrough
ln -sfn ~/.agents/skills/walkthrough ~/.workbuddy-ai/skills/walkthrough
```

**Checklist**:

- [x] **3.1 — the skill is reachable from both directories, and the harness lists it**: `head -3` reads
  the same `SKILL.md` through `~/.agents/skills/walkthrough` and `~/.workbuddy-ai/skills/walkthrough`,
  and the skill registry reports `walkthrough` enabled with its `description` — model-visible, unlike
  `flow-trail`, which is `user-invocable-only`. Whether the description *fires* needs a fresh session.
- [x] **3.2 — the copy runs where it lands**: `npx cucumber-js --dry-run` in the consumer collects 5
  scenarios and 20 steps, all undefined, with nothing inside the folder moved and one `paths` line
  added. `F5` says that list is the handover.
- [ ] **3.3 — a person writes a journey before reading the rules.** Blocked on the owner: the journey
  installed there is an agent's draft, built from the format's own example, so it cannot answer
  `DISC-001`.
- [ ] **3.4 — `kill_if` is judged.** Needs two weeks of real product work; the clock starts at the
  first consumer journey, which is 3.3.

### CL — Close

- [ ] Durable evidence moved to `findings.md`
- [ ] `## Outcome` carries Before, After and Command
- [ ] Every decision has a `## Decisions` row with its rejected alternative
- [ ] `## Residual` written; "nothing" is valid, silence is not
- [ ] `DISC-001` in `.sddio` resolved against what P1 and P3 actually did
- [ ] Every earlier card this work used has a `usage.md` row; "none" is valid
- [ ] `git rm flow-trail/doing/walkthrough/progress.md`
- [ ] `git mv flow-trail/doing/walkthrough flow-trail/done/walkthrough`

## Session notes

### 2026-11-23 21:40 — opening

- Did: card moved into `doing/`; baseline measured (three zeroes); four phases written from the
  design chat, with `journey.md`, `landscape/tech.md` and a re-authored `rules/writing.md` folded in.
- Verified by: none — nothing is built yet.
- Used: `sddio_docs/adr/adr_100.md` (ADR-001) — the boundary rule became P2.3 and P4.4.
- Tried and dropped: a fifth column for "assumptions" separate from ideas. Dropped because a belief
  without a falsifier is exactly what `kill_if` already refuses; a second place to write it would
  let it survive there.
- Next: P1 — `AGENTS.md` and `rules/writing.md`.
- Blocked on: none.

### 2026-11-24 11:05 — the entry surface

- Did: chose two doors over one. A `description` on a model-visible skill so it fires on its own, and
  `/walkthrough` as the manual bypass for the days it does not. Both end at `walkthrough/AGENTS.md`;
  the skill restates no rule. The file lives **inside** the folder at `walkthrough/skill/SKILL.md`.
- Did: moved the skill from P1 to P2, correcting the previous session note. Its `description` is a
  restatement of `direction.md`, so P1 would write it twice with the first copy a guess.
- Verified by: `grep -A2 skillOverrides ~/.workbuddy-ai/settings.json` → `flow-trail` is
  `user-invocable-only`, i.e. invisible to the model, so a skill in that mode can only ever be started
  by a person typing it.
- Tried and dropped: `user-invocable-only` as the only mode — it makes the record depend on the one
  thing the folder exists to stop depending on.
- Next: P1 — `AGENTS.md` and `rules/writing.md`.
- Blocked on: none.

### 2026-11-24 11:20 — the journey is the source, the suite is compiled

- Did: inverted the generation. `journey.md` is hand-written prose carrying four markers; `specs/` is
  compiled from it on command. Both earlier drafts generated the artifact a person reads, which is why
  both rotted silently.
- Did: wrote `walkthrough/rules/journey.md` — the source language, six rules. The load-bearing one is
  "prose is never parsed": if the compiler needs it, it moves into a marker.
- Tried and dropped: BDD's own `As a / I want / so that` as the source form. Nothing in it is
  observable, so every scenario has to be invented afterwards.
- Tried and dropped: `bin/compile.sh` with an ID map. The compiler is a skill verb; a program would
  need its own tests and would put a build step back into a folder whose whole claim is that it has none.
- Next: P1 — six stories about small-talk-agents, then one hand compile and read the diff.
- Blocked on: one sentence about what the product is, and who the person in the journey is.

### 2026-11-24 11:25 — renamed `walkthrough`, and the verb became `compile`

- Did: renamed the folder and this card from `product-view` to `walkthrough`; the compile verb dropped
  `bdd` for `compile` — a verb in a command names the act, and `bdd` names the format that comes out.
- Why: the old name described a *view* of something that already exists, and that stopped being true the
  moment the folder became the place the product is written down before it is built.
- Verified by: `git status --short` showed the three card files as renames; `flow-trail-lint.sh` 0/0.

### 2026-11-24 12:10 — the card moved house, and P1 is done

- **Moved**: the three card files and `walkthrough/rules/journey.md` left `small-talk-agents` and
  landed here, which is now the product's home (`sddio_docs/adr/adr_200.md`). The consumer keeps
  nothing of it: `small-talk-agents` is the install test and, after that, a consumer.
- **Installed**: `flow-trail 0.7.1` through its own bootstrap (board, `AGENTS.md` pointer, ignore
  line) and `@sddio/cli 0.3.2` through `npm install --save-dev` + `sddio init --hook flow-trail
  --no-install`. The hook is declared; the bootstrap had already run, so `init` did not fetch it twice.
- **Wrote**: `journey.md` — seven stories, four steps, one person. Resolved the block of 11:20 by
  making the person someone who has the product *in this repository*: a journey about a consumer
  nobody has built produces seven reds and teaches nothing, and P1 asks for exactly one.
- **Compiled by hand**: `specs/a-journey-you-write.feature`, one scenario per story, with six
  numbered notes where the mapping was not mechanical (`F2`).
- **Measured**: 7 stories, 6 collected scenarios (US-6 is `@refuse` → `@skip`), 24 steps, `5 passed,
  1 failed` in 0.046s. The failure is US-7, "the compile runs again", and the error names the missing
  behaviour rather than a missing step.
- **Chose**: six step phrasings and twelve metrics, instead of one step per sentence. `tech.md` holds
  the glossary; `tests/steps/metrics.js` holds the implementation, so adding a metric is a code change
  and the vocabulary stays auditable.
- Verified by: `npx cucumber-js --dry-run` (6, 0 undefined), `npm run spec` (1 red, on purpose),
  `npx sddio start`, `flow-trail-lint.sh`.
- Tried and dropped: keeping the small-talk journey here as the example. It is a document about a
  product that does not exist, checked by a suite with nothing to read.
- Next: P2's verification, which is P3 — install into `small-talk-agents`, write its journey, then
  three compiles of one journey with no diff between them.
- Blocked on: acceptance of the folder as it stands. The install test is the next session, by agreement.

### 2026-11-24 13:30 — the install test

- **Installed the skill**: `~/.agents/skills/walkthrough` → `walk-through/walkthrough/skill`, and
  `~/.workbuddy-ai/skills/walkthrough` → that link. Same shape as `flow-trail`'s install, so both
  harness directories read one file. Firing is untested until a session restart.
- **Installed the folder**: `cp -r` into `small-talk-agents` brought 7 files, 4 of which are the
  product. The other 3 — an 87-line journey, a 66-line spec, one decision — are *this* repository's
  instance and had to go (`F4`). The install is now documented as a copy plus three deletions, and
  the decision row says why not a template directory.
- **Wrote the consumer's journey**: six stories about a first-time visitor to a small-talk product,
  built from the format's own example rather than invented from nothing. It is a draft, and it is
  labelled as one: 3.3 wants the owner's words, and 3.3 is still open.
- **Wrote its spec**: `walkthrough/specs/first-visit.feature`, five scenarios plus US-6 as `@skip`.
- **Ran it**: `npx cucumber-js --dry-run` collects 5 scenarios and 20 steps — all 20 undefined, which
  is the consumer's worklist, not a broken install (`F5`). One `paths` line in `cucumber.mjs`, and
  nothing inside the folder moved.
- **Verified P2 in a copy**, not in `specs/`: emitted the suite from the journey, emitted it again
  unchanged, then changed one `@then`. Unchanged stories were byte-identical; the change produced two
  lines and touched no other story. The first real emit also deleted 15 header comment lines — `F2`,
  measured.
- Verified by: the two `head -3` reads through the symlinks, `npx cucumber-js --dry-run` on both
  sides, and the `/tmp/p2-drill` diffs. `flow-trail-lint.sh` 0/0 after the card was rewritten.
- Tried and dropped: a `walkthrough-template/` beside the product. It would be a second tree kept in
  step by hand, which is the drift the card exists to prevent.
- Next: 3.3 — the owner rewrites `small-talk-agents/walkthrough/journey.md`, then compiles it. 3.4
  waits two weeks from that first real journey.
