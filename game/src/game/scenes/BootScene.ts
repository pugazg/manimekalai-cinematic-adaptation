import Phaser from 'phaser';
import { createTextures } from '../art/textures';

// Generates all procedural placeholder textures once, then idles beneath the DOM
// title screen until the router starts a world scene.

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    createTextures(this);
  }
}
