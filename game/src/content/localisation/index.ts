import en from './en.json';
import ta from './ta.json';
import type { LanguageCode } from '../../game/state/types';

// Localisation loader. Strings live in JSON, not scattered through code, so a named
// Tamil reviewer can complete ta.json without touching gameplay logic.

type Tree = { [k: string]: string | Tree };

const TABLES: Record<LanguageCode, Tree> = { en: en as Tree, ta: ta as Tree };

function flatten(tree: Tree, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(tree)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else Object.assign(out, flatten(v, key));
  }
  return out;
}

const FLAT: Record<LanguageCode, Record<string, string>> = {
  en: flatten(TABLES.en),
  ta: flatten(TABLES.ta),
};

export interface Localised {
  text: string;
  /** true when the requested language had no string and English was used instead */
  pending: boolean;
}

/** Resolve a dotted key. Falls back to English when the target language string is empty. */
export function resolve(lang: LanguageCode, key: string): Localised {
  const raw = FLAT[lang]?.[key];
  if (lang !== 'en' && (raw === undefined || raw === '')) {
    return { text: FLAT.en[key] ?? key, pending: true };
  }
  if (raw === undefined) return { text: FLAT.en[key] ?? key, pending: false };
  return { text: raw, pending: false };
}

/** Convenience: just the string. */
export function t(lang: LanguageCode, key: string): string {
  return resolve(lang, key).text;
}

export function allKeys(lang: LanguageCode): string[] {
  return Object.keys(FLAT[lang]);
}

export function flatTable(lang: LanguageCode): Record<string, string> {
  return FLAT[lang];
}
