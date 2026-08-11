import { resolve } from '../content/localisation';
import { gameState } from '../game/state/GameState';
import { KNOWLEDGE_TYPES, type KnowledgeType } from '../game/state/types';
import { button, clear, el, setText, uiRoot } from './dom';

// "What Manimekalai knows" — a gentle reasoning aid (internally the four-category
// epistemic mechanic). Child-friendly primary labels ("I saw this", "Someone told
// me", "I think this means…", "I'm not sure yet") with the formal word as small
// secondary text. No score, no right/wrong. Opens/closes fast (J / Esc).

// Colour-independent emoji + words (never colour alone).
const TYPE_EMOJI: Record<KnowledgeType, string> = {
  observation: '👁',
  testimony: '💬',
  inference: '💭',
  assumption: '❓',
};

export class LedgerPanel {
  private panel: HTMLElement | null = null;
  private onClose?: () => void;

  get isOpen(): boolean {
    return this.panel !== null;
  }

  open(onClose?: () => void): void {
    if (this.panel) return;
    this.onClose = onClose;
    const panel = el('div', {
      class: 'ledger-panel overlay',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': resolve(gameState.language, 'journal.title').text,
    });
    uiRoot().append(panel);
    this.panel = panel;
    this.render();
  }

  toggle(onClose?: () => void): void {
    if (this.panel) this.close();
    else this.open(onClose);
  }

  close(): void {
    if (!this.panel) return;
    this.panel.remove();
    this.panel = null;
    this.onClose?.();
  }

  render(): void {
    if (!this.panel) return;
    const panel = this.panel;
    clear(panel);

    const header = el('div', { class: 'ledger-header' });
    header.append(el('h2', { class: 'ledger-title-text' }, [resolve(gameState.language, 'journal.title').text]));
    header.append(button('journal.close', () => this.close(), 'btn small'));
    panel.append(header);

    const sub = el('p', { class: 'ledger-sub' });
    setText(sub, 'journal.subtitle');
    panel.append(sub);

    if (gameState.ledger.length === 0) {
      const empty = el('p', { class: 'ledger-empty' });
      setText(empty, 'journal.empty');
      panel.append(empty);
      return;
    }

    const list = el('div', { class: 'ledger-list' });
    for (const item of gameState.ledger) {
      const card = el('div', { class: 'ledger-item' });
      const stmt = el('p', { class: 'ledger-statement' });
      setText(stmt, item.statementKey);
      card.append(stmt);

      const meta = el('div', { class: 'ledger-meta' });
      if (item.sourceKey) {
        const src = el('span', { class: 'ledger-source' });
        src.textContent = `${resolve(gameState.language, 'journal.source').text} ${resolve(gameState.language, item.sourceKey).text}`;
        meta.append(src);
      }
      if (item.given) {
        const g = el('span', { class: 'ledger-given' });
        setText(g, 'journal.given');
        meta.append(g);
      }
      card.append(meta);

      if (!item.given) {
        const row = el('div', { class: 'ledger-types', role: 'group' });
        for (const type of KNOWLEDGE_TYPES) {
          const selected = item.classifiedAs === type;
          const b = el('button', {
            class: `type-btn${selected ? ' selected' : ''}`,
            type: 'button',
            'aria-pressed': selected ? 'true' : 'false',
            onClick: () => {
              gameState.classify(item.id, type);
              this.render();
            },
          });
          const mark = el('span', { class: 'type-mark', 'aria-hidden': 'true' }, [selected ? '✓ ' : '']);
          const emoji = el('span', { class: 'type-emoji', 'aria-hidden': 'true' }, [TYPE_EMOJI[type]]);
          const label = el('span', { class: 'type-label' }, [resolve(gameState.language, `journal.type.${type}`).text]);
          const formal = el('span', { class: 'type-formal' }, [resolve(gameState.language, `journal.formal.${type}`).text]);
          b.append(mark, emoji, label, formal);
          row.append(b);
        }
        card.append(row);
      }
      list.append(card);
    }
    panel.append(list);

    const hint = el('p', { class: 'ledger-hint' });
    setText(hint, 'journal.hint');
    panel.append(hint);
  }
}

export const ledgerPanel = new LedgerPanel();
