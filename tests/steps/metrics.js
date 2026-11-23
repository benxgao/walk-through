/**
 * The metric vocabulary in `walkthrough/tech.md`, implemented once.
 *
 * Every scenario's `Then <metric> <op> <value>` resolves to a function here. Adding a metric to a
 * journey is therefore a code change in this file, which is deliberate: the vocabulary a scenario may
 * use stays short enough to audit, and a story cannot invent a check nobody implements.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const AGENTS = 'walkthrough/AGENTS.md';
const JOURNEY = 'walkthrough/journey.md';
const RULES = 'walkthrough/rules/journey.md';
const TECH = 'walkthrough/tech.md';
const SPECS = 'walkthrough/specs';

const read = (path) => readFileSync(join(ROOT, path), 'utf8');
const count = (text, pattern) => (text.match(pattern) ?? []).length;

/** The body of one `## <heading>` section, without the heading itself. */
function section(text, heading) {
  const start = text.indexOf(`## ${heading}`);

  if (start === -1) {
    return '';
  }

  const body = text.slice(start + heading.length + 4);
  const end = body.indexOf('\n## ');

  return end === -1 ? body : body.slice(0, end);
}

/** Stories in the order they appear, each with the text that follows it. */
export function stories() {
  const text = read(JOURNEY);
  const heads = [...text.matchAll(/^### US-(\d+) · .*$/gm)].map((match) => ({
    id: Number(match[1]),
    at: match.index,
  }));

  return heads.map((head, index) => ({
    id: head.id,
    body: text.slice(head.at, index + 1 < heads.length ? heads[index + 1].at : text.length),
  }));
}

const unaccounted = () =>
  stories().filter(({ body }) => {
    const compiled = /@when/.test(body) && /@then/.test(body);

    return !compiled && !/@todo/.test(body) && !/@refuse/.test(body);
  }).length;

const duplicatedIds = () => {
  const ids = stories().map(({ id }) => id);

  return ids.length - new Set(ids).size;
};

const idsAscending = () => {
  const ids = stories().map(({ id }) => id);

  return ids.every((id, index) => index === 0 || id > ids[index - 1]);
};

const specScenarios = () =>
  readdirSync(join(ROOT, SPECS))
    .filter((name) => name.endsWith('.feature'))
    .reduce((total, name) => total + count(read(join(SPECS, name)), /^\s*Scenario:/gm), 0);

const diff = () => {
  const out = execFileSync('git', ['diff', '--numstat', '--', SPECS], { cwd: ROOT, encoding: 'utf8' });

  return out.trim() === '' ? 0 : out.trim().split('\n').length;
};

const METRICS = {
  routes: () => count(read(AGENTS), /^\| (read|write|compile|decide)\b/gm),
  lines: () => read(AGENTS).trimEnd().split('\n').length,
  stories: () => stories().length,
  unaccounted,
  duplicated_ids: duplicatedIds,
  ids_ascending: idsAscending,
  markers: () => count(read(RULES), /^\| `(?:##|@|###)/gm),
  rules: () => count(read(RULES), /^\d+\. \*\*/gm),
  runner: () => count(read(TECH), /^- Runner:/gm),
  phrasings: () => count(section(read(TECH), 'Step glossary'), /^\| `/gm),
  spec_scenarios: specScenarios,
  diff,
};

export function metric(name) {
  const measure = METRICS[name];

  if (measure === undefined) {
    throw new Error(
      `unknown metric: ${name}. Known: ${Object.keys(METRICS).join(', ')} — add it in tests/steps/metrics.js`,
    );
  }

  return measure();
}

/** A value on the right of an operator: a number, a boolean, or another metric. */
export function value(raw) {
  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  if (raw === 'true' || raw === 'false') {
    return raw === 'true';
  }

  return metric(raw);
}

export function assertFolder() {
  for (const path of [AGENTS, JOURNEY, SPECS]) {
    if (!existsSync(join(ROOT, path))) {
      throw new Error(`not a walkthrough folder: ${path} is missing`);
    }
  }
}

export function assertCompiled() {
  assertFolder();

  const features = existsSync(join(ROOT, SPECS))
    ? readdirSync(join(ROOT, SPECS)).filter((name) => name.endsWith('.feature'))
    : [];

  if (features.length === 0) {
    throw new Error('no specs compiled yet: walkthrough/specs/ holds no .feature');
  }
}
