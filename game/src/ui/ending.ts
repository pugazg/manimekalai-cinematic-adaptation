import { gameState } from '../game/state/GameState';
import { save } from '../game/systems/SaveSystem';
import { audio } from '../game/systems/Audio';
import { portrait } from '../game/art/portraits';
import { t } from '../content/localisation';
import { buildJourneyLines, buildPlaytestSummary } from './summary';
import { button, el, overlay, setText } from './dom';

// The human payoff and the ownership test. In 0.3 the "போதும்" beat no longer ends the
// game — it opens the aftermath. The FINAL closing (showFinale) comes after the aftermath
// and varies by who carries the work on, then shows the player their own journey.

export interface EndingHooks {
  restart(): void;
  returnToTitle(): void;
  keepExploring(): void;
}

/**
 * The "போதும்" beat: Paati — met at the start, unable to reach food — eats and says
 * "Enough". One gentle continue leads into the aftermath.
 */
export function showPoidhum(onContinue: () => void): void {
  audio.stopAmbience();
  const o = overlay('ending-screen poidhum-screen');

  const serve = el('p', { class: 'ending-text' });
  setText(serve, 'ending.serve');

  const face = el('img', { class: 'ending-face', alt: '', src: portrait('paati', 'relieved') });

  const eats = el('p', { class: 'ending-text' });
  setText(eats, 'ending.paatiEats');

  const word = el('p', { class: 'ending-word', lang: 'ta' });
  setText(word, 'ending.enoughWord');
  const gloss = el('p', { class: 'ending-gloss' });
  setText(gloss, 'ending.enoughGloss');

  const childSmile = el('p', { class: 'ending-text' });
  setText(childSmile, 'ending.childSmile');

  const hint = el('p', { class: 'ending-text dim' });
  setText(hint, 'ending.afterPoidhum');

  const buttons = el('div', { class: 'ending-buttons' });
  buttons.append(button('menu.continueBeat', () => {
    o.remove();
    onContinue();
  }));

  o.append(serve, face, eats, word, gloss, childSmile, hint, buttons);
  audio.endingCue();
}

/**
 * The final closing, after the aftermath. Its texture depends on who took ownership,
 * then it shows the player their own journey and an owner-only playtest summary.
 */
export function showFinale(hooks: EndingHooks): void {
  gameState.setSection('ending');
  const owner = gameState.choices.localOwner ?? 'none';
  // sustainability rises when a local carries the work on; not when Manimekalai stayed central
  gameState.square.localWillContinue = owner === 'mother' || owner === 'youngMan';
  if (gameState.square.localWillContinue) gameState.hidden.sustainability += 1;
  save(gameState);
  audio.stopAmbience();

  const o = overlay('ending-screen');

  const close1 = el('p', { class: 'ending-text' });
  setText(close1, 'finale.leave');

  // closing texture varies by who continues the work
  const ownerKey =
    owner === 'mother' ? 'finale.ownerMother'
    : owner === 'youngMan' ? 'finale.ownerYoungMan'
    : 'finale.ownerMani';
  const close2 = el('p', { class: 'ending-text' });
  setText(close2, ownerKey);

  const unresolved = el('p', { class: 'ending-text dim' });
  setText(unresolved, 'finale.unresolved');

  // --- "Your journey through this prototype" (the player's own choices) ---
  const journeyTitle = el('h3', { class: 'journey-title' });
  setText(journeyTitle, 'journey.title');
  const journeyList = el('ul', { class: 'journey-list' });
  for (const line of buildJourneyLines()) journeyList.append(el('li', {}, [line]));

  // --- owner-only playtest summary + copy (local, no telemetry) ---
  const summaryBox = el('pre', { class: 'playtest-summary' }, [buildPlaytestSummary()]);
  const copyBtn = button('summary.copy', () => {
    const text = buildPlaytestSummary();
    try {
      void navigator.clipboard?.writeText(text);
    } catch {
      /* clipboard may be unavailable; the text is visible above regardless */
    }
    copyBtn.textContent = t(gameState.language, 'summary.copied');
  });
  const summaryTitle = el('h3', { class: 'journey-title' });
  setText(summaryTitle, 'summary.title');

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

  o.append(
    close1, close2, unresolved,
    journeyTitle, journeyList,
    summaryTitle, summaryBox, copyBtn,
    card, thanks, buttons,
  );
  audio.endingCue();
}
