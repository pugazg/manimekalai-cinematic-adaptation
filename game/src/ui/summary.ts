import { t } from '../content/localisation';
import { gameState } from '../game/state/GameState';
import type { ChoiceMemory, PriorityChoice } from '../game/state/types';

// 0.3 end-of-play summaries. TWO things, both LOCAL and non-judgemental:
//  1) "Your journey" — a short recap in the player's language, from what they actually
//     did, so the play feels like theirs. No score, no stars, no grade.
//  2) A plain-text playtest summary for the owner to observe (with a Copy button). No
//     telemetry, no network — it is built in memory from local state only.

const PRIORITY_KEY: Record<PriorityChoice, string> = {
  water: 'journey.firstWater',
  safe_access: 'journey.firstPath',
  mobility: 'journey.firstPaati',
  serve: 'journey.firstServe',
};

const OWNER_KEY: Record<NonNullable<ChoiceMemory['localOwner']>, string> = {
  mother: 'journey.ownerMother',
  youngMan: 'journey.ownerYoungMan',
  mani: 'journey.ownerMani',
  none: 'journey.ownerNone',
};

/** Readable role names for the owner-facing text summary (kept in English on purpose). */
const ROLE_EN: Record<string, string> = {
  child: 'the child',
  carrier: 'the water-carrier',
  youngMan: 'the young man',
  mother: 'the mother',
  paati: 'Paati',
};

/** Localised recap lines — the player's own path through the prototype. */
export function buildJourneyLines(): string[] {
  const c = gameState.choices;
  const lang = gameState.language;
  const lines: string[] = [];

  if (c.firstPriority) lines.push(t(lang, PRIORITY_KEY[c.firstPriority]));
  if (c.peopleSpokenToBeforeServe.length >= 3) lines.push(t(lang, 'journey.listenedLots'));
  else if (c.peopleSpokenToBeforeServe.length <= 1) lines.push(t(lang, 'journey.actedFast'));
  if (c.paatiHelpedBeforeFirstServe) lines.push(t(lang, 'journey.paatiFirst'));
  if (c.servedEarly) lines.push(t(lang, 'journey.servedEarly'));
  if (c.revisedPlan) lines.push(t(lang, 'journey.revised'));
  if (c.helperReassignments > 0) lines.push(t(lang, 'journey.reassigned'));
  if (c.localOwner) lines.push(t(lang, OWNER_KEY[c.localOwner]));

  return lines;
}

const yn = (b: boolean): string => (b ? 'yes' : 'no');

/** Plain-text summary for the owner. English, local-only, no judgement. */
export function buildPlaytestSummary(): string {
  const c = gameState.choices;
  const spoken = c.peopleSpokenToBeforeServe.map((id) => ROLE_EN[id] ?? id);
  const owner =
    c.localOwner === 'mother'
      ? 'the mother'
      : c.localOwner === 'youngMan'
        ? 'the young man'
        : c.localOwner === 'mani'
          ? 'no one yet — locals still looked to Manimekalai'
          : 'none recorded';
  return [
    'G2 Prototype 0.3 — Meaningful Agency — playtest summary',
    `First priority: ${c.firstPriority ?? 'none recorded'}`,
    `People spoken to before serving: ${spoken.length ? spoken.join(', ') : 'none'} (${spoken.length})`,
    `Served before all barriers understood: ${yn(c.servedEarly)}`,
    `Plan revised after early serving: ${yn(c.revisedPlan)}`,
    `Helpers reassigned: ${c.helperReassignments}`,
    `Paati reached before first serve: ${yn(c.paatiHelpedBeforeFirstServe)}`,
    `Local who continued the work: ${owner}`,
    '(Qualitative, local, for owner observation only. No score. No telemetry.)',
  ].join('\n');
}
