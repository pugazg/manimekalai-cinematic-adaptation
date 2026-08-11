# Prototype Traceability — G2 Prototype 0.2 (Human First)

**Version `0.2.0`.** Preserved playable baseline (technical validation + qualitative
child-playtest milestone passed; see [`PLAYTEST_0_2.md`](PLAYTEST_0_2.md)).

Maps implemented prototype content back to the cinematic archive and the game-design
plan. The game **references** these records; it does not modify them. New game
decisions use game namespaces only (`GD-*`, `GM-*`, `GSC-*`, `GRT-*`).

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
| The young man / the mother / the water-carrier / the helper | role identifiers only | generic residents | embody the water and safe-access barriers / give context |

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

## 0.2 changes summary

Meaning icons replace circles; one-at-a-time onboarding; recurring child + Paati;
humanised barriers and consequences; procedural portraits with expressions;
simplified Journal surface; original audio; canvas keyboard focus on start; save
schema **v1 → v2** with incompatible-save detection; version string updated to
`G2 Prototype 0.2 — Human First`.

## Known limitations (0.2)

- Placeholder **procedural** art and faces; not final art.
- Tamil dialogue mostly **pending named-reviewer** translation (English fallback, ⌛).
- Mobile *gameplay* not tuned (title/menus responsive; taps advance dialogue/act).
- Single success path; ambient motion minimal.
- Phaser bundle ≈ 1.5 MB (≈ 350 KB gzip).

## Boundaries honoured

No `.fountain`, TRACE, `AD-*`/`EV-*`/`SC-*`/`FU-*`/`BR-*`/`SEQ-*` register, cinematic
architecture, approved Venpa decision, or the Option B rights state was modified. All
runtime code is under `game/`. The G1 paper-prototype folder is untouched.
