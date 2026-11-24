# Contributing

This repository is a format, not a framework. A rule change is a change to what every consumer's
copy means, so it starts as a story and ends as a diff — not as a patch to `walkthrough/specs/`.

## Before the first edit

```bash
npx sddio start          # the entries that constrain this work
```

Then read, in this order: [`walkthrough/AGENTS.md`](walkthrough/AGENTS.md) (the admission test, under
sixty lines), [`walkthrough/rules/journey.md`](walkthrough/rules/journey.md) (the format), and
[`flow-trail/README.md`](flow-trail/README.md) (work larger than one commit is a card, and a card
records the option that lost).

## Run the suite

```bash
npm install
npm run spec              # 5 scenarios, 5 passed
npx cucumber-js --dry-run # what the runner would collect, steps included
```

A scenario needs a step definition in `tests/steps/`. A new `@then` phrasing is a new implementation
there, and a new metric is a new function in `tests/steps/metrics.js` — the vocabulary is short on
purpose, so adding to it is an argument, not a convenience.

## What a change looks like

- **Change the journey before the spec.** `/walkthrough compile` writes `walkthrough/specs/`; a hand
  edit there is a defect, because the next compile overwrites it silently.
- **A `@then` names a count, a comparison, or a string.** "Feels natural" cannot compile, and prose is
  never parsed.
- **Every decision gets a row with the rejected alternative** — in `flow-trail/…/README.md` while the
  work is open, and in `walkthrough/decisions/` when it changes what the product is.
- **Files are English.** Commit messages too. The conversation around them can be in any language.

## What gets refused

- A build step, a `compile` script, or anything that turns the compile into a program. The compile is
  a skill verb, and that is what keeps the repository free of a second implementation.
- A second place that restates `journey.md` — a summary, a checklist, a "product spec" beside it.
- A scenario that asserts what prose says.
- A new front-matter field without a story that needs it.

## Reporting

Bugs and rule changes use the issue templates. Security reports go to [`SECURITY.md`](SECURITY.md),
not to a public issue.
