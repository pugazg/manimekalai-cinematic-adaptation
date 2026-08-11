import { describe, expect, it } from 'vitest';
import { allKeys, flatTable, resolve } from '../src/content/localisation';

describe('localisation', () => {
  it('ta.json mirrors the exact key structure of en.json', () => {
    expect(allKeys('ta').sort()).toEqual(allKeys('en').sort());
  });

  it('every English string is non-empty (English is the complete development language)', () => {
    const en = flatTable('en');
    const empty = Object.entries(en).filter(([, v]) => v.trim() === '');
    expect(empty).toEqual([]);
  });

  it('empty Tamil strings fall back to English and are flagged pending', () => {
    const r = resolve('ta', 'puhar.intro'); // known-untranslated narrative line
    expect(r.pending).toBe(true);
    expect(r.text.length).toBeGreaterThan(0);
    expect(r.text).toBe(resolve('en', 'puhar.intro').text);
  });

  it('provided Tamil strings are used directly (not pending)', () => {
    const r = resolve('ta', 'menu.newGame');
    expect(r.pending).toBe(false);
    expect(r.text).toBe('புதிய ஆட்டம்');
  });

  it('the Enough word is போதும் in both language tables (approved usage)', () => {
    expect(resolve('ta', 'ending.enoughWord').text).toBe('போதும்');
    expect(resolve('en', 'ending.enoughWord').text).toBe('போதும்');
  });

  it('keys used by core systems exist', () => {
    const en = flatTable('en');
    for (const key of [
      'square.act.needVessel',
      'square.act.noHelpers',
      'know.consWater',
      'know.consMother',
      'know.consChild',
      'journal.type.observation',
      'journal.type.testimony',
      'journal.type.inference',
      'journal.type.assumption',
      'journal.formal.observation',
      'prompt.talkChild',
      'prompt.bringWater',
      'ending.enoughWord',
      'ending.card',
    ]) {
      expect(en[key], `missing key ${key}`).toBeTruthy();
    }
  });
});
