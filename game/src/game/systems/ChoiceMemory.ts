import type { BarrierType, ChoiceMemory, PriorityChoice, SquareState } from '../state/types';
import { allBarriersCleared } from './FeedingSystem';

// 0.3 consequence memory. Pure functions that RECORD what the player did and DERIVE
// how the world should respond later — reactive dialogue and who takes ownership after
// "போதும்". No scoring; every output is a localisation key or a person id.

/** Record a conversation. Order is preserved; conversations before the first serve matter most. */
export function recordSpokenTo(choices: ChoiceMemory, personId: string): void {
  if (!choices.peopleSpokenTo.includes(personId)) choices.peopleSpokenTo.push(personId);
  if (!choices.firstServeDone && !choices.peopleSpokenToBeforeServe.includes(personId)) {
    choices.peopleSpokenToBeforeServe.push(personId);
  }
}

/** Record the first meaningful action the player took (only the first sticks). */
export function recordFirstPriority(choices: ChoiceMemory, priority: PriorityChoice): void {
  if (choices.firstPriority === undefined) choices.firstPriority = priority;
}

/** Record that Paati was reached; before the first serve, that is a distinct kind of care. */
export function recordPaatiHelped(choices: ChoiceMemory): void {
  recordFirstPriority(choices, 'mobility');
  if (!choices.firstServeDone) choices.paatiHelpedBeforeFirstServe = true;
}

/** Record moving a helper from one job to another. */
export function recordReassign(choices: ChoiceMemory): void {
  choices.helperReassignments += 1;
}

/**
 * Record a serve. Serving before every barrier is cleared is "serving early" — not a
 * failure, just a fact the world will remember. A later, all-reached serve after an
 * early one is a revision.
 */
export function recordServe(choices: ChoiceMemory, sq: SquareState, allReached: boolean): void {
  recordFirstPriority(choices, 'serve');
  if (!choices.firstServeDone) {
    choices.firstServeDone = true;
    if (!allBarriersCleared(sq)) choices.servedEarly = true;
  } else if (choices.servedEarly && allReached) {
    choices.revisedPlan = true;
  }
}

const PERSON_FOR_BARRIER: Record<BarrierType, string> = {
  water: 'youngMan',
  safe_access: 'mother',
  mobility: 'paati',
};

/** Was this person spoken to before the first serve? */
export function spokeToBeforeServe(choices: ChoiceMemory, personId: string): boolean {
  return choices.peopleSpokenToBeforeServe.includes(personId);
}

/** Barely engaged: the player mostly acted rather than listening before serving. */
export function actedWithoutListening(choices: ChoiceMemory): boolean {
  return choices.peopleSpokenToBeforeServe.length <= 1;
}

/**
 * Extra, small reactive lines shown when the player reaches everyone — chosen from what
 * actually happened. Returns localisation keys (order matters). Never more than a few.
 */
export function reactiveServeLines(choices: ChoiceMemory): string[] {
  const lines: string[] = [];
  if (choices.servedEarly && choices.revisedPlan) lines.push('react.youngManRevised');
  if (choices.paatiHelpedBeforeFirstServe) lines.push('react.childRemembers');
  if (spokeToBeforeServe(choices, 'mother') && !choices.servedEarly) lines.push('react.motherVolunteers');
  if (actedWithoutListening(choices)) lines.push('react.locALean');
  return lines;
}

/**
 * Who keeps the work going after Manimekalai leaves. Decided by how the player played,
 * not by a menu: whom they engaged, what they emphasised, and whether they made
 * themselves indispensable. Returns a person the aftermath will build around.
 */
export function chooseLocalOwner(choices: ChoiceMemory): 'mother' | 'youngMan' | 'mani' {
  // Made everything happen personally, barely involving locals → they still wait for her.
  if (actedWithoutListening(choices)) return 'mani';

  const spokeYoungMan = spokeToBeforeServe(choices, 'youngMan');
  const spokeMother = spokeToBeforeServe(choices, 'mother');

  if (choices.firstPriority === 'water' && spokeYoungMan) return 'youngMan';
  if (choices.firstPriority === 'safe_access' && spokeMother) return 'mother';
  if (spokeMother) return 'mother';
  if (spokeYoungMan) return 'youngMan';
  return 'mani';
}

export { PERSON_FOR_BARRIER };
