import { describe, expect, it } from 'vitest';
import { freshChoices, freshSquareState, freshHidden } from '../src/game/state/types';
import {
  actedWithoutListening,
  chooseLocalOwner,
  reactiveServeLines,
  recordFirstPriority,
  recordPaatiHelped,
  recordReassign,
  recordServe,
  recordSpokenTo,
} from '../src/game/systems/ChoiceMemory';
import { assignFreeHelper, maniCarryToPaati } from '../src/game/systems/HelperSystem';
import { commitServe, evaluateServe, isArrangementComplete } from '../src/game/systems/FeedingSystem';
import type { SquareState } from '../src/game/state/types';

const GROUPS = [
  { id: 'youngMan', barrier: 'water' as const },
  { id: 'mother', barrier: 'safe_access' as const },
  { id: 'paati', barrier: 'mobility' as const },
];

/** Place a vessel the way the scene does (no helper needed). */
function placeVessel(sq: SquareState): void {
  sq.vesselsPlaced += 1;
}

describe('ChoiceMemory — recording what the player did', () => {
  it('remembers conversation order, and which happened before the first serve', () => {
    const c = freshChoices();
    recordSpokenTo(c, 'child');
    recordSpokenTo(c, 'youngMan');
    recordSpokenTo(c, 'child'); // no duplicates
    expect(c.peopleSpokenToBeforeServe).toEqual(['child', 'youngMan']);
    recordServe(c, freshSquareState(), false);
    recordSpokenTo(c, 'mother'); // after serve → not in the before-serve list
    expect(c.peopleSpokenToBeforeServe).toEqual(['child', 'youngMan']);
    expect(c.peopleSpokenTo).toEqual(['child', 'youngMan', 'mother']);
  });

  it('first priority sticks to the first meaningful action only', () => {
    const c = freshChoices();
    recordFirstPriority(c, 'water');
    recordFirstPriority(c, 'safe_access');
    expect(c.firstPriority).toBe('water');
  });

  it('serving before all barriers are cleared is "early"; fixing it later is a revision', () => {
    const c = freshChoices();
    const sq = freshSquareState();
    placeVessel(sq);
    recordServe(c, sq, false); // early: nothing cleared
    expect(c.servedEarly).toBe(true);
    expect(c.firstServeDone).toBe(true);
    // fix everything, serve again, all reached → revision recorded
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    maniCarryToPaati(sq);
    recordServe(c, sq, true);
    expect(c.revisedPlan).toBe(true);
  });

  it('reactive lines are chosen from real history (small, not a wall of branches)', () => {
    const c = freshChoices();
    recordSpokenTo(c, 'mother');
    recordPaatiHelped(c);
    recordServe(c, (() => { const s = freshSquareState(); s.cleared = { water: true, safe_access: true, mobility: true }; placeVessel(s); return s; })(), true);
    const lines = reactiveServeLines(c);
    expect(lines).toContain('react.childRemembers'); // Paati was reached first
    expect(lines.length).toBeLessThanOrEqual(4);
  });
});

describe('Local ownership varies by how the player played (no menu, no score)', () => {
  it('listen-first, water-led → the young man carries the water on', () => {
    const c = freshChoices();
    ['child', 'carrier', 'youngMan', 'mother', 'paati'].forEach((p) => recordSpokenTo(c, p));
    recordFirstPriority(c, 'water');
    expect(actedWithoutListening(c)).toBe(false);
    expect(chooseLocalOwner(c)).toBe('youngMan');
  });

  it('Paati-first, path-led → the mother keeps the line', () => {
    const c = freshChoices();
    ['child', 'carrier', 'paati', 'mother'].forEach((p) => recordSpokenTo(c, p));
    recordFirstPriority(c, 'safe_access');
    expect(chooseLocalOwner(c)).toBe('mother');
  });

  it('act-first (barely engaged the square people) → locals still lean on Manimekalai', () => {
    const c = freshChoices();
    ['child', 'carrier'].forEach((p) => recordSpokenTo(c, p)); // only the forced opening
    recordFirstPriority(c, 'serve');
    recordServe(c, freshSquareState(), false);
    expect(chooseLocalOwner(c)).toBe('mani');
  });
});

describe('The ending is reachable through DIFFERENT valid action orders (not hard-coded)', () => {
  // A headless "play" over the pure logic proves order-independence.
  it('Scenario A — listen → water → path → Paati → serve', () => {
    const sq = freshSquareState();
    const hidden = freshHidden();
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    maniCarryToPaati(sq);
    placeVessel(sq);
    const ev = evaluateServe(sq, GROUPS);
    expect(ev.allReached).toBe(true);
    commitServe(sq, hidden, ev);
    expect(isArrangementComplete(sq)).toBe(true);
  });

  it('Scenario B — serve early → Paati → water → path → serve', () => {
    const sq = freshSquareState();
    const hidden = freshHidden();
    placeVessel(sq);
    const early = evaluateServe(sq, GROUPS);
    expect(early.canServe).toBe(true);
    expect(early.allReached).toBe(false);
    commitServe(sq, hidden, early);
    maniCarryToPaati(sq);
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    const ev = evaluateServe(sq, GROUPS);
    expect(ev.allReached).toBe(true);
    commitServe(sq, hidden, ev);
    expect(isArrangementComplete(sq)).toBe(true);
  });

  it('Scenario C — Paati → path → serve early → water → serve', () => {
    const sq = freshSquareState();
    const hidden = freshHidden();
    maniCarryToPaati(sq);
    assignFreeHelper(sq, 'crowd');
    placeVessel(sq);
    const early = evaluateServe(sq, GROUPS);
    expect(early.allReached).toBe(false); // water still missing
    commitServe(sq, hidden, early);
    assignFreeHelper(sq, 'water');
    const ev = evaluateServe(sq, GROUPS);
    expect(ev.allReached).toBe(true);
    commitServe(sq, hidden, ev);
    expect(isArrangementComplete(sq)).toBe(true);
  });

  it('the three scenarios do NOT all produce the same recorded history', () => {
    // A: talked to everyone, water first, Paati before serve
    const a = freshChoices();
    ['youngMan', 'mother', 'paati'].forEach((p) => recordSpokenTo(a, p));
    recordFirstPriority(a, 'water');
    recordPaatiHelped(a);
    // B: acted first, served early
    const b = freshChoices();
    recordFirstPriority(b, 'serve');
    recordServe(b, freshSquareState(), false);
    // they differ in the ways that drive later dialogue and ownership
    expect(a.servedEarly).toBe(false);
    expect(b.servedEarly).toBe(true);
    expect(a.paatiHelpedBeforeFirstServe).toBe(true);
    expect(b.paatiHelpedBeforeFirstServe).toBe(false);
    expect(chooseLocalOwner(a)).not.toBe(chooseLocalOwner(b));
  });
});

describe('reassignment is counted', () => {
  it('records each move for the journey recap', () => {
    const c = freshChoices();
    recordReassign(c);
    recordReassign(c);
    expect(c.helperReassignments).toBe(2);
  });
});
