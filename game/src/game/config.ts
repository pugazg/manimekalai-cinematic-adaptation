import Phaser from 'phaser';

// Logical game resolution. Phaser scales to fit the window while the DOM UI layers
// above the canvas independently.

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/** Prototype identity (shown in title/footer; keep in step with README/PROTOTYPE_TRACE). */
export const GAME_VERSION = '0.3.0';
export const GAME_MILESTONE = 'G2 Prototype 0.3 — Meaningful Agency';

export function baseConfig(scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent: 'game-root',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#14100b',
    physics: {
      default: 'arcade',
      arcade: { debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: scenes,
  };
}
