import {
  type AccessibilitySettings,
  type AftermathState,
  type BeliefStatus,
  type ChoiceMemory,
  type HiddenDimensions,
  type LanguageCode,
  type LedgerItem,
  type PrototypeFlags,
  type Section,
  type SquareState,
  defaultAccessibility,
  freshAftermath,
  freshChoices,
  freshFlags,
  freshHidden,
  freshSquareState,
} from './types';

type Listener = () => void;

/**
 * Central, framework-agnostic game state. Scenes and DOM UI read/write here.
 * Kept small and serialisable so the save system is trivial.
 */
export class GameState {
  language: LanguageCode = 'en';
  section: Section = 'title';
  ledger: LedgerItem[] = [];
  square: SquareState = freshSquareState();
  accessibility: AccessibilitySettings = defaultAccessibility();
  hidden: HiddenDimensions = freshHidden();
  flags: PrototypeFlags = freshFlags();
  choices: ChoiceMemory = freshChoices();
  aftermath: AftermathState = freshAftermath();

  private listeners = new Set<Listener>();

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(): void {
    for (const fn of this.listeners) fn();
  }

  setLanguage(lang: LanguageCode): void {
    if (this.language === lang) return;
    this.language = lang;
    this.emit();
  }

  setSection(section: Section): void {
    this.section = section;
    this.emit();
  }

  /** Add a knowledge item once (id-unique). Returns true if newly added. */
  addLedgerItem(item: LedgerItem): boolean {
    if (this.ledger.some((i) => i.id === item.id)) return false;
    this.ledger.push({ ...item });
    this.emit();
    return true;
  }

  hasLedgerItem(id: string): boolean {
    return this.ledger.some((i) => i.id === id);
  }

  classify(id: string, as: LedgerItem['classifiedAs']): void {
    const item = this.ledger.find((i) => i.id === id);
    if (!item || item.given) return;
    item.classifiedAs = as;
    this.emit();
  }

  /** 0.3: mark a belief as confirmed/challenged/uncertain by later evidence (no score). */
  setBeliefStatus(id: string, status: BeliefStatus): void {
    const item = this.ledger.find((i) => i.id === id);
    if (!item || item.status === status) return;
    item.status = status;
    this.emit();
  }

  resetForNewGame(): void {
    this.section = 'puhar';
    this.ledger = [];
    this.square = freshSquareState();
    this.hidden = freshHidden();
    this.flags = freshFlags();
    this.choices = freshChoices();
    this.aftermath = freshAftermath();
    this.emit();
  }

  /** Full reset including language/accessibility (Reset Prototype). */
  resetAll(): void {
    this.language = 'en';
    this.section = 'title';
    this.ledger = [];
    this.square = freshSquareState();
    this.accessibility = defaultAccessibility();
    this.hidden = freshHidden();
    this.flags = freshFlags();
    this.choices = freshChoices();
    this.aftermath = freshAftermath();
    this.emit();
  }

  setFlag(flag: keyof PrototypeFlags, value = true): void {
    if (this.flags[flag] === value) return;
    this.flags[flag] = value;
    this.emit();
  }
}

// Single shared instance for the running game.
export const gameState = new GameState();
