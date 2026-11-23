---
name: walkthrough
description: Use when someone wants to say what a product feels like for the person using it, or to turn that into scenarios that run — "what does this feel like", "add a story", "compile the journey", "what did we refuse". Operates on walkthrough/ in the current repository.
---

# walkthrough

Three verbs. All of them read `walkthrough/AGENTS.md` first, and none restates a rule found there.

## answer

The person asks what the product is, why a story exists, or what was turned down. Read
`walkthrough/journey.md` and `walkthrough/decisions/`. Reply with the step, the story ID and the
decision — three lines. Do not summarise the folder back at them.

## compile

`/walkthrough compile` — read `walkthrough/journey.md`, write `walkthrough/specs/<journey>.feature`.
One scenario per story: `@state` becomes Given, `@when` becomes When, each `@then` a Then/And, tagged
`@us-<n>`. An unchanged ID keeps byte-identical wording. Report added, changed, refused and todo as
separate lists; a story with no observable `@then` is reported, never compiled. With `approved:`
empty, every scenario carries `@draft`.

## write

The person dictates a step, a story or a refusal. Edit `walkthrough/journey.md` only: prose freely,
markers by the six rules in `walkthrough/rules/journey.md`. Never edit `specs/` — it is output.
