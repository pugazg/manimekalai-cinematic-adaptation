import { describe, expect, it } from 'vitest';
import {
  assignFreeHelper,
  busyHelpers,
  freeHelper,
  helperOn,
  idleHelper,
  maniCarryToPaati,
  moveHelperTo,
  recomputeCleared,
  uncoveredJobs,
} from '../src/game/systems/HelperSystem';
import { freshSquareState } from '../src/game/state/types';

describe('HelperSystem — two people, three jobs (a real trade-off)', () => {
  it('starts with two idle, named helpers and nothing covered', () => {
    const sq = freshSquareState();
    expect(sq.helpers).toHaveLength(2);
    expect(sq.helpers.every((h) => h.task === 'idle')).toBe(true);
    expect(sq.helpers.every((h) => h.nameKey.startsWith('helper.'))).toBe(true);
    recomputeCleared(sq);
    expect(sq.cleared).toEqual({ water: false, safe_access: false, mobility: false });
  });

  it('a free helper can take a job, which reaches that barrier', () => {
    const sq = freshSquareState();
    const r = assignFreeHelper(sq, 'water');
    expect(r.ok).toBe(true);
    expect(r.helper).toBeDefined();
    expect(sq.cleared.water).toBe(true);
    expect(helperOn(sq, 'water')).toBeDefined();
  });

  it('only two helpers exist: with water + crowd taken, a third job has no one free', () => {
    const sq = freshSquareState();
    expect(assignFreeHelper(sq, 'water').ok).toBe(true);
    expect(assignFreeHelper(sq, 'crowd').ok).toBe(true);
    expect(idleHelper(sq)).toBeUndefined();
    const third = assignFreeHelper(sq, 'carry');
    expect(third.ok).toBe(false);
    expect(third.needsChoice).toBe(true); // UI must offer to MOVE someone, not conjure a helper
    expect(sq.cleared.mobility).toBe(false);
  });

  it('moving a helper is reversible and honest: the old job becomes uncovered', () => {
    const sq = freshSquareState();
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    const waterHelper = helperOn(sq, 'water')!;
    const moved = moveHelperTo(sq, waterHelper.id, 'carry');
    expect(moved.ok).toBe(true);
    expect(moved.reassigned).toBe(true); // moving real work counts as a reassignment
    expect(sq.cleared.water).toBe(false); // uncovered — the honest cost
    expect(sq.cleared.mobility).toBe(true);
    expect(sq.cleared.safe_access).toBe(true);
  });

  it('freeing a helper sends them back to idle and uncovers their job', () => {
    const sq = freshSquareState();
    assignFreeHelper(sq, 'water');
    const h = helperOn(sq, 'water')!;
    const r = freeHelper(sq, h.id);
    expect(r.ok).toBe(true);
    expect(idleHelper(sq)).toBeDefined();
    expect(sq.cleared.water).toBe(false);
  });

  it('Manimekalai can reach Paati herself — a sticky act that frees helpers for water + crowd', () => {
    const sq = freshSquareState();
    maniCarryToPaati(sq);
    expect(sq.cleared.mobility).toBe(true);
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    // the discoverable solution: both helpers on water+crowd, Paati by Manimekalai
    expect(sq.cleared).toEqual({ water: true, safe_access: true, mobility: true });
    expect(busyHelpers(sq)).toHaveLength(2);
    expect(uncoveredJobs(sq)).toEqual([]);
  });

  it('cleared is always derived from who is doing what (no stale state after moves)', () => {
    const sq = freshSquareState();
    assignFreeHelper(sq, 'water');
    assignFreeHelper(sq, 'crowd');
    const h = helperOn(sq, 'crowd')!;
    freeHelper(sq, h.id);
    expect(sq.cleared.safe_access).toBe(false);
    expect(sq.helpersUsed).toBe(1);
  });
});
