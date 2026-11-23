# walkthrough/ — a journey you write, a suite you compile

The product as one person walks through it lives in `journey.md`. `specs/` is compiled from it.
This file is the only rule a session reads before it writes; `rules/journey.md` is the format.

## The admission test

A sentence belongs in this folder only if all three hold:

1. It changes what the next session builds. A restatement of the code is a defect.
2. It carries a falsifier or a source. A claim nobody can check is an opinion with better formatting.
3. It is about the product, not the implementation. The code says the rest, and says it verifiably.

## Four routes

| Route   | A person says                 | Reads                     | Writes                             |
| ------- | ----------------------------- | ------------------------- | ---------------------------------- |
| read    | "what does this feel like?"   | `journey.md`              | nothing                            |
| write   | "add a story: ..."            | `journey.md`, `rules/`    | `journey.md`, prose and markers    |
| compile | `/walkthrough compile`        | `journey.md`              | `specs/`                           |
| decide  | "we are not doing this"       | `decisions/`              | `decisions/`, one `@refuse` story  |

- Every route ends here. None of them restates a rule that `rules/journey.md` already states.

## Three write tiers

1. **Prose in `journey.md`** — free. Rewrite it whenever a session understands the person better.
   Nothing reads it, so nothing breaks.
2. **Markers in `journey.md`** (`## N ·`, `@state`, `### US-n`, `@when`, `@then`) — they decide what
   compiles. The compile report is the review. An ID is assigned once and never renumbered.
3. **`specs/`** — generated. A hand edit is a defect: the next compile overwrites it without saying so,
   and the edit was the only record of what someone meant.

## What this folder does not do

- It does not write source code, run a suite for you, or hold a backlog. Running is the runner named
  in `tech.md`; what is in flight is `flow-trail/`'s business.
- It does not keep the old versions of a story. What someone turned down is a `@refuse` line or a row
  in `decisions/`, never a paragraph nobody reads.
