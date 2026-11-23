# Card: walkthrough — a journey you write, a suite you compile

The reasoning behind the product died with each session: which directions lost and why, what a model
said last week, which stack options were already ruled out. Re-defined 2026-11-24: `journey.md` is the
product as one person walks through it, written and argued with as prose; `specs/` is compiled from it
on command, one scenario per story, and re-compiled whenever the journey changes.

The card moved house on 2026-11-24. It was opened in `small-talk-agents`; the product now lives in
`walk-through`, its own repository, and `small-talk-agents` is the first consumer.

Detail behind these conclusions: [`findings.md`](./findings.md).

## Outcome

Measured 2026-11-24, after the hand compile. One sentence: a person reads the journey and knows what
the product will feel like; the stories it carries are already scenarios a runner collects, and the
one that is red is the part nobody has built.

| Metric | Before | After | Command | Verify |
| --- | --- | --- | --- | --- |
| Journey files | 0 | 1 | `ls walkthrough/journey.md \| wc -l` | `= 1` |
| Stories written | 0 | 7 | `grep -c '^### US-' walkthrough/journey.md` | `>= 6` |
| Stories accounted for | n/a | 7 of 7 | `npm run spec` | the `unaccounted = 0` step passes |
| Scenarios the runner collects | 0 | 6 | `npx cucumber-js --dry-run` | 6 scenarios, 0 undefined steps |
| Scenarios that failed before they passed | 0 | 1 red, 0 recovered | `npm run spec` | `5 passed, 1 failed`, naming US-7 |
| Step phrasings a person must learn | n/a | 6 | `sed -n '/^## Step glossary/,/^## What/p' walkthrough/tech.md \| grep -c '^\| \`'` | `<= 10` |

## Contract

What must hold whenever someone reads the folder, not what was intended at the start.

1. **The journey is the source; a `.feature` is output.** Hand-editing a `.feature` is a defect — the
   next compile overwrites it, silently, and the edit was the only record of what someone meant.
2. **Every story is accounted for** — compiled, `@todo`, or `@refuse` with a reason. The report counts
   all three. A story that disappears between compiles is the failure this folder exists to prevent.
3. **IDs are assigned once.** Deleting a story leaves a gap; a number is never reused or renumbered.
   This is what makes a re-compile a diff rather than a rewrite.
4. **`@then` names a count, a comparison, or a string.** Prose is never parsed. If a step definition
   would have to guess, the line is judgement parked in a marker.
5. **Unapproved is `@draft`.** Empty `approved:` still compiles, and CI ignores the result. Iteration
   never blocks; nothing counts until someone says ok.
6. **Nothing is written outside the folder.** The runner reads in; the folder writes nowhere. The
   folder is copied into a consumer as-is, and the copy is the install.

## Decisions

| Decision | Why | Rejected alternative | Enforced by |
| --- | --- | --- | --- |
| Its own folder and vocabulary, no sddio imports | Neither layer reads the other's files, IDs or words; two `SPEC`-shaped things in one repository make a reader guess which binds | Product types added to `sddio_docs/` | `sddio_docs/adr/adr_100.md` |
| Named `walkthrough`, with a `compile` verb | The old name described a view of something that already exists, which stopped being true once the folder became where the product is written down before it is built. A walkthrough is what a person does through a product, and the word is already used for a demo path — nothing invented | `product-view` (a view of what?), `specs/` (collides with sddio's SPEC), `rehearsal` (implies the scenarios are practice rather than binding) | the folder name, and every entry point |
| `journey.md` is the source; `specs/` is compiled on command | The two drafts before this one each died the same way: a generated file a human reads rots silently, and scenarios forced out of an unconverged discussion are fiction. Now the disposable artifact is the machine's, and the person's "ok" is the gate | Compile during the discussion, or hand-write the features | `walkthrough/rules/journey.md` |
| Both gates are fields in the file — `approved:` and `@refuse` | A gate that lives in someone's memory is the failure being fixed; a field is checkable and survives a different session | Refuse to compile until approved, and keep refusals in prose | `walkthrough/rules/journey.md` |
| Four markers, and prose is never parsed | A model reading the narrative invents scenarios that read exactly like agreed ones | Let the compiler interpret the prose | `walkthrough/rules/journey.md` § Six rules |
| Five stores: journey, rules, tech, specs, decisions | Each has a different writer and a different lifetime. A sixth was proposed twice and both times it was a second spelling of one of these | Keep the earlier eight-store design | `walkthrough/AGENTS.md` admission test |
| The compiler is a skill verb, not a build script | "No build step" survives, and the only thing a person must review is a diff somebody wrote in prose | A `bin/compile.sh` with an ID map and its own tests | `walkthrough/skill/SKILL.md` |
| The specs stay in the folder; the runner is pointed at them by one line | A copy under `tests/` drifts, and a drifted test passes for behaviour nobody agreed to | Copy the features in at handoff | `cucumber.mjs` |
| The entry skill lives inside the folder, symlinked out | Both project skill locations are ignored by this repository's `.gitignore`, so a skill outside the folder dies at extraction and on a fresh clone | A skill under `.agents/skills/`, installed per machine | `walkthrough/skill/SKILL.md` |
| Two doors, one authority — `description` discovers, `/walkthrough` is the manual bypass | A model cannot type a slash command, and a person who remembers the rule is the failure the folder exists to remove | `user-invocable-only`, the mode `flow-trail` runs in | `walkthrough/skill/SKILL.md` |
| The product's home is its own repository; a consumer copies the folder | A card in another repository is a card about that repository, and every path in the folder was escaping into a consumer's tree | Submodule, npm package, or keep the card where it was | `sddio_docs/adr/adr_200.md` |
| The first journey is this product, not the consumer's | P1 asks for one scenario failing for the right reason. A journey about a product nobody has built fails seven times and teaches nothing | Keep the small-talk-agents journey here as the example | the red US-7, and a suite that reads this folder |
| Six step phrasings, and a metric vocabulary behind them | A hand compile is how we learn what a compiler must preserve; six phrasings and twelve metrics were enough for seven stories, and every extra one is a step definition nobody reuses | One step per sentence, in prose | `walkthrough/tech.md` |

## Lessons

- **A generated file cannot carry its own notes.** The hand compile annotated six places where the
  mapping was not obvious; the compile that replaces it will delete every one of them. P2 has to
  decide where those notes live — in the journey's markers, or in its own rules — and that is a
  decision nobody had to make while a person was writing the file by hand.
- **`@then` wants to be a comparison.** Seven stories produced exactly one line where prose wanted to
  be a check ("the ids never renumber"), and the format forced it into two metrics. Rule 2 is doing
  the work: every invented scenario starts as a sentence that felt obvious.
- **Two stories in one step share a Given**, because the Given is the step's `@state` and not the
  story's. That reads like copy-paste in a `.feature`, and it is the format working.
- **A `@refuse` story is silence in the suite.** It compiles to a `@skip` scenario whose only content
  is a reason, so the suite cannot prove the refusal — only that someone still remembers it.

## Residual

- **`kill_if`** — two weeks of real product work with no scenario that failed before it passed: this
  is documentation with extra steps, and the folder should be deleted rather than grown.
- **The compile verb is the product and it does not exist.** US-7 is red for that reason and is the
  only thing keeping the promise honest; a US-7 that goes green because someone hand-edited `specs/`
  is the failure mode to watch.
- **Every scenario is `@draft`**, so nothing counts yet. The first approved journey is the first time
  this suite is binding, and nobody has run that experiment.
- **Re-compile churn is unmeasured.** Rule 3 states it; nothing enforces it until P2 runs three times
  over an unchanged journey.
- **A consumer's copy can drift** from this repository, and the compile diff is the only guard.
- **The skill is installed nowhere.** It lives in `walkthrough/skill/` and needs two symlinks before
  `/walkthrough` exists; nothing checks them, and a fresh clone looks identical to a working one.
- **The install test has not run.** It is the next card, and it is what P3's extraction drill becomes.

## Where the proof lives

| Question | Where |
| --- | --- |
| What will the product feel like? | `walkthrough/journey.md` |
| How is a journey written and compiled? | `walkthrough/rules/journey.md` |
| What does it do, in a form that runs? | `walkthrough/specs/` |
| What did we already rule out? | `walkthrough/decisions/`, and every `@refuse` story |
| Why is it a separate folder? | `sddio_docs/adr/adr_100.md` |
| Why does it live here? | `sddio_docs/adr/adr_200.md` |
| How does a session get in? | `walkthrough/skill/SKILL.md`, then `walkthrough/AGENTS.md` |
| What collects the suite? | `walkthrough/tech.md`, then `tests/steps/` |
| Did the record drift? | the suite goes red — there is no separate checker |
| What did we actually see? | [`findings.md`](./findings.md) |
