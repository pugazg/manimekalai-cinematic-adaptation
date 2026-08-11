import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { hud } from '../../ui/hud';
import { dialogue } from '../../ui/dialogue';
import { ledgerPanel } from '../../ui/ledger';
import { anyMenuOpen } from '../../ui/menus';
import { audio } from '../systems/Audio';
import { gameState } from '../state/GameState';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

// Shared scaffolding for walkable scenes. Interaction points show a MEANING ICON
// (speech / water / food / look / path) above the thing — never an anonymous circle —
// and a descriptive prompt ("Talk to the child"). One movement hint is taught once.

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  radius: number;
  /** descriptive prompt.* key, e.g. 'prompt.talkChild' */
  promptKey: string;
  /** texture key of the floating meaning icon (icon_talk / icon_water / …) */
  icon?: string;
  onInteract: () => void;
  iconSprite?: Phaser.GameObjects.Image;
  enabled: boolean;
}

export function uiLocked(): boolean {
  return dialogue.isOpen || ledgerPanel.isOpen || anyMenuOpen();
}

export abstract class BaseWorldScene extends Phaser.Scene {
  protected player!: Player;
  protected hotspots: Hotspot[] = [];
  private activeHotspot: Hotspot | null = null;
  private interactHandler = () => this.tryInteract();
  private birds: Phaser.GameObjects.Image[] = [];
  private pendingObstacles: Phaser.GameObjects.Rectangle[] = [];
  private lastStep = 0;

  protected abstract buildWorld(): void;
  protected abstract spawn(): { x: number; y: number };

  create(): void {
    this.hotspots = [];
    this.activeHotspot = null;
    this.pendingObstacles = [];
    this.buildWorld();
    const s = this.spawn();
    this.player = new Player(this, s.x, s.y);
    this.physics.world.setBounds(0, 120, GAME_WIDTH, GAME_HEIGHT - 140);

    window.addEventListener('mk-interact', this.interactHandler);
    this.input.on('pointerdown', () => this.game.canvas.focus());
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener('mk-interact', this.interactHandler);
      this.birds = [];
    });

    hud.mount();
    // teach movement once, gently
    if (!gameState.flags.movedOnce) hud.showTeach('hud.moveHint');
    // keyboard focus so children don't have to click first
    this.time.delayedCall(30, () => this.game.canvas.focus());
  }

  protected tileGround(texture: string): void {
    this.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60, GAME_WIDTH, GAME_HEIGHT - 120, texture).setDepth(-100);
    this.add.rectangle(GAME_WIDTH / 2, 60, GAME_WIDTH, 120, 0x8a6b46).setDepth(-101);
    this.add.rectangle(GAME_WIDTH / 2, 30, GAME_WIDTH, 60, 0x9d7c52).setDepth(-101);
  }

  protected addBuildingRow(): void {
    for (let i = 0; i < 6; i++) {
      const b = this.add.image(90 + i * 220, 130, 'building');
      b.setDepth(40).setScale(0.9 + (i % 3) * 0.08);
    }
  }

  protected addBirds(): void {
    for (let i = 0; i < 4; i++) {
      this.birds.push(this.add.image(Math.random() * GAME_WIDTH, 30 + Math.random() * 50, 'bird').setDepth(-50));
    }
  }

  protected addObstacle(x: number, y: number, w: number, h: number): void {
    const rect = this.add.rectangle(x, y, w, h, 0x000000, 0.001);
    this.physics.add.existing(rect, true);
    this.pendingObstacles.push(rect);
  }

  protected finishObstacles(): void {
    for (const o of this.pendingObstacles) this.physics.add.collider(this.player.sprite, o);
    this.pendingObstacles = [];
  }

  /** Add an interaction point. `icon` is a meaning icon shown floating above it. */
  protected addHotspot(h: Omit<Hotspot, 'iconSprite' | 'enabled'> & { enabled?: boolean }): Hotspot {
    const hotspot: Hotspot = { enabled: true, ...h };
    if (h.icon) {
      const sprite = this.add.image(h.x, h.y - 46, h.icon).setDepth(9000).setScale(0.9);
      hotspot.iconSprite = sprite;
      if (document.documentElement.dataset.reduceMotion !== 'true') {
        this.tweens.add({ targets: sprite, y: h.y - 52, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
    }
    this.hotspots.push(hotspot);
    return hotspot;
  }

  protected removeHotspot(id: string): void {
    const idx = this.hotspots.findIndex((h) => h.id === id);
    if (idx >= 0) {
      this.hotspots[idx].iconSprite?.destroy();
      this.hotspots.splice(idx, 1);
      if (this.activeHotspot?.id === id) {
        this.activeHotspot = null;
        hud.setPrompt(null);
      }
    }
  }

  protected getHotspot(id: string): Hotspot | undefined {
    return this.hotspots.find((h) => h.id === id);
  }

  protected setHotspotIcon(id: string, icon: string | null): void {
    const h = this.getHotspot(id);
    if (!h) return;
    h.iconSprite?.destroy();
    h.iconSprite = undefined;
    if (icon) {
      h.iconSprite = this.add.image(h.x, h.y - 46, icon).setDepth(9000).setScale(0.9);
      if (document.documentElement.dataset.reduceMotion !== 'true') {
        this.tweens.add({ targets: h.iconSprite, y: h.y - 52, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
    }
  }

  private tryInteract(): void {
    if (uiLocked()) return;
    if (this.activeHotspot?.enabled) {
      audio.interact();
      this.activeHotspot.onInteract();
    }
  }

  update(time: number): void {
    const locked = uiLocked();
    this.player?.update(time, locked);

    const body = this.player.sprite.body as Phaser.Physics.Arcade.Body;
    const speed = Math.abs(body.velocity.x) + Math.abs(body.velocity.y);

    // movement taught once: as soon as the player is actually moving, hide the hint
    if (!locked && speed > 5 && !gameState.flags.movedOnce) {
      gameState.setFlag('movedOnce');
      hud.showTeach(null);
    }

    // footsteps (throttled, respects mute)
    if (!locked && speed > 5 && time - this.lastStep > 300) {
      this.lastStep = time;
      audio.footstep();
    }

    // nearest enabled hotspot drives the descriptive prompt
    let nearest: Hotspot | null = null;
    let best = Infinity;
    const px = this.player.sprite.x;
    const py = this.player.sprite.y;
    for (const h of this.hotspots) {
      if (!h.enabled) continue;
      const d = Phaser.Math.Distance.Between(px, py, h.x, h.y);
      if (d < h.radius && d < best) {
        best = d;
        nearest = h;
      }
    }
    if (nearest !== this.activeHotspot) {
      this.activeHotspot = nearest;
      // subtle pulse on the active icon
      this.hotspots.forEach((h) => h.iconSprite?.setScale(h === nearest ? 1.15 : 0.9));
    }
    hud.setPrompt(locked ? null : this.activeHotspot?.promptKey ?? null);

    if (document.documentElement.dataset.reduceMotion !== 'true') {
      for (const bird of this.birds) {
        bird.x += 0.4;
        if (bird.x > GAME_WIDTH + 10) bird.x = -10;
      }
    }
  }
}
