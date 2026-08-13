// Shared data models for G2 Prototype 0.1. Data-driven where possible so gameplay
// is defined in content, not hard-coded into UI conditionals.

export type LanguageCode = 'en' | 'ta';

// 0.3 adds an 'aftermath' section: the short post-"போதும்" continuation where earlier
// choices decide whether the work can carry on without Manimekalai.
export type Section = 'title' | 'puhar' | 'listening' | 'square' | 'ending' | 'aftermath';

/** The four epistemic categories used in Prototype 0.1 (not the eventual seven). */
export type KnowledgeType = 'observation' | 'testimony' | 'inference' | 'assumption';

/**
 * 0.3 belief status shown gently in the Journal: a belief can be confirmed by later
 * evidence, challenged by it, or remain uncertain. Never a score — just a small line.
 */
export type BeliefStatus = 'confirmed' | 'challenged' | 'uncertain';

export const KNOWLEDGE_TYPES: KnowledgeType[] = [
  'observation',
  'testimony',
  'inference',
  'assumption',
];

/** One thing the player knows. `given` items are inherently known and not classifiable. */
export interface LedgerItem {
  id: string;
  /** localisation key for the statement text */
  statementKey: string;
  /** localisation key for the source/person, if any */
  sourceKey?: string;
  /** the "true" category, used only for downstream understanding — never scored/shown as right/wrong */
  trueType?: KnowledgeType;
  /** how the player has sorted it; undefined = unclassified */
  classifiedAs?: KnowledgeType;
  /** if true, the item is inherently known and cannot be classified by the player */
  given: boolean;
  /** 0.3: a belief the world later confirmed or challenged (shown as a gentle line, no score). */
  status?: BeliefStatus;
}

/** The three barriers in the prototype. Each recipient group has exactly one. */
export type BarrierType = 'water' | 'safe_access' | 'mobility';

export const BARRIER_TYPES: BarrierType[] = ['water', 'safe_access', 'mobility'];

export interface RecipientGroup {
  id: string;
  nameKey: string;
  descKey: string;
  speakKey: string;
  barrier: BarrierType;
  /** grid-ish position in the square scene (logical coordinates) */
  x: number;
  y: number;
}

/** Hidden qualitative dimensions. Never summed into a single score, never shown as a number. */
export interface HiddenDimensions {
  access: number;
  safety: number;
  dignity: number;
  sustainability: number;
  understanding: number;
  /** 0.3: how much each named local trusts Manimekalai's lead (behaviour only, never a bar). */
  trust: number;
}

// --- 0.3 helpers: real people, not worker tokens ---------------------------------

/** A helper's current job. 'idle' = free; the others each cover one need. */
export type HelperTask = 'idle' | 'water' | 'crowd' | 'carry';

export const HELPER_TASKS: HelperTask[] = ['idle', 'water', 'crowd', 'carry'];

/** A named local who can be asked to help, moved between jobs, and thanked. */
export interface Helper {
  /** internal id (may be technical); never shown raw to the player */
  id: string;
  /** localisation key for the person's name/role, e.g. 'helper.aran' */
  nameKey: string;
  task: HelperTask;
}

export function freshHelpers(): Helper[] {
  // Prototype-local [INTERPRETATION] people, described by role (not invented historical
  // personal names), so they read as neighbours who stayed to help — never worker tokens.
  return [
    { id: 'h_neighbour', nameKey: 'helper.neighbour', task: 'idle' },
    { id: 'h_weaver', nameKey: 'helper.weaver', task: 'idle' },
  ];
}

export interface SquareState {
  helpersTotal: number;
  helpersUsed: number;
  vesselsTotal: number;
  vesselsPlaced: number;
  /** which barriers have been cleared by interventions */
  cleared: Record<BarrierType, boolean>;
  /** whether the player has begun serving at least once */
  servedOnce: boolean;
  /** whether a local custodian will continue the work (sustainability) */
  localWillContinue: boolean;
  /** barriers the player has learned about (from listening or from consequences) */
  known: Record<BarrierType, boolean>;
  /** 0.3: the two named helpers and their current jobs (reassignable) */
  helpers: Helper[];
  /** 0.3: Manimekalai carried Paati's portion herself (a sticky, personal act) */
  paatiByMani: boolean;
}

// --- 0.3 choice memory: small, typed, serialisable, testable ---------------------

export type PriorityChoice = BarrierType | 'serve';

/**
 * What the player actually did and in what spirit. Read to vary later dialogue,
 * decide who takes ownership after "போதும்", and to write the honest journey recap.
 * Deliberately small — not a general choice-history engine.
 */
export interface ChoiceMemory {
  /** the first meaningful thing the player did */
  firstPriority?: PriorityChoice;
  /** people spoken to (in order) before the first serve */
  peopleSpokenToBeforeServe: string[];
  /** everyone spoken to across the whole play, in order */
  peopleSpokenTo: string[];
  /** served before every barrier was understood (fail-forward, not a failure) */
  servedEarly: boolean;
  /** served early, then went back and fixed things */
  revisedPlan: boolean;
  /** how many times a helper was moved from one job to another */
  helperReassignments: number;
  /** Paati was reached before the first serve */
  paatiHelpedBeforeFirstServe: boolean;
  /** the first serve has happened */
  firstServeDone: boolean;
  /** who kept the work going after Manimekalai (decided in the aftermath) */
  localOwner?: 'mother' | 'youngMan' | 'mani' | 'none';
}

export function freshChoices(): ChoiceMemory {
  return {
    firstPriority: undefined,
    peopleSpokenToBeforeServe: [],
    peopleSpokenTo: [],
    servedEarly: false,
    revisedPlan: false,
    helperReassignments: 0,
    paatiHelpedBeforeFirstServe: false,
    firstServeDone: false,
    localOwner: undefined,
  };
}

/** 0.3 aftermath (post-"போதும்") continuation state. */
export interface AftermathState {
  /** the new smaller problem has been shown */
  started: boolean;
  /** water is running low — the follow-up situation */
  waterLow: boolean;
  /** the follow-up need has been handed to a local (or Manimekalai) */
  resolved: boolean;
}

export function freshAftermath(): AftermathState {
  return { started: false, waterLow: false, resolved: false };
}

export interface AccessibilitySettings {
  textScale: 'small' | 'medium' | 'large';
  reduceMotion: boolean;
  subtitles: boolean;
  dialogueHistory: boolean;
  soundOn: boolean;
}

/** Onboarding / emotional progression flags (drive one-thing-at-a-time teaching). */
export interface PrototypeFlags {
  movedOnce: boolean;
  metChild: boolean;
  learnedOnce: boolean;
}

export interface SaveData {
  version: number;
  language: LanguageCode;
  section: Section;
  ledger: LedgerItem[];
  square: SquareState;
  accessibility: AccessibilitySettings;
  hidden: HiddenDimensions;
  flags: PrototypeFlags;
  /** 0.3 additions */
  choices?: ChoiceMemory;
  aftermath?: AftermathState;
  updatedAt: number;
}

export function freshFlags(): PrototypeFlags {
  return { movedOnce: false, metChild: false, learnedOnce: false };
}

export function freshSquareState(): SquareState {
  return {
    helpersTotal: 2,
    helpersUsed: 0,
    vesselsTotal: 3,
    vesselsPlaced: 0,
    cleared: { water: false, safe_access: false, mobility: false },
    servedOnce: false,
    localWillContinue: false,
    known: { water: false, safe_access: false, mobility: false },
    helpers: freshHelpers(),
    paatiByMani: false,
  };
}

export function freshHidden(): HiddenDimensions {
  return { access: 0, safety: 0, dignity: 0, sustainability: 0, understanding: 0, trust: 0 };
}

export function defaultAccessibility(): AccessibilitySettings {
  return { textScale: 'medium', reduceMotion: false, subtitles: true, dialogueHistory: true, soundOn: true };
}
