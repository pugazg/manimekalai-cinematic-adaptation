# 12 — Accessibility and Bilingual Design

Accessibility and bilingual design are **first-class, not retrofit** — they follow
directly from the game's pillars (compassion, dignity, access) and from the
repository's Tamil-first, uncertainty-honest stance. The browser-first stack (`10`)
was chosen partly because it makes most of this achievable.

## Tamil-first design

- **Tamil is the primary language of the game**, not a translation of an English
  original. UI, menus, dialogue and glossary are authored Tamil-first; English is the
  secondary track (mirrors the repo's bilingual discipline where "no one-language-only
  change is permitted", `STATUS`).
- Default language is **Tamil**, with a prominent first-run language choice and
  instant in-game toggle (`GM-13`). Switching never loses progress or dialogue history.
- Naming/orthography follows the **10G Tamil terminology and cue policy** and the
  validator-enforced forms (e.g. `இராசமாதேவி`); the game does **not** introduce new
  terminology (`RISK-019`).

## English support

- Full English parity for every string (EN/TA parity linting analogous to 10F's scene/
  TRACE parity). No English-only or Tamil-only content ships.
- **Bilingual display mode:** an option to show Tamil **and** English together (for
  learners and diaspora players), not only one at a time.

## Readable Tamil typography

- High-quality Tamil typeface with correct ligature/vowel-sign rendering, tuned
  line-height/spacing **for Tamil first** (`11`). Tested against real repo strings.
- Because dialogue text is DOM/HTML (`10`), it inherits correct complex-script shaping
  and the OS's font-fallback — the safest route for Tamil.

## Subtitle / caption controls

- All ambient and (future) voiced audio is **captioned** (Tamil + English), including
  non-speech cues (crowd, water, the prison lock) that carry meaning (`11`).
- Caption size, background opacity and position are adjustable.

## Text size

- Global text-scaling (e.g. 100–200%) affecting dialogue, UI and Ledger, leveraging
  the DOM (browser zoom + in-game scale). Layout reflows; nothing clips.

## Dialogue history

- A scrollable **backlog** of all dialogue and testimony (`GM-03`), re-readable at any
  time — essential when players juggle Tamil/English and when testimony carries
  evidence to classify (`GM-04`). No beat is lost to a missed line.

## Narration support

- **Self-voicing / text-to-speech** option for menus and dialogue (Ren'Py-style
  self-voicing is a known a11y win; the browser gives us the Web Speech API and,
  better, real screen-reader compatibility). Tamil TTS quality varies — offer it,
  label it as assistive, and never make it the only channel.

## Colour-independent information

- **No information conveyed by colour alone** (`GM-04` evidence types, `GM-11`
  aftermath axes, feeding cues all use icon + text + shape). Meets the pillar-level
  requirement and standard a11y guidance.
- Tested for common colour-vision deficiencies; the "no fantasy glow" palette (`11`)
  already avoids saturated colour-coding.

## Reduced-motion mode

- Disables parallax drift, ambient sways, screen shake and transition flourishes;
  replaces them with static/cross-fade equivalents (`prefers-reduced-motion` respected
  by default). Important for the crowd scene (S6) and any supernatural light shifts.

## Cognitive accessibility

- **One idea per unit** (10B consolidation) keeps scenes focused.
- Clear, persistent **objectives** and a **"what now?"** hint that escalates gently if
  the player is stuck (never a solution dump).
- **Memory-frame signposting** so embedded playable memories (`GM-09`) are never
  confused with the present.
- Plain-language option for UI strings; glossary (`GM-13`) explains cultural/
  philosophical terms on demand.

## Difficulty settings for reasoning and management

Two **independent** sliders so players can tune the game to their goals without
losing the ethical content:

1. **Reasoning depth** (affects `GM-04`/`GM-05`): from "guided" (fewer evidence
   categories, gentle prompts) to "full" (all seven categories, no prompts). Never
   removes the *choice to be uncertain* — that stays meaningful at all levels
   (Pillar 4).
2. **Logistics load** (affects `GM-07`): from "story" (1–2 binding constraints
   surfaced) to "full" (all constraints, manual arrangement). At every level,
   serve-only still fails (Pillar 3) — the ethic is preserved; only the bookkeeping
   scales.

There is **no** "easy = skip the meaning" setting; difficulty changes *effort*, not
*message*.

## Glossary and cultural context

- In-line, tap-a-term **glossary** (`GM-13`) for names, places, foods, institutions
  and philosophical schools. Each entry carries the archive's **evidence label**
  (`[TEXT]`/`[CROSS]`/`[HISTORY]`/`[INTERPRETATION]`/`[CAUTION]`) so players see what
  is attested vs. interpreted (uncertainty honesty; `RISK-002`).
- Optional deeper "about this" notes linking a concept to its epic source (e.g. the
  Amudhasurabhi, dependent arising) — education without lecturing.

## Pronunciation help

- Audio pronunciation for names/terms (Manimekalai, Amudhasurabhi, Aravana Adigal,
  Kayasandihai, Puhar, Manipallavam) in the glossary — valuable for diaspora and
  non-Tamil players. Recorded with the same Tamil-review discipline as any VO.
- Romanised transliteration follows the repo's transliteration policy (`RISK-019`).

## Screen-reader feasibility

- **[CONFIRMED as a stack advantage]** DOM/HTML UI (`10`) gives real semantic
  structure, focus order and ARIA — the browser path makes screen-reader support
  *feasible* in a way Godot/Unity/Ren'Py would each require bespoke effort for.
- **[ASSUMPTION]** Full screen-reader support of the *spatial* feeding scene is harder;
  provide a **text-list alternative** for hotspots/constraints (the same data the
  causal map holds) so the systemic content is reachable without spatial vision.
- Target: menus, dialogue, Ledger, journal and aftermath fully screen-reader
  navigable in the slice; spatial scenes navigable via the text-list fallback.

## Controller, mouse and touch input

- **Touch (iPad/iPhone):** primary; large tap targets; drag-to-move or tap-to-move;
  no precision/timing demands (the game has none by design — Pillar 5).
- **Mouse + keyboard (Mac/desktop):** full support; keyboard-only navigation for a11y.
- **Controller:** later-stage nicety; feasible because there are no reflex actions.
- **No input requires** rapid presses, drag-precision, or simultaneous inputs —
  compatible with switch access and motor-accessibility needs.

## Acceptance checks (slice)

- [ ] Boots in Tamil; toggle to English and bilingual works without progress loss.
- [ ] Text scales to ≥150% with no clipping; reduced-motion removes all drift/shake.
- [ ] Every evidence/aftermath cue is legible without colour.
- [ ] Dialogue backlog and glossary reachable at all times.
- [ ] Menus/dialogue/Ledger pass a screen-reader pass; spatial scene has a text-list
      fallback.
- [ ] Playable start-to-finish with touch only, and with keyboard only.
