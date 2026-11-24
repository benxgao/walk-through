# walk-through

**A journey you write, a suite you compile.**

Every session re-derives what the product is — from a different half of the chat, in a different mood
— and the answer comes back different each time. Here the product lives in one file of prose: one
person walking through it, in order, before anything is built. The scenarios that check it are
compiled from that file on command.

`walkthrough/journey.md` is the source. `walkthrough/specs/` is output. Nobody edits the specs.

```bash
npm install
npm run spec        # 5 scenarios, 5 passed
npx sddio start     # the entries that constrain the work
```

Node 22, ESM, no transpiler. One devDependency is the runner; there is no build step.

## How a story becomes a scenario

Prose is for the reader. Four markers are for the compiler.

```markdown
### US-5 · Wants the suite the runner collects to be the journey itself

@when reads walkthrough/tech.md
@then runner = 1
@then phrasings <= 10
@then spec_scenarios = stories
```

`/walkthrough compile` writes one scenario per story — the step's `@state` becomes the Given, each
`@then` a Then/And, the ID a tag:

```gherkin
@us-5 @draft
Scenario: US-5 Wants the suite the runner collects to be the journey itself
  Given specs compiled once
  When I read walkthrough/tech.md
  Then runner = 1
  And phrasings <= 10
  And spec_scenarios = stories
```

- **A re-compile is a diff, not a rewrite.** An unchanged story keeps byte-identical wording, and an
  ID is assigned once and never renumbered — deleting a story leaves a gap.
- **A want nobody can observe is `@todo`.** If a step definition would have to guess what the sentence
  means, the sentence belongs in prose, not in a marker.
- **A want decided against is `@refuse`**, which compiles to a `@skip` carrying its reason. Seven
  stories here: five scenarios run, two are refused, and the reason survives the session that made it.

## What is in the repository

| Path | Holds | Read it when |
| --- | --- | --- |
| [`walkthrough/AGENTS.md`](walkthrough/AGENTS.md) | the whole rule a session reads before it writes — under 60 lines | **first** |
| [`walkthrough/journey.md`](walkthrough/journey.md) | the product, one person, in order | you want to know what it feels like |
| [`walkthrough/specs/`](walkthrough/specs/) | the compiled suite, never hand-edited | you want to run the claim |
| [`walkthrough/decisions/`](walkthrough/decisions/) | what was turned down, and the number behind it | before proposing it again |
| [`walkthrough/skill/SKILL.md`](walkthrough/skill/SKILL.md) | the entry point: answer, compile, write | you are the agent |
| [`flow-trail/`](flow-trail/) | the board: in flight, parked, skipped | you are resuming work |
| [`sddio_docs/`](sddio_docs/) | why the folder is separate, and why it lives here | you are questioning the shape |

`tests/steps/` holds one implementation per phrasing plus the metric vocabulary; `walkthrough/tech.md`
is the glossary a `@then` line may draw on.

## Install into another repository

Four steps. The folder is **copied**, not linked — [`ADR-002`](sddio_docs/adr/adr_200.md) says why.

```bash
cp -r ../walk-through/walkthrough ./walkthrough     # 1. the product, and this repository's instance with it
rm -rf walkthrough/journey.md walkthrough/specs/*.feature walkthrough/decisions/*.md
npm install --save-dev @cucumber/cucumber           # 2. a runner; no other dependency
printf "export default { paths: ['walkthrough/specs/**/*.feature'], tags: 'not @skip' };\n" > cucumber.mjs
```

**3. Write your own journey, then compile it.** `/walkthrough compile` writes
`walkthrough/specs/<journey>.feature`. Then `npx cucumber-js --dry-run` collects it and prints every
step that does not exist yet — that list is the work, and a green run is *not* what a fresh install
looks like. Twenty undefined steps is a correct install.

**4. Point your `AGENTS.md` at it.** A `description` is read only if the agent happens to look, and
the next session has no reason to:

```markdown
## Product direction

The product as one person walks through it is `walkthrough/journey.md`; `walkthrough/specs/` is
compiled from it and never edited by hand.
Read `walkthrough/AGENTS.md` before writing a story, and change the journey before the spec.
```

| Gotcha | What to do |
| --- | --- |
| The copy carries *this* repository's journey, spec and decisions | Four files are the product; delete the rest before writing your own |
| The skill is per machine, the folder is per repository | Link `walkthrough/skill/SKILL.md` into `~/.agents/skills/walkthrough`; without it the suite still runs, the compile does not start |
| Our `@then` lines are our own code | Take the five phrasings in `walkthrough/tech.md` as an example, and write your steps against your product |

Measured on `small-talk-agents`, 2026-11-24, against `v0.1.0`.

## What it will not do

- **No build step.** The compiler is a skill verb, not a program — there is nothing to install, watch
  or cache, and the only thing to review is a diff in prose.
- **No generated file a person reads.** Prose is never parsed, so the journey can be rewritten freely
  without changing a single scenario.
- **No silent skip.** Every story is compiled, `@todo`, or `@refuse` with a reason. A story that
  disappears between compiles is the failure this folder exists to prevent.
- **No CI shipped.** `npm run spec` is the whole loop; a gate on push is yours to wire.

## License

MIT. See [`LICENSE`](LICENSE).
