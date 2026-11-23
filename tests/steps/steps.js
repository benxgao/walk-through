/**
 * The nine phrasings in `walkthrough/tech.md`, and nothing else.
 *
 * A step that is not in the glossary does not exist: the suite's value is that two sessions writing
 * the same check write the same line, and every extra phrasing is one more wording to keep.
 */

import { Given, Then, When } from '@cucumber/cucumber';

import { assertCompiled, assertFolder, metric, value } from './metrics.js';

Given('a walkthrough folder', () => {
  assertFolder();
});

Given('specs compiled once', () => {
  assertCompiled();
});

Given('the journey has not changed since the last compile', () => {
  assertCompiled();
});

When(/^I read (.+)$/, (path) => {
  // Reading is the runner's job: the Then lines do the checking, so nothing is stored here.
  void path;
});

When('the compile runs again', () => {
  throw new Error(
    'no compile verb: walkthrough/specs/ was written by hand (P2 of the card). ' +
      'Nothing re-compiles the journey yet, so this scenario cannot pass.',
  );
});

Then(/^(\w+) (=|>=|<=) (.+)$/, (name, operator, raw) => {
  const actual = metric(name);
  const expected = value(raw);
  const says = `${name} = ${String(actual)}, expected ${operator} ${String(expected)}`;

  const ok =
    operator === '=' ? actual === expected
    : operator === '>=' ? actual >= expected
    : actual <= expected;

  if (!ok) {
    throw new Error(says);
  }
});
