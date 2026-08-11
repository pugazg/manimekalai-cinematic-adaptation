# Manimekalai: The First Handful — G2 Prototype 0.2 (Human First)

A small, browser-playable narrative-adventure prototype built from the plan in
[`../docs/12-game-adaptation/`](../docs/12-game-adaptation/). You control Manimekalai
in Puhar, **meet a child and her grandmother (Paati) who cannot reach the food**,
learn why, receive the Amudhasurabhi, and discover that endless food is only the start
of the problem — until, at last, Paati eats and says **"போதும்"** (Enough).

> **Prototype 0.2 has exactly two goals:** a child should understand *what to do*
> without repeated explanation, and the player should *care about a specific person*
> before the feeding puzzle. It is still a prototype — ~12–15 minutes, not the full
> game, not production, grants no licence, uses no third-party/AI art. Rights follow
> the repository's **Option B — fully reserved interim** state.

## Status (version `0.2.0`)

**G2 Prototype 0.2 — "Human First"** is the first preserved playable baseline. It has
passed two distinct kinds of check:

**Technical validation**

- lint clean (`tsc --noEmit`);
- **33 / 33** automated tests (`vitest`);
- production build succeeds (`vite build`);
- a full browser playthrough (New Game → ending) completed.

**Qualitative playtest** (see [`PLAYTEST_0_2.md`](PLAYTEST_0_2.md))

- child playtest completed by the repository owner;
- the owner reports positive answers across the planned debrief;
- Prototype 0.2 is **accepted as the current baseline.**

This is qualitative, owner-reported evidence — **not** audience-wide validation, and
**not** a claim that the game is production-ready. It remains a prototype under Option B.

## What changed from 0.1 (why "Human First")

Child playtests of 0.1 showed two failures: instructions relied on abstract circle
markers, and there was almost no emotional connection. 0.2 fixes both:

- **Meaning icons, not circles.** People show a 💬 speech icon; water shows a well +
  pot + 💧; the serving place shows food; the crowded path shows people + a path arrow.
  Prompts describe the action ("Talk to the child", "Bring water here", "Take food to
  Paati").
- **One thing taught at a time.** A single movement hint appears, then hides once you
  move. The Journal hint appears only when Manimekalai first learns something.
- **An emotional spine.** You meet **the child** and **Paati** in the first two
  minutes, watch them fail to reach the food, and meet them again in the yard. The
  three barriers are embodied by people (a young man with an empty water pot, a mother
  held back by the crowd, and Paati who cannot reach the middle).
- **Faces & expressions.** Dialogue shows procedural portraits (neutral / concerned /
  tired / relieved / attentive) for each speaker, including Manimekalai's reactions.
- **A gentler Journal.** "What Manimekalai knows" with plain labels — *I saw this*,
  *Someone told me*, *I think this means…*, *I'm not sure yet* — the formal word shown
  small underneath. No score, no right/wrong.
- **Human consequences.** Serving too early is shown through the people ("I have rice,
  but no water…"), never as "Access −1".
- **Sound.** A minimal, original WebAudio layer (footsteps, water, serving, soft
  ambience, a gentle ending cue) with a mute toggle. Never required to play.
- **Keyboard works immediately** after New Game (canvas is focused — no click-first).

## What it deliberately excludes

No new chapter, no prison/philosophy sections, no fourth barrier, no combat/enemies/
health/XP/skills/inventory/crafting/romance/multiple-endings/open-world/procedural/
multiplayer/login/cloud/achievements/monetisation/full-voice/cutscenes. No morality
meter or score of any kind.

## Install & run

Requires Node 20+ and npm.

```bash
cd game
npm install
npm run dev      # open the printed URL, usually http://localhost:5173
```

`npm run build` (type-check + production build → `game/dist`) · `npm run preview`
(serve the build) · `npm run lint` (tsc) · `npm run test` (vitest).
Deploy = static hosting of `game/dist` (base `./`).

## Controls

| Input | Action |
|---|---|
| **WASD / Arrow keys** | Walk |
| **E / Enter** | Do the shown action · advance dialogue |
| **Mouse / tap** | Advance dialogue · tap the prompt to act |
| **J** | Open/close "What Manimekalai knows" (Journal) |
| **Esc** | Close a panel · pause |
| 🔊 (top-left) | Mute / unmute |

Contextual prompts describe the action; no manual needed. No timers, no reaction
challenges — pause any time.

## Story rhythm (≈12–15 min)

0. **Title** — New Game / Continue (only if you have progress) / Options / language.
1. **Puhar (0–1)** — learn to move; a child waves and invites you.
2. **Meet the people (1–3)** — the child, and Paati; watch them fail to reach the food.
3. **Why? (3–5)** — the water-carrier explains; the Journal appears.
4. **The bowl (5–7)** — receive the Amudhasurabhi. A moment of hope.
5. **The yard (7–13)** — serve; an early attempt shows who is left out; fix each
   person's problem (water, path, Paati).
6. **Enough (13–15)** — Paati eats. "போதும்." A local keeps the water coming.

## Language status

- **English:** complete.
- **Tamil:** UI switching and rendering are wired and verified (`மணிமேகலை`, menu words,
  `போதும்`, and the kinship term `பாட்டி`). New 0.2 dialogue is **left for a named Tamil
  reviewer** — untranslated strings fall back to English with a small ⌛ marker. See
  [`ASSET_PROVENANCE.md`](ASSET_PROVENANCE.md).

## Accessibility

Scalable text, Tamil-first font stack, keyboard-navigable menus, subtitles (text
dialogue), dialogue history, no colour-only information (types use emoji + words + ✓),
reduce-motion (also respects the OS setting), sound toggle, pause any time, no time
pressure. Touch/mouse/keyboard coexist; large tap targets.

## Save

One local save (`localStorage`, **schema v2**). Records language, section, Journal,
yard state, hidden dimensions, onboarding flags and settings. A **Prototype 0.1 (v1)
save cannot migrate** and is detected and cleared so it can't break things — a
settings-only "title" save persists preferences (language/sound) without offering
"Continue". New Game / Continue / Reset are on the title screen. No accounts, no cloud.

## Architecture

Phaser renders the **world**; all narrative/menu/Journal **text is DOM/HTML** (Tamil
shapes correctly, accessibility tree intact). Gameplay is data-driven. New in 0.2:
`src/game/art/portraits.ts` (procedural faces), `src/game/systems/Audio.ts` (WebAudio),
character/expression state on world figures.

## Traceability & rights

- Source mapping and the **prototype-local characters (Paati, the child)** are
  documented in [`PROTOTYPE_TRACE.md`](PROTOTYPE_TRACE.md) as game-specific
  `[INTERPRETATION]` — **not** canonical epic characters, **not** added to cinematic
  registers.
- The **Puhar opening is a game-only bridge**, not a screenplay scene.
- No screenplay, TRACE, or canonical `AD-*`/`EV-*`/`SC-*`/`FU-*`/`SEQ-*` record was
  modified. All code lives under `game/` and uses game namespaces.

## Known limitations

Placeholder procedural art; Tamil dialogue pending review; mobile *gameplay* untuned
(title/menus responsive); Phaser bundle ≈ 350 KB gzip. See `PROTOTYPE_TRACE.md`.
