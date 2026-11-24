# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning: `MAJOR.MINOR.PATCH`,
where a rule change is a `MAJOR` for every consumer copy already in the wild.

## [0.1.0] — 2026-11-24

The first version a consumer can record. Measured: 7 stories, 5 scenarios that run, 2 refusals with
their reasons, `npm run spec` green.

### Added

- `walkthrough/` — the journey format (`rules/journey.md`), this product's own `journey.md`, the
  compiled suite, the decisions store, and the entry skill.
- `walkthrough/decisions/2026-11-24-the-second-compile-is-a-drill.md` — what replaced the scenario
  that could never pass.
- The install: four steps, the consumer's `AGENTS.md` pointer, and the three gotchas that make a
  half-done copy look finished.
- `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`, issue templates.

### Changed

- **The suite is green.** US-7 is refused instead of failing: the compile is a skill verb, so no step
  definition can run it twice. The drill that checks the second compile is recorded instead.
- The spec is a real compile now, not a hand pass — its header is one provenance line, and the rule
  that regenerates it lives in `rules/journey.md`.
- Step glossary: 6 phrasings → 5. Metric vocabulary: 12 → 11 (`diff` left; no scenario may name it).
- `README.md` rewritten as a front page: problem, quick start, one worked example, the path table,
  the install, and what the tool refuses to do.

### Refused

- US-6 — the journey writing source code. Compiles to a `@skip` carrying the reason.
- US-7 — a scenario proving the second compile costs nothing to read. Same shape, different reason.

### Known limits

- The compile is a skill, so it needs `walkthrough/skill/SKILL.md` linked into a skill directory on
  the machine. The folder alone runs the suite; it cannot start the compile.
- No CI. `npm run spec` is the whole loop.
- One consumer has installed this (`small-talk-agents`); its journey is still a draft, so the "a
  person writes one before reading the rules" experiment is unproven.

[0.1.0]: https://github.com/benxgao/walk-through/releases/tag/v0.1.0
