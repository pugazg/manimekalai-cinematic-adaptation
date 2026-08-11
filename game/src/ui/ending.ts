import { gameState } from '../game/state/GameState';
import { save } from '../game/systems/SaveSystem';
import { audio } from '../game/systems/Audio';
import { portrait } from '../game/art/portraits';
import { button, el, overlay, setText } from './dom';

// The human payoff. Paati — whom the player met at the start, unable to reach food —
// now eats and says "போதும்". The moment is given space and a gentle audio cue; UI
// clutter is minimal. Then the aftermath: the bowl leaves, but a local keeps it going.

export interface EndingHooks {
  restart(): void;
  returnToTitle(): void;
  keepExploring(): void;
}

export function showEnding(hooks: EndingHooks): void {
  gameState.setSection('ending');
  gameState.square.localWillContinue = true;
  gameState.hidden.sustainability += 1;
  save(gameState);
  audio.stopAmbience();

  const o = overlay('ending-screen');

  const serve = el('p', { class: 'ending-text' });
  setText(serve, 'ending.serve');

  // Paati's relieved face, given room
  const face = el('img', { class: 'ending-face', alt: '', src: portrait('paati', 'relieved') });

  const eats = el('p', { class: 'ending-text' });
  setText(eats, 'ending.paatiEats');

  const word = el('p', { class: 'ending-word', lang: 'ta' });
  setText(word, 'ending.enoughWord');
  const gloss = el('p', { class: 'ending-gloss' });
  setText(gloss, 'ending.enoughGloss');

  const childSmile = el('p', { class: 'ending-text' });
  setText(childSmile, 'ending.childSmile');

  const after1 = el('p', { class: 'ending-text dim' });
  setText(after1, 'ending.aftermath1');
  const after2 = el('p', { class: 'ending-text dim' });
  setText(after2, 'ending.aftermath2');

  const card = el('p', { class: 'ending-card' });
  setText(card, 'ending.card');
  const thanks = el('p', { class: 'ending-gloss' });
  setText(thanks, 'ending.thanks');

  const buttons = el('div', { class: 'ending-buttons' });
  buttons.append(
    button('menu.restart', () => {
      o.remove();
      hooks.restart();
    }),
    button('menu.explore', () => o.remove()),
    button('menu.returnToTitle', () => {
      o.remove();
      hooks.returnToTitle();
    }),
  );

  o.append(serve, face, eats, word, gloss, childSmile, after1, after2, card, thanks, buttons);

  // gentle cue on the beat
  audio.endingCue();
}
