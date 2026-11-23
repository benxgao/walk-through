# Reconciliation

Reconciliation keeps durable project knowledge consistent with implementation.

## Trigger

- **Startup** — the commit check runs on every session, before any work.
- **After work** — after meaningful implementation changes.
- **Hook** — when a hook declared in `config.json` covers `knowledge.reconcile`.
- **Conflict** — when implementation and artifacts disagree.

## Commit Check

Read `reconcileCursor.lastProcessedCommit` in `.sddio/context/config.json`, then pick the commit
to compare it with:

- The newest knowledge commit is `git log -1 --format=%H -- sddio_docs/`.
- If that commit is `HEAD`, compare with `HEAD^` — that commit carried the cursor, and its parent
  is the commit actually reconciled against.
- Otherwise compare with `HEAD`, so the newest change is never skipped.

| State     | Condition                                            | Range                       |
| --------- | ---------------------------------------------------- | --------------------------- |
| current   | no commit sits between the cursor and the reference   | none                        |
| behind    | commits sit between them                              | `cursor..reference`         |
| recovered | the cursor commit no longer exists                    | `newestKnowledge..reference` |
| unknown   | the cursor is `null` or absent                        | current state               |
| nogit     | no repository, or no git binary                       | none                        |

- `current` — no reconciliation; continue with the request.
- `behind` — reconcile only the new commits.
- `recovered` — a rebase, `gc` or a fresh clone removed the cursor; say so, and reconcile from
  the newest knowledge commit instead of treating it as an error.
- `unknown` — first session, or an unfinished bootstrap: verify the artifacts you touch, not the
  whole repository.
- `nogit` — skip the check and leave the cursor untouched.
- No ancestry test is needed: the reference is chosen from `HEAD`, so it always resolves.
- Report the state and the range; do not reconcile silently.

## Cursor Update

After reconciliation completes, in the same commit as the entries:

1. `reconcileCursor.lastProcessedCommit` ← `HEAD`.
2. Preserve `schemaVersion` and `hooks`.
3. Write nothing when the state was `current`.

- Write only after the artifacts are updated.
- Do not advance the cursor when reconciliation is skipped, partial, or abandoned.
- Amending the commit that carries the cursor is safe: until the next commit lands, the check
  compares against its parent.
- The cursor holds commits only; uncommitted work is re-examined on the next run.

## Process

```text
Observe
→ Compare
→ Identify affected artifacts
→ Reconcile
→ Advance cursor
```

Check only affected:

- `SPEC`
- `ADR`
- `DISCUSSION`

Both sides of the range, by name:

```bash
git diff --name-only <range>
```

A changed file matters only if it is named by an entry body in `SPEC`, `ADR`, or `DISCUSSION`. A file no
entry names is not this layer's problem.

## Rules

- Do not rescan unrelated project areas.
- Do not rewrite accurate artifacts.
- Do not create artifacts merely because implementation changed.
- Update the smallest affected artifact.
- Remove or resolve stale information when appropriate.

## Conflict

When implementation and project artifacts disagree:

1. Determine whether the implementation or artifact is stale.
2. Preserve the confirmed requirement.
3. Update the stale representation.
4. If intent cannot be determined, create `DISCUSSION`.
