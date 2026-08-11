import Phaser from 'phaser';
import { BaseWorldScene } from './BaseWorldScene';
import {
  applyIntervention,
  commitServe,
  consequenceKeyFor,
  evaluateServe,
} from '../systems/FeedingSystem';
import type { BarrierType } from '../state/types';
import { dialogue } from '../../ui/dialogue';
import { hud } from '../../ui/hud';
import { showEnding } from '../../ui/ending';
import { nav } from '../nav';
import { gameState } from '../state/GameState';
import { save } from '../systems/SaveSystem';
import { audio } from '../systems/Audio';
import { GAME_WIDTH } from '../config';

// Sections 3–5 (Human First): the food yard. The three barriers are embodied by
// people the player can see and (for Paati) already knows. Early serving is allowed;
// consequences are shown through those people, not system messages.

const YOUNG_MAN = { x: 250, y: 340 };
const MOTHER = { x: 770, y: 480 };
const CROWD = { x: 690, y: 400 };
const PAATI = { x: 1060, y: 330 };
const SERVE = { x: 640, y: 410 };

// which person embodies which barrier
const BARRIER_PORTRAIT: Record<BarrierType, string> = {
  water: 'youngMan',
  safe_access: 'mother',
  mobility: 'paati',
};

export class SquareScene extends BaseWorldScene {
  private youngMan!: Phaser.GameObjects.Image;
  private mother!: Phaser.GameObjects.Image;
  private paati!: Phaser.GameObjects.Image;
  private crowd: Phaser.GameObjects.Image[] = [];
  private servingSet = false;

  constructor() {
    super('Square');
  }

  protected spawn(): { x: number; y: number } {
    return { x: 640, y: 560 };
  }

  protected buildWorld(): void {
    this.crowd = [];
    this.servingSet = gameState.square.vesselsPlaced > 0;
    this.tileGround('tile_stone');
    this.addBuildingRow();
    this.addBirds();
    audio.startAmbience();

    // --- water: the young man by the well, empty pot ---
    this.add.image(YOUNG_MAN.x - 40, YOUNG_MAN.y + 10, 'well').setScale(0.9).setDepth(2);
    this.youngMan = this.add.image(YOUNG_MAN.x, YOUNG_MAN.y, 'young_man').setScale(1.35).setDepth(YOUNG_MAN.y);
    this.add.image(YOUNG_MAN.x + 22, YOUNG_MAN.y + 8, 'pot').setScale(0.9).setDepth(YOUNG_MAN.y);
    this.addHotspot({
      id: 'water',
      x: YOUNG_MAN.x,
      y: YOUNG_MAN.y,
      radius: 90,
      promptKey: 'prompt.bringWater',
      icon: gameState.square.cleared.water ? undefined : 'icon_water',
      enabled: !gameState.square.cleared.water,
      onInteract: () => void this.fixWater(),
    });

    // --- safe access: a crowd blocks the path; the mother waits behind it ---
    for (let i = 0; i < 6; i++) {
      const c = this.add.image(CROWD.x + (i % 3) * 34, CROWD.y + Math.floor(i / 3) * 26, 'crowd').setScale(1.25).setDepth(CROWD.y + i);
      if (document.documentElement.dataset.reduceMotion !== 'true') {
        this.tweens.add({ targets: c, x: c.x + 8, duration: 1900 + i * 220, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
      this.crowd.push(c);
    }
    this.mother = this.add.image(MOTHER.x, MOTHER.y, 'mother').setScale(1.35).setDepth(MOTHER.y);
    this.add.image(MOTHER.x + 20, MOTHER.y + 6, 'child').setScale(0.9).setDepth(MOTHER.y);
    this.addHotspot({
      id: 'path',
      x: CROWD.x,
      y: CROWD.y,
      radius: 90,
      promptKey: 'prompt.openPath',
      icon: gameState.square.cleared.safe_access ? undefined : 'icon_path',
      enabled: !gameState.square.cleared.safe_access,
      onInteract: () => void this.fixPath(),
    });

    // --- mobility: Paati at the edge, the child beside her (recurring characters) ---
    this.paati = this.add.image(PAATI.x, PAATI.y, 'paati').setScale(1.3).setDepth(PAATI.y);
    this.add.image(PAATI.x - 26, PAATI.y + 8, 'child').setScale(1.0).setDepth(PAATI.y);
    this.addHotspot({
      id: 'paati',
      x: PAATI.x,
      y: PAATI.y,
      radius: 95,
      promptKey: 'prompt.bringToPaati',
      icon: gameState.square.cleared.mobility ? undefined : 'icon_food',
      enabled: !gameState.square.cleared.mobility,
      onInteract: () => void this.fixPaati(),
    });

    // --- serving place ---
    this.add.image(SERVE.x, SERVE.y, 'bowl').setScale(1.6).setDepth(SERVE.y);
    if (this.servingSet) this.add.image(SERVE.x, SERVE.y + 30, 'mat').setScale(0.9).setDepth(3);
    this.addHotspot({
      id: 'serve',
      x: SERVE.x,
      y: SERVE.y,
      radius: 90,
      promptKey: this.servingSet ? 'prompt.serve' : 'prompt.setServing',
      icon: 'icon_food',
      onInteract: () => void this.serveOrSet(),
    });

    this.addObstacle(GAME_WIDTH / 2, 175, GAME_WIDTH, 90);

    if (!gameState.square.servedOnce) {
      void (async () => {
        await dialogue.say('square.intro');
        await dialogue.say('square.beforeServe');
        dialogue.close();
      })();
    }
  }

  create(): void {
    super.create();
    this.finishObstacles();
    hud.setResourcesVisible(true);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => audio.stopAmbience());
  }

  private async fixWater(): Promise<void> {
    const r = applyIntervention(gameState.square, 'assignWater');
    if (!r.ok) {
      hud.showToast(r.messageKey);
      return;
    }
    audio.water();
    this.add.image(YOUNG_MAN.x + 60, YOUNG_MAN.y, 'helper').setScale(1.2).setDepth(YOUNG_MAN.y);
    this.youngMan.setTexture('young_man_relieved');
    this.setHotspotIcon('water', null);
    const hs = this.getHotspot('water');
    if (hs) hs.enabled = false;
    hud.setResourcesVisible(true);
    save(gameState);
    await dialogue.say('square.act.waterDone', 'char.youngMan', { character: 'youngMan', expr: 'relieved' });
    dialogue.close();
  }

  private async fixPath(): Promise<void> {
    const r = applyIntervention(gameState.square, 'assignLine');
    if (!r.ok) {
      hud.showToast(r.messageKey);
      return;
    }
    // the crowd parts
    this.crowd.forEach((c, i) => {
      this.tweens.killTweensOf(c);
      this.tweens.add({ targets: c, x: c.x + (i < 3 ? -70 : 70), duration: 600, ease: 'Sine.inOut' });
    });
    this.mother.setTexture('mother_relieved');
    this.setHotspotIcon('path', null);
    const hs = this.getHotspot('path');
    if (hs) hs.enabled = false;
    hud.setResourcesVisible(true);
    save(gameState);
    await dialogue.say('square.act.pathDone', 'char.mother', { character: 'mother', expr: 'relieved' });
    dialogue.close();
  }

  private async fixPaati(): Promise<void> {
    // Manimekalai carries a portion herself (no helper needed) — but first, Paati speaks.
    if (!gameState.square.known.mobility) {
      gameState.square.known.mobility = true;
      await dialogue.say('people.paatiWait', 'char.paati', { character: 'paati', expr: 'tired' });
    }
    applyIntervention(gameState.square, 'carryPortion');
    audio.serve();
    this.paati.setTexture('paati_relieved');
    this.setHotspotIcon('paati', null);
    const hs = this.getHotspot('paati');
    if (hs) hs.enabled = false;
    save(gameState);
    await dialogue.say('square.act.paatiDone', 'char.mani', { character: 'mani', expr: 'relieved' });
    dialogue.close();
  }

  private async serveOrSet(): Promise<void> {
    if (!this.servingSet) {
      applyIntervention(gameState.square, 'placeVessel');
      this.servingSet = true;
      this.add.image(SERVE.x, SERVE.y + 30, 'mat').setScale(0.9).setDepth(3);
      const hs = this.getHotspot('serve');
      if (hs) hs.promptKey = 'prompt.serve';
      hud.setResourcesVisible(true);
      save(gameState);
      hud.showToast('square.act.setDone');
      return;
    }
    await this.serve();
  }

  private async serve(): Promise<void> {
    const evalResult = evaluateServe(gameState.square, [
      { id: 'youngMan', barrier: 'water' },
      { id: 'mother', barrier: 'safe_access' },
      { id: 'paati', barrier: 'mobility' },
    ]);
    if (!evalResult.canServe) {
      hud.showToast(evalResult.blockedKey ?? 'square.act.needVessel');
      return;
    }
    audio.serve();
    commitServe(gameState.square, gameState.hidden, evalResult);
    save(gameState);

    if (evalResult.allReached) {
      await dialogue.say('square.allReady');
      dialogue.close();
      showEnding({
        restart: () => nav.restart(),
        returnToTitle: () => nav.returnToTitle(),
        keepExploring: () => {},
      });
      return;
    }

    // fail-forward: show what happened, through the specific people
    await dialogue.say('square.serveEarly');
    await dialogue.say('square.revise', 'char.mani', { character: 'mani', expr: 'concerned' });
    for (const o of evalResult.outcomes) {
      if (o.reached) continue;
      const key = consequenceKeyFor(o.barrier);
      await dialogue.say(key, undefined, { character: BARRIER_PORTRAIT[o.barrier], expr: 'concerned' });
      gameState.addLedgerItem({ id: `consequence_${o.barrier}`, statementKey: key, trueType: 'observation', classifiedAs: undefined, given: false });
    }
    await dialogue.say('mani.afterFail', 'char.mani', { character: 'mani', expr: 'concerned' });
    dialogue.close();
    save(gameState);
  }
}
