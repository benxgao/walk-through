# Instructions

## Startup

1. Run `npx sddio start`, and read what it prints.
2. Read `writing.md` when you are about to create or change an entry — not before.
3. Load `instructions/<artifact>.md` only for the artifact you are writing.

If no usable `SPEC` exists, load `instructions/bootstrap.md`.

## The cursor

`config.json` holds one commit — the one the knowledge was last reconciled against — and the
hooks. `start` resolves the first and prints the second's effect. Rules: `reconciliation.md`.

- Behind — reconcile before the next decision, not after the next commit.
- The tip is skipped while it is the newest knowledge commit, so amending it changes nothing.
- A cursor whose commit is gone is not an error: the newest knowledge commit is used instead.
- The cursor records commits, not uncommitted work.
- A hook is a declaration. sddio never calls one.

## Finding things

- `sddio brief <path>` — entries that name those paths, titles only.
- `sddio show <id>` — one entry, body included.
- `sddio diff` — which entries a moved file touches, and which files nobody named.
- No command? `grep -rn "^## " sddio_docs/*/` lists the whole index.

## Classify

```text
Requirement   → SPEC        a command could falsify it
Decision      → ADR         only a person can be told why
Uncertainty   → DISCUSSION
Transient     → nothing
```

Work in progress is not a classification. Plans belong to `flow-trail`.

## Entry style

One idea per line. Bullets over paragraphs. Under ~100 characters. Facts only, no history.
Do not restate the title. Reference by ID; never repeat content. One level of nesting.
Omit a section that has nothing to say. Two sentences are two bullets.

Shape test: every line is readable and actionable on its own.

## Where the detail lives

| Need | File |
| --- | --- |
| Writing an entry | `writing.md` |
| SPEC, ADR, DISCUSSION shape | `instructions/spec.md`, `adr.md`, `discussion.md` |
| Schema and IDs | `instructions/entries.md` |
| Reconciliation | `instructions/reconciliation.md` |
| Bootstrap | `instructions/bootstrap.md` |

## Rules that apply everywhere

- Do not invent requirements, create artifacts for completeness, or duplicate existing knowledge.
- Do not load unrelated context, rewrite accurate artifacts, or record transient details.
- A rule that can be checked names the command; one that cannot says it is judgement.
- Write a fact where it is read, and nowhere else.
- Prefer automatic, minimal, reversible actions.
- When intent cannot be determined safely, use `DISCUSSION`.
