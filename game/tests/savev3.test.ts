import { describe, expect, it } from 'vitest';
import { GameState } from '../src/game/state/GameState';
import {
  CURRENT_SAVE_VERSION,
  hasIncompatibleSave,
  hasSave,
  load,
  migrateLegacySettings,
  save,
  serialise,
  type StorageLike,
} from '../src/game/systems/SaveSystem';

function fakeStorage(seed: Record<string, string> = {}): StorageLike {
  const map = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}

const KEY = 'manimekalai.g2.save';
const V1_KEY = 'manimekalai.g2.save.v1';

describe('SaveSystem v3 — new choice + aftermath state', () => {
  it('is schema version 3', () => {
    expect(CURRENT_SAVE_VERSION).toBe(3);
  });

  it('round-trips choice memory, helpers and aftermath', () => {
    const storage = fakeStorage();
    const a = new GameState();
    a.section = 'aftermath';
    a.choices.firstPriority = 'water';
    a.choices.peopleSpokenToBeforeServe = ['child', 'youngMan'];
    a.choices.servedEarly = true;
    a.choices.helperReassignments = 2;
    a.choices.localOwner = 'youngMan';
    a.square.helpers[0].task = 'water';
    a.square.paatiByMani = true;
    a.aftermath.started = true;
    a.aftermath.resolved = true;
    expect(save(a, storage)).toBe(true);

    const b = new GameState();
    expect(load(b, storage)).toBe(true);
    expect(b.section).toBe('aftermath');
    expect(b.choices.firstPriority).toBe('water');
    expect(b.choices.peopleSpokenToBeforeServe).toEqual(['child', 'youngMan']);
    expect(b.choices.servedEarly).toBe(true);
    expect(b.choices.helperReassignments).toBe(2);
    expect(b.choices.localOwner).toBe('youngMan');
    expect(b.square.helpers[0].task).toBe('water');
    expect(b.square.paatiByMani).toBe(true);
    expect(b.aftermath.resolved).toBe(true);
  });

  it('serialises version 3 and keeps arrays independent (no shared references)', () => {
    const a = new GameState();
    a.choices.peopleSpokenTo = ['child'];
    const data = serialise(a);
    expect(data.version).toBe(3);
    a.choices.peopleSpokenTo.push('mother');
    expect(data.choices?.peopleSpokenTo).toEqual(['child']); // snapshot, not a live ref
  });
});

describe('Old-save handling — honest, no silent corruption', () => {
  it('treats a Prototype 0.2 (v2) save as incompatible (cannot continue into 0.3)', () => {
    const storage = fakeStorage({ [KEY]: JSON.stringify({ version: 2, section: 'square', language: 'ta' }) });
    expect(hasSave(storage)).toBe(false);
    expect(hasIncompatibleSave(storage)).toBe(true);
  });

  it('migrates SETTINGS from a v2 save (language + accessibility) and drops the progress', () => {
    const storage = fakeStorage({
      [KEY]: JSON.stringify({
        version: 2,
        section: 'square', // had real progress
        language: 'ta',
        accessibility: { textScale: 'large', soundOn: false },
      }),
    });
    const result = migrateLegacySettings(storage);
    expect(result.migrated).toBe(true);
    expect(result.hadProgress).toBe(true);
    expect(result.language).toBe('ta');
    expect(result.accessibility?.textScale).toBe('large');
    // the incompatible blob is gone; nothing left to half-load
    expect(hasIncompatibleSave(storage)).toBe(false);
    expect(storage.getItem(KEY)).toBeNull();
  });

  it('a settings-only v2 save migrates preferences but reports no lost progress', () => {
    const storage = fakeStorage({ [KEY]: JSON.stringify({ version: 2, section: 'title', language: 'ta' }) });
    const result = migrateLegacySettings(storage);
    expect(result.migrated).toBe(true);
    expect(result.hadProgress).toBe(false);
    expect(result.language).toBe('ta');
  });

  it('handles a legacy v1 (Prototype 0.1) key too', () => {
    const storage = fakeStorage({ [V1_KEY]: JSON.stringify({ version: 1, language: 'en' }) });
    const result = migrateLegacySettings(storage);
    expect(result.migrated).toBe(true);
    expect(storage.getItem(V1_KEY)).toBeNull();
  });

  it('does nothing when there is no legacy save', () => {
    const storage = fakeStorage();
    expect(migrateLegacySettings(storage).migrated).toBe(false);
  });

  it('a fresh v3 save with progress is continuable', () => {
    const storage = fakeStorage();
    const g = new GameState();
    g.section = 'square';
    save(g, storage);
    expect(hasSave(storage)).toBe(true);
    expect(hasIncompatibleSave(storage)).toBe(false);
  });
});
