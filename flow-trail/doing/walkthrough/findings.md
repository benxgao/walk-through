# Findings: walkthrough

What this card learned. Conclusions live in [`README.md`](./README.md). Ordered by what it costs a
reader **not** to know — not by when it was found. Each entry ends with what cites it, so a claim
that has stopped mattering can be found and retired instead of outliving its usefulness.

## Reference — the folder as built, 2026-11-24

| Path | Holds | Written by |
| --- | --- | --- |
| `AGENTS.md` | the admission test, four routes, three write tiers | a person |
| `rules/journey.md` | the format: four markers, six rules | a person, rarely |
| `journey.md` | the product in one person's words, before it is built | a person, freely in prose |
| `tech.md` | the runner, the language, the step glossary | either |
| `specs/` | the compiled suite, one scenario per story | the compile, never a person |
| `decisions/` | the choice, the reason, the option that lost | a person |
| `skill/SKILL.md` | the entry: answer, compile, write | a person, and it is short on purpose |

## F1 — The trigger is a `description` line; a slash command can only be typed by a person

- **Saw** (2026-11-24, `~/.workbuddy-ai/settings.json` and `ls -la ~/.agents/skills/ ~/.flow-trail`) —
  `skillOverrides` names exactly two skills, both `user-invocable-only`; `flow-trail` installs as two
  symlinks ending at its own checkout; this repository's `.gitignore` hides `.agents/skills/` and the
  project-level `.workbuddy-ai/`.
- **Means** — three consequences for this folder:
  - The switch is one key in a home-directory settings file. Absent from it, the model sees the skill
    and may start it; `user-invocable-only` hides it, so only a typed `/name` reaches it.
  - In the visible mode the `description` is the trigger. `flow-trail`'s is a list of phrases ("plan
    this", "where were we") — that, not `/flow-trail`, is what fires it.
  - A skill under `.agents/skills/` or `.workbuddy-ai/skills/` is in no git repository: both are
    ignored here. So it cannot survive a copy or a fresh clone, and has to ride inside `walkthrough/`
    and be linked out.
- **Cost if unknown** — someone puts the skill in `.agents/skills/`, it works on this machine, and the
  folder shipped to a consumer next month has no entry point at all. The loss is invisible until the
  first clone, and by then the description is stale too.
- **Not in the code because** — the mechanism lives in a settings file in the home directory and two
  symlinks; `git ls-files` shows nothing about which skills exist or who can start them.
- **Cited by** — `flow-trail/doing/walkthrough/README.md` `## Decisions`, the two entry rows; and
  checklist 2.4 by name, because the progress file is deleted at close and a path to it would rot.
- **Check** — `git check-ignore -q .agents/skills/x && git check-ignore -q .workbuddy-ai/skills/x`
  exits 0 while both project locations stay ignored.

## F2 — A generated file cannot carry the notes that explain it

- **Saw** (2026-11-24, hand compile) — the hand pass needed twelve header lines for six places where
  the mapping was not mechanical (`grep -c '^#   [0-9]\.' walkthrough/specs/a-journey-you-write.feature`
  reports 6). They sit in the file the compile owns, and nothing reads them.
- **Means** — the first real compile deletes all six. The knowledge is real — `@state` becoming every
  story's Given, the ID becoming a tag rather than a title, `@refuse` carrying no steps — and it has
  exactly one home that survives: the journey's markers, or P2's own rules. It cannot live in `specs/`.
- **Cost if unknown** — P2 regenerates `specs/`, the annotations vanish, and the next person re-derives
  them from the diff of a file they were told not to read closely. The hand compile's whole purpose was
  to produce those notes before a machine wrote them away.
- **Not in the code because** — no compile exists to have an opinion. Once it does, "where do the
  compiler's own notes live" is a decision, and it is not derivable from the six rules.
- **Cited by** — `README.md` `## Lessons` first bullet, and P2 in the progress file, by name.
- **Check** — `grep -c '^#   [0-9]\.' walkthrough/specs/a-journey-you-write.feature` reports 6 today;
  after the first real compile it reports 0, and that is the moment the notes have to have moved.

## F3 — A refusal is silent in the run and loud only in the report

- **Saw** (2026-11-24, `npx cucumber-js --dry-run`) — 7 stories, 6 scenarios collected: US-6 is
  `@refuse` and compiles to a `@skip` scenario, which `tags: 'not @skip'` removes before it runs.
- **Means** — the suite cannot prove a refusal. Delete the `@refuse` line and the number of collected
  scenarios does not change; the loss shows up nowhere except the compile report, which is chat output
  today and written nowhere.
- **Cost if unknown** — the one outcome the folder calls unacceptable ("a silent skip") has a silent
  failure mode of its own. The count that would catch it — stories against scenarios — is the count
  this design deliberately makes unequal.
- **Not in the code because** — the report is a skill's reply, not a file. Until something writes it,
  "we refused X" is a sentence in a transcript.
- **Cited by** — `README.md` `## Lessons` fourth bullet, and P2.3 in the progress file.
- **Check** — `grep -c '^### US-' walkthrough/journey.md` is 7 while
  `npx cucumber-js --dry-run | grep 'scenarios ('` reports 6; the difference must equal
  `grep -c '^@refuse' walkthrough/journey.md`, which is 1.

## F4 — The copy is not the install

- **Saw** (2026-11-24, install into `small-talk-agents`) — `cp -r` landed 7 files. Four are the
  product (`AGENTS.md`, `rules/`, `tech.md`, `skill/`); three are this repository's instance: an
  87-line `journey.md` about walk-through itself, a 66-line spec compiled from it, and one decision.
  Deleting those three and writing the consumer's own journey left 6 files.
- **Saw** — after the copy, the consumer's `AGENTS.md` said nothing about the folder. `flow-trail`'s
  installer writes its own pointer for exactly this reason, and a `description` is read only if the
  agent looks. The install now ends with that pointer, and it is the fourth step in the `README`.
- **Means** — "the copy is the install" holds only after three deletions *and* one addition, none of
  which the folder can do for itself. A copy that keeps the old spec ends up with two `.feature` files,
  and a copy with no pointer is found only on the days the description happens to fire.
- **Cost if unknown** — the consumer's run goes green or red for reasons unrelated to their product,
  and the first thing they debug is someone else's journey. The check that would catch it here —
  `spec_scenarios = stories` — is a story about the folder, and a consumer's journey has no reason to
  carry it.
- **Not in the code because** — nothing marks which files are the product and which are this
  repository's instance, and nothing outside the folder says the folder exists. The difference is a
  decision someone made, and it is not in a file.
- **Cited by** — the install section in the repository `README.md`, and the decision row that names
  the three deletions.
- **Check** — in a consumer, `ls walkthrough/specs/*.feature | wc -l` is 1,
  `grep -c '^### US-' walkthrough/journey.md` matches that spec's scenario count, and
  `grep -c 'walkthrough/journey.md' AGENTS.md` is 1. Two feature files, a story count that only makes
  sense for another product, or a zero, means the install is half done.

## F5 — A fresh consumer's suite is undefined, and that list is the deliverable

- **Saw** (2026-11-24, `small-talk-agents`) — `npx cucumber-js --dry-run` collects 5 scenarios and
  20 steps, all 20 undefined; cucumber prints the snippet for each. Nothing in the folder had to move
  and the config was one `paths` line.
- **Means** — the install proves *collection*, not execution. "A suite that runs" is the consumer's
  own work, done beside their code; what the folder hands over at install time is the shape and the
  list of steps that do not exist.
- **Cost if unknown** — a reader expecting green after install reads the undefined report as a broken
  install, and starts repairing the folder instead of writing the product.
- **Not in the code because** — no file states what a fresh install should look like. The repository
  README says it now, in one sentence, and that sentence is the only place it is written down.
- **Cited by** — the install section in the repository `README.md`, and P3.2 in the progress file.
- **Check** — `npx cucumber-js --dry-run | grep 'steps ('` reports the same undefined count as
  `npm run spec`; a zero means the consumer has written its steps, which is the next card, not this one.

## Receipts

| What | Command | Output | Date |
| --- | --- | --- | --- |
| Baseline, files under the folder | `find walkthrough -type f \| wc -l` | `0` | 2026-11-23 |
| Baseline, cards in `doing/` | `ls -d flow-trail/doing/*/ \| wc -l` | `0` | 2026-11-23 |
| Which skills hide from the model | `sed -n '/skillOverrides/,+4p' ~/.workbuddy-ai/settings.json` | two entries, both `user-invocable-only` | 2026-11-24 |
| How `flow-trail` is installed | `ls -la ~/.agents/skills/ ~/.flow-trail` | one link into a checkout; `~/.flow-trail` at `0.7.1` | 2026-11-24 |
| Stories the journey declares | `grep -c '^### US-' walkthrough/journey.md` | `7` | 2026-11-24 |
| Scenarios the runner collects | `npx cucumber-js --dry-run` | `6 scenarios`, `0 undefined` | 2026-11-24 |
| What a run costs | `npm run spec` | `5 passed, 1 failed`, `0.046s` | 2026-11-24 |
| Stories nobody can compile | `grep -c '^@refuse' walkthrough/journey.md` | `1` | 2026-11-24 |
| What the copy brings | `find walkthrough -type f \| wc -l` in the consumer, before deletions | `7` — 4 product, 3 instance | 2026-11-24 |
| What a fresh consumer's run says | `npx cucumber-js --dry-run` in `small-talk-agents` | `5 scenarios`, `20 steps (20 undefined)` | 2026-11-24 |
| One changed `@then`, one compile | `diff` compile 1 against compile 3 | `2` lines, one scenario, no other story moved | 2026-11-24 |
| What the first real compile costs | `diff` hand-written spec against the emitted one | `15` comment lines gone, `0` scenario lines changed | 2026-11-24 |
