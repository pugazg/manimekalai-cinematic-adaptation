import {
  type AccessibilitySettings,
  type HiddenDimensions,
  type LanguageCode,
  type LedgerItem,
  type PrototypeFlags,
  type Section,
  type SquareState,
  defaultAccessibility,
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

  resetForNewGame(): void {
    this.section = 'puhar';
    this.ledger = [];
    this.square = freshSquareState();
    this.hidden = freshHidden();
    this.flags = freshFlags();
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
