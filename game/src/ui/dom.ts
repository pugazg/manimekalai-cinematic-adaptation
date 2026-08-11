import { resolve } from '../content/localisation';
import { gameState } from '../game/state/GameState';

// Small DOM helpers. All narrative/UI text is real DOM (not canvas) so Tamil complex
// script shapes correctly and the browser's accessibility tree stays intact.

export function uiRoot(): HTMLElement {
  const el = document.getElementById('ui-root');
  if (!el) throw new Error('ui-root missing');
  return el;
}

type Props = Record<string, string | number | boolean | ((e: Event) => void)>;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = String(v);
    else if (k === 'text') node.textContent = String(v);
    else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
    } else if (typeof v === 'boolean') {
      if (v) node.setAttribute(k, '');
    } else {
      node.setAttribute(k, String(v));
    }
  }
  for (const c of children) node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  return node;
}

/** Set localised text on a node; when Tamil is pending, mark it visibly + accessibly. */
export function setText(node: HTMLElement, key: string): void {
  const { text, pending } = resolve(gameState.language, key);
  node.textContent = text;
  node.classList.toggle('pending-ta', pending);
  if (pending) node.title = resolve(gameState.language, 'options.pendingTamil').text;
  else node.removeAttribute('title');
  node.lang = pending ? 'en' : gameState.language;
}

/** Create a localised element in one call. */
export function tEl<K extends keyof HTMLElementTagNameMap>(tag: K, key: string, cls?: string): HTMLElementTagNameMap[K] {
  const node = el(tag, cls ? { class: cls } : {});
  setText(node as HTMLElement, key);
  return node;
}

export function clear(node: HTMLElement): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** A full-screen overlay container. Returns the element (already mounted). */
export function overlay(cls: string): HTMLElement {
  const o = el('div', { class: `overlay ${cls}`, role: 'dialog', 'aria-modal': 'true' });
  uiRoot().append(o);
  return o;
}

export function button(key: string, onClick: () => void, cls = 'btn'): HTMLButtonElement {
  const b = el('button', { class: cls, type: 'button', onClick });
  setText(b, key);
  return b;
}
