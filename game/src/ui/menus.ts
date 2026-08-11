import { gameState } from '../game/state/GameState';
import { applyAccessibility } from '../game/systems/Accessibility';
import { audio } from '../game/systems/Audio';
import { hasSave, save } from '../game/systems/SaveSystem';
import type { AccessibilitySettings, LanguageCode } from '../game/state/types';
import { button, clear, el, overlay, setText } from './dom';
import { hud } from './hud';

// Title, options and pause menus (DOM). The router (main.ts) supplies navigation
// callbacks so this module owns presentation only.

export interface RouterHooks {
  newGame(): void;
  continueGame(): void;
  restartPrototype(): void;
  returnToTitle(): void;
  resetPrototype(): void;
}

let hooks: RouterHooks | null = null;
export function initMenus(h: RouterHooks): void {
  hooks = h;
}

let titleEl: HTMLElement | null = null;
let optionsEl: HTMLElement | null = null;
let pauseEl: HTMLElement | null = null;

export function anyMenuOpen(): boolean {
  return !!(titleEl || optionsEl || pauseEl);
}
export function isPauseOpen(): boolean {
  return !!pauseEl;
}
export function isTitleOpen(): boolean {
  return !!titleEl;
}

/* ---------------- title ---------------- */

export function showTitle(): void {
  if (titleEl) return;
  titleEl = overlay('title-screen');
  renderTitle();
}

function renderTitle(): void {
  if (!titleEl) return;
  clear(titleEl);
  const name = el('h1', { class: 'title-name' });
  setText(name, 'title.name');
  const sub = el('p', { class: 'title-sub' });
  setText(sub, 'title.subtitle');
  const milestone = el('p', { class: 'title-milestone' });
  setText(milestone, 'title.milestone');
  const tagline = el('p', { class: 'title-tagline' });
  setText(tagline, 'title.tagline');

  const menu = el('div', { class: 'title-menu' });
  menu.append(button('menu.newGame', () => {
    if (hasSave()) {
      confirmDialog('system.newGameConfirm', () => hooks?.newGame());
    } else {
      hooks?.newGame();
    }
  }));
  if (hasSave()) {
    menu.append(button('menu.continue', () => hooks?.continueGame()));
  }
  menu.append(button('menu.options', () => showOptions()));
  if (hasSave()) {
    menu.append(button('menu.reset', () => confirmDialog('system.resetConfirm', () => {
      hooks?.resetPrototype();
      renderTitle();
    })));
  }

  const langRow = el('div', { class: 'title-lang' });
  langRow.append(langButton('ta'), langButton('en'));

  titleEl.append(name, sub, milestone, tagline, menu, langRow);
}

function langButton(lang: LanguageCode): HTMLButtonElement {
  const key = lang === 'ta' ? 'lang.tamil' : 'lang.english';
  const b = button(key, () => {
    gameState.setLanguage(lang);
    save(gameState);
    renderTitle();
    hud.refreshMute();
  }, `btn small lang-btn${gameState.language === lang ? ' active' : ''}`);
  b.lang = lang;
  return b;
}

export function hideTitle(): void {
  titleEl?.remove();
  titleEl = null;
}

/* ---------------- confirm ---------------- */

function confirmDialog(messageKey: string, onYes: () => void): void {
  const o = overlay('confirm-screen');
  const panel = el('div', { class: 'menu-panel' });
  const msg = el('p', { class: 'opt-label' });
  setText(msg, messageKey);
  const row = el('div', { class: 'opt-group' });
  row.append(
    button('system.yes', () => {
      o.remove();
      onYes();
    }),
    button('system.no', () => o.remove()),
  );
  panel.append(msg, row);
  o.append(panel);
}

/* ---------------- options ---------------- */

export function showOptions(): void {
  if (optionsEl) return;
  optionsEl = overlay('options-screen');
  renderOptions();
}

function renderOptions(): void {
  if (!optionsEl) return;
  clear(optionsEl);
  const panel = el('div', { class: 'menu-panel' });
  const h = el('h2', {});
  setText(h, 'options.title');
  panel.append(h);

  // language
  panel.append(optRow('options.language', [
    optChoice('lang.tamil', gameState.language === 'ta', () => {
      gameState.setLanguage('ta');
      afterOptionChange();
    }),
    optChoice('lang.english', gameState.language === 'en', () => {
      gameState.setLanguage('en');
      afterOptionChange();
    }),
  ]));

  // text size
  const sizes: AccessibilitySettings['textScale'][] = ['small', 'medium', 'large'];
  panel.append(optRow('options.textSize', sizes.map((s) =>
    optChoice(`options.${s}`, gameState.accessibility.textScale === s, () => {
      gameState.accessibility.textScale = s;
      afterOptionChange();
    }),
  )));

  // reduce motion
  panel.append(optRow('options.reduceMotion', [
    optChoice('options.on', gameState.accessibility.reduceMotion, () => {
      gameState.accessibility.reduceMotion = true;
      afterOptionChange();
    }),
    optChoice('options.off', !gameState.accessibility.reduceMotion, () => {
      gameState.accessibility.reduceMotion = false;
      afterOptionChange();
    }),
  ]));

  // sound
  panel.append(optRow('options.sound', [
    optChoice('options.on', gameState.accessibility.soundOn, () => {
      gameState.accessibility.soundOn = true;
      audio.start();
      audio.setMuted(false);
      afterOptionChange();
    }),
    optChoice('options.off', !gameState.accessibility.soundOn, () => {
      gameState.accessibility.soundOn = false;
      audio.setMuted(true);
      afterOptionChange();
    }),
  ]));

  const note = el('p', { class: 'opt-note' });
  setText(note, 'options.note');
  panel.append(note);

  const pendingNote = el('p', { class: 'opt-note' });
  setText(pendingNote, 'options.pendingTamil');
  panel.append(pendingNote);

  panel.append(button('options.close', () => {
    optionsEl?.remove();
    optionsEl = null;
  }));
  optionsEl.append(panel);
}

function afterOptionChange(): void {
  applyAccessibility(gameState.accessibility);
  save(gameState);
  renderOptions();
  renderTitle();
  renderPause();
  hud.refreshMute();
}

function optRow(labelKey: string, buttons: HTMLElement[]): HTMLElement {
  const row = el('div', { class: 'opt-row' });
  const label = el('span', { class: 'opt-label' });
  setText(label, labelKey);
  const group = el('div', { class: 'opt-group' });
  group.append(...buttons);
  row.append(label, group);
  return row;
}

function optChoice(labelKey: string, active: boolean, onClick: () => void): HTMLButtonElement {
  return button(labelKey, onClick, `btn small${active ? ' lang-btn active' : ''}`);
}

/* ---------------- pause ---------------- */

export function togglePause(): void {
  if (pauseEl) {
    closePause();
  } else if (!titleEl) {
    showPause();
  }
}

export function showPause(): void {
  if (pauseEl) return;
  pauseEl = overlay('pause-screen');
  renderPause();
}

function renderPause(): void {
  if (!pauseEl) return;
  clear(pauseEl);
  const panel = el('div', { class: 'menu-panel' });
  const h = el('h2', {});
  setText(h, 'menu.pauseTitle');
  panel.append(h);
  panel.append(button('menu.resume', () => closePause()));
  panel.append(button('menu.options', () => showOptions()));
  panel.append(button('menu.restart', () => {
    closePause();
    hooks?.restartPrototype();
  }));
  panel.append(button('menu.returnToTitle', () => {
    closePause();
    hooks?.returnToTitle();
  }));
  pauseEl.append(panel);
}

export function closePause(): void {
  pauseEl?.remove();
  pauseEl = null;
}

export function closeOptions(): boolean {
  if (optionsEl) {
    optionsEl.remove();
    optionsEl = null;
    return true;
  }
  return false;
}

/** Re-render menus after external language change. */
export function refreshMenus(): void {
  renderTitle();
  renderOptions();
  renderPause();
}

// Keep menus in sync with state changes.
gameState.subscribe(() => {
  if (titleEl || optionsEl || pauseEl) {
    // re-render lazily; cheap because panels are small
    refreshMenus();
  }
});

