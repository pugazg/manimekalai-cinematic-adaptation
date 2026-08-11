import Phaser from 'phaser';

// Manimekalai in the world: a physics sprite with simple four-way movement, an idle
// "breathing" bob, and a walk wobble. No animation pipeline — transforms only.

const SPEED = 210;

export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;
  private walkPhase = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'mani');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body!.setSize(22, 16);
    this.sprite.body!.setOffset(4, 26);
    this.sprite.setDepth(y);

    const kb = scene.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasd = {
      up: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W, false),
      down: kb.addKey(Phaser.Input.Keyboard.KeyCodes.S, false),
      left: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A, false),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D, false),
    };
  }

  /** Per-frame movement. Pass locked=true to freeze (dialogue/menu open). */
  update(time: number, locked: boolean): void {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    if (locked) {
      body.setVelocity(0, 0);
      this.sprite.setRotation(0);
      return;
    }
    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy += 1;

    const len = Math.hypot(vx, vy) || 1;
    body.setVelocity((vx / len) * SPEED, (vy / len) * SPEED);

    const moving = vx !== 0 || vy !== 0;
    if (vx !== 0) this.sprite.setFlipX(vx < 0);

    const reduceMotion = document.documentElement.dataset.reduceMotion === 'true';
    if (moving && !reduceMotion) {
      this.walkPhase += 0.25;
      this.sprite.setRotation(Math.sin(this.walkPhase) * 0.06);
    } else if (!reduceMotion) {
      this.sprite.setRotation(0);
      this.sprite.setScale(1, 1 + Math.sin(time / 600) * 0.01);
    } else {
      this.sprite.setRotation(0);
      this.sprite.setScale(1, 1);
    }
    this.sprite.setDepth(this.sprite.y);
  }
}
