import { resolve, t } from '../content/localisation';
import { gameState } from '../game/state/GameState';
import { audio } from '../game/systems/Audio';
import type { Helper } from '../game/state/types';
import { clear, el, uiRoot } from './dom';
import { save } from '../game/systems/SaveSystem';

// HUD for children: one big teaching hint at a time, a single descriptive action
// prompt ("Talk to the child"), resource chips in the yard, a transient toast, and a
// small sound toggle. No four-control bar. Prompt is clickable for touch.

class Hud {
  private teach: HTMLElement | null = null;
  private prompt: HTMLElement | null = null;
  private resources: HTMLElement | null = null;
  private toast: HTMLElement | null = null;
  private mute: HTMLButtonElement | null = null;
  private toastTimer: number | undefined;

  mount(): void {
    if (this.teach) return;
    this.teach = el('div', { class: 'hud-teach', 'aria-live': 'polite' });
    this.prompt = el('button', {
      class: 'hud-prompt',
      type: 'button',
      onClick: () => window.dispatchEvent(new Event('mk-interact')),
    });
    this.resources = el('div', { class: 'hud-resources' });
    this.toast = el('div', { class: 'hud-toast', role: 'status' });
    this.mute = el('button', { class: 'hud-mute', type: 'button', onClick: () => this.toggleMute() });
    this.refreshMute();
    uiRoot().append(this.teach, this.prompt, this.resources, this.toast, this.mute);
  }

  private toggleMute(): void {
    const on = !gameState.accessibility.soundOn;
    gameState.accessibility.soundOn = on;
    audio.setMuted(!on);
    save(gameState);
    this.refreshMute();
  }

  refreshMute(): void {
    if (!this.mute) return;
    const on = gameState.accessibility.soundOn;
    this.mute.textContent = on ? '🔊' : '🔇';
    this.mute.setAttribute('aria-label', t(gameState.language, on ? 'hud.muteOff' : 'hud.muteOn'));
    this.mute.title = this.mute.getAttribute('aria-label') ?? '';
  }

  /** One big, gentle teaching line (e.g. movement). Pass null to hide. */
  showTeach(key: string | null): void {
    if (!this.teach) return;
    if (!key) {
      this.teach.classList.remove('visible');
      return;
    }
    this.teach.textContent = resolve(gameState.language, key).text;
    this.teach.classList.add('visible');
  }

  /** Descriptive action prompt, e.g. "E — Talk to the child". Pass null to hide. */
  setPrompt(promptKey: string | null): void {
    if (!this.prompt) return;
    if (!promptKey) {
      this.prompt.classList.remove('visible');
      return;
    }
    clear(this.prompt);
    this.prompt.append(el('span', { class: 'key' }, ['E']), el('span', {}, [t(gameState.language, promptKey)]));
    this.prompt.classList.add('visible');
  }

  /** Hide the resource chips (e.g. in the Puhar opening). */
  hideResources(): void {
    if (this.resources) clear(this.resources);
  }

  /**
   * Show the two named helpers and what each is doing, plus vessels. Helpers are PEOPLE
   * with names and a current job — not "Helper 1 → variable water".
   */
  setHelpers(helpers: Helper[], freeVessels: number, totalVessels: number): void {
    if (!this.resources) return;
    clear(this.resources);
    const lang = gameState.language;
    for (const h of helpers) {
      const name = t(lang, h.nameKey);
      const job = t(lang, h.task === 'idle' ? 'helper.job.idle' : `helper.job.${h.task}`);
      this.resources.append(el('div', { class: `hud-chip helper-chip${h.task === 'idle' ? ' idle' : ''}` }, [`${name} · ${job}`]));
    }
    this.resources.append(
      el('div', { class: 'hud-chip' }, [`${t(lang, 'square.resourcesVessels')}: ${freeVessels}/${totalVessels}`]),
    );
  }

  showToast(key: string, ms = 3400): void {
    if (!this.toast) return;
    this.toast.textContent = resolve(gameState.language, key).text;
    this.toast.classList.add('visible');
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toast?.classList.remove('visible'), ms);
  }

  unmount(): void {
    for (const n of [this.teach, this.prompt, this.resources, this.toast, this.mute]) n?.remove();
    this.teach = this.prompt = this.resources = this.toast = null;
    this.mute = null;
  }
}

export const hud = new Hud();
