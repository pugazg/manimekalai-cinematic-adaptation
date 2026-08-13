import type { Helper, HelperTask, SquareState } from '../state/types';

// 0.3 helper logistics. Two named locals can each take ONE job at a time, and can be
// MOVED between jobs (reversible). There are three jobs a helper can cover — water,
// crowd, carry — but only two helpers, so the player cannot cover everything with
// helpers alone. Manimekalai can reach Paati herself, which is how a careful player
// frees a helper. This creates a real trade-off without any timer or score.
//
// Pure and framework-free so it is fully unit-testable. `cleared` is always DERIVED
// from (helpers, paatiByMani), which is what makes moving a helper genuinely reversible.

/** Jobs a helper can be asked to do (not 'idle'). */
export const ASSIGNABLE_TASKS: Exclude<HelperTask, 'idle'>[] = ['water', 'crowd', 'carry'];

export function helperOn(sq: SquareState, task: HelperTask): Helper | undefined {
  return sq.helpers.find((h) => h.task === task);
}

export function idleHelper(sq: SquareState): Helper | undefined {
  return sq.helpers.find((h) => h.task === 'idle');
}

export function busyHelpers(sq: SquareState): Helper[] {
  return sq.helpers.filter((h) => h.task !== 'idle');
}

export function helperById(sq: SquareState, id: string): Helper | undefined {
  return sq.helpers.find((h) => h.id === id);
}

/** Re-derive which barriers are reached from who is doing what + Manimekalai's own act. */
export function recomputeCleared(sq: SquareState): void {
  sq.cleared.water = !!helperOn(sq, 'water');
  sq.cleared.safe_access = !!helperOn(sq, 'crowd');
  sq.cleared.mobility = sq.paatiByMani || !!helperOn(sq, 'carry');
  sq.helpersUsed = busyHelpers(sq).length;
}

export interface HelperActionResult {
  ok: boolean;
  /** true when the action moved a helper off a previous job (a reversal) */
  reassigned: boolean;
  /** the helper involved, for a human message */
  helper?: Helper;
  /** true when nobody is free and the caller should offer to move someone */
  needsChoice?: boolean;
}

/**
 * Ask a FREE helper to take a job. If none is free, returns needsChoice so the UI can
 * offer to move a busy helper instead (see moveHelperTo).
 */
export function assignFreeHelper(sq: SquareState, task: Exclude<HelperTask, 'idle'>): HelperActionResult {
  if (helperOn(sq, task)) return { ok: false, reassigned: false, helper: helperOn(sq, task) };
  const free = idleHelper(sq);
  if (!free) return { ok: false, reassigned: false, needsChoice: true };
  free.task = task;
  recomputeCleared(sq);
  return { ok: true, reassigned: false, helper: free };
}

/**
 * Move a specific helper to a new job. Whatever they were doing is uncovered (that is
 * the honest cost of reassigning). Counts as a reassignment when it moves real work.
 */
export function moveHelperTo(
  sq: SquareState,
  helperId: string,
  task: Exclude<HelperTask, 'idle'>,
): HelperActionResult {
  const helper = helperById(sq, helperId);
  if (!helper) return { ok: false, reassigned: false };
  if (helper.task === task) return { ok: false, reassigned: false, helper };
  const wasBusy = helper.task !== 'idle';
  helper.task = task;
  recomputeCleared(sq);
  return { ok: true, reassigned: wasBusy, helper };
}

/** Send a helper back to idle (frees them; uncovers their job). */
export function freeHelper(sq: SquareState, helperId: string): HelperActionResult {
  const helper = helperById(sq, helperId);
  if (!helper || helper.task === 'idle') return { ok: false, reassigned: false, helper };
  helper.task = 'idle';
  recomputeCleared(sq);
  return { ok: true, reassigned: true, helper };
}

/** Manimekalai carries Paati's portion herself — no helper needed; a sticky personal act. */
export function maniCarryToPaati(sq: SquareState): void {
  sq.paatiByMani = true;
  recomputeCleared(sq);
}

/** How many jobs still need covering (for gentle, non-numeric UI hints only). */
export function uncoveredJobs(sq: SquareState): Exclude<HelperTask, 'idle'>[] {
  const out: Exclude<HelperTask, 'idle'>[] = [];
  if (!sq.cleared.water) out.push('water');
  if (!sq.cleared.safe_access) out.push('crowd');
  if (!sq.cleared.mobility) out.push('carry');
  return out;
}
