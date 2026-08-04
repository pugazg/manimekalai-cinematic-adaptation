# 07 — Sequence 04 Vertical Slice: "The Bowl and the Hungry City"

**Target length:** 45–60 minutes. **Source:** `SEQ-04` (`10E-screenplay-draft/
SEQ-04_the_bowl_and_the_hungry_city.fountain`), feature units `FU-017`–`FU-024` and
branch units `BR-002`–`BR-011`, character-state row `SEQ-04` in
`10C_character_state_progression.csv`, storyboard rows `SB-031/032/034`, production
plates `amudhasurabhi-prop-continuity.md`, `food-vessel-and-service-workflow.md`,
`guard-custody-and-weapon-handling.md`, `season-and-water-continuity-calendar.md`.

> **Adaptation stance:** the screenplay is *input*, not a shot list to replay. Some
> `FU-*`/`BR-*` become **playable**, some **embedded playable memory**, some **short
> cinematic** or **environmental storytelling**. Classification is justified per
> segment and consolidated in `09`. No screenplay text, TRACE tag or `AD-*` is altered.

## Opening state (player + world)

- **Manimekalai** arrives at Aravana Adigal's dwelling carrying the Amudhasurabhi,
  with Madhavi and Sudhamathi *beside* her, not behind (`FU-017`). Ledger (`GM-04`)
  already contains her Manipallavam **memory** fragments (from Ch. 3) and Sudhamathi's
  **testimony** category unlocked.
- The player controls Manimekalai in 2.5D. Tutorials for feeding-logistics (`GM-07`)
  and institutional reform (`GM-10`) are **not** yet unlocked — the slice teaches them.
- Emotional baseline (`10C`): Manimekalai "owns testimony; turns vessel into
  organised service." The slice *is* that transformation, made playable.

## Segment map & timing (target 45–60 min)

| # | Segment | Units | Type | Target time |
|---|---|---|---|---|
| S1 | Three Women Enter the Teacher's Space | `FU-017` | Playable dialogue + observe | 4–5 min |
| S2 | He Lets the Account Finish | `FU-018` | Playable listening (core) | 4–6 min |
| S3 | "Begin With Hunger" → Aputhiran embedded play | `FU-019` + `BR-002`–`BR-008` | Embedded playable memory | 10–13 min |
| S4 | Do Not Hide the Vessel | `FU-020` | Dialogue + threshold decision | 3–4 min |
| S5 | Aadhirai — The First Handful | `BR-010`,`BR-011`,`FU-021` | Short cinematic + playable offering | 6–8 min |
| S6 | Compassion Learns Logistics (feeding tutorial) | `FU-022` | Playable feeding system (core) | 9–12 min |
| S7 | "Enough" | `FU-023` | Playable dignity beat | 3–4 min |
| S8 | The Prison Kitchen | `FU-024` | Playable institutional reform (core) | 6–8 min |
| S9 | Consequence & Reflection | (slice-original `GSC-04-C`) | Aftermath + journal | 3–5 min |
| — | Ending hook | → `SEQ-05` | Short cinematic | ~1 min |

---

## S1 — Three Women Enter the Teacher's Space (`FU-017`)

- **Screenplay/FU ref:** `FU-017 | SC-098`, scene `#18#`.
- **Evidence/adaptation ref:** Aravana bible `04E`; `AD-*` on testimony ownership;
  `10C` (three independent accounts).
- **Gameplay purpose:** Teach that **each account is independent** — "No one is
  invited to surrender her knowledge to the others." Introduce the *speaker-selection*
  choice that seeds `VARIABLE METHOD` (`05`).
- **Player action:** Walk Manimekalai into the dwelling; choose **whom to present the
  account through first** — herself, or defer to Madhavi's or Sudhamathi's framing.
  Observe (`GM-02`) the room (the ordinary begging bowl already set beside the space
  foreshadows S3).
- **Fixed narrative content:** Aravana receives all three; the line "Three women have
  come. Three accounts must be heard."
- **Variable outcome:** initial **trust** weighting (`GM-06`) with Aravana/Madhavi/
  Sudhamathi; which account colours S2's framing. Does not change that S2 happens.
- **Required art:** interior dwelling (2.5D), 4 character portraits (Manimekalai,
  Madhavi, Sudhamathi, Aravana), the two bowls prop (`amudhasurabhi-prop-continuity`).
- **Required audio:** room tone; restrained low strings; no triumphal cue (`11`).
- **Required interface:** dialogue panel (bilingual), speaker-choice UI, Ledger peek.
- **Implementation risk:** Low. Mainly writing + portraits.

## S2 — He Lets the Account Finish (`FU-018`) — CORE LISTENING

- **Ref:** `FU-018 | SC-099`, scene `#19#`.
- **Gameplay purpose:** Establish **Pillar 2** as a *mechanic*: an account can be
  heard fully or cut short, and finishing it matters. Introduce classifying **memory**
  vs **inference** — Manimekalai's own line models it: "It explains why his face was
  familiar. It does not decide what I owe him now" (memory ≠ present claim, `RISK-007`).
- **Player action:** Hold/allow the account to complete (an explicit *let it finish*
  affordance — no skip reward). Then **classify** three items into the Ledger
  (`GM-04`): the pursuit (observation), the past-life familiarity (**memory**), "the
  vessel answers hunger / I do not know why it came to me" (**open question**, not proof).
- **Fixed content:** the full account; Aravana's "Then hear the life that carried it
  before you" → bridges to S3.
- **Variable outcome:** if the player mis-labels *memory* as *proof of obligation*,
  Aravana gently corrects (fail-forward) — a rehearsal for `SEQ-05`'s fatal
  misinference. Correct restraint raises Aravana trust.
- **Required art:** reuse S1 interior; a subtle "memory" visual motif for the Ledger.
- **Required audio:** Manimekalai VO or text; Madhavi's non-verbal "stiffens" cue.
- **Required interface:** *let-it-finish* control; Ledger classification UI (7 types,
  with only the earned subset active); dialogue history.
- **Risk:** Medium — the classification UI must feel meaningful, not quiz-like
  (`RISK-014`; Pillar 4 acceptance test). Needs playtest tuning.

## S3 — "Begin With Hunger": Aputhiran embedded play (`FU-019` + `BR-002`–`BR-008`)

- **Ref:** `FU-019 | SC-100` (frame) and branch `BR-002` (`SC-120`), `BR-003`
  (`SC-121`), `BR-004` (`SC-123`), `BR-005` (`SC-124`), `BR-006` (`SC-125`),
  `BR-007` (`SC-127`), `BR-008` (`SC-128`). Aputhiran bible `04H`; evidence
  `EV-0048`–`EV-0067` (feeding/dignity), `EV-0261`–`EV-0278` (Aputhiran); decisions
  `AD-0134` (compassion before miracle), `AD-0138` (recipients are agents), `AD-0139`
  (bowl doesn't erase labour), `AD-0141` (self-starvation stays tragic), `AD-0142`
  (rebirth ≠ identical self).
- **Gameplay purpose:** Teach the **feeding ethic before the miracle** by *playing*
  ordinary service, so that when the infinite bowl arrives the player already knows
  service is *organisation and dignity*, not magic. Aravana's framing: "Do not begin
  with the miracle. Begin with hunger."
- **Structure — a compact playable vignette, not a full biography** (10A branch rule;
  runtime rule #4). The player controls **Aputhiran** across a *short* chain:
  1. **`BR-004` "He Eats What Remains"** (playable core of the memory): in Madurai's
     Sindhadevi precinct, gather ordinary food from thresholds and serve — an elderly
     woman who cannot queue, a labourer with an injured hand, a child who feeds a
     stray dog first; **eat only what remains**. This is the *proto-feeding tutorial*:
     it introduces access/dignity/order **without** the infinite bowl.
  2. **`BR-002`/`BR-003`** (short cinematic bookends): the cow's seven days of milk;
     the cow at the fire — *shown*, not played (animal-welfare + `04H` §8 safeguards).
  3. **`BR-005` "What Can Heaven Give Me?"** (single interactive beat): Indra offers a
     boon; the player, as Aputhiran, chooses to **serve the waiting people first**.
     The refusal is playable but the game notes the *pride* flickering in it (`04H`
     §10) — not celebrated.
  4. **`BR-006` "The Feeding Hall Is Empty"** (environmental, ~1 min play): rain has
     come, the hall is empty — *good news that destabilises him*. The player can only
     wait; nobody arrives. Teaches that ending hunger, not being needed, is the point.
  5. **`BR-007`/`BR-008`** (short cinematic): the ship leaves in darkness "without
     deliberate betrayal"; Aputhiran releases the vessel into Gomukhi pond: "Let it
     reach a hand that can serve without owning." **His fast/death is *held at a
     distance*, non-instructional, tragic — never played, never romanticised**
     (`04H` §17; `AD-0141`; `RISK-012`).
- **Player action:** collect → identify who can't access → serve without humiliation →
  feed an animal at the edge → eat the remainder; then the Indra refusal; then the
  empty-hall wait.
- **Fixed content:** all branch beats and their moral valence (pride-in-refusal,
  tragedy-of-fast) are authored and unchangeable.
- **Variable outcome:** *small* — how the player prioritises recipients in `BR-004`
  seeds a "dignity" habit the game reads later; but Aputhiran's arc is fixed.
- **Required art:** Aputhiran portrait + walk cycle; Madurai precinct (2.5D); ordinary
  begging pot prop; cow (stylised, no distress imagery); recipients (elder, labourer,
  child, dog). Reuse `SB` grammar.
- **Required audio:** sparse; the cow/infant motif; **no** triumphant music over the
  fast (`04H` §17 binding rule).
- **Required interface:** the same *serve/access* verbs that will reappear in S6
  (deliberate mechanical rhyme); a memory-frame vignette border to signal "embedded".
- **Risk:** **High** — most content-heavy segment; animal-welfare depiction, caste/
  birth-shame material (`04H` §7, `RISK-002`), and self-starvation safeguarding
  (`RISK-012`). Requires the strongest review before build. Mitigation: keep births/
  caste-argument and the fast as *short cinematic/environmental*, only the feeding and
  the two choices as *playable*.

## S4 — Do Not Hide the Vessel (`FU-020`)

- **Ref:** `FU-020 | SC-101 | ABSORBS SC-077`, scene `#28#`.
- **Gameplay purpose:** Convert the memory's lesson into the player's mandate: "Do not
  hide the vessel here. Let the hungry teach you what service requires." Madhavi's
  warning that "the city will claim your actions" sets the *public visibility* stakes
  that Act III will exploit.
- **Player action:** classify the Aputhiran lesson ("Compassion is not the wish to be
  indispensable") into the Ledger as a **philosophical claim**; accept the mandate;
  cross the threshold (a literal *commit* action).
- **Fixed content:** Aravana's instruction; Madhavi's warning; "Then I must learn to
  act where they can see me."
- **Variable outcome:** framing of Manimekalai's resolve; trust with Madhavi.
- **Required art:** dwelling doorway; threshold light cue.
- **Required audio:** turn from interior intimacy to city ambience bleeding in.
- **Required interface:** Ledger; a "cross the threshold" prompt.
- **Risk:** Low.

## S5 — Aadhirai: The First Handful (`BR-010`, `BR-011`, `FU-021`)

- **Ref:** `BR-010 | SC-150` (fire interrupted), `BR-011 | SC-152` (return),
  `FU-021 | SC-153 | ABSORBS SC-017; SC-154` (offering), scenes `#29#–#31#`.
  Aadhirai bible `04K`; `AD-0168` (first offering centres women's authority & trust);
  `SB-031`; food plate `food-vessel-and-service-workflow.md`.
- **Gameplay purpose:** Teach that **private resources become public life when a woman
  chooses to open the door** — the household-scale model for all later feeding
  (`04K`). The vessel enters *social trust*, "not tribute."
- **Structure:** `BR-010` (society presses Aadhirai toward death by fire; interrupted
  by the voice that Sāduvan lives — **short cinematic**, staged so the fire is *not*
  "proof of ideal wifehood", `RISK` on romanticising coercion) and `BR-011`
  (guarded reunion — short cinematic). Then **`FU-021` is playable**: Manimekalai
  receives Aadhirai's household pot of rice and curry at the threshold.
- **Player action:** the game's **first two-handed serving action** (mechanical
  rhyme with S3) — receive the offering "with both hands until the Amudhasurabhi is
  full; a line of ghee catches the light." The player performs *receiving as trust*,
  learning the serve verb at household scale before the crowd of S6.
- **Fixed content:** Aadhirai's lines ("Food kept behind a door protects one house";
  "May this cross every door that has been closed to hunger"); the offering happens.
- **Variable outcome:** none to the offering itself; a *dignity/trust* seed with
  Aadhirai that can pay off in S9's aftermath (does Aadhirai's model spread?).
- **Required art:** Aadhirai portrait; her house/threshold + merchant quarter (2.5D);
  household pot, rice/curry/ghee food render (culinary review pending — `STATUS`
  blocker; label `[INTERPRETATION]`); `SB-031` frames as reference.
- **Required audio:** intimate, domestic; a single warm motif that will *return*
  scaled-up in S6.
- **Required interface:** two-handed serve interaction; bilingual dialogue.
- **Risk:** **High** — the fire beat (self-immolation pressure) needs careful,
  non-spectacle staging and specialist review (`04K`; `RISK` coercion). The rice/
  curry/ghee detail is source-flagged (drawn partly from Bharathidasan; `AD-0168`,
  approved Venpa-use `007/008`) and awaits culinary/historical review — build with a
  clearly-labelled placeholder.

## S6 — Compassion Learns Logistics (`FU-022`) — CORE FEEDING SYSTEM

- **Ref:** `FU-022 | SC-068 | ABSORBS SC-006; SC-018`, scene `#32#`. `SB-032`;
  `AD-0139`; `04H` §6; `04`.
- **Gameplay purpose:** The full **Amudhasurabhi feeding-logistics tutorial** (`GM-07`).
  The player *discovers*, by failing gently, that "the vessel is food; the work is
  everyone reaching it safely."
- **Player action (the arrange verb, `04`):** Manimekalai serves the first portions;
  the crowd forms "faster than she can organise it." The player must address the
  scene's **binding constraints** using ≤5 placeable actions:
  - **open a second line** (Sudhamathi's rule: those who can't stand don't wait behind
    those who can) — resolves a crush;
  - **establish a water route** (a water-carrier) — water "runs short";
  - **assign a former recipient to clean bowls**; **assign a translator** for
    travellers who don't understand; **set an animal edge**.
  Selecting only "serve" leaves visible unmet need (a child nearly knocked down) and
  does **not** clear the scene (Pillar 3 acceptance test; anti-trivialisation
  checklist in `04`).
- **Fixed content:** the crowd's arrival; Sudhamathi taking a line; the exchange "I
  thought the vessel was the work / The vessel is food. The work is everyone reaching
  it safely"; "Compassion becomes logistics."
- **Variable outcome:** *which* constraints the player solves and *whom* they empower
  → local **reach/dignity/sustainability** state; whether a recipient becomes a
  standing worker (carries into S9 and later chapters).
- **Required art:** Ulaga Aravi public feeding space (2.5D, stylised crowd), water
  props, serving line, bowls, animals at edge; `SB-032` reference; season/water plate
  for continuity.
- **Required audio:** rising crowd bed that *settles* as the system forms — the
  audible reward of good arrangement; the warm S5 motif returns at scale.
- **Required interface:** the placeable-action radial/hotspots (diegetic, not a
  spreadsheet, `GRT-05`); an unobtrusive "reach/dignity" read via NPC behaviour, not
  bars.
- **Risk:** Medium — crowd staging on 2.5D/web must be stylised to stay performant
  (`10`); the arrange UI needs strong playtesting to avoid feeling like management
  (Pillar 3; `GRT-05`).

## S7 — "Enough" (`FU-023`) — DIGNITY BEAT

- **Ref:** `FU-023 | SC-019`, scene `#33#`. Kayasandihai; `04` feedback design.
- **Gameplay purpose:** Deliver the game's **primary emotional payoff** — satiety with
  dignity — and *seed the next problem* (hunger beyond this courtyard).
- **Player action:** approach Kayasandihai as she eats; **kneel to her level** (a
  dignity verb, mirroring "Manimekalai kneels at the same level"); ask "What do you
  need now?" and *listen* (`GM-03`) → her answer "Water. Rest. Then I will tell you
  where hunger waits beyond this courtyard" opens the causal thread toward S8.
- **Fixed content:** the "Enough" moment and its staging ("not comic and not
  miraculous theatre"); Kayasandihai's line.
- **Variable outcome:** if S6 was served without dignity (herded), this beat is
  *diminished* — she says "Enough" but withholds the onward information (witness
  trust, `GM-06`), making S8 harder to enter well.
- **Required art:** Kayasandihai portrait; close staging in the square.
- **Required audio:** the crowd bed drops away for her breath slowing — the score's
  quietest, most important cue.
- **Required interface:** kneel/level interaction; single-question listen.
- **Risk:** Low–Medium (the beat must land emotionally without music doing the work —
  `11`).

## S8 — The Prison Kitchen (`FU-024`) — CORE INSTITUTIONAL REFORM

- **Ref:** `FU-024 | SC-020 | ABSORBS SC-037; SC-051`, scene `#34#`. `SB-034`;
  `EV-0091` (prison → care institution); `guard-custody-and-weapon-handling.md`;
  prison-education perspective review (note: `VENPA-USE-021/022/023` are **PROPOSED,
  not approved** — the game models the *theme* of records/dignity but must **not**
  present those beats as canon).
- **Gameplay purpose:** Introduce **institutional intervention** (`GM-10`): power, not
  logistics, is the constraint. "Whether rule can recognise a life before punishing
  it." The bowl supplies food; **people reorganise power**.
- **Player action:** enter the royal prison; instead of admitting a prisoner, **open
  rooms** (turn a key to *open*, not lock); direct workers to carry in water, cooking
  stones, bedding, storage; convert cells → sleeping spaces, a guarded courtyard →
  kitchen; **hand the first ladle to a former prisoner** who "knows the building
  better than any official." Answer the royal official's "What will this place teach
  now?" via the fixed line, then a **player choice of custodian** (which former
  prisoner/worker becomes the standing hand — a *sustainability* decision).
- **Fixed content:** the transformation; the first-ladle-to-former-prisoner action;
  "Whether rule can recognise a life before punishing it"; "The Amudhasurabhi supplies
  food. People reorganise power."
- **Variable outcome:** *who* is empowered as custodian and *whether the reform is made
  legible/durable* (a light, optional records action — thematically aligned with the
  proposed `VENPA-USE-021` **without** citing it as approved) → strongly affects the
  S9 aftermath and (in the full game) whether the reform survives `SEQ-05`/`06`'s state
  reassertion (`RISK-013`).
- **Required art:** royal prison interior → kitchen conversion states (before/after);
  restraints being *removed* (per `guard-custody-and-weapon-handling.md`, no weapon
  spectacle); scribe/records table; former-prisoner + royal-official portraits; `SB-034`.
- **Required audio:** the mechanical *open* of a lock re-scored as relief, not menace;
  work sounds replacing prison silence.
- **Required interface:** open-room interactions; custodian-choice; optional
  records/learning action clearly framed as *the player's* reform, not a canon claim.
- **Risk:** Medium — must avoid "decorative charity" (`RISK-013`) and must not
  overreach the source into a literal prison-to-school (deferred `VENPA-USE-024`).

## S9 — Consequence & Reflection (slice-original `GSC-04-C`, `GM-11`/`GM-12`)

- **Ref:** No new screenplay unit — this is a *game-native* closing layer (a `GSC-*`
  game-scene adaptation), assembling `SEQ-04` aftermaths. Consistent with `SEQ-04`'s
  end and the film's "what remains unresolved" ethic.
- **Gameplay purpose:** Show **short- and long-term consequences** and name **what is
  unresolved** (owner loop steps 8–9), without a score.
- **Player action:** review an **aftermath snapshot** across the consequence axes
  (`05`) for the square and the prison — e.g. *hunger reduced: high; dignity: mixed;
  sustainability: depends on your custodian; unintended effect: the royal official's
  unease*. Then write/select one **reflection** into the journal ("what remains
  unresolved").
- **Fixed content:** the axes are always shown; the framing that relief is real but
  incomplete.
- **Variable outcome:** the snapshot reflects the player's S6/S8 choices; persists as
  save-state for the full game's epilogue.
- **Required art:** stylised aftermath cards (people/place states), journal screen.
- **Required audio:** a reflective reprise of the S5/S6 motif, unresolved cadence.
- **Required interface:** aftermath/axes card (color-independent, `12`); journal.
- **Risk:** Low–Medium — the axes must read as *humane observation*, not a stat sheet
  (`GRT-05`; must not become a karma meter — owner direction).

## Ending hook → `SEQ-05`

- **[DESIGN]** A ~1-minute short cinematic: Manimekalai's growing public visibility
  (paid off from Madhavi's S4 warning) draws the prince's renewed attention — "Public
  service increases Manimekalai's visibility, draws political attention and gives
  Udayakumaran new opportunities to continue pursuit" (10A). The slice ends on unease,
  not resolution — establishing that the next chapter's danger is *pursuit*, resolved
  (later) by evidence and witnessing, never violence.

---

## Why each core segment *requires* interactivity (not a cutscene)

| Segment | Why it must be played, not watched |
|---|---|
| S2 Listen | The *choice to let an account finish* is the lesson; a cutscene would just show listening, not make the player value it (Pillar 2). |
| S3 Aputhiran feeding | The player must *feel* that service is organisation+dignity **before** the miracle, so the infinite bowl doesn't read as a solution (`AD-0134`/`AD-0139`). |
| S6 Logistics | "Compassion becomes logistics" is only true if the player *does* the logistics and fails the shortcut (Pillar 3 acceptance test). |
| S7 "Enough" | Kneeling to a person's level and choosing to *ask what they need* is agency-giving; watching it isn't. |
| S8 Prison | Handing over the first ladle and choosing a custodian is a *transfer of power the player enacts*; a cutscene would make it charity done *to* people. |

Non-core segments (S1 partial, S4, S5 fire/reunion, ending hook) are deliberately
lighter or cinematic — the slice does **not** force every beat into gameplay (owner
requirement; `09`).

## Vertical-slice acceptance criteria (ties to `15` Phase G4/G5)

1. Completes in 45–60 min for a first-time player.
2. S6 cannot be cleared by "serve only" (Pillar 3).
3. S2 has at least one cause discoverable only by finishing a testimony (Pillar 2).
4. No violence verb exists anywhere (Pillar 5).
5. Bilingual Tamil-first UI throughout (`12`); Tamil renders correctly in the build.
6. The aftermath layer shows multi-axis, non-summed consequences (no karma meter).
7. Every art/terminology asset carries an evidence label; `[INTERPRETATION]` items
   (food detail, environment) are not presented as `[HISTORY]`.
8. No `SEQ-04` screenplay text, TRACE tag, or `AD-*` was modified to build the slice.
