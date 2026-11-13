#!/usr/bin/env node
/**
 * Compares English and Arabic keys in src/i18n/messages.ts.
 * Used by `npm run check:i18n` and the Kiro i18n-key-check hook.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/i18n/messages.ts"), "utf8");

function extractBlock(locale) {
  const marker = `${locale}: {`;
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find locale block for "${locale}" in messages.ts`);
  }
  let i = start + marker.length;
  let depth = 1;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") depth -= 1;
    i += 1;
  }
  return source.slice(start, i);
}

function extractKeys(block) {
  const keys = [];
  const re = /^\s+([A-Za-z][A-Za-z0-9_]*)\s*:/gm;
  let match;
  while ((match = re.exec(block))) {
    keys.push(match[1]);
  }
  return keys;
}

const enKeys = extractKeys(extractBlock("en"));
const arKeys = extractKeys(extractBlock("ar"));

const enSet = new Set(enKeys);
const arSet = new Set(arKeys);
const missingInAr = enKeys.filter((k) => !arSet.has(k));
const missingInEn = arKeys.filter((k) => !enSet.has(k));
const enDupes = enKeys.filter((k, i) => enKeys.indexOf(k) !== i);
const arDupes = arKeys.filter((k, i) => arKeys.indexOf(k) !== i);

if (enDupes.length || arDupes.length || missingInAr.length || missingInEn.length) {
  const lines = [];
  if (enDupes.length) lines.push(`Duplicate English keys: ${enDupes.join(", ")}`);
  if (arDupes.length) lines.push(`Duplicate Arabic keys: ${arDupes.join(", ")}`);
  if (missingInAr.length) lines.push(`Missing in Arabic: ${missingInAr.join(", ")}`);
  if (missingInEn.length) lines.push(`Missing in English: ${missingInEn.join(", ")}`);
  console.error(lines.join("\n"));
  process.exit(1);
}

console.log(`i18n key check passed (${enKeys.length} keys in en and ar).`);
