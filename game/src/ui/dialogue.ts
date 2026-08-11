import { resolve } from '../content/localisation';
import { gameState } from '../game/state/GameState';
import { portrait, type Expr } from '../game/art/portraits';
import { button, clear, el, setText, uiRoot } from './dom';

// Promise-based dialogue so scenes can script sequences with async/await.
// Renders a DOM panel (Tamil-safe) with an optional character portrait + expression,
// so lines have a human face. Keeps a history log the player can review.

export interface Choice<T> {
  labelKey: string;
  value: T;
}

export interface Face {
  character: string;
  expr?: Expr;
}

interface HistoryEntry {
  speaker?: string;
  text: string;
}

export class DialogueController {
  private panel: HTMLElement | null = null;
  private history: HistoryEntry[] = [];
  private resolver: ((v: unknown) => void) | null = null;

  get isOpen(): boolean {
    return this.panel !== null;
  }

  private ensurePanel(): HTMLElement {
    if (this.panel) return this.panel;
    const panel = el('div', { class: 'dialogue', role: 'dialog', 'aria-live': 'polite' });
    uiRoot().append(panel);
    this.panel = panel;
    return panel;
  }

  private record(text: string, speaker?: string): void {
    if (gameState.accessibility.dialogueHistory) this.history.push({ speaker, text });
  }

  private renderFace(panel: HTMLElement, face?: Face): void {
    if (!face) return;
    const img = el('img', { class: 'dialogue-face', alt: '', src: portrait(face.character, face.expr ?? 'neutral') });
    panel.append(img);
  }

  /** Show a line and resolve when the player advances. */
  say(textKey: string, speakerKey?: string, face?: Face): Promise<void> {
    const panel = this.ensurePanel();
    clear(panel);
    panel.classList.toggle('has-face', !!face);
    this.renderFace(panel, face);

    const col = el('div', { class: 'dialogue-col' });
    const { text } = resolve(gameState.language, textKey);
    const speaker = speakerKey ? resolve(gameState.language, speakerKey).text : undefined;
    this.record(text, speaker);
    if (speaker) {
      const s = el('div', { class: 'dialogue-speaker' });
      setText(s, speakerKey!);
      col.append(s);
    }
    const body = el('p', { class: 'dialogue-text' });
    setText(body, textKey);
    col.append(body);
    const cont = el('div', { class: 'dialogue-continue' });
    setText(cont, 'hud.pressToContinue');
    col.append(cont);
    panel.append(col);

    return new Promise<void>((res) => {
      this.resolver = res as (v: unknown) => void;
    });
  }

  /** Show a prompt with choices; resolves with the chosen value. */
  choice<T>(promptKey: string, choices: Choice<T>[], speakerKey?: string, face?: Face): Promise<T> {
    const panel = this.ensurePanel();
    clear(panel);
    panel.classList.toggle('has-face', !!face);
    this.renderFace(panel, face);

    const col = el('div', { class: 'dialogue-col' });
    if (speakerKey) {
      const s = el('div', { class: 'dialogue-speaker' });
      setText(s, speakerKey);
      col.append(s);
    }
    const body = el('p', { class: 'dialogue-text' });
    setText(body, promptKey);
    col.append(body);
    this.record(resolve(gameState.language, promptKey).text, speakerKey ? resolve(gameState.language, speakerKey).text : undefined);
    const list = el('div', { class: 'dialogue-choices' });
    col.append(list);
    panel.append(col);

    return new Promise<T>((res) => {
      choices.forEach((c) => {
        list.append(button(c.labelKey, () => res(c.value), 'btn choice'));
      });
    });
  }

  advance(): void {
    if (this.resolver) {
      const r = this.resolver;
      this.resolver = null;
      r(undefined);
    }
  }

  close(): void {
    this.resolver = null;
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }

  getHistory(): HistoryEntry[] {
    return this.history;
  }
}

export const dialogue = new DialogueController();
