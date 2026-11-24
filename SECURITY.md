# Security

## What runs here

There is no service, no network call and no credential in this repository. `npm run spec` starts
cucumber-js, which reads `walkthrough/` and runs the step definitions in `tests/steps/` — local files,
against the copy of the repository the runner was started in. The compile is a skill a person or a
model performs; it does not execute anything either.

The attack surface is therefore two things: the three dependencies (`@cucumber/cucumber`,
`@sddio/cli`, and what they pull in) and the step definitions a consumer writes.

## Supported versions

| Version | Supported |
| --- | --- |
| `0.1.x` | yes |
| `< 0.1` | no — `0.0.0` was never published as a tag |

## Reporting

Report privately, not in an issue: use GitHub's [private vulnerability
reporting](https://github.com/benxgao/walk-through/security/advisories/new), or email
<hi@benxgao.com> if that is unavailable.

- What to include: the version or commit, what you ran, and what happened instead.
- Expect a first reply within a week. This is a one-person project with no on-call.
- If the report is about a dependency, say so and link the advisory; the fix is usually a version
  bump in `package.json`.
