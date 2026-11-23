# walk-through

**A journey you write, a suite you compile.**

The product as one person walks through it is prose in `walkthrough/journey.md`. Each story carries
four markers, and `/walkthrough compile` turns them into scenarios that run. What someone turned down
stays visible as a `@refuse` line, so the next session does not propose it again with enthusiasm.

```bash
npm install
npm run spec        # the suite, compiled into walkthrough/specs/
npx sddio start     # the entries that constrain the work
```

| Path              | Holds                                                                |
| ----------------- | -------------------------------------------------------------------- |
| `walkthrough/`    | the product: journey, rules, tech, specs, decisions, the entry skill  |
| `flow-trail/`     | the board: what is in flight, what was parked, what was skipped        |
| `sddio_docs/`     | what the code cannot say: why the folder is separate, why here         |
| `tests/steps/`    | one implementation per marker phrase, and the metric vocabulary        |

- Start at [`walkthrough/AGENTS.md`](walkthrough/AGENTS.md). It is the whole rule a session reads
  before it writes, and it is under sixty lines on purpose.
- The suite is red on purpose in one place: US-7 is the compile verb, which does not exist yet.
- `walkthrough/` is copied into a consumer repository, not linked to it — `ADR-002` says why.
