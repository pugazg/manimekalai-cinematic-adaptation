import type { GameState } from '../state/GameState';
import {
  type AccessibilitySettings,
  type LanguageCode,
  type SaveData,
  defaultAccessibility,
  freshAftermath,
  freshChoices,
  freshFlags,
  freshHelpers,
  freshHidden,
  freshSquareState,
} from '../state/types';

// Simple local save. Storage is injectable so tests can pass a fake (no browser needed).
// Prototype 0.3 uses schema v3 (adds choice memory + aftermath). A v2 (Prototype 0.2)
// or v1 (0.1) save cannot continue into 0.3's new structure, so it is treated as
// "incompatible" — but we MIGRATE SETTINGS (language, sound, text size) so the player
// keeps their preferences, and never silently corrupt progress.

const SAVE_KEY = 'manimekalai.g2.save';
const LEGACY_V1_KEY = 'manimekalai.g2.save.v1';
const SAVE_VERSION = 3;

export const CURRENT_SAVE_VERSION = SAVE_VERSION;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getStorage(explicit?: StorageLike): StorageLike | null {
  if (explicit) return explicit;
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    // localStorage can throw in some privacy modes.
  }
  return null;
}

export function serialise(state: GameState): SaveData {
  return {
    version: SAVE_VERSION,
    language: state.language,
    section: state.section,
    ledger: state.ledger.map((i) => ({ ...i })),
    square: {
      ...state.square,
      cleared: { ...state.square.cleared },
      known: { ...state.square.known },
      helpers: state.square.helpers.map((h) => ({ ...h })),
    },
    accessibility: { ...state.accessibility },
    hidden: { ...state.hidden },
    flags: { ...state.flags },
    choices: { ...state.choices, peopleSpokenTo: [...state.choices.peopleSpokenTo], peopleSpokenToBeforeServe: [...state.choices.peopleSpokenToBeforeServe] },
    aftermath: { ...state.aftermath },
    updatedAt: Date.now(),
  };
}

export function applySave(state: GameState, data: SaveData): void {
  const base = freshSquareState();
  state.language = data.language ?? 'en';
  state.section = data.section ?? 'title';
  state.ledger = Array.isArray(data.ledger) ? data.ledger.map((i) => ({ ...i })) : [];
  state.square = {
    ...base,
    ...data.square,
    cleared: { ...base.cleared, ...data.square?.cleared },
    known: { ...base.known, ...data.square?.known },
    helpers: Array.isArray(data.square?.helpers) && data.square.helpers.length ? data.square.helpers.map((h) => ({ ...h })) : freshHelpers(),
  };
  state.accessibility = { ...defaultAccessibility(), ...data.accessibility };
  state.hidden = { ...freshHidden(), ...data.hidden };
  state.flags = { ...freshFlags(), ...data.flags };
  state.choices = { ...freshChoices(), ...data.choices, peopleSpokenTo: [...(data.choices?.peopleSpokenTo ?? [])], peopleSpokenToBeforeServe: [...(data.choices?.peopleSpokenToBeforeServe ?? [])] };
  state.aftermath = { ...freshAftermath(), ...data.aftermath };
  state.emit();
}

/**
 * A save exists, matches the current schema, AND has in-game progress (continuable).
 * A save whose section is still 'title' is settings-only (language/sound) — it persists
 * preferences but does not offer "Continue", so first-time players don't see it.
 */
export function hasSave(storage?: StorageLike): boolean {
  const s = getStorage(storage);
  if (!s) return false;
  const raw = s.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw) as SaveData;
    return data.version === SAVE_VERSION && data.section !== 'title';
  } catch {
    return false;
  }
}

/** A save blob exists but is from an older/incompatible schema (v1 or v2). */
export function hasIncompatibleSave(storage?: StorageLike): boolean {
  const s = getStorage(storage);
  if (!s) return false;
  // legacy v1 key from Prototype 0.1
  if (s.getItem(LEGACY_V1_KEY) !== null) return true;
  const raw = s.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    return (JSON.parse(raw) as SaveData).version !== SAVE_VERSION;
  } catch {
    return true;
  }
}

export interface LegacyMigration {
  /** an incompatible (v1/v2) save was found and cleared */
  migrated: boolean;
  /** it contained real in-game progress (so the player should be told it can't continue) */
  hadProgress: boolean;
  /** preferences recovered from it, if any */
  language?: LanguageCode;
  accessibility?: Partial<AccessibilitySettings>;
}

/**
 * Detect an incompatible (0.1/0.2) save, RECOVER its settings, and remove it so it can
 * never be half-loaded. Preferences (language, sound, text size) are preserved; progress
 * is not migrated — 0.3's structure differs, so the player starts a fresh 0.3 game.
 */
export function migrateLegacySettings(storage?: StorageLike): LegacyMigration {
  const s = getStorage(storage);
  if (!s) return { migrated: false, hadProgress: false };

  let language: LanguageCode | undefined;
  let accessibility: Partial<AccessibilitySettings> | undefined;
  let hadProgress = false;
  let found = false;

  const readBlob = (raw: string | null): void => {
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as SaveData;
      if (typeof data !== 'object' || data === null) return;
      if (data.version === SAVE_VERSION) return; // current: not legacy
      found = true;
      if (data.language) language = data.language;
      if (data.accessibility) accessibility = data.accessibility;
      if (data.section && data.section !== 'title') hadProgress = true;
    } catch {
      found = true; // corrupt/unknown blob — treat as legacy so it gets cleared
    }
  };

  readBlob(s.getItem(LEGACY_V1_KEY));
  readBlob(s.getItem(SAVE_KEY));

  if (!found) return { migrated: false, hadProgress: false };

  s.removeItem(LEGACY_V1_KEY);
  s.removeItem(SAVE_KEY);
  return { migrated: true, hadProgress, language, accessibility };
}

export function save(state: GameState, storage?: StorageLike): boolean {
  const s = getStorage(storage);
  if (!s) return false;
  try {
    s.setItem(SAVE_KEY, JSON.stringify(serialise(state)));
    return true;
  } catch {
    return false;
  }
}

export function load(state: GameState, storage?: StorageLike): boolean {
  const s = getStorage(storage);
  if (!s) return false;
  const raw = s.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw) as SaveData;
    if (!data || typeof data !== 'object' || data.version !== SAVE_VERSION) return false;
    applySave(state, data);
    return true;
  } catch {
    return false;
  }
}

export function clearSave(storage?: StorageLike): void {
  const s = getStorage(storage);
  s?.removeItem(SAVE_KEY);
  s?.removeItem(LEGACY_V1_KEY); // also clear any legacy Prototype 0.1/0.2 save
}
