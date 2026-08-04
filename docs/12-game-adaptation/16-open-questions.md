# 16 — Open Questions

Decisions that need the repository owner's judgement. Each has a **recommendation**
(so open questions are not an excuse to avoid a view — owner requirement) plus what
depends on it. Grouped as requested. IDs `OQ-*` for tracking.

## Creative

- **OQ-01 — Protagonist POV swaps.** Should the game let the player *control*
  Kanchanan (mistaken inference, `SEQ-05`) and Punniyarajan (governance, `SEQ-08`), or
  keep Manimekalai as sole POV? **Recommendation:** yes to bounded swaps — feeling
  Kanchanan manufacture certainty is the strongest way to teach Pillar 4; but prototype
  it late (`GRT-07`). *Depends on:* `06` chapters 5 & 8.
- **OQ-02 — Tone of the aftermath layer.** How explicit should the "what remains
  unresolved" reflection be — quiet and diegetic, or a clearer summary? **Rec:**
  diegetic via Manimekalai's journal; no meter (`05`). *Depends on:* `GM-11`/`GM-12`.
- **OQ-03 — How much of Aputhiran is playable vs. cinematic.** **Rec:** only the
  feeding (`BR-004`) and two choices (`BR-005`, `BR-006`) are played; cow/fast are
  cinematic (`07` S3; `RISK-012`). Confirm comfort with even this much interactivity in
  such sensitive material.

## Audience

- **OQ-04 — Primary audience priority.** If Tamil-first players, educators and
  narrative-game players pull the design in different directions, who wins?
  **Rec:** Tamil-first cultural players first, narrative-game craft second, education
  third (education emerges from the first two). *Depends on:* `01`, `12`.
- **OQ-05 — Age/content rating target.** Act III contains coercion, starvation-as-
  weapon, a killing. What rating ceiling is acceptable? **Rec:** aim ~teen (16+) with
  non-graphic staging; needs a content-sensitivity pass. *Depends on:* `GRT-07`.

## Platform

- **OQ-06 — Web-only vs. native later.** Accept the browser-first slice; but is a
  later App Store / native release a goal, or is web/PWA the permanent home?
  **Rec:** web/PWA as permanent home; native only if G7 commercial strategy needs it
  (`10`). *Depends on:* `10`, G7.
- **OQ-07 — Offline requirement.** Must the game work fully offline (diaspora/low-
  connectivity)? **Rec:** yes — PWA with offline caching; cheap on the web stack.

## Language

- **OQ-08 — Which Tamil register.** Contemporary readable Tamil, or a more classical/
  literary register closer to the source? **Rec:** contemporary-readable for UI/
  gameplay, with classical flavour reserved for quoted/ceremonial lines — but this is a
  **named-Tamil-reviewer** call, not mine (`GRT-11`). *Depends on:* 10G policy.
- **OQ-09 — Transliteration + pronunciation scope.** How much romanisation/pronunciation
  help for non-Tamil players? **Rec:** glossary audio + romanised names, per repo
  transliteration policy (`RISK-019`).
- **OQ-10 — Any third language?** (e.g. Hindi/other diaspora languages later.)
  **Rec:** design the i18n pipeline to allow it; commit to none beyond EN/TA now.

## Mechanics

- **OQ-11 — Difficulty defaults.** Where do the reasoning/logistics sliders start
  (`12`)? **Rec:** mid ("guided"/"story-lite") by default; the message is preserved at
  all levels. *Depends on:* `03`, `12`.
- **OQ-12 — Fail-forward vs. any hard checkpoints.** Confirm there is **no** game-over
  anywhere. **Rec:** none — nonviolence + fail-forward (`03`). Confirm the owner accepts
  a game with no "lose".
- **OQ-13 — Ledger category count.** Ship all seven evidence types from the start, or
  unlock gradually? **Rec:** unlock across chapters (progression = epistemic maturity,
  `03`); the slice uses the earned subset.

## Historical representation

- **OQ-14 — How visible is uncertainty to the player?** Do glossary evidence-labels
  (`[TEXT]`/`[INTERPRETATION]`…) appear in-game, or only in docs? **Rec:** in-game, in
  the glossary — uncertainty honesty is a feature (`RISK-002`; `12`). *Depends on:* `11`.
- **OQ-15 — Depicting ritual/caste material (Aputhiran, `04H` §7).** How far to stage
  the birth-shame/sacrifice content? **Rec:** minimal, non-polemical, specialist-
  reviewed; keep cinematic not playable (`09`). *Owner + specialist call.*
- **OQ-16 — Geographic/architectural specificity.** How concrete may Puhar/Manipallavam
  look? **Rec:** evocative but non-authoritative; follow `AD-0003`/`AD-0005`; no fixed
  harbour/megacity (`GRT-09`).

## Art

- **OQ-17 — AI-assisted art: allowed or not?** Given provenance uncertainty (`RISK-024`)
  and Option B. **Rec:** permissible for **prototype/greybox only**; **not** for shipped
  assets without `SR-013` clearance (`13`). Owner must set the policy explicitly.
- **OQ-18 — Illustrator sourcing.** Commission a Tamil/South-Indian artist for cultural
  grounding? **Rec:** strongly yes for shipped art (authenticity + `RISK-005`).
  *Depends on:* budget (`OQ-22`).
- **OQ-19 — Rendered storyboard reuse.** Wait for the archive's pending rendered panels,
  or brief fresh game art from the `SB-*` descriptions? **Rec:** brief fresh from
  descriptions (they're `DESCRIPTION_READY`); don't block on film rendering (`11`).

## Audio

- **OQ-20 — Music sourcing + authenticity claim.** Original score, and how to label
  instrumentation? **Rec:** original, restrained, labelled `[INTERPRETATION]`, no
  authenticity claim (`11`; `RISK-002`).
- **OQ-21 — VO scope and timing.** Text-only slice is recommended; when (if ever) does
  partial VO enter? **Rec:** only post-dialogue-lock + Tamil table-reads; **no full
  VO** (`GRT-16`). Confirm.

## Budget

- **OQ-22 — Budget envelope for the slice.** Solo/AI-assisted (near-zero cash) vs. a
  funded slice with a commissioned artist/composer/Tamil reviewer? **Rec:** fund at
  minimum a Tamil reviewer + an illustrator for G5; keep G1–G4 near-zero. *Depends on:*
  `OQ-24`.
- **OQ-23 — Timeline expectations.** Is this a patient multi-year effort (like the
  screenplay archive) or time-boxed? **Rec:** patient; gate-driven, not date-driven
  (`15`).

## Commercial intent

- **OQ-24 — Is commercial release even a goal?** Free cultural work, education tool, or
  a commercial title? This drives rights, budget, platform and VO.
  **Current status: `Undecided — exploratory prototype only`.** This undecided state
  **does not block** G1 paper prototyping, preliminary usability testing, or mechanics
  evaluation — those may proceed now. It **does** keep the following blocked pending an
  explicit rights decision and `SR-013` review: commercial distribution, fundraising,
  public asset release, and contributor licensing. **Rec:** make the permanent
  commercial decision at G7 with `SR-013`; **nothing forces the choice now**, but
  everything downstream depends on it (`13`; `GRT-13`). *This is the single
  highest-leverage open question.*
- **OQ-25 — Rights state change.** When (if) to move off Option B for the game? **Rec:**
  only at G7, with legal advice; not before (`13`). **[LEGAL-OPEN]**

## Licensing

- **OQ-26 — Bharathidasan Venpa usage.** May the game use the rice/curry/ghee offering
  detail (`AD-0168`) given the Venpa's likely-in-copyright status? **Rec:** treat as
  **[LEGAL-OPEN]**; use a generic prepared-food offering in prototypes until cleared
  (`13`). *Blocking for shipped S5.*
- **OQ-27 — Font/music/translation licences.** Confirm each is embed/redistribute-safe
  before public build. **Rec:** resolve in G5/G7 (`13`).

## Collaboration

- **OQ-28 — Contributors and the rights declaration.** Any collaborators (artist,
  composer, Tamil reviewer, coders) must sign the repo's contributor rights process
  (`CONTRIBUTING`, `RISK-022`). **Rec:** apply the existing process unchanged.
- **OQ-29 — Relationship to the film's specialist reviewers.** Should the game reuse the
  archive's pending specialist slate (`docs/11`) for its cultural/Tamil/philosophy
  reviews, or recruit separately? **Rec:** reuse/extend the existing slate where scope
  overlaps; add game-specific (a11y, playtest) reviewers.

---

**Highest-leverage questions to answer first:** **OQ-24** (commercial intent — drives
everything), **OQ-17** (AI art policy), **OQ-08** (Tamil register — needs a named
reviewer), **OQ-26** (Venpa licensing). The rest can be resolved during G1–G5.
