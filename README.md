# walk-through

**A journey you write, a suite you compile.**

`walkthrough/journey.md` is your product written as one person walking through it — in order, in their
voice, before anything is built. Four markers in that prose are the part a machine reads, so
`/walkthrough compile` can turn every wish into a scenario a runner fails on. `walkthrough/specs/` is
output; nobody edits it.

One story in `walkthrough/journey.md`:

```markdown
## 1 · Opening a conversation with nothing to say

@state signed in, no conversation started

### US-1 · Wants a first line to click on

@when opens the conversation page
@then topics shown = 3
@then the input is empty
```

…and the scenario the compile writes for it:

```gherkin
@us-1 @draft
Scenario: US-1 Wants a first line to click on
  Given signed in, no conversation started
  When opens the conversation page
  Then topics shown = 3
  And the input is empty
```

The half a person reads and the half a runner executes are the same sentences. Neither can change
without the other, which is the entire idea.

## Why this exists

Every session re-derives what the product is — from a different half of the chat, in a different mood
— and the answer comes back different each time. Here it is answered once, in one file, before
anything is built. The suite is compiled from that file on command, so no scenario can describe a
product that stopped being true.

## See it work (one minute)

```bash
npm install
npm run spec        # 5 scenarios, 5 passed
```

Those five check this folder rather than a product nobody has built: seven stories about the folder
itself, two refused on purpose and compiled to `@skip`. Read
[`walkthrough/journey.md`](walkthrough/journey.md) next — one page, and the best example of the format
in existence.

If you never open a terminal, `journey.md` and `decisions/` still do their job. The suite is what keeps
them honest.

## Put it in your repository

Five steps, about half an hour; step 3 is most of it. You need Node 22, 24 or ≥26 (cucumber-js 13
refuses anything else — `node -v` first), git, and an agent that can read files and run commands.
cucumber-js is the only dependency, and there is no build step.

### 1. Copy the folder

The folder is copied, not installed — [`ADR-002`](sddio_docs/adr/adr_200.md) says why. Then delete this
repository's use of it: its journey, its compiled spec, its two decisions.

```bash
git clone --depth 1 https://github.com/benxgao/walk-through /tmp/walk-through
cp -r /tmp/walk-through/walkthrough ./walkthrough
rm walkthrough/journey.md walkthrough/specs/*.feature walkthrough/decisions/*.md
```

What is left is the product: `AGENTS.md`, `rules/`, `skill/`, `tech.md`. What you deleted was one
repository's instance of it.

### 2. Give the runner a config, and your agent the verb

```bash
npm install --save-dev @cucumber/cucumber
npm pkg set scripts.spec="cucumber-js"
```

```js
// cucumber.mjs
export default {
  paths: ['walkthrough/specs/**/*.feature'],
  import: ['tests/steps/**/*.mjs'],   // .mjs, so it runs whether your project is ESM or CommonJS
  tags: 'not @skip',
};
```

`import` is the line that matters. Leave it out and cucumber reads your features, loads none of your
step definitions, and reports every step as undefined forever.

Then link the skill, which is what makes `/walkthrough compile` a verb instead of a file nobody runs:

```bash
mkdir -p ~/.agents/skills
ln -sfn "$PWD/walkthrough/skill" ~/.agents/skills/walkthrough
```

Point it at whichever directory your agent reads skills from — `~/.claude/skills`,
`~/.workbuddy-ai/skills`, or `~/.agents/skills` as above. Without the link the suite still runs; the
compile has nothing to call.

### 3. Write the journey

This is the only part nobody can do for you, and the reason the format is four markers instead of a
schema. Do it with your agent, one step at a time:

> Read `walkthrough/AGENTS.md` and `walkthrough/rules/journey.md`. Then interview me about my product:
> one person, in the order they meet it. One step at a time — ask what they see, then write that step
> into `walkthrough/journey.md`. Prose in my words; markers only where I can name a number.

A step is done when its `@then` lines are counts or comparisons. "Feels natural" is prose, and prose is
never parsed.

### 4. Compile, then collect

```bash
/walkthrough compile        # writes walkthrough/specs/<journey>.feature
npx cucumber-js --dry-run   # N scenarios (N undefined)
```

The undefined list is the work, not a failure. `--dry-run` prints a stub for every step it cannot find:
a stub, an assertion in its body, in `tests/steps/`, and `npm run spec` goes green as you fill them in.
A wall of undefined steps is a correct install; zero means nothing was compiled.

The compile report names its work as four lists, and every story is in exactly one:

```text
added    US-1 … US-7
changed  —
todo     —       a want not testable yet
refused  —       a want decided against; compiles to @skip with its reason
```

### 5. Point `AGENTS.md` at it

An agent reads a file only when something points at it, and the next session has no reason to look.
Write the pointer where it starts:

```markdown
## Product direction

The product as one person walks through it is `walkthrough/journey.md`; `walkthrough/specs/` is
compiled from it and never edited by hand.
Read `walkthrough/AGENTS.md` before writing a story, and change the journey before the spec.
```

### You are done when

| Check | Expect |
| --- | --- |
| `grep '^person:' walkthrough/journey.md` | your person, not "someone who can say what the product is" |
| the compile report | every story added, changed, `@todo` or `@refuse` — nothing silently missing |
| `npx cucumber-js --dry-run` | `N scenarios (N undefined)`: the step definitions still to write |
| `npm run spec` | green, once you have written them |

### Two things that trip up a first install

| Gotcha | What to do |
| --- | --- |
| The copy carries *this* repository's journey, spec and decisions | Four files. Step 1 deletes them; do it before you write your own |
| Our `@then` lines are our own code | Take the five phrasings in [`tech.md`](walkthrough/tech.md) as an example, and write your steps against your product |

*Measured end to end on `small-talk-agents`, 2026-11-24, against `v0.1.0`, and again on a clean copy
the same day.*

## Using it, day to day

Four things you say, and what each one leaves behind:

| You say | What happens | Where it lands |
| --- | --- | --- |
| "what does this feel like?" · "why is US-4 there?" | reads the journey and the decisions, answers in three lines | nothing |
| "add a story: when I open the page, three topics are already there" | prose in your words, then the markers | `journey.md`, a new `US-8` |
| "we are not building X" | a decision with the number behind it, plus a `@refuse` story | `decisions/<date>-<slug>.md` + `journey.md` |
| `/walkthrough compile` | one scenario per story; unchanged IDs keep their wording | `specs/`, which nobody edits |

Then the suite is yours again: a new `@then` shows up as an undefined step, and writing it is the only
work left. Nothing is renumbered, so a step definition keeps naming the story it was written for.

If your agent has no skills, the compile still works: point it at
[`walkthrough/skill/SKILL.md`](walkthrough/skill/SKILL.md) and ask it to follow that file.

## The format, if you are about to write

| Marker | Where | Means |
| --- | --- | --- |
| `## N · <step>` | journey step | one thing the person does or sees, in order |
| `@state` | once per step | the Given for every story in that step |
| `### US-<n> · <want>` | story | one want; the ID is fixed for life |
| `@when` / `@then` | inside a story | the When, then one observable per line |

Everything else is prose, and prose is never parsed. Four consequences worth knowing before you write:
an ID is assigned once and never renumbered, so a deleted story leaves a gap rather than shifting every
number after it; a want nobody can observe is `@todo`; a want decided against is `@refuse`, which
compiles to a `@skip` carrying its reason; and an empty `approved:` tags every scenario `@draft`.

The six rules are in [`rules/journey.md`](walkthrough/rules/journey.md); the vocabulary a `@then` may
draw on is in [`tech.md`](walkthrough/tech.md).

## What it will not do

- **No build step.** The compiler is a skill verb, not a program — nothing to install, watch or cache,
  and the only thing to review is a diff in prose.
- **No generated file a person reads.** Prose is never parsed, so the journey can be rewritten freely
  without changing a single scenario.
- **No silent skip.** Every story is compiled, `@todo`, or `@refuse` with a reason. A story that
  disappears between compiles is the failure this folder exists to prevent.
- **No CI shipped.** `npm run spec` is the whole loop; a gate on push is yours to wire.

## Repository map

| Path | Holds | Read it when |
| --- | --- | --- |
| [`walkthrough/AGENTS.md`](walkthrough/AGENTS.md) | the whole rule a session reads before it writes — under 60 lines | **first** |
| [`walkthrough/journey.md`](walkthrough/journey.md) | the product, one person, in order | you want to know what it feels like |
| [`walkthrough/specs/`](walkthrough/specs/) | the compiled suite, never hand-edited | you want to run the claim |
| [`walkthrough/decisions/`](walkthrough/decisions/) | what was turned down, and the number behind it | before proposing it again |
| [`walkthrough/skill/SKILL.md`](walkthrough/skill/SKILL.md) | the entry point: answer, compile, write | you are the agent |
| [`tests/steps/`](tests/steps/) | one implementation per phrasing, and the metric vocabulary | you are writing a `@then` |
| [`flow-trail/`](flow-trail/) | the board: in flight, parked, skipped | you are resuming work |
| [`sddio_docs/`](sddio_docs/) | why the folder is separate, and why it lives here | you are questioning the shape |

## Contributing

A rule change is a change to what every consumer's copy means, so it starts as a story: the shape of a
change, and what gets refused, is in [`CONTRIBUTING.md`](CONTRIBUTING.md). Issues use the templates;
release history is in [`CHANGELOG.md`](CHANGELOG.md).

## License

MIT. See [`LICENSE`](LICENSE).
