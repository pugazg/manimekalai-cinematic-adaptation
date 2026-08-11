import { describe, expect, it } from 'vitest';
import { GameState } from '../src/game/state/GameState';
import {
  CURRENT_SAVE_VERSION,
  clearSave,
  hasIncompatibleSave,
  hasSave,
  load,
  save,
  serialise,
  type StorageLike,
} from '../src/game/systems/SaveSystem';

function fakeStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}

const KEY = 'manimekalai.g2.save';

describe('SaveSystem (v2)', () => {
  it('uses schema version 2', () => {
    expect(CURRENT_SAVE_VERSION).toBe(2);
    expect(serialise(new GameState()).version).toBe(2);
  });

  it('round-trips language, section, ledger, square, accessibility and flags', () => {
    const storage = fakeStorage();
    const a = new GameState();
    a.language = 'ta';
    a.section = 'square'; // in-game section → continuable
    a.accessibility.textScale = 'large';
    a.accessibility.soundOn = false;
    a.addLedgerItem({ id: 'wellFar', statementKey: 'know.wellFar', trueType: 'inference', given: false });
    a.classify('wellFar', 'inference');
    a.square.cleared.water = true;
    a.setFlag('metChild');
    expect(save(a, storage)).toBe(true);
    expect(hasSave(storage)).toBe(true);

    const b = new GameState();
    expect(load(b, storage)).toBe(true);
    expect(b.language).toBe('ta');
    expect(b.section).toBe('square');
    expect(b.accessibility.textScale).toBe('large');
    expect(b.accessibility.soundOn).toBe(false);
    expect(b.ledger[0].classifiedAs).toBe('inference');
    expect(b.square.cleared.water).toBe(true);
    expect(b.flags.metChild).toBe(true);
  });

  it('treats a Prototype 0.1 (v1) save as incompatible, not continuable', () => {
    const storage = fakeStorage();
    storage.setItem('manimekalai.g2.save.v1', JSON.stringify({ version: 1, language: 'en' }));
    expect(hasSave(storage)).toBe(false);
    expect(hasIncompatibleSave(storage)).toBe(true);
    clearSave(storage); // clears both legacy and current keys
    expect(hasIncompatibleSave(storage)).toBe(false);
  });

  it('treats a wrong-version blob under the current key as incompatible', () => {
    const storage = fakeStorage();
    storage.setItem(KEY, JSON.stringify({ version: 99 }));
    expect(hasSave(storage)).toBe(false);
    expect(hasIncompatibleSave(storage)).toBe(true);
  });

  it('rejects corrupt saves without throwing', () => {
    const storage = fakeStorage();
    storage.setItem(KEY, '{not json');
    const s = new GameState();
    expect(load(s, storage)).toBe(false);
  });

  it('a title-only (settings) save persists but is not "continuable"', () => {
    const storage = fakeStorage();
    const s = new GameState();
    s.section = 'title';
    s.language = 'ta';
    save(s, storage); // stored (for settings)…
    expect(storage.getItem(KEY)).not.toBeNull();
    expect(hasSave(storage)).toBe(false); // …but no Continue

    // language still loads back
    const b = new GameState();
    expect(load(b, storage)).toBe(true);
    expect(b.language).toBe('ta');
  });

  it('clearSave removes the save', () => {
    const storage = fakeStorage();
    const g = new GameState();
    g.section = 'square';
    save(g, storage);
    expect(hasSave(storage)).toBe(true);
    clearSave(storage);
    expect(hasSave(storage)).toBe(false);
  });
});
