# Usage

One row each time a later task actually used a finding from a card. Append-only; the newest row
goes last, so a diff shows only what was added.

Reading a card is not usage, and neither is a row without a ref that resolves. Two kinds:

- `applied` — the finding changed what was done.
- `falsified` — the finding was no longer true when someone relied on it.

`via` records how it was found, which is the part worth debugging: `grep`, `hook`, `readme`,
`memory` (remembered without reading — plausible, and worth a second look).

| Date | Card | Finding | Kind | Via | Ref | What it changed |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-24 | walkthrough | F4 — the copy is not the install | applied | readme | commit:b2f0903 | the install paragraph now says four product files land and the consumer writes two more, instead of "six files land" |
| 2026-11-24 | walkthrough | F2 — a generated file cannot carry its own notes | applied | grep | commit:b2f0903 | the first real emit deleted the fifteen header lines, so `rules/journey.md` gained a bullet saying the header is regenerated |
