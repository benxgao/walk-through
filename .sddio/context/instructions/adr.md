# ADR

`ADR` records important technical decisions with lasting consequences.

## Create

Create an `ADR` when a decision materially affects:

- architecture
- system boundaries
- major technology choices
- important constraints
- significant trade-offs

## Do Not Create

Do not create an `ADR` for:

- routine implementation choices
- temporary decisions
- obvious local changes
- decisions already captured by an existing ADR

## Shape

- Body: the decision as short bullets.
- `### Alternatives`: one rejected option per bullet, reason inline.
- `### Consequences`: costs and gains as short bullets.
- Omit any section that has nothing to say.
- Follow Entry Style in `instructions.md`.

## What belongs here

- A choice that was made, the option that lost, and what each cost.
- History the code cannot carry: what was tried, what failed, who asked, by when.
- Not falsifiable. An `ADR` is superseded, never corrected in place.
- If a command could prove it, it is a `SPEC`, and only the reason stays here.

## Rule

Record the decision and why it matters.

Do not use `ADR` to describe system requirements or implementation work.
