# tech.md — what runs the suite, and what it rules out

Three choices, each written as the thing it buys and the thing it forbids. A row that rules out
nothing is a preference, not a choice.

## The stack

- Runner: cucumber-js (one devDependency; no build step, no compiled output)
- Language: Node 22, ESM, no transpiler
- Steps: `tests/steps/`, beside the code, because they are code
- Specs: `walkthrough/specs/`, never copied — the runner is pointed at them by one line in
  `cucumber.mjs`: `paths: ['walkthrough/specs/**/*.feature']`

| Choice             | Buys                                                     | Rules out                                        |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------ |
| cucumber-js        | `.feature` files run as written, `--dry-run` finds a gap  | a bespoke runner, and any format we invent first  |
| Node + ESM, no tsc | a clone runs the suite with `npm install && npm run spec` | type checking as a gate; the scenarios stay text  |
| Steps in `tests/`  | one place to read what a marker means                     | step code inside `walkthrough/`, which is copied  |

- `npm run spec` is the whole loop. There is no watch mode, no reporter config and no CI: nothing
  runs this suite on push, and a consumer who wants that gate wires it themselves.
- A scenario tagged `@skip` is excluded by `tags: 'not @skip'` — that is how `@refuse` stays visible
  without being built. A scenario tagged `@draft` still runs here; it marks "not yet approved", and a
  runner that means to gate on approval filters it out.

## Step glossary

Five phrasings, and no sixth without deleting one. The glossary exists because three sessions will
otherwise write three wordings for one check, and every wording is a step definition nobody reuses.

| Phrasing                                                     | Means                                              |
| ------------------------------------------------------------ | -------------------------------------------------- |
| `Given a walkthrough folder`                                  | `AGENTS.md`, `journey.md` and `specs/` all exist    |
| `Given specs compiled once`                                   | at least one `.feature` under `specs/`             |
| `Given the journey has not changed since the last compile`     | a compile left specs behind, and the person says nothing moved |
| `When I read <path>`                                          | the file is read; the `Then` lines do the checking  |
| `Then <metric> <op> <value>`                                  | `=`, `>=`, `<=`; a number, `true`/`false`, or another metric |

## What `<metric>` may be

Every metric is read off the folder, so a claim in a scenario is a command with a name. Adding one
is a code change in `tests/steps/metrics.js`, which is the point: the vocabulary is auditable.

| Metric          | Counted from                                              |
| --------------- | --------------------------------------------------------- |
| `routes`        | the four rows of the route table in `walkthrough/AGENTS.md` |
| `lines`         | lines in `walkthrough/AGENTS.md`                          |
| `stories`       | `### US-<n>` headings in `walkthrough/journey.md`         |
| `unaccounted`   | stories with no `@when`+`@then`, no `@todo`, no `@refuse` |
| `duplicated_ids`| an ID that appears on two stories                         |
| `ids_ascending` | whether the IDs rise in the order the stories appear      |
| `markers`       | rows of the marker table in `walkthrough/rules/journey.md` |
| `rules`         | the numbered rules in the same file                       |
| `runner`        | `- Runner:` lines in this file                            |
| `phrasings`     | rows of the step glossary above                           |
| `spec_scenarios`| `Scenario:` lines under `walkthrough/specs/`              |

## Why not BDD's own tooling defaults

- No `cucumber.yml` per environment, no `world` hierarchy, no custom formatter: the suite is seven
  scenarios and one machine, and every layer added here is a layer a reader has to learn before they
  can check a claim.
- No test double, no fixture. A scenario about a folder reads the folder — the repository is the
  fixture, which is why these scenarios cannot pass in a checkout that is missing the product.
