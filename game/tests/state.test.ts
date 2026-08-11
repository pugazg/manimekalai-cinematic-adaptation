import { describe, expect, it } from 'vitest';
import { GameState } from '../src/game/state/GameState';
import { KNOWLEDGE_TYPES } from '../src/game/state/types';

describe('GameState / Ledger classification', () => {
  it('adds ledger items once (no duplicates)', () => {
    const s = new GameState();
    const item = { id: 'reach', statementKey: 'know.reach', given: false } as const;
    expect(s.addLedgerItem({ ...item })).toBe(true);
    expect(s.addLedgerItem({ ...item })).toBe(false);
    expect(s.ledger).toHaveLength(1);
  });

  it('classification is free and revisable — misclassification is allowed (fail-forward, no scoring)', () => {
    const s = new GameState();
    s.addLedgerItem({ id: 'late', statementKey: 'know.late', trueType: 'assumption', given: false });
    s.classify('late', 'observation'); // "wrong" — allowed, no error, no score
    expect(s.ledger[0].classifiedAs).toBe('observation');
    s.classify('late', 'assumption'); // revisable any time
    expect(s.ledger[0].classifiedAs).toBe('assumption');
  });

  it('given items cannot be reclassified', () => {
    const s = new GameState();
    s.addLedgerItem({ id: 'bowlRule', statementKey: 'bowl.rule', given: true });
    s.classify('bowlRule', 'testimony');
    expect(s.ledger[0].classifiedAs).toBeUndefined();
  });

  it('new-game reset preserves language and accessibility but clears progress', () => {
    const s = new GameState();
    s.language = 'ta';
    s.accessibility.textScale = 'large';
    s.addLedgerItem({ id: 'x', statementKey: 'know.reach', given: false });
    s.square.vesselsPlaced = 3;
    s.resetForNewGame();
    expect(s.language).toBe('ta');
    expect(s.accessibility.textScale).toBe('large');
    expect(s.ledger).toHaveLength(0);
    expect(s.square.vesselsPlaced).toBe(0);
    expect(s.section).toBe('puhar');
  });

  it('uses exactly the four prototype categories (not the eventual seven)', () => {
    expect([...KNOWLEDGE_TYPES].sort()).toEqual(['assumption', 'inference', 'observation', 'testimony']);
  });

  it('subscribers are notified on changes', () => {
    const s = new GameState();
    let calls = 0;
    const off = s.subscribe(() => calls++);
    s.setLanguage('ta');
    s.addLedgerItem({ id: 'y', statementKey: 'know.reach', given: false });
    off();
    s.setLanguage('en');
    expect(calls).toBe(2);
  });
});
