import Phaser from 'phaser';
import { BaseWorldScene } from './BaseWorldScene';
import { dialogue } from '../../ui/dialogue';
import { hud } from '../../ui/hud';
import { showFinale } from '../../ui/ending';
import { chooseLocalOwner } from '../systems/ChoiceMemory';
import { nav } from '../nav';
import { t } from '../../content/localisation';
import { gameState } from '../state/GameState';
import { save } from '../systems/SaveSystem';
import { audio } from '../systems/Audio';
import { GAME_WIDTH } from '../config';

// Section 6 (Meaningful Agency): the ~5–7 minute continuation AFTER "போதும்". Serving
// goes on; Manimekalai starts to leave — and a smaller new problem appears (the water
// is running low). Whether the work can carry on without her depends on how she played:
// who she engaged, what she emphasised, and whether she made herself indispensable.
// This proves earlier choices matter beyond the first problem. It is shown through
// PEOPLE, never a menu question and never a sustainability score.

const YOUNG_MAN = { x: 250, y: 340 };
const MOTHER = { x: 760, y: 470 };
const PAATI = { x: 1050, y: 330 };
const WELL = { x: 300, y: 470 };
const EXIT = { x: 1200, y: 560 };

export class AftermathScene extends BaseWorldScene {
  private leaveEnabled = false;

  constructor() {
    super('Aftermath');
  }

  protected spawn(): { x: number; y: number } {
    return { x: 640, y: 560 };
  }

  protected buildWorld(): void {
    // decide (once) who the world will lean on now — from the player's actual history
    if (!gameState.choices.localOwner) {
      gameState.choices.localOwner = chooseLocalOwner(gameState.choices);
      save(gameState);
    }
    this.leaveEnabled = gameState.aftermath.resolved;

    this.tileGround('tile_stone');
    this.addBuildingRow();
    this.addBirds();
    audio.startAmbience();

    // the yard, now fed — everyone relieved, serving continuing
    this.add.image(640, 410, 'bowl').setScale(1.6).setDepth(410);
    this.add.image(640, 440, 'mat').setScale(0.9).setDepth(3);
    this.add.image(YOUNG_MAN.x, YOUNG_MAN.y, 'young_man_relieved').setScale(1.35).setDepth(YOUNG_MAN.y);
    this.add.image(MOTHER.x, MOTHER.y, 'mother_relieved').setScale(1.35).setDepth(MOTHER.y);
    this.add.image(MOTHER.x + 20, MOTHER.y + 6, 'child').setScale(0.9).setDepth(MOTHER.y);
    this.add.image(PAATI.x, PAATI.y, 'paati_relieved').setScale(1.3).setDepth(PAATI.y);
    this.add.image(PAATI.x - 26, PAATI.y + 8, 'child').setScale(1.0).setDepth(PAATI.y);

    // the new small problem: the well / water running low
    this.add.image(WELL.x, WELL.y, 'well').setScale(1.0).setDepth(2);
    this.addHotspot({
      id: 'situation',
      x: WELL.x,
      y: WELL.y,
      radius: 100,
      promptKey: 'prompt.seeWater',
      icon: gameState.aftermath.resolved ? undefined : 'icon_water',
      enabled: !gameState.aftermath.resolved,
      onInteract: () => void this.runSituation(),
    });

    // Paati and the child remain present and reachable
    this.addHotspot({
      id: 'paatiChild',
      x: PAATI.x,
      y: PAATI.y,
      radius: 95,
      promptKey: 'prompt.talkPaati',
      icon: 'icon_talk',
      onInteract: () => void this.talkPaatiChild(),
    });

    // leave — enabled once the follow-up is handled
    const exit = this.addHotspot({
      id: 'leave',
      x: EXIT.x,
      y: EXIT.y,
      radius: 95,
      promptKey: 'prompt.leaveYard',
      icon: this.leaveEnabled ? 'icon_path' : undefined,
      onInteract: () => void this.leave(),
    });
    exit.enabled = this.leaveEnabled;

    this.addObstacle(GAME_WIDTH / 2, 175, GAME_WIDTH, 90);

    if (!gameState.aftermath.started) {
      gameState.aftermath.started = true;
      save(gameState);
      void (async () => {
        await dialogue.say('after.intro', 'char.mani', { character: 'mani', expr: 'attentive' });
        await dialogue.say('after.waterLow', undefined, { character: 'youngMan', expr: 'concerned' });
        dialogue.close();
      })();
    }
  }

  create(): void {
    super.create();
    this.finishObstacles();
    hud.hideResources();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => audio.stopAmbience());
  }

  private async runSituation(): Promise<void> {
    if (gameState.aftermath.resolved) {
      await dialogue.say('after.alreadyResolved', 'char.mani', { character: 'mani', expr: 'relieved' });
      dialogue.close();
      return;
    }
    const owner = gameState.choices.localOwner ?? 'mani';

    if (owner === 'youngMan') {
      await dialogue.say('after.youngManSteps', 'char.youngMan', { character: 'youngMan', expr: 'attentive' });
      gameState.hidden.trust += 1;
    } else if (owner === 'mother') {
      await dialogue.say('after.motherSteps', 'char.mother', { character: 'mother', expr: 'attentive' });
      gameState.hidden.trust += 1;
    } else {
      // Manimekalai stayed central — the locals look to her, and she must ask directly.
      await dialogue.say('after.localsWait', undefined, { character: 'mother', expr: 'concerned' });
      const who = await dialogue.choice<'youngMan' | 'mother'>('after.askWho', [
        { text: t(gameState.language, 'after.askYoungMan'), value: 'youngMan' },
        { text: t(gameState.language, 'after.askMother'), value: 'mother' },
      ], 'char.mani', { character: 'mani', expr: 'attentive' });
      const speaker = who === 'youngMan' ? 'char.youngMan' : 'char.mother';
      await dialogue.say('after.tentative', speaker, { character: who, expr: 'neutral' });
    }
    dialogue.close();

    gameState.aftermath.resolved = true;
    gameState.aftermath.waterLow = true;
    this.setHotspotIcon('situation', null);
    const sit = this.getHotspot('situation');
    if (sit) sit.enabled = false;
    const exit = this.getHotspot('leave');
    if (exit) {
      exit.enabled = true;
      this.setHotspotIcon('leave', 'icon_path');
    }
    this.leaveEnabled = true;
    save(gameState);
    hud.showToast('after.canLeave', 5000);
  }

  private async talkPaatiChild(): Promise<void> {
    if (gameState.choices.paatiHelpedBeforeFirstServe) {
      await dialogue.say('after.childRemembers', 'char.child', { character: 'child', expr: 'relieved' });
    } else {
      await dialogue.say('after.paatiThanks', 'char.paati', { character: 'paati', expr: 'relieved' });
    }
    dialogue.close();
  }

  private async leave(): Promise<void> {
    dialogue.close();
    showFinale({
      restart: () => nav.restart(),
      returnToTitle: () => nav.returnToTitle(),
      keepExploring: () => {},
    });
  }
}
