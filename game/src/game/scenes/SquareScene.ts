import Phaser from 'phaser';
import { BaseWorldScene } from './BaseWorldScene';
import {
  commitServe,
  consequenceKeyFor,
  evaluateServe,
} from '../systems/FeedingSystem';
import {
  assignFreeHelper,
  busyHelpers,
  freeHelper,
  helperOn,
  maniCarryToPaati,
  moveHelperTo,
} from '../systems/HelperSystem';
import {
  recordFirstPriority,
  recordPaatiHelped,
  recordReassign,
  recordServe,
  recordSpokenTo,
  reactiveServeLines,
} from '../systems/ChoiceMemory';
import type { BarrierType, Helper, HelperTask } from '../state/types';
import { dialogue } from '../../ui/dialogue';
import { hud } from '../../ui/hud';
import { showPoidhum } from '../../ui/ending';
import { t } from '../../content/localisation';
import { gameState } from '../state/GameState';
import { save } from '../systems/SaveSystem';
import { audio } from '../systems/Audio';
import { GAME_WIDTH } from '../config';

// Sections 3–5 (Meaningful Agency): the food yard. The three barriers are embodied by
// people the player can see. TWO named helpers can be asked to cover jobs and MOVED
// between them (reversible); there are three jobs but only two helpers, so the player
// must decide, do something personally, or accept a compromise. Serving early is always
// allowed; the world remembers how the player chose. Reaching everyone leads to "போதும்"
// and then the aftermath continuation.

const YOUNG_MAN = { x: 250, y: 340 };
const MOTHER = { x: 770, y: 480 };
const CROWD = { x: 690, y: 400 };
const PAATI = { x: 1060, y: 330 };
const SERVE = { x: 640, y: 410 };

// which person embodies which barrier / job
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
    this.youngMan = this.add.image(YOUNG_MAN.x, YOUNG_MAN.y, gameState.square.cleared.water ? 'young_man_relieved' : 'young_man').setScale(1.35).setDepth(YOUNG_MAN.y);
    this.add.image(YOUNG_MAN.x + 22, YOUNG_MAN.y + 8, 'pot').setScale(0.9).setDepth(YOUNG_MAN.y);
    this.addHotspot({
      id: 'water',
      x: YOUNG_MAN.x,
      y: YOUNG_MAN.y,
      radius: 95,
      promptKey: 'prompt.bringWater',
      icon: 'icon_water',
      onInteract: () => void this.handleJob('water', 'water', this.youngMan, 'young_man_relieved', 'youngMan'),
    });

    // --- safe access: a crowd blocks the path; the mother waits behind it ---
    for (let i = 0; i < 6; i++) {
      const c = this.add.image(CROWD.x + (i % 3) * 34, CROWD.y + Math.floor(i / 3) * 26, 'crowd').setScale(1.25).setDepth(CROWD.y + i);
      if (document.documentElement.dataset.reduceMotion !== 'true') {
        this.tweens.add({ targets: c, x: c.x + 8, duration: 1900 + i * 220, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
      this.crowd.push(c);
    }
    this.mother = this.add.image(MOTHER.x, MOTHER.y, gameState.square.cleared.safe_access ? 'mother_relieved' : 'mother').setScale(1.35).setDepth(MOTHER.y);
    this.add.image(MOTHER.x + 20, MOTHER.y + 6, 'child').setScale(0.9).setDepth(MOTHER.y);
    this.addHotspot({
      id: 'path',
      x: CROWD.x,
      y: CROWD.y,
      radius: 95,
      promptKey: 'prompt.openPath',
      icon: 'icon_path',
      onInteract: () => void this.handleJob('safe_access', 'crowd', this.mother, 'mother_relieved', 'mother'),
    });

    // --- mobility: Paati at the edge, the child beside her (recurring characters) ---
    this.paati = this.add.image(PAATI.x, PAATI.y, gameState.square.cleared.mobility ? 'paati_relieved' : 'paati').setScale(1.3).setDepth(PAATI.y);
    this.add.image(PAATI.x - 26, PAATI.y + 8, 'child').setScale(1.0).setDepth(PAATI.y);
    this.addHotspot({
      id: 'paati',
      x: PAATI.x,
      y: PAATI.y,
      radius: 95,
      promptKey: 'prompt.bringToPaati',
      icon: 'icon_food',
      onInteract: () => void this.handlePaati(),
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

    if (!gameState.square.servedOnce && gameState.choices.peopleSpokenTo.length === 0) {
      void (async () => {
        await dialogue.say('square.intro');
        await dialogue.say('square.beforeServe');
        await dialogue.say('square.helpersIntro', 'char.mani', { character: 'mani', expr: 'attentive' });
        dialogue.close();
      })();
    }
  }

  create(): void {
    super.create();
    this.finishObstacles();
    this.refreshResources();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => audio.stopAmbience());
  }

  private refreshResources(): void {
    hud.setHelpers(gameState.square.helpers, gameState.square.vesselsTotal - gameState.square.vesselsPlaced, gameState.square.vesselsTotal);
  }

  /** Human name for a helper. */
  private nm(h: Helper): string {
    return t(gameState.language, h.nameKey);
  }

  /** Icon/label for what a job means, used in reassignment choices. */
  private jobLabel(task: Exclude<HelperTask, 'idle'>): string {
    return t(gameState.language, `helper.job.${task}`);
  }

  /**
   * Ask a helper to cover a barrier job (water / crowd). If someone is already on it,
   * offer to move them elsewhere. If nobody is free, offer to move a busy helper here
   * (which uncovers their old job — the honest cost).
   */
  private async handleJob(
    barrier: BarrierType,
    task: Exclude<HelperTask, 'idle'>,
    sprite: Phaser.GameObjects.Image,
    doneTexture: string,
    portraitChar: string,
  ): Promise<void> {
    const sq = gameState.square;
    // approaching a person is how the player LISTENS to them (distinct from serving cold)
    recordSpokenTo(gameState.choices, portraitChar);
    if (!sq.known[barrier]) {
      sq.known[barrier] = true;
      const needKey = barrier === 'water' ? 'people.youngManAsk' : 'people.motherAsk';
      await dialogue.say(needKey, portraitChar === 'youngMan' ? 'char.youngMan' : 'char.mother', { character: portraitChar, expr: 'concerned' });
    }
    const current = helperOn(sq, task);

    if (current) {
      // already covered — offer to free this helper (reversible)
      const move = await dialogue.choice<boolean>('helper.alreadyHere', [
        { text: `${this.nm(current)} — ${t(gameState.language, 'helper.leaveHere')}`, value: false },
        { text: t(gameState.language, 'helper.freeThem'), value: true },
      ], undefined, { character: portraitChar, expr: 'relieved' });
      dialogue.close();
      if (move) {
        freeHelper(sq, current.id);
        sprite.setTexture(portraitChar === 'youngMan' ? 'young_man' : 'mother');
        this.refreshResources();
        save(gameState);
        hud.showToast('helper.jobLapsed');
      }
      return;
    }

    const res = assignFreeHelper(sq, task);
    if (res.ok && res.helper) {
      recordFirstPriority(gameState.choices, barrier);
      audio.water();
      this.add.image(sprite.x + 60, sprite.y, 'helper').setScale(1.2).setDepth(sprite.y);
      sprite.setTexture(doneTexture);
      this.refreshResources();
      save(gameState);
      await dialogue.say(`helper.did.${task}`, undefined, { character: portraitChar, expr: 'relieved' });
      dialogue.close();
      return;
    }

    // nobody free — offer to move a busy helper here
    const options = busyHelpers(sq).map((h) => ({
      text: `${this.nm(h)} — ${t(gameState.language, 'helper.moveFrom')} ${this.jobLabel(h.task as Exclude<HelperTask, 'idle'>)}`,
      value: h.id as string | null,
    }));
    options.push({ text: t(gameState.language, 'helper.notNow'), value: null });
    const chosen = await dialogue.choice<string | null>('helper.allBusy', options, 'char.mani', { character: 'mani', expr: 'concerned' });
    dialogue.close();
    if (chosen) {
      const moved = moveHelperTo(sq, chosen, task);
      if (moved.ok) {
        if (moved.reassigned) recordReassign(gameState.choices);
        recordFirstPriority(gameState.choices, barrier);
        sprite.setTexture(doneTexture);
        this.reflectAllSprites();
        this.refreshResources();
        save(gameState);
        hud.showToast('helper.movedHere');
      }
    }
  }

  /** Paati: Manimekalai can carry the portion herself, or spend a helper on it. */
  private async handlePaati(): Promise<void> {
    const sq = gameState.square;
    recordSpokenTo(gameState.choices, 'paati');
    if (sq.cleared.mobility) {
      await dialogue.say('square.act.paatiDone', 'char.paati', { character: 'paati', expr: 'relieved' });
      dialogue.close();
      return;
    }
    if (!sq.known.mobility) {
      sq.known.mobility = true;
      await dialogue.say('people.paatiWait', 'char.paati', { character: 'paati', expr: 'tired' });
    }
    const choice = await dialogue.choice<'self' | 'helper' | 'cancel'>('paati.how', [
      { text: t(gameState.language, 'paati.self'), value: 'self' },
      { text: t(gameState.language, 'paati.helper'), value: 'helper' },
      { text: t(gameState.language, 'helper.notNow'), value: 'cancel' },
    ], 'char.mani', { character: 'mani', expr: 'attentive' });

    if (choice === 'self') {
      maniCarryToPaati(sq);
      recordPaatiHelped(gameState.choices);
      audio.serve();
      this.paati.setTexture('paati_relieved');
      this.refreshResources();
      save(gameState);
      await dialogue.say('square.act.paatiDone', 'char.mani', { character: 'mani', expr: 'relieved' });
      dialogue.close();
      return;
    }
    if (choice === 'helper') {
      const res = assignFreeHelper(sq, 'carry');
      if (res.ok && res.helper) {
        recordPaatiHelped(gameState.choices);
        audio.serve();
        this.paati.setTexture('paati_relieved');
        this.reflectAllSprites();
        this.refreshResources();
        save(gameState);
        await dialogue.say('helper.did.carry', undefined, { character: 'paati', expr: 'relieved' });
        dialogue.close();
      } else {
        // no free helper: moving one here would uncover water/crowd — tell the player
        dialogue.close();
        hud.showToast('helper.allBusyPaati');
      }
      return;
    }
    dialogue.close();
  }

  /** Keep the yard sprites in step with derived `cleared` after a reassignment. */
  private reflectAllSprites(): void {
    const sq = gameState.square;
    this.youngMan.setTexture(sq.cleared.water ? 'young_man_relieved' : 'young_man');
    this.mother.setTexture(sq.cleared.safe_access ? 'mother_relieved' : 'mother');
    this.paati.setTexture(sq.cleared.mobility ? 'paati_relieved' : 'paati');
  }

  private async serveOrSet(): Promise<void> {
    const sq = gameState.square;
    if (!this.servingSet) {
      sq.vesselsPlaced += 1;
      this.servingSet = true;
      this.add.image(SERVE.x, SERVE.y + 30, 'mat').setScale(0.9).setDepth(3);
      const hs = this.getHotspot('serve');
      if (hs) hs.promptKey = 'prompt.serve';
      this.refreshResources();
      save(gameState);
      hud.showToast('square.act.setDone');
      return;
    }
    await this.serve();
  }

  private async serve(): Promise<void> {
    const sq = gameState.square;
    const evalResult = evaluateServe(sq, [
      { id: 'youngMan', barrier: 'water' },
      { id: 'mother', barrier: 'safe_access' },
      { id: 'paati', barrier: 'mobility' },
    ]);
    if (!evalResult.canServe) {
      hud.showToast(evalResult.blockedKey ?? 'square.act.needVessel');
      return;
    }
    audio.serve();
    commitServe(sq, gameState.hidden, evalResult);
    recordServe(gameState.choices, sq, evalResult.allReached);
    save(gameState);

    if (evalResult.allReached) {
      await dialogue.say('square.allReady');
      // small reactive lines chosen from what the player actually did
      for (const key of reactiveServeLines(gameState.choices)) {
        await dialogue.say(key, undefined, { character: 'mani', expr: 'relieved' });
      }
      dialogue.close();
      this.toPoidhum();
      return;
    }

    // fail-forward: show what happened, through the specific people
    await dialogue.say('square.serveEarly');
    await dialogue.say('square.revise', 'char.mani', { character: 'mani', expr: 'concerned' });
    for (const o of evalResult.outcomes) {
      if (o.reached) continue;
      const key = consequenceKeyFor(o.barrier);
      await dialogue.say(key, undefined, { character: BARRIER_PORTRAIT[o.barrier], expr: 'concerned' });
      gameState.addLedgerItem({ id: `consequence_${o.barrier}`, statementKey: key, trueType: 'observation', classifiedAs: undefined, given: false, status: 'challenged' });
    }
    await dialogue.say('mani.afterFail', 'char.mani', { character: 'mani', expr: 'concerned' });
    dialogue.close();
    save(gameState);
  }

  private toPoidhum(): void {
    showPoidhum(() => {
      gameState.setSection('aftermath');
      save(gameState);
      this.scene.start('Aftermath');
    });
  }
}
