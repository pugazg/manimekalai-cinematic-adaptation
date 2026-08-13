import Phaser from 'phaser';
import { BaseWorldScene } from './BaseWorldScene';
import { dialogue } from '../../ui/dialogue';
import { hud } from '../../ui/hud';
import { recordSpokenTo } from '../systems/ChoiceMemory';
import { gameState } from '../state/GameState';
import { save } from '../systems/SaveSystem';
import { audio } from '../systems/Audio';
import { GAME_WIDTH } from '../config';

// Section 1–2 (Human First): the Puhar opening. GAME-SPECIFIC BRIDGE, not a screenplay
// scene (see PROTOTYPE_TRACE.md). The player meets a child and Paati (grandmother),
// sees that they cannot reach the food, and only then learns why — and receives the bowl.

const CHILD = { x: 360, y: 430 };
const PAATI = { x: 250, y: 300 };
const CARRIER = { x: 1040, y: 440 };
const EXIT = { x: 1210, y: 520 };

export class PuharScene extends BaseWorldScene {
  private child!: Phaser.GameObjects.Image;
  private talkedChild = false;
  private bowlShown = false;

  constructor() {
    super('Puhar');
  }

  protected spawn(): { x: number; y: number } {
    return { x: 150, y: 440 };
  }

  protected buildWorld(): void {
    const past = gameState.section !== 'puhar';
    this.talkedChild = past || gameState.flags.metChild;
    this.bowlShown = past;

    this.tileGround('tile_ground');
    this.addBuildingRow();
    this.addBirds();

    // Food being carried, visible on the far side (the child will look toward it)
    const porter = this.add.image(900, 300, 'helper').setScale(1.3).setDepth(300);
    this.add.image(918, 292, 'bowl').setScale(1.1).setDepth(301);
    if (document.documentElement.dataset.reduceMotion !== 'true') {
      this.tweens.add({ targets: porter, x: 990, duration: 8000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }

    // A crowded path between the child and the food
    for (let i = 0; i < 6; i++) {
      const c = this.add.image(600 + (i % 3) * 34, 320 + Math.floor(i / 3) * 30, 'crowd').setScale(1.25).setDepth(340 + i);
      if (document.documentElement.dataset.reduceMotion !== 'true') {
        this.tweens.add({ targets: c, x: c.x + 8, duration: 2000 + i * 250, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
    }

    // Paati, seated and tired
    this.add.image(PAATI.x, PAATI.y, 'paati').setScale(1.25).setDepth(PAATI.y);

    // The child — waves at Manimekalai
    this.child = this.add.image(CHILD.x, CHILD.y, 'child').setScale(1.3).setDepth(CHILD.y);
    if (document.documentElement.dataset.reduceMotion !== 'true') {
      this.tweens.add({ targets: this.child, angle: -8, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }
    this.addHotspot({
      id: 'child',
      x: CHILD.x,
      y: CHILD.y,
      radius: 95,
      promptKey: 'prompt.talkChild',
      icon: 'icon_talk',
      onInteract: () => void this.meetChild(),
    });

    // The water-carrier (context) — only after meeting the child
    const carrier = this.add.image(CARRIER.x, CARRIER.y, 'carrier').setScale(1.4).setDepth(CARRIER.y);
    this.add.image(CARRIER.x - 22, CARRIER.y + 6, 'pot').setScale(0.9).setDepth(CARRIER.y);
    if (document.documentElement.dataset.reduceMotion !== 'true') {
      this.tweens.add({ targets: carrier, scaleY: 1.43, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }
    const carrierHot = this.addHotspot({
      id: 'carrier',
      x: CARRIER.x,
      y: CARRIER.y,
      radius: 95,
      promptKey: 'prompt.talkCarrier',
      icon: this.talkedChild ? 'icon_talk' : undefined,
      onInteract: () => void this.talkCarrier(),
    });
    carrierHot.enabled = this.talkedChild;

    // Exit to the yard (enabled after the bowl)
    const exit = this.addHotspot({
      id: 'exit',
      x: EXIT.x,
      y: EXIT.y,
      radius: 95,
      promptKey: 'prompt.goSquare',
      icon: this.bowlShown ? 'icon_path' : undefined,
      onInteract: () => void this.leaveForSquare(),
    });
    exit.enabled = this.bowlShown;

    // gentle look point at the well/water area
    this.add.image(CARRIER.x - 70, CARRIER.y + 34, 'well').setScale(0.8).setDepth(2);

    this.addObstacle(GAME_WIDTH / 2, 175, GAME_WIDTH, 90);
  }

  create(): void {
    super.create();
    this.finishObstacles();
    hud.hideResources();
    if (gameState.section === 'puhar' && !this.talkedChild) {
      void this.intro();
    }
  }

  private async intro(): Promise<void> {
    await dialogue.say('puhar.intro');
    await dialogue.say('puhar.childWave', undefined, { character: 'child', expr: 'attentive' });
    dialogue.close();
  }

  private async meetChild(): Promise<void> {
    if (this.talkedChild) {
      await dialogue.say('people.childToMani', 'char.child', { character: 'child', expr: 'concerned' });
      dialogue.close();
      return;
    }
    recordSpokenTo(gameState.choices, 'child');
    await dialogue.say('child.hi', 'char.child', { character: 'child', expr: 'neutral' });
    await dialogue.say('child.paatiHungry', 'char.child', { character: 'child', expr: 'concerned' });
    await dialogue.say('child.foodThere', 'char.child', { character: 'child', expr: 'attentive' });
    await dialogue.say('child.cantReach', 'char.child', { character: 'child', expr: 'concerned' });
    dialogue.close();

    this.learn('childFood', 'know.childFood', 'observation');
    gameState.setFlag('metChild');

    // stop the wave; the child tries to reach the food, then returns to Paati
    this.tweens.killTweensOf(this.child);
    this.child.setAngle(0);
    await this.showTheTry();

    await dialogue.say('mani.seeThem', 'char.mani', { character: 'mani', expr: 'concerned' });
    await dialogue.say('mani.why', 'char.mani', { character: 'mani', expr: 'concerned' });
    dialogue.close();

    // now the carrier can explain
    const c = this.getHotspot('carrier');
    if (c) {
      c.enabled = true;
      this.setHotspotIcon('carrier', 'icon_talk');
    }
    hud.showToast('journal.learned');
  }

  private showTheTry(): Promise<void> {
    return new Promise((resolve) => {
      if (document.documentElement.dataset.reduceMotion === 'true') {
        resolve();
        return;
      }
      this.tweens.add({
        targets: this.child,
        x: 520,
        y: 360,
        duration: 900,
        ease: 'Sine.inOut',
        yoyo: true,
        hold: 350,
        onYoyo: () => this.child.setTexture('child_concerned'),
        onComplete: () => {
          this.child.setPosition(CHILD.x, CHILD.y);
          resolve();
        },
      });
    });
  }

  private async talkCarrier(): Promise<void> {
    recordSpokenTo(gameState.choices, 'carrier');
    await dialogue.say('carrier.l1', 'char.carrier', { character: 'carrier', expr: 'neutral' });
    await dialogue.say('carrier.l2', 'char.carrier', { character: 'carrier', expr: 'concerned' });
    this.learn('wellFar', 'know.wellFar', 'inference', 'char.carrier');
    await dialogue.say('carrier.afterListen', 'char.carrier', { character: 'carrier', expr: 'neutral' });
    dialogue.close();
    await this.revealBowl();
  }

  private learn(id: string, statementKey: string, trueType: 'observation' | 'testimony' | 'inference' | 'assumption', sourceKey?: string): void {
    const added = gameState.addLedgerItem({ id, statementKey, sourceKey, trueType, classifiedAs: undefined, given: false });
    if (added) {
      audio.learn();
      // teach the journal key once
      if (!gameState.flags.learnedOnce) {
        gameState.setFlag('learnedOnce');
        hud.showToast('hud.ledgerHintOnce', 4200);
      }
      save(gameState);
    }
  }

  private async revealBowl(): Promise<void> {
    if (this.bowlShown) return;
    this.bowlShown = true;
    const bowl = this.add.image(this.player.sprite.x, this.player.sprite.y - 48, 'bowl').setDepth(9500).setScale(1.5);
    audio.serve();
    await dialogue.say('bowl.reveal1', undefined, { character: 'mani', expr: 'attentive' });
    await dialogue.say('bowl.reveal2', undefined, { character: 'mani', expr: 'neutral' });
    await dialogue.say('bowl.hope', 'char.mani', { character: 'mani', expr: 'relieved' });
    dialogue.close();
    gameState.addLedgerItem({ id: 'bowlRule', statementKey: 'bowl.reveal2', given: true });
    save(gameState);
    this.tweens.add({ targets: bowl, alpha: 0, y: bowl.y - 12, duration: 900, delay: 300, onComplete: () => bowl.destroy() });
    const exit = this.getHotspot('exit');
    if (exit) {
      exit.enabled = true;
      this.setHotspotIcon('exit', 'icon_path');
    }
    hud.showToast('puhar.toSquare', 5200);
  }

  private async leaveForSquare(): Promise<void> {
    dialogue.close();
    gameState.setSection('square');
    save(gameState);
    this.scene.start('Square');
  }
}
