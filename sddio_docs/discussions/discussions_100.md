# Discussions

<!-- entry -->
---
id: DISC-001
type: question
status: open
refs: [ADR-001, ADR-002]
---

## Which comes first: the journey, or the rules it is written in

- Recommended in the card: direction first — a rule set designed before use is a guess about how
  thinking happens.
- What happened: `rules/journey.md` landed one session before `journey.md`, because the format was
  the thing being argued about. The journey was then written against a rule file that already existed,
  which is the opposite order and cost nothing.
- The version still open: a **consumer's** first journey. Its rules arrive with the folder, so the
  question becomes whether a person can write a journey without reading them.
- What would settle it: the install test. One journey written in a consumer repository, before that
  person reads `rules/journey.md`, then the compile.
- The install test ran 2026-11-24 and did **not** settle it: the journey installed in
  `small-talk-agents` was written by the agent, which had read the rules twice that morning. The
  experiment needs the owner's own first pass.
- Not in the code: nothing records what a person read before they wrote their first story.
