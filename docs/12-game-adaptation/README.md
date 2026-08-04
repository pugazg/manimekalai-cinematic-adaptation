# 12 — Game Adaptation (Planning Area)

## Status: PLANNING ONLY — no game code, no approved game-design lock

This directory proposes a **narrative-adventure game adaptation** of *Manimekalai*.
It is a **new planning area**. It does **not** modify, reinterpret or re-open any
existing screenplay unit, TRACE record, adaptation decision (`AD-*`), evidence
record (`EV-*`), scene concept (`SC-*`), feature unit (`FU-*`/`BR-*`) or sequence
(`SEQ-*`). Nothing here is a shooting-script change, a dialogue-lock change or a
rights change.

> **What this is:** a source-aware feasibility and design proposal for a possible
> game, built *on top of* the cinematic archive.
>
> **What this is not:** an instruction to convert the screenplay scene-for-scene
> into gameplay, and not a decision that the game will be made.

## Purpose of the game adaptation

The film asks (10A): *Can compassion survive when it confronts desire, grief,
hunger, mistaken certainty and political power?* A film answers that question **for**
the audience. A game can let a player **practise** it — the game's thesis is:

> **A nonviolent narrative adventure in which the player learns how compassion
> becomes practical action.**

The player never wins by force, by "choosing the correct religion", or by pressing
*Distribute food*. The player wins understanding: how hunger is a system, how
testimony differs from proof, and what happens to people *after* Manimekalai leaves.

## Relationship to the cinematic adaptation

| | Cinematic adaptation (docs 01–11) | Game adaptation (this directory) |
|---|---|---|
| Medium | 165-minute Tamil feature | 8–12 h bilingual narrative-adventure game (later); ~45–60 min vertical slice first |
| Authority | **Canonical & approved** source of truth | **Derivative & downstream**; cites the film, never overrides it |
| Screenplay | Fixed `SEQ-*` / `FU-*` / TRACE | Read-only input; game reframes, never rewrites |
| New IDs | `AD-*`, `EV-*`, `SC-*`, `FU-*`, `SB-*`, `PD-*` | `GD-*`, `GM-*`, `GSC-*`, `GRT-*` only |
| Rights | Option B — fully reserved interim (`RIGHTS_AND_PERMISSIONS.md`) | **Inherits the same Option B state; grants nothing** |

The two remain **distinct works**. The screenplay is *source material for the game's
design*, exactly as the epic is source material for the screenplay. Where the game
needs something the film does not fix, it is labelled a **game-design decision
(`GD-*`)**, not a screenplay change.

## Source-traceability principle

Every game decision inherits the archive's evidence discipline (`[TEXT]`,
`[CROSS]`, `[HISTORY]`, `[INTERPRETATION]`, `[CAUTION]`). Each `GD-*`/`GM-*`/`GSC-*`
record carries a chain:

```
epic evidence (EV-*) → cinematic decision (AD-*) → screenplay unit (FU-*/BR-*/SC-*)
    → game-design decision (GD-*) → mechanic/scene (GM-*/GSC-*) → review status
```

The crosswalk method is defined in [`13-rights-and-provenance.md`](13-rights-and-provenance.md)
and applied in [`08-mechanics-register.csv`](08-mechanics-register.csv) and
[`09-scene-interactivity-matrix.csv`](09-scene-interactivity-matrix.csv).

## Rights principle (unchanged)

The repository's **Option B — fully reserved interim state (selected 2026-08-03)**
applies to all material in this directory. Public visibility grants no licence to
build, ship, monetise or redistribute a game. `SR-013` legal review remains open.
See [`13-rights-and-provenance.md`](13-rights-and-provenance.md).

## Navigation

| File | Contents |
|---|---|
| [`01-game-vision.md`](01-game-vision.md) | Title options, premise, fantasy, audience, genre, platform, length, non-goals |
| [`02-design-pillars.md`](02-design-pillars.md) | 6 pillars, each with gameplay/narrative expression, failure mode, acceptance test |
| [`03-core-gameplay-loop.md`](03-core-gameplay-loop.md) | Minute / scene / chapter loops, progression, fail-forward, saves |
| [`04-amudhasurabhi-system.md`](04-amudhasurabhi-system.md) | The bowl as a bounded ethical/logistics system |
| [`05-agency-and-canon.md`](05-agency-and-canon.md) | Fixed / variable / prohibited matrix |
| [`06-full-game-structure.md`](06-full-game-structure.md) | Ten `SEQ-*` mapped to candidate chapters |
| [`07-sequence-04-vertical-slice.md`](07-sequence-04-vertical-slice.md) | Detailed 45–60 min slice design |
| [`08-mechanics-register.csv`](08-mechanics-register.csv) | `GM-*` register |
| [`09-scene-interactivity-matrix.csv`](09-scene-interactivity-matrix.csv) | All 72 units classified |
| [`10-technical-options.md`](10-technical-options.md) | Web / Godot / Unity / Ren'Py comparison + recommendation |
| [`11-art-and-audio-direction.md`](11-art-and-audio-direction.md) | Visual language, typography, sound, VO |
| [`12-accessibility-and-bilingual-design.md`](12-accessibility-and-bilingual-design.md) | Tamil-first, a11y, input |
| [`13-rights-and-provenance.md`](13-rights-and-provenance.md) | Rights map + traceability method + legal flags |
| [`14-risk-register.csv`](14-risk-register.csv) | `GRT-*` creative/cultural/legal/technical risks |
| [`15-prototype-roadmap.md`](15-prototype-roadmap.md) | Phases G0–G7 with stop/go gates |
| [`16-open-questions.md`](16-open-questions.md) | Decisions requiring the owner's judgement |

## How to read the labels in these documents

- **[CONFIRMED]** — a fact drawn directly from a repository file (cited).
- **[DESIGN]** — a game-design recommendation by this planning pass.
- **[INTERPRETATION]** — an interpretive proposal beyond what the archive fixes.
- **[LEGAL-OPEN]** — a matter flagged for qualified review (`SR-013` and beyond).
- **[ASSUMPTION]** — an implementation assumption to be validated in prototyping.

## Governance guardrails for this directory

1. No file here edits anything under `docs/01`–`docs/11`, `releases/`, `evidence/`
   or the screenplay `.fountain` files.
2. No `GD-*` record may contradict a `Non-negotiable principle` in
   `docs/10-screenplay-architecture/10A_master_feature_architecture.md`.
3. Any game decision that would *require* a screenplay change is out of scope; it
   must be raised as a separate screenplay proposal under the existing 10H process.
4. Proposed but unapproved screenplay material (e.g. `VENPA-USE-021`–`023`,
   currently `PROPOSED`/`DEFERRED`) is treated as **not available** to the game.
