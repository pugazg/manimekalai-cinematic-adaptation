# 11 — Art and Audio Direction

All art/audio inherits the archive's evidence discipline: **no archaeological,
geographic, maritime or costume certainty where the repository marks evidence as
incomplete** (README; `RISK-002`/`003`/`004`/`005`). Every environment brief and
prop carries an evidence label; `[INTERPRETATION]` is never dressed as `[HISTORY]`.

## Visual language

**[DESIGN]** A **painterly, warm-but-restrained 2.5D** look — hand-painted-feeling
backgrounds with layered parallax; characters as clean 2D shapes with expressive
silhouettes. Reference palettes come straight from the storyboard bible: *"Puhar:
humid gold, indigo shade, dyed textile colour; **no fantasy glow**"* (`SB-001`+).

- **Labour is always in frame.** Following the storyboard's rule that labour is
  visible behind wealth (`SB-001-2`), backgrounds foreground loaders, water-carriers,
  cleaners, cooks — the systems the bowl reveals.
- **No "sacred bloom".** Supernatural is not signalled by golden god-light (see below).
- **Uncertainty as style, not apology.** Where the archive won't fix a form (harbour,
  hull, monumental architecture — `AD-0003`/`AD-0005`), the art **implies** rather
  than **declares**: soft focus, partial framing, timber/brick/thatch/tile textures
  the dossiers *do* support, and no dominant later gopurams (`AD-0003`).

## 2D vs 2.5D

- **2.5D** (2D art on layered depth planes) for **traversal + feeding scenes**
  (`FU-001`, `FU-022`, `FU-024`): depth sells crowds, queues and access barriers
  cheaply and reads well on mobile.
- **Flat 2D** for **intimate dialogue/testimony** (`FU-017`/`018`, Aadhirai `FU-021`):
  portrait + background, focus on faces and text.
- No true 3D (cost, and unnecessary — `10`).

## Camera approach

Adopt the storyboard's **ENTRY → DECISION → CONSEQUENCE** grammar (`SB-*`) as *scene
staging*, not cutscene:

- **Participant height, human scale** — the storyboard's 28mm-establish / 50mm-action
  / 75mm-consequence logic becomes: wide when you arrive, mid when you act, tight on
  the human consequence. Camera stays *at the level of the served*, reinforcing the
  kneel/dignity ethic (`GM-08`).
- Restrained lateral movement; no showy sweeps that would aestheticise suffering.

## Use of the existing storyboard matrix

The 216-shot `storyboard-shot-matrix.csv` is a **direct art-brief source** for the
slice: `SB-031` (First Handful), `SB-032` (Compassion Learns Logistics), `SB-034`
(Prison Kitchen) map 1:1 to VS segments S5/S6/S8. Reuse their `frame_brief`,
`lighting_and_palette`, `evidence_ids` and `adaptation_decision_ids` as the labelled
provenance for each game background. **[CONFIRMED]** these rows exist and are
`DESCRIPTION_READY`. The game consumes their *descriptions*; it does not require the
(pending) rendered panels.

## Portrait and dialogue presentation

- **Character portraits** with a small set of emotional states (not full facial
  animation) — economical, expressive, and localisation-friendly (text is separate
  from art). Cast per the character bibles (`04A`–`04K`); casting/appearance follows
  their cautions (e.g. Aputhiran/Punniyarajan need *not* look identical — `AD-0142`).
- **Dialogue UI** is DOM/HTML (Tamil-safe, `10`): speaker name (bilingual), body text,
  the *let-it-finish* affordance (`GM-03`), and a tap-a-term glossary (`GM-13`).
- **Ledger cards** are a distinct visual system (icon + short text per evidence type)
  so classification (`GM-04`) reads at a glance and is colour-independent (`12`).

## Environmental storytelling

The primary exposition channel (reduces talky dialogue, `03`): a stalled water pot, a
person unable to reach a queue, a bolted door labelled "release", the empty feeding
hall (`BR-006`), restraints being *removed* not applied (`FU-024`). Players *read*
hunger-as-system from the scene (`GM-02`), consistent with `04H` §6.

## Tamil typography

**Highest-stakes visual system.** (`RISK-019`; `12`.)

- A high-quality **Tamil display + UI typeface** with correct rendering of Tamil
  ligatures/vowel signs; test against the repo's actual strings (the source `.md` and
  10G terminology register), including `இராசமாதேவி` and cue-script normalised forms
  already enforced by the validators.
- **Tamil is the primary type**, English secondary/smaller (`12`); line-height and
  letter-spacing tuned for Tamil first, not Latin-first with Tamil bolted on.
- Follow the **10G Tamil terminology and cue policy** for naming/orthography; do not
  invent terminology (`RISK-002`/`019`). Glossary entries carry evidence labels.

## UI style

Quiet, paper-and-ink inspired, non-gamey: no XP bars, no score pop, no karma meter
(owner direction; `05`). The HUD is minimal — a Ledger button and a journal button.
Feeding "management" is diegetic hotspots in the world, not a panel (`04`; `GRT-05`).
Aftermath cards use labelled axes (text+icon), never a single summary number.

## Animation scope

Deliberately modest to fit a solo/small team and web performance (`10`):

- Character: idle + a few expressive poses + simple walk; skeletal (Spine/Rive-class)
  or limited frames.
- World: ambient loops (steam, water, crowd sway), parallax.
- **No** full cinematic character animation, no lip-sync (`GRT` unsustainable
  scope; matches "do not propose full cinematic animation").
- Crowds in S6 are **stylised** (repeated silhouettes, staggered loops), not a
  simulated multitude — performance-safe on iPhone.

## Soundscape

- **Diegetic-first:** harbour, kitchen fire, ladle-on-bowl, water, crowd murmur, the
  *open* of a prison lock re-coloured as relief (`FU-024`). Place ambience does much of
  the emotional work so music can stay sparse.
- Environmental audio doubles as accessibility (audio cues for reduced-motion/low-
  vision players, `12`).

## Music principles

Following the storyboard's rule *"music must not pre-decide moral meaning"*
(`SB-001-2`) and the Aputhiran binding rule *no triumphant music over bodily
disappearance* (`04H` §17):

- **Restraint.** Long stretches with ambience only; music enters to *accompany*, not
  instruct.
- **Motif discipline:** a single warm household motif introduced at Aadhirai's
  threshold (S5) that **returns scaled-up** at Ulaga Aravi (S6) and thins to near-
  silence for "Enough" (S7). The score's quietest moment is its most important.
- **No score on the tragedies** (Udayakumaran's death, Aputhiran's fast) that would
  aestheticise them (`RISK-012`; `GRT-06`).
- **Instrumentation [INTERPRETATION]:** favour early-Tamil-plausible timbres
  (percussion, flute/reed, drone) **without claiming** ancient-authentic
  reconstruction; label as interpretation, subject to review (`RISK-002`).

## Voice-performance strategy

**Sustainable, staged** (avoiding the "unsustainable full voice acting" risk — owner
non-goal; `GRT` register):

1. **Vertical slice:** **text-only** dialogue (Tamil + English), no VO. Keeps the
   slice cheap and shippable, and avoids locking performances before Tamil dialogue
   is even locked (the screenplay's own dialogue-lock is *open*, `STATUS`).
2. **Later:** consider **partial/keystone VO** (a few pivotal lines, or a narrator)
   only after named Tamil language review + actor table-reads exist (the repo's 10G/
   table-read gate). **Full voice acting is not planned** and must not be promised.
3. Any VO reuses the repo's **Tamil table-read protocol** discipline.

## Treatment of philosophical dialogue (Sequences 09–10)

- Stage as *a living intellectual city*, not a debate show (`05B` screen rule): street
  teachers, students, patrons, listeners; disagreement without violence.
- Each rival voice gets a **portrait, a distinct visual register, and its strongest
  line presented sincerely** (Pillar 6; 10A #11). No school is lit as "correct"; no
  win-VFX.
- Reasoning (`FU-055`) uses the Ledger visually — the player literally *sees* an
  inference marked incomplete and corrected (`GM-04`).

## Treatment of supernatural moments

Per `AD-0002` (no embodied Indra in the opening) and the vision doc (*"the
supernatural… without reducing them to spectacle"*):

- The goddess's intervention (`FU-011`), the bowl's arrival (`FU-015`), and the
  memory (`FU-014`) are shown through **restraint** — weather, sound, emblem, a shift
  in light/colour grade — **not** a glowing deity or laser-bowl (`04H` §16: "connected
  to sound and weight… never laser-like effects").
- The bowl is *materially handled and cleaned* (`amudhasurabhi-prop-continuity.md`),
  "visually distinct without treasure glamour" — its power reads through *what it lets
  people do*, not through VFX.
- Supernatural is `[INTERPRETATION]` staging and marked as such; it never becomes a
  claim about ritual reality (`RISK-002`).

## Art/audio provenance rule (ties to `13`)

Every produced asset is registered with an evidence/decision crosswalk (like `SB-*`
rows carry `evidence_ids`/`adaptation_decision_ids`) and a rights state. **AI-
generated art/audio, if used, is flagged for provenance review** (`RISK-024`;
`GRT-13`) and is **not** cleared for release under the current Option B state.
