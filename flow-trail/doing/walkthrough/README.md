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
| A consumer collects its suite after installing | n/a | 5 scenarios, 20 undefined steps | `npx cucumber-js --dry-run` in `small-talk-agents` | collected; the undefined list is the worklist |
| Change one `@then`, recompile | n/a | 2 lines, one scenario | `diff` the two specs | no other story moves |

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
5. **Unapproved is `@draft`.** Empty `approved:` still compiles, and iteration never blocks; nothing
   counts the result until someone approves it. A runner that means to gate filters `@draft` out, and
   there is no CI here to do it.
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
| The install is a copy, three deletions and one pointer | The folder holds the product *and* this repository's instance side by side, so the copy carries both; and nothing outside the folder says the folder exists, so one section of the consumer's `AGENTS.md` has to. A `walkthrough-template/` beside it would be a second tree to keep in step, which is the drift this card exists to prevent | A template directory, or a `walkthrough init` command | the install section in the repository `README.md` |

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
- **The copy is not the product.** The install brought seven files and only four of them were the
  product; the other three were this repository's journey, its spec and its decision. Nothing in the
  consumer's run notices a stale one. `F4` has the count.
- **A fresh install ends undefined, not green.** Twenty steps in the consumer were undefined on the
  first collection, and that list — not a passing suite — is what the folder hands over.

## Residual

- **`kill_if`** — two weeks of real product work with no scenario that failed before it passed: this
  is documentation with extra steps, and the folder should be deleted rather than grown.
- **The compile verb is the product and it does not exist.** US-7 carries that as a refusal, not a
  red: no step definition can perform a skill, so the second compile is checked by a drill, recorded
  in `walkthrough/decisions/2026-11-24-the-second-compile-is-a-drill.md`. The failure mode to watch
  is hand-editing `specs/` to make a scenario pass, and the Outcome row above still records what P1
  measured while US-7 was red.
- **Every scenario is `@draft`**, so nothing counts yet. The first approved journey is the first time
  this suite is binding, and nobody has run that experiment.
- **Re-compile churn is proved once, by a person.** The drill moved one changed `@then` into two
  lines and left every other story byte-identical. That is a model following a rule, not a program
  enforcing one: three sessions writing the same story still have nothing but this rule between them.
- **A consumer's copy can drift** from this repository, and the compile diff is the only guard.
- **The skill's firing is untested.** Two symlinks exist and `SKILL.md` reads from both; whether the
  `description` starts the skill, and whether `/walkthrough` reaches it, needs a session restart to
  answer. Nothing checks either link.
- **`kill_if` needs a fortnight**, and the clock starts at the first consumer journey. As of today
  the only red-then-green candidate is US-7, and it has not gone green.
- **The consumer's journey is a draft written by the agent** from the format's own example, so
  checklist 3.3 — a person writing one *before* reading the rules — is still unproven. The owner
  overwriting `small-talk-agents/walkthrough/journey.md` is the experiment.

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
