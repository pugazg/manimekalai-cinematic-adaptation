import type { GameState } from '../state/GameState';
import {
  type SaveData,
  defaultAccessibility,
  freshFlags,
  freshHidden,
  freshSquareState,
} from '../state/types';

// Simple local save. Storage is injectable so tests can pass a fake (no browser needed).
// Prototype 0.2 uses schema v2; a v1 (Prototype 0.1) save cannot migrate and is
// treated as "incompatible" so the player is offered a clean restart.

const SAVE_KEY = 'manimekalai.g2.save';
const SAVE_VERSION = 2;

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
    square: { ...state.square, cleared: { ...state.square.cleared }, known: { ...state.square.known } },
    accessibility: { ...state.accessibility },
    hidden: { ...state.hidden },
    flags: { ...state.flags },
    updatedAt: Date.now(),
  };
}

export function applySave(state: GameState, data: SaveData): void {
  state.language = data.language ?? 'en';
  state.section = data.section ?? 'title';
  state.ledger = Array.isArray(data.ledger) ? data.ledger.map((i) => ({ ...i })) : [];
  state.square = { ...freshSquareState(), ...data.square, cleared: { ...freshSquareState().cleared, ...data.square?.cleared }, known: { ...freshSquareState().known, ...data.square?.known } };
  state.accessibility = { ...defaultAccessibility(), ...data.accessibility };
  state.hidden = { ...freshHidden(), ...data.hidden };
  state.flags = { ...freshFlags(), ...data.flags };
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

/** A save blob exists but is from an older/incompatible schema. */
export function hasIncompatibleSave(storage?: StorageLike): boolean {
  const s = getStorage(storage);
  if (!s) return false;
  // legacy v1 key from Prototype 0.1
  if (s.getItem('manimekalai.g2.save.v1') !== null) return true;
  const raw = s.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    return (JSON.parse(raw) as SaveData).version !== SAVE_VERSION;
  } catch {
    return true;
  }
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
  s?.removeItem('manimekalai.g2.save.v1'); // also clear any legacy Prototype 0.1 save
}
