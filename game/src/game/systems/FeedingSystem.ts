import type { BarrierType, HiddenDimensions, SquareState } from '../state/types';
import { BARRIER_TYPES } from '../state/types';

/** Anything with an id and a barrier can be evaluated (full RecipientGroup or a lite person). */
export interface BarrierBearer {
  id: string;
  barrier: BarrierType;
}

// Pure feeding/logistics logic. No rendering here, so it is fully unit-testable.
// The Amudhasurabhi makes FOOD unlimited; everything else is scarce and must be arranged.

export type InterventionId =
  | 'assignWater'
  | 'assignLine'
  | 'carryPortion'
  | 'placeVessel';

export interface InterventionResult {
  ok: boolean;
  /** localisation key describing what happened (success or why it failed) */
  messageKey: string;
}

export function freeHelpers(sq: SquareState): number {
  return sq.helpersTotal - sq.helpersUsed;
}

export function freeVessels(sq: SquareState): number {
  return sq.vesselsTotal - sq.vesselsPlaced;
}

/** Apply an intervention to the square state (mutates). Returns success + message key. */
export function applyIntervention(sq: SquareState, id: InterventionId): InterventionResult {
  switch (id) {
    case 'assignWater':
      if (sq.cleared.water) return { ok: false, messageKey: 'square.act.waterDone' };
      if (freeHelpers(sq) <= 0) return { ok: false, messageKey: 'square.act.noHelpers' };
      sq.helpersUsed += 1;
      sq.cleared.water = true;
      sq.known.water = true;
      return { ok: true, messageKey: 'square.act.waterDone' };
    case 'assignLine':
      if (sq.cleared.safe_access) return { ok: false, messageKey: 'square.act.lineDone' };
      if (freeHelpers(sq) <= 0) return { ok: false, messageKey: 'square.act.noHelpers' };
      sq.helpersUsed += 1;
      sq.cleared.safe_access = true;
      sq.known.safe_access = true;
      return { ok: true, messageKey: 'square.act.lineDone' };
    case 'carryPortion':
      // Manimekalai does this herself; no helper needed.
      if (sq.cleared.mobility) return { ok: false, messageKey: 'square.act.portionDone' };
      sq.cleared.mobility = true;
      sq.known.mobility = true;
      return { ok: true, messageKey: 'square.act.portionDone' };
    case 'placeVessel':
      if (freeVessels(sq) <= 0) return { ok: false, messageKey: 'square.act.needVessel' };
      sq.vesselsPlaced += 1;
      return { ok: true, messageKey: 'square.act.vesselDone' };
  }
}

export interface GroupOutcome {
  groupId: string;
  barrier: BarrierType;
  reached: boolean;
}

export interface ServeEvaluation {
  canServe: boolean;
  /** reason key when canServe is false */
  blockedKey?: string;
  outcomes: GroupOutcome[];
  allReached: boolean;
}

/** Evaluate what happens if the player serves now. Does NOT mutate. */
export function evaluateServe(sq: SquareState, groups: BarrierBearer[]): ServeEvaluation {
  if (sq.vesselsPlaced < 1) {
    return { canServe: false, blockedKey: 'square.act.needVessel', outcomes: [], allReached: false };
  }
  const outcomes: GroupOutcome[] = groups.map((g) => ({
    groupId: g.id,
    barrier: g.barrier,
    reached: sq.cleared[g.barrier],
  }));
  const allReached = outcomes.every((o) => o.reached);
  return { canServe: true, outcomes, allReached };
}

/** Commit a serve: record consequences into hidden dims and mark unmet barriers as "known". Mutates. */
export function commitServe(
  sq: SquareState,
  hidden: HiddenDimensions,
  evalResult: ServeEvaluation,
): void {
  if (!evalResult.canServe) return;
  sq.servedOnce = true;
  for (const o of evalResult.outcomes) {
    if (o.reached) {
      hidden.access += 1;
      hidden.dignity += 1;
    } else {
      // A group could not reach the food. Learn why (fail-forward); dignity/access dip.
      sq.known[o.barrier] = true;
      hidden.access -= 1;
      if (o.barrier === 'safe_access') hidden.safety -= 1;
      if (o.barrier === 'mobility') hidden.dignity -= 1;
    }
  }
}

// Human-first consequence text: each barrier is embodied by a specific person the
// player has met (young man / mother / Paati + child), not a system message.
export function consequenceKeyFor(barrier: BarrierType): string {
  switch (barrier) {
    case 'water':
      return 'know.consWater';
    case 'safe_access':
      return 'know.consMother';
    case 'mobility':
      return 'know.consChild';
  }
}

export function allBarriersCleared(sq: SquareState): boolean {
  return BARRIER_TYPES.every((b) => sq.cleared[b]);
}

/** The prototype's success condition: everyone reachable and at least one serve happened. */
export function isArrangementComplete(sq: SquareState): boolean {
  return allBarriersCleared(sq) && sq.servedOnce && sq.vesselsPlaced >= 1;
}
