# Prototype Traceability — G2 Prototype 0.3 (Meaningful Agency)

**Version `0.3.0`.** Agency iteration on the preserved 0.2 baseline (0.2 passed
technical validation + the qualitative child-playtest milestone; see
[`PLAYTEST_0_2.md`](PLAYTEST_0_2.md)). 0.3 is **PLAYTESTED** — the owner reports the
qualitative meaningful-agency milestone was supported; accepted as the current baseline
(see [`PLAYTEST_0_3.md`](PLAYTEST_0_3.md); plan in
[`PLAYTEST_0_3_PLAN.md`](PLAYTEST_0_3_PLAN.md)).

Maps implemented prototype content back to the cinematic archive and the game-design
plan. The game **references** these records; it does not modify them. New game
decisions use game namespaces only (`GD-*`, `GM-*`, `GSC-*`, `GRT-*`). 0.3 adds only
**game-specific choice/consequence design** — no new canonical cinematic decision.

## Bridge & prototype-local characters (read first)

**The Puhar opening (`GSC-P0-PUHAR`) is a game-specific playable bridge, NOT an approved
screenplay scene.** It invents no canonical events and asserts no archaeological
certainty.

**Prototype-local characters — `[INTERPRETATION]`, game-specific, NOT canonical epic
characters, and NOT added to any cinematic register (`AD/SC/FU/EV/BR/SEQ`):**

| In-game | Identifier used | Basis | Notes |
|---|---|---|---|
| **Paati** | the kinship term *paati* (`பாட்டி`, "grandmother") | a **relationship term, not a personal name** — chosen deliberately to avoid inventing false historical certainty | the recurring person who cannot reach the food; embodies the mobility barrier |
| **The child** | role identifier "the child" (Paati's grandchild) | relationship, not a personal name | invites the player in; notices the food; reappears beside Paati |
| The young man / the mother / the water-carrier | role identifiers only | generic residents | embody the water and safe-access barriers / give context |
| **The two helpers (0.3)** — "a young neighbour from the lane", "a weaver who stayed to help" | **role descriptions, not personal names** | generic residents who stay to help | reassignable helpers; after "போதும்" one may carry the work on. `[INTERPRETATION]`, prototype-local |

Per the repository's evidence discipline, these are **restrained relationship
identifiers**, not invented historical personal names. They exist only to build the
emotional spine the child playtest found missing, and are labelled `[INTERPRETATION]`.

## Section → source mapping

| Prototype section | Game id | Source | Notes |
|---|---|---|---|
| Puhar opening (meet child + Paati; see them fail) | `GSC-P0-PUHAR` | bridge; themes from `SEQ-04` setup, 10A | not a screenplay scene |
| Water-carrier context | `GSC-P0-LISTEN` | `FU-018` (listening principle); `GM-03`/`GM-04` | 4 categories only, shortened |
| Journal ("What Manimekalai knows") | `GM-04` | plan `04`/`08`; `05B`, `PHL-02` | child-friendly labels + formal word |
| Amudhasurabhi reveal (hope) | `GM-07` | `FU-015`; `AD-0139`; plan `04` | food infinite; rest scarce |
| The food yard (three people, three barriers) | `GSC-P0-SQUARE` | `FU-022`; `GM-07` | barriers embodied by people |
| Serve-early consequence + revise (through people) | `GM-07` | plan `03` fail-forward; `04` | no fail state, no score |
| Ending "போதும் / Enough" (Paati eats) | `GM-08` | `FU-023`; plan `07` S7 | earned via the recurring character |
| Aftermath: water runs low; who continues (0.3) | `GSC-P0-AFTER` | game-only; `FU-023`/`FU-024` themes; `GM-10` | tests sustainability without a score; not a screenplay scene |

## Mechanic mapping (`GM-*`)

`GM-01` navigation (`Player`, `BaseWorldScene`, focus-on-start), `GM-02` observe
(meaning icons), `GM-03` listen (`FU-018`), `GM-04` Journal (4 categories, simplified
surface), `GM-07` feeding (`FeedingSystem`, `SquareScene`; `AD-0139`), `GM-08` "Enough"
(`ui/ending.ts`, `போதும்`), `GM-11` multi-axis consequence (hidden dims). `GM-05/06/09/
10/12/13` remain out of scope for 0.2.

## Adaptation-decision references (unchanged, referenced only)

- `AD-0139` — the bowl doesn't erase distribution labour → food infinite; water,
  helpers, vessels, safe access and mobility scarce; "serve now" alone reaches nobody
  fully.
- `AD-0138` — recipients are agents, not scenery → each barrier is a named person with
  a face, a line, and a relieved reaction; a local continues the work in the aftermath.

## Game-design decisions (`GD-*`, prototype-local)

| id | decision |
|---|---|
| `GD-P0-01` | Four epistemic categories only (not the eventual seven). |
| `GD-P0-02` | Scarcities are exactly water, safe access, mobility, + 2 helpers, 3 vessels. |
| `GD-P0-03` | Serving is always permitted (incl. too early); outcomes shown, never "FAILED". |
| `GD-P0-04` | No score/karma; consequences on independent hidden axes only. |
| `GD-P0-05` | Tamil limited to standard UI words + `போதும்`/`மணிமேகலை`/`பாட்டி`; else pending review (`GRT-11`). |
| `GD-P0-06` | Puhar opening is a bridge, never presented as canon. |
| `GD-P0-07` **(0.2)** | Interaction uses meaning icons + descriptive prompts, never anonymous circles. |
| `GD-P0-08` **(0.2)** | Emotional spine: recurring prototype-local characters (Paati, the child) `[INTERPRETATION]`. |
| `GD-P0-09` **(0.2)** | Journal shows child-friendly labels with the formal word as secondary text. |
| `GD-P0-10` **(0.2)** | Original WebAudio only; never required; documented provenance. |
| `GD-P0-11` **(0.3)** | Bounded agency: multiple valid play styles (listen-first / act-first / prioritise-one); no single enforced ordering. Maps to `05` FIXED vs VARIABLE METHOD. |
| `GD-P0-12` **(0.3)** | Real trade-off without a timer/score: two reassignable helpers, three helper-eligible jobs; Manimekalai can substitute personally for one. |
| `GD-P0-13` **(0.3)** | Consequence memory (`ChoiceMemory`): small, typed, serialisable; drives reactive dialogue and who takes ownership. Never summed into a score (`GM-11`). |
| `GD-P0-14` **(0.3)** | Post-"போதும்" continuation (`GSC-P0-AFTER`): a game-only follow-up that tests whether the work continues without Manimekalai (`GM-10` local custodian). Not a new canonical scene. |
| `GD-P0-15` **(0.3)** | Journey recap + local, no-telemetry playtest note. Descriptive, never a grade/score/stars. |

## 0.3 mapping additions

| Prototype element | Game id | Basis | Notes |
|---|---|---|---|
| Reassignable helpers + trade-off | `GM-07` (feeding-logistics) | `AD-0139`; `04` "not one-button"; owner: no timer/no grind | spatial/diegetic, not a management menu |
| Trust / who continues the work | `GM-06` (trust and access), `GM-10` | `05` consequence axes; `FU-024` custodian | behaviour + dialogue only; `trust` is a hidden axis, never a bar |
| Persistent consequences + aftermath | `GM-11` (consequence/aftermath) | owner loop step 8; `05` epilogue-by-aggregation | small but noticeable; no lose-state |
| Belief confirmed/challenged | `GM-04` / `GM-12` | `05` "what I decided vs what happened" | gentle Journal line; no correctness points |
| Post-"போதும்" follow-up | `GSC-P0-AFTER` | game-only bridge; themes from `FU-023`/`FU-024` | not an approved screenplay scene |

## 0.3 changes summary

Multiple valid play styles with no forced ordering; two **named** reassignable helpers
(people, not tokens) creating a real trade-off; consequence memory that varies later
dialogue and decides who carries the work on; a ~5–7 min post-"போதும்" continuation
(water runs low → local ownership test); gentle Journal belief status; a journey recap
and a local, no-telemetry playtest summary; save schema **v2 → v3** with honest legacy
handling (settings preserved, progress not migrated, no false "Continue"); version
string updated to `G2 Prototype 0.3 — Meaningful Agency`. Interaction clarity from 0.2
is preserved (meaning icons, one-thing-at-a-time onboarding, action-specific prompts).

## 0.2 changes summary

Meaning icons replace circles; one-at-a-time onboarding; recurring child + Paati;
humanised barriers and consequences; procedural portraits with expressions;
simplified Journal surface; original audio; canvas keyboard focus on start; save
schema **v1 → v2** with incompatible-save detection; version string updated to
`G2 Prototype 0.2 — Human First`.

## Known limitations (0.3)

- **Qualitative, owner-reported playtest only** — milestone supported, not broad/audience
  or statistical validation.
- Placeholder **procedural** art and faces; not final art.
- Tamil dialogue mostly **pending named-reviewer** translation (English fallback, ⌛),
  including all new 0.3 lines.
- Mobile *gameplay* not tuned (title/menus/choices responsive; taps advance/act).
- One canonical closing (its **texture** varies by who carries the work on, not the plot);
  ambient motion minimal.
- Phaser bundle ≈ 1.5 MB (≈ 360 KB gzip).

## Boundaries honoured

No `.fountain`, TRACE, `AD-*`/`EV-*`/`SC-*`/`FU-*`/`BR-*`/`SEQ-*` register, cinematic
architecture, approved Venpa decision, or the Option B rights state was modified. All
runtime code is under `game/`. The G1 paper-prototype folder is untouched.
