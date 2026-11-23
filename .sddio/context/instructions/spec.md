# SPEC

`SPEC` contains confirmed, durable system requirements.

## Create

Create or update `SPEC` when:

- a new requirement is confirmed
- an existing requirement changes
- implementation reveals a durable requirement

## Shape

- One requirement per bullet.
- Short statements, not paragraphs.
- The title names the requirement; the body does not repeat it.
- Follow Entry Style in `instructions.md`.

## What belongs here

- A requirement a command could falsify. If no command could fail, it is an `ADR`.
- The smallest statement a test could assert, and the check that asserts it.
- What must stay true when the code changes — not a description of how it works now.
- Not a copy of a rule that `.sddio/context/instructions/` already ships.
- Not a layout, a file list, or a flag's behaviour: those are read from the repository.

## Claims

- A bullet may carry one line: `- Check: <command> → <expected substring>`.
- `sddio check --claims` runs it at the repository root and compares the output.
- A claim whose command fails, or whose output misses the text, is drift — reported, not crashed.
- A bullet without a claim is acceptable. A claim nobody can run is not.

## Rules

- Record what the system must do, not how it is implemented.
- A requirement that can be checked names the command that checks it, and the value it must return.
- A requirement that cannot be checked says it is judgement, instead of inventing a check.
- Prefer existing entries over duplicates.
- Keep requirements independently understandable.
- Do not record assumptions or temporary behavior.

## Source of Truth

`SPEC` describes confirmed requirements.

The repository describes actual implementation behavior.

If they conflict, use Reconciliation to determine which is stale.
