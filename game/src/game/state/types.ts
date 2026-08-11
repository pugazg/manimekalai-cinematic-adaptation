// Shared data models for G2 Prototype 0.1. Data-driven where possible so gameplay
// is defined in content, not hard-coded into UI conditionals.

export type LanguageCode = 'en' | 'ta';

export type Section = 'title' | 'puhar' | 'listening' | 'square' | 'ending';

/** The four epistemic categories used in Prototype 0.1 (not the eventual seven). */
export type KnowledgeType = 'observation' | 'testimony' | 'inference' | 'assumption';

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
  };
}

export function freshHidden(): HiddenDimensions {
  return { access: 0, safety: 0, dignity: 0, sustainability: 0, understanding: 0 };
}

export function defaultAccessibility(): AccessibilitySettings {
  return { textScale: 'medium', reduceMotion: false, subtitles: true, dialogueHistory: true, soundOn: true };
}
