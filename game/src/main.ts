/// <reference types="vite/client" />
import Phaser from 'phaser';
import './styles/main.css';
import { baseConfig } from './game/config';
import { BootScene } from './game/scenes/BootScene';
import { PuharScene } from './game/scenes/PuharScene';
import { SquareScene } from './game/scenes/SquareScene';
import { gameState } from './game/state/GameState';
import { setNav } from './game/nav';
import { applyAccessibility } from './game/systems/Accessibility';
import { audio } from './game/systems/Audio';
import { clearSave, hasIncompatibleSave, load, save } from './game/systems/SaveSystem';
import { dialogue } from './ui/dialogue';
import { showEnding } from './ui/ending';
import { hud } from './ui/hud';
import { ledgerPanel } from './ui/ledger';
import {
  closeOptions,
  hideTitle,
  initMenus,
  isTitleOpen,
  showTitle,
  togglePause,
} from './ui/menus';

// Entry point + router for G2 Prototype 0.2 — Human First. Owns the Phaser instance,
// global input (keyboard + click/tap), audio start-on-gesture, keyboard focus, and
// navigation between title / world / ending.

const game = new Phaser.Game(baseConfig([BootScene, PuharScene, SquareScene]));

/** Give the canvas keyboard focus so children don't have to click first. */
function focusGame(): void {
  const c = game.canvas;
  if (c) {
    c.setAttribute('tabindex', '0');
    setTimeout(() => c.focus(), 40);
  }
}

/** Begin audio (only valid inside a user gesture) and honour the mute setting. */
function beginAudio(): void {
  audio.start();
  audio.setMuted(!gameState.accessibility.soundOn);
}

function stopWorldScenes(): void {
  for (const key of ['Puhar', 'Square']) {
    if (game.scene.isActive(key) || game.scene.isPaused(key)) game.scene.stop(key);
  }
  dialogue.close();
  ledgerPanel.close();
  hud.setResourcesVisible(false);
  hud.setPrompt(null);
}

function startSquare(): void {
  game.scene.start('Square');
}

const router = {
  newGame(): void {
    beginAudio();
    stopWorldScenes();
    gameState.resetForNewGame();
    save(gameState);
    hideTitle();
    game.scene.start('Puhar');
    focusGame();
  },
  continueGame(): void {
    beginAudio();
    stopWorldScenes();
    load(gameState);
    applyAccessibility(gameState.accessibility);
    hideTitle();
    switch (gameState.section) {
      case 'square':
        startSquare();
        break;
      case 'ending':
        startSquare();
        showEnding({
          restart: () => router.restartPrototype(),
          returnToTitle: () => router.returnToTitle(),
          keepExploring: () => {},
        });
        break;
      case 'title':
        showTitle();
        break;
      default:
        game.scene.start('Puhar');
    }
    focusGame();
  },
  restartPrototype(): void {
    this.newGame();
  },
  returnToTitle(): void {
    stopWorldScenes();
    gameState.setSection('title');
    showTitle();
  },
  resetPrototype(): void {
    clearSave();
    stopWorldScenes();
    gameState.resetAll();
    applyAccessibility(gameState.accessibility);
  },
};

initMenus(router);
setNav({
  restart: () => router.restartPrototype(),
  returnToTitle: () => router.returnToTitle(),
  keepExploring: () => {},
});

// A Prototype 0.1 (schema v1) save cannot migrate — drop it so it can't break things.
if (hasIncompatibleSave()) clearSave();

// Load language/accessibility from any current save so the title itself is localised.
load(gameState);
gameState.setSection('title');
applyAccessibility(gameState.accessibility);
hud.mount();
showTitle();

// ---------------- global input routing ----------------

window.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement | null;
  const onButton = target && (target.tagName === 'BUTTON' || target.tagName === 'INPUT');

  switch (e.code) {
    case 'Escape':
      if (closeOptions()) return;
      if (ledgerPanel.isOpen) {
        ledgerPanel.close();
        return;
      }
      if (!isTitleOpen()) togglePause();
      return;
    case 'KeyJ':
      if (!isTitleOpen()) ledgerPanel.toggle();
      return;
    case 'Enter':
    case 'KeyE':
      if (onButton && e.code === 'Enter') return; // let focused buttons act naturally
      if (dialogue.isOpen) dialogue.advance();
      else if (!isTitleOpen()) window.dispatchEvent(new Event('mk-interact'));
      return;
  }
});

// Click/tap: advance dialogue, or interact when close to a hotspot.
document.getElementById('app')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (target && target.closest('button')) return;
  if (dialogue.isOpen) dialogue.advance();
  else if (!isTitleOpen() && target && target.closest('#game-root')) {
    window.dispatchEvent(new Event('mk-interact'));
  }
});

// Keep audio in step with the mute setting when it changes elsewhere.
gameState.subscribe(() => audio.setMuted(!gameState.accessibility.soundOn));

document.addEventListener('visibilitychange', () => {
  if (document.hidden && gameState.section !== 'title') save(gameState);
});

// Dev-only debug handle for local verification. Stripped from production builds.
if (import.meta.env.DEV) {
  (window as unknown as { __mk: unknown }).__mk = { game, gameState, router };
}
