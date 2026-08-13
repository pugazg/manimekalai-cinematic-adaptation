# Manimekalai: The First Handful — G2 Prototype 0.3 (Meaningful Agency)

A small, browser-playable narrative-adventure prototype built from the plan in
[`../docs/12-game-adaptation/`](../docs/12-game-adaptation/). You control Manimekalai
in Puhar, meet a child and her grandmother (Paati) who cannot reach the food, receive
the Amudhasurabhi, and help a hungry yard eat — **but how you help, whom you involve,
and who carries the work on after you are yours to decide.**

> **Prototype 0.3 asks one question:** does the player feel they are making *meaningful
> choices*, or merely discovering the developer's intended solution? A second question:
> after 20–25 minutes, do they want to keep playing? It is still a prototype — no
> production art, grants no licence, uses no third-party/AI assets. Rights follow the
> repository's **Option B — fully reserved interim** state.

## Status (version `0.3.0`)

**PLAYTESTED — qualitative milestone supported; accepted as current baseline.** The
repository owner reports that the Prototype 0.3 playtest was successful and produced the
expected result for the milestone (see [`PLAYTEST_0_3.md`](PLAYTEST_0_3.md); planned
questions in [`PLAYTEST_0_3_PLAN.md`](PLAYTEST_0_3_PLAN.md)). This is qualitative,
owner-reported evidence — **not** statistical or audience-wide validation, and **not** a
claim that the game is production-ready.

**How we got here**

- **Prototype 0.1** — technical mechanics worked, but a child playtest exposed two
  problems: unclear interaction language, and insufficient emotional connection.
- **Prototype 0.2 — "Human First"** — addressed both (clarity + emotional connection);
  its qualitative child-playtest milestone passed and was preserved (`PLAYTEST_0_2.md`).
- **Prototype 0.3 — "Meaningful Agency"** — tests different valid approaches, resource
  trade-offs, consequence persistence, reactive dialogue, local ownership, and longer
  engagement — **while keeping** the validated 0.2 clarity and emotional foundation.

**Technical validation**

- lint clean (`tsc --noEmit`);
- automated tests (`vitest`) — helpers, choice memory, save v3, order-independence;
- production build succeeds (`vite build`).

## What 0.3 adds (why "Meaningful Agency")

0.2 still risked one obvious solution (fix water → path → Paati → serve). 0.3 opens it up:

- **Different valid play styles.** Listen first, act first, or prioritise one person —
  all are viable, none is labelled or graded. There is **no single correct ordering**;
  you can approach Paati, the water, the crowded path, the young man and the mother in
  different orders, and the world responds.
- **A real trade-off (no timer, no score).** Two **named** helpers can each take one
  job, and can be **moved** between jobs (reversible). There are three jobs a helper can
  cover but only two helpers — so you must decide, do something personally, or accept a
  compromise. Manimekalai can reach Paati herself, which is how a careful player frees a
  helper.
- **Consequences that persist.** Serving early, prioritising Paati, organising the crowd
  or mostly listening all change **later** dialogue and behaviour — not just the moment.
- **A post-"போதும்" continuation (~5–7 min).** After Paati eats, the water starts to run
  low and Manimekalai begins to leave. **Whether the work can carry on without her
  depends on how you played** — the young man keeps the water, the mother keeps the line,
  or the locals still look to Manimekalai (did I help, or make myself indispensable?).
- **Your journey, not a grade.** The ending closes with a short recap of *your* choices,
  and a local-only, no-telemetry playtest note for the grown-up watching.

## What it deliberately excludes

No combat, enemies, health, XP, skill trees, inventory, crafting, romance, multiple
*canonical* endings, open-world, multiplayer, login, cloud save, achievements,
monetisation, full voice, cutscenes, or a new chapter/sequence. No morality meter or
score of any kind. Agency is **local and systemic**, never alternate-canon: Manimekalai
never becomes violent, the tragedy is not erased, the bowl is never owned or sold.

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
| **E / Enter** | Do the shown action · advance dialogue · pick the first choice |
| **Mouse / tap** | Advance dialogue · tap a choice · tap the prompt to act |
| **J** | Open/close "What Manimekalai knows" (Journal) |
| **Esc** | Close a panel · pause |
| 🔊 (top-left) | Mute / unmute |

Contextual prompts describe the action; no manual needed. No timers, no reaction
challenges — pause any time. Interaction stays as clear as 0.2 (meaning icons, one
teaching hint at a time); *what* you choose to do is the part that is open.

## Story rhythm (≈20–25 min)

0. **Title** — New Game / Continue / Options / language.
1. **Puhar (0–3)** — meet the child and Paati; see they cannot reach the food; receive
   the bowl.
2. **Choose your way (3–12)** — talk to whom you like, in any order; ask your two helpers
   to cover water, the path, or carry to Paati; move them if needs change; serve when you
   decide (early is allowed — the yard shows you who was left out).
3. **Enough (16–18)** — Paati eats. "போதும்."
4. **After (18–23)** — the water runs low as you leave; who steps up depends on how you
   played.
5. **Your journey (23–25)** — a short, honest recap of the choices that were yours.

## Helpers are people, not tokens

The two helpers are described by role ("a young neighbour from the lane", "a weaver who
stayed to help"), show where they are and what they are doing, and react. The HUD reads
"*a young neighbour · keeping the water coming*", never "Helper 1 → variable water".

## Language status

- **English:** complete (including all new 0.3 dialogue).
- **Tamil:** UI switching and rendering are wired and verified (`மணிமேகலை`, menu words,
  `போதும்`, `பாட்டி`). New 0.3 dialogue is **left for a named Tamil reviewer** —
  untranslated strings fall back to English with a small ⌛ marker. See
  [`ASSET_PROVENANCE.md`](ASSET_PROVENANCE.md).

## Accessibility

Scalable text, Tamil-first font stack, keyboard-navigable menus and choices, subtitles,
dialogue history, no colour-only information, reduce-motion (also respects the OS
setting), sound toggle, pause any time, no time pressure. Touch/mouse/keyboard coexist;
large tap targets. Hidden consequence dimensions are **never** shown as bars or numbers.

## Save

One local save (`localStorage`, **schema v3** — adds choice memory + aftermath state).
A **Prototype 0.1 (v1) or 0.2 (v2) save cannot continue** into 0.3's structure: it is
detected, its **settings (language, sound, text size) are preserved**, its progress is
dropped, and the player is told why (no false "Continue"). New Game / Continue / Reset
are on the title screen. No accounts, no cloud.

## Architecture

Phaser renders the **world**; all narrative/menu/Journal/choice **text is DOM/HTML**
(Tamil shapes correctly, accessibility tree intact). Gameplay is data-driven and the
core logic is pure and unit-tested. New in 0.3: `systems/HelperSystem.ts` (reassignable
helpers), `systems/ChoiceMemory.ts` (records choices → reactive dialogue + who takes
ownership), `scenes/AftermathScene.ts` (the post-"போதும்" continuation), `ui/summary.ts`
(journey recap + local playtest note).

## Traceability & rights

- Source mapping and the **prototype-local characters (Paati, the child, the two named
  helpers)** are documented in [`PROTOTYPE_TRACE.md`](PROTOTYPE_TRACE.md) as game-specific
  `[INTERPRETATION]` — **not** canonical epic characters, **not** added to cinematic
  registers.
- The **Puhar opening is a game-only bridge**, not a screenplay scene.
- No screenplay, TRACE, or canonical `AD-*`/`EV-*`/`SC-*`/`FU-*`/`SEQ-*` record was
  modified. All code lives under `game/` and uses game namespaces.
- Agency is **bounded** (`../docs/12-game-adaptation/05-agency-and-canon.md`): the player
  changes method, emphasis, and local/aftermath outcomes — never the canonical
  fundamentals.

## Known limitations

Placeholder procedural art; Tamil dialogue pending review; mobile *gameplay* untuned
(title/menus responsive); single canonical closing (its texture varies, not the plot);
Phaser bundle ≈ 360 KB gzip. See `PROTOTYPE_TRACE.md`.
