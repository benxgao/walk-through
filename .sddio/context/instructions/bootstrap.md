# Bootstrap

Bootstrap establishes the smallest workspace an existing project can use. It is not a documentation
pass, and it does not describe the implementation back to the reader.

## What can be recovered

Only what the repository does not already say:

- a decision that was made and then reversed, and why
- a constraint imposed from outside: who asked, and by when
- a path that was tried and abandoned

## What cannot

Behaviour, layout, flags, file lists, and the shape of a module. Those are in the repository and will
be read there, cheaper and fresher than any summary.

## Process

1. Read history, not code: renames, deletions and rewrites (`git log --diff-filter=DR --name-status`).
2. Write at most six `SPEC` entries. Each is a requirement a command could falsify, and each ends with
   `- Not in the code: <why the repository does not say it>`.
3. Write an `ADR` only for a reversal you can date and explain. Omit the rest.
4. Ask the user up to three questions — the ones whose answers would change future work, and which the
   repository cannot answer.
5. Record at least one `DISCUSSION` for what stays open (SPEC-016).
6. Write the route table described below.

## Route Table

Bootstrap writes `sddio_docs/README.md`, the index that makes its own output findable.

- One row per area that has entries — not one row per entry.
- A row names the area, the `SPEC` range it holds, the `ADR` that governs it, and one sentence of scope.
- Rows only for entries that exist; a placeholder row teaches nothing.
- Regenerate the table when an entry is added or an area appears.

## Honest First Screen

Bootstrap writes a `SPEC` of claims, so it also writes the doubt that qualifies them.

- Always record at least one `DISCUSSION` entry; a bootstrapped workspace with none reads as complete.
- Record the single most material gap — the one whose answer would change future work.
- Prefer: intent behind the code, unverified external dependencies, competing interpretations of the same module.
- Add a second entry only when it changes a different decision; this is a floor, not a quota.
- Never record a decorative question to satisfy this rule.

## Limits

- A bootstrap that produces twenty entries has produced a paraphrase. Six is the ceiling, not the goal.
- Do not restate rules that `.sddio/context/instructions/` already ships.
- Do not repeatedly scan what is already captured in `SPEC`.
- A question is cheaper than a wrong claim; ask before inventing.
