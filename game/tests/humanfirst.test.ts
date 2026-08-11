import { describe, expect, it } from 'vitest';
import { GameState } from '../src/game/state/GameState';
import { freshFlags } from '../src/game/state/types';
import { flatTable, resolve } from '../src/content/localisation';
import { consequenceKeyFor } from '../src/game/systems/FeedingSystem';
import { KNOWLEDGE_TYPES } from '../src/game/state/types';

describe('onboarding flags (one-thing-at-a-time teaching)', () => {
  it('start unset and can be set once', () => {
    const s = new GameState();
    expect(s.flags).toEqual(freshFlags());
    s.setFlag('movedOnce');
    s.setFlag('metChild');
    s.setFlag('learnedOnce');
    expect(s.flags).toEqual({ movedOnce: true, metChild: true, learnedOnce: true });
  });

  it('a new game clears progress flags but keeps language/accessibility', () => {
    const s = new GameState();
    s.language = 'ta';
    s.setFlag('metChild');
    s.resetForNewGame();
    expect(s.language).toBe('ta');
    expect(s.flags).toEqual(freshFlags());
  });
});

describe('simplified Journal labels map to the four internal categories', () => {
  it('every category has a child-friendly label AND a formal word', () => {
    const en = flatTable('en');
    for (const type of KNOWLEDGE_TYPES) {
      expect(en[`journal.type.${type}`], `friendly label for ${type}`).toBeTruthy();
      expect(en[`journal.formal.${type}`], `formal word for ${type}`).toBeTruthy();
    }
    // the friendly labels read as speech, not academic terms
    expect(resolve('en', 'journal.type.observation').text).toBe('I saw this');
    expect(resolve('en', 'journal.type.testimony').text).toBe('Someone told me');
    expect(resolve('en', 'journal.type.inference').text).toBe('I think this means…');
    expect(resolve('en', 'journal.type.assumption').text).toBe("I'm not sure yet");
  });
});

describe('consequences are human, tied to specific people', () => {
  it('each barrier resolves to a person-centred line that exists in English', () => {
    const en = flatTable('en');
    for (const b of ['water', 'safe_access', 'mobility'] as const) {
      const key = consequenceKeyFor(b);
      expect(en[key], `text for ${key}`).toBeTruthy();
    }
    expect(consequenceKeyFor('mobility')).toBe('know.consChild');
  });

  it('no visible developer-style group labels leak into player text', () => {
    const en = flatTable('en');
    for (const [k, v] of Object.entries(en)) {
      expect(/Group \d|Recipient [A-Z]|Mobility Group|Water Group|barrier unresolved/i.test(v), `${k}: "${v}"`).toBe(false);
    }
  });
});
