import { describe, expect, it } from 'vitest';
import {
  allBarriersCleared,
  applyIntervention,
  commitServe,
  consequenceKeyFor,
  evaluateServe,
  freeHelpers,
  freeVessels,
  isArrangementComplete,
} from '../src/game/systems/FeedingSystem';
import { SQUARE_GROUPS } from '../src/content/encounters/square';
import { freshHidden, freshSquareState } from '../src/game/state/types';

describe('FeedingSystem', () => {
  it('starts with 2 helpers, 3 vessels and no cleared barriers', () => {
    const sq = freshSquareState();
    expect(freeHelpers(sq)).toBe(2);
    expect(freeVessels(sq)).toBe(3);
    expect(allBarriersCleared(sq)).toBe(false);
  });

  it('cannot serve without a vessel; the block never mentions barriers', () => {
    const sq = freshSquareState();
    const result = evaluateServe(sq, SQUARE_GROUPS);
    expect(result.canServe).toBe(false);
    expect(result.blockedKey).toBe('square.act.needVessel');
  });

  it('allows serving too early: with a vessel but no barriers cleared, serve proceeds and every group is unreached', () => {
    const sq = freshSquareState();
    applyIntervention(sq, 'placeVessel');
    const result = evaluateServe(sq, SQUARE_GROUPS);
    expect(result.canServe).toBe(true);
    expect(result.allReached).toBe(false);
    expect(result.outcomes.every((o) => !o.reached)).toBe(true);
  });

  it('serving early is a consequence, not a fail: unmet barriers become known (fail-forward)', () => {
    const sq = freshSquareState();
    const hidden = freshHidden();
    applyIntervention(sq, 'placeVessel');
    const result = evaluateServe(sq, SQUARE_GROUPS);
    commitServe(sq, hidden, result);
    expect(sq.servedOnce).toBe(true);
    expect(sq.known.water).toBe(true);
    expect(sq.known.safe_access).toBe(true);
    expect(sq.known.mobility).toBe(true);
    expect(isArrangementComplete(sq)).toBe(false);
  });

  it('helpers are scarce: water + line use both; a third helper assignment fails without blocking mobility', () => {
    const sq = freshSquareState();
    expect(applyIntervention(sq, 'assignWater').ok).toBe(true);
    expect(applyIntervention(sq, 'assignLine').ok).toBe(true);
    expect(freeHelpers(sq)).toBe(0);
    // carryPortion is Manimekalai's own act and needs no helper
    expect(applyIntervention(sq, 'carryPortion').ok).toBe(true);
    expect(allBarriersCleared(sq)).toBe(true);
  });

  it('vessels are scarce: a fourth placement fails', () => {
    const sq = freshSquareState();
    expect(applyIntervention(sq, 'placeVessel').ok).toBe(true);
    expect(applyIntervention(sq, 'placeVessel').ok).toBe(true);
    expect(applyIntervention(sq, 'placeVessel').ok).toBe(true);
    expect(applyIntervention(sq, 'placeVessel').ok).toBe(false);
  });

  it('revision after consequence succeeds: clearing barriers then serving reaches everyone', () => {
    const sq = freshSquareState();
    const hidden = freshHidden();
    applyIntervention(sq, 'placeVessel');
    commitServe(sq, hidden, evaluateServe(sq, SQUARE_GROUPS)); // early serve
    // revise
    applyIntervention(sq, 'assignWater');
    applyIntervention(sq, 'assignLine');
    applyIntervention(sq, 'carryPortion');
    const second = evaluateServe(sq, SQUARE_GROUPS);
    expect(second.allReached).toBe(true);
    commitServe(sq, hidden, second);
    expect(isArrangementComplete(sq)).toBe(true);
  });

  it('each barrier maps to a human consequence key', () => {
    expect(consequenceKeyFor('water')).toBe('know.consWater');
    expect(consequenceKeyFor('safe_access')).toBe('know.consMother');
    expect(consequenceKeyFor('mobility')).toBe('know.consChild');
  });

  it('hidden dimensions stay multi-axis (never a single score)', () => {
    const hidden = freshHidden();
    const keys = Object.keys(hidden);
    // 0.3 adds a `trust` axis (behaviour only, never a bar); still multi-axis, never summed.
    expect(keys.sort()).toEqual(['access', 'dignity', 'safety', 'sustainability', 'trust', 'understanding']);
  });
});
