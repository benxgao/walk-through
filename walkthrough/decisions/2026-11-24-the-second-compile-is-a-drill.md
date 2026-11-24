# 2026-11-24 — the second compile is a drill, and US-7 is refused

## The choice

- The compile has no program behind it. It is a skill a person or a model performs, and the suite
  cannot perform it: a step definition has nothing to call, so US-7's `diff = 0` can never be
  asserted by a runner.
- US-7 is `@refuse`, compiled to a `@skip` scenario that carries the reason. The check that replaces
  it is a drill, run by a person on a copy: emit once, emit again with nothing changed, change one
  `@then`, emit a third time.
- Measured in that drill on 2026-11-24: `0` scenario lines moved between the second and third emit,
  `15` header comment lines gone between the hand-written spec and the first. The changed `@then`
  produced `2` lines in one scenario and touched no other story.

## Why

- Rule 6 of `rules/journey.md` exists for this: `@refuse` compiles to a `@skip` carrying its reason,
  so a later implementer cannot build the refused thing by accident.
- A red scenario is indistinguishable from a broken repository. `npm run spec` exited non-zero on a
  clean clone, and the sentence that explained why lived in prose a stranger reads last.
- The want is real and stays in the journey with its ID. What is refused is not the want — it is the
  claim that a runner can prove it.

## Rejected

- **Keep it red and say so on the front page.** Every clone pays for a distinction the exit code
  cannot carry, and "red on purpose" is what a repository says when nobody has fixed it.
- **Write a program so the step has something to call.** It contradicts the folder's single claim —
  no build step — and puts a second implementation of the compile beside the skill that is the real
  one. A `bin/compile.sh` with its own tests was already refused.
- **Delete US-7.** IDs are assigned once, and a want that disappears is exactly the silent skip the
  format calls unacceptable.
- **Keep the `diff` metric for later.** No scenario may name it, so it is vocabulary nobody uses,
  and on a dirty tree it would pass while asserting nothing. It is gone from `tech.md` and
  `tests/steps/metrics.js`.

## What it costs

- The second compile is checked by a person following `SKILL.md`, not by the suite. Nothing fails
  when that drill stops being run.
- The refusal is invisible in the run: the suite collects five scenarios out of seven stories, and
  only `grep -c '^@refuse' walkthrough/journey.md` says why the two are missing.
