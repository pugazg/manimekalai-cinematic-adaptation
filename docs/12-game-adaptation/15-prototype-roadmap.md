# 15 — Prototype Roadmap

A phased path from design audit to a full-game decision, each phase with an explicit
**stop/go gate**. The philosophy: **prove the risky things cheaply and early**
(mechanics before art, Tamil before polish, fun before scale). Nothing past G4 builds
production art; nothing past G7 commits to the full game.

**Rule:** each gate is a real stop/go. A "STOP" is a legitimate, valuable outcome —
it may mean *revise and retry*, *descope*, or *do not build this game*. The plan must
be safe to stop at any gate.

**Commercial-intent status (`OQ-24`): `Undecided — exploratory prototype only`.** This
undecided state **does not block** the prototyping, usability-testing and mechanics-
evaluation work in phases **G1–G6**; that work may proceed now. It **does** keep
commercial distribution, fundraising, public asset release and contributor licensing
**blocked** until an explicit rights decision and `SR-013` review — those are G7
concerns (`13`). No permanent commercial decision is implied by this roadmap.

---

## Execution history (as built)

The phased plan below (G0–G7) is the **design intent**. This section records what was
**actually done**, so the roadmap does not overstate the evidence.

- **G1 — Paper prototype: prepared, not used as the gate.** A G1 paper-prototype kit
  was prepared and lives (untracked) under `g1-paper-prototype/`. The owner **elected
  to move directly into a digital playable prototype (G2)** rather than making the paper
  test the gating requirement. The G1 paper prototype was **not** formally playtested;
  no paper-test result is claimed.

- **G2 Prototype 0.1 — implemented, then superseded.** The dialogue/evidence/feeding
  prototype was implemented technically. An **initial child playtest exposed two major
  problems:**
  1. **unclear instructions / unexplained interaction markers** (abstract circle
     markers players could not interpret); and
  2. **insufficient emotional connection** (no specific person to care about before the
     puzzle).

- **G2 Prototype 0.2 — "Human First": implemented as the response to that evidence.**
  Changes made directly in answer to the 0.1 findings:
  - visual / action-based onboarding (one thing taught at a time);
  - removal of anonymous circles as the primary interaction language (meaning icons +
    descriptive prompts instead);
  - a recurring **child + Paati** emotional spine;
  - humanised consequences (serving early is shown through people, never "Access −1");
  - simplified Journal surface language ("What Manimekalai knows");
  - character portraits / expressions;
  - minimal, provenance-safe original WebAudio;
  - an earned `போதும்` ("Enough") ending.

  **Status: PLAYTESTED — qualitative milestone passed; accepted as baseline.** The
  repository owner tested 0.2 with child players and reports that the debrief supported
  the Prototype 0.2 milestone across all planned questions; exact participant responses
  are not recorded in the repository. This is **qualitative, owner-reported evidence** —
  it supports preserving 0.2 as the current baseline but is **not broad audience
  validation** and claims no statistical result (no participant identities, counts,
  quotes or ratings invented). See `../../game/PLAYTEST_0_2.md`. Prototype 0.3 may be
  designed after repository integration and review; the later G-phase gates below still
  stand.

- **G2 Prototype 0.3 — "Meaningful Agency": built after 0.2 established the
  clarity/emotional foundation.** Purpose: test whether players feel they are making
  *meaningful decisions* rather than finding one developer-authored solution (and whether
  engagement holds across a longer ~20–25 min prototype). Implemented capabilities (from
  the actual code under `../../game/`):
  - multiple viable intervention orders (no single forced path);
  - limited helpers / resource trade-offs (two named helpers, three helper-eligible jobs);
  - reversible / reassignable decisions (helpers can be moved, at an honest cost);
  - choice / consequence memory (small, typed, serialisable);
  - reactive dialogue that varies by prior play;
  - a post-`போதும்` continuation that tests whether the work carries on without
    Manimekalai;
  - local ownership (an NPC may take the work on, based on player history);
  - an end-of-play choice summary (descriptive, never a score).
  It **preserves** the validated 0.2 clarity and emotional foundation and adds **no new
  cinematic canon** (game-specific choice/consequence design only; see
  `../../game/PROTOTYPE_TRACE.md`).

  **Status: PLAYTESTED — the owner reports the milestone was successful and produced the
  expected result; accepted as the current baseline.** This is **qualitative,
  owner-reported** evidence — **not** statistical and **not** broad audience validation;
  no participant identities, counts, quotes or ratings are invented. See
  `../../game/PLAYTEST_0_3.md`. The next milestone (Prototype 0.4) will test **narrative
  continuity beyond the existing feeding arc**; its detailed scope is deliberately **not**
  defined here.

---

## Phase G0 — Repository & Design Audit ✅ (this planning pass)

- **Objective:** Understand the archive; produce a source-aware game plan without
  touching screenplay architecture.
- **Outputs:** `docs/12-game-adaptation/` (README + 16 docs), incl. this roadmap.
- **Acceptance criteria:** every major recommendation cites repository material;
  fixed/variable/prohibited boundaries defined (`05`); no `docs/01`–`11` file modified.
- **Dependencies:** repository read access.
- **Stop/Go:** **GO** to G1 only when the **owner approves this plan** (the game-design
  plan). Until then, **no code.** *(Owner sign-off was subsequently given; see
  Execution history (as built) above.)*

> **Technology status:** Browser-first TypeScript is the **leading prototype
> hypothesis, not a final technology lock** (`10`). **G1 is engine-independent**
> (paper/table). **G2** may use a *minimal* browser-based evidence/dialogue prototype.
> **G3's** feeding prototype must explicitly **test whether browser technology performs
> adequately** on target devices — if it does not, that is a finding, not a failure.
> **Phaser and PixiJS are alternatives, not a combined mandatory stack**; exactly one
> is chosen via a **small technical spike** (in/around G2). **Godot remains a valid
> later-production candidate**. The **full-game engine decision is made only after
> gameplay and device testing** (G7), never before.

## Phase G1 — Paper Prototype

- **Objective:** Validate the core loop (`03`) and the Ledger/consequence idea on
  paper/table, zero code. **Engine-independent** — no stack is assumed or required at
  this phase.
- **Outputs:** printed cards for the 7 evidence types (`GM-04`); a paper "feeding
  square" with cut-out placeable actions (`GM-07`); a scripted walkthrough of VS
  segments S2, S6, S8; 3–5 internal play sessions.
- **Acceptance criteria:** a non-designer can (a) feel why letting a testimony finish
  matters (Pillar 2), (b) fail "serve-only" and understand why (Pillar 3), (c) grasp
  consequences without a score. Fun/interest noted qualitatively.
- **Dependencies:** G0 approval.
- **Stop/Go:** GO if the loop is legible and interesting on paper; else revise `03`/`04`
  and re-test. **This is the cheapest place to kill a bad core.**

## Phase G2 — Dialogue & Evidence Prototype (vertical, thin)

- **Objective:** First code. Prove **bilingual dialogue + testimony + Ledger
  classification** using VS segments **S1–S2**, in a *minimal browser-based* prototype
  (the leading hypothesis, `10`). A **small technical spike** here selects **one** of
  Phaser *or* PixiJS (they are alternatives, not a combined stack) — or surfaces a
  reason to reconsider the browser hypothesis.
- **Outputs:** browser build (TS + DOM dialogue + Ink/Yarn): traverse a single room
  (`FU-017`), let Sudhamathi's/Manimekalai's account finish (`FU-018`), classify 3
  items, get a fail-forward correction; **Tamil + English** with toggle; save/resume.
- **Acceptance criteria:** Tamil renders correctly (glyph/shaping verified against repo
  strings, `GRT-11`); classification feels meaningful not quiz-like (Pillar 4); a
  Tamil-first tester completes it in Tamil; save/resume works.
- **Dependencies:** G1; stack decision (`10`); Tamil font licence check started (`13`).
- **Stop/Go:** GO if bilingual dialogue + classification are solid; else fix tooling/
  writing. Kills the "does the text/epistemics layer even work" risk.

## Phase G3 — Amudhasurabhi Logistics Prototype

- **Objective:** Prove the **feeding system** is fun and non-trivial without art
  polish, using VS segment **S6** greyboxed. This phase must also **explicitly test
  whether browser technology performs adequately** (crowd/particles) on target
  iPhone/iPad hardware; inadequate performance is a legitimate finding that may reopen
  the engine hypothesis (`10`), not a project failure.
- **Outputs:** greybox Ulaga Aravi: infinite bowl + ≤5 placeable actions (line, water,
  hands, animal-edge, level-serving); stylised crowd; "reach/dignity" read from
  behaviour; the "Enough" beat (S7) stubbed; performance test on a real iPhone/iPad.
- **Acceptance criteria:** serve-only visibly fails (Pillar 3 test); solving binding
  constraints produces the "system forms around her" payoff; it does **not** feel like
  a spreadsheet (`GRT-05`); runs smoothly on target mobile.
- **Dependencies:** G2 (shared framework).
- **Stop/Go:** GO if the logistics loop is enjoyable and honest; else redesign `04`.
  This is the single most important "is this a *game*" gate.

## Phase G4 — Sequence 04 Grey-box (full slice, no final art)

- **Objective:** Assemble the **whole 45–60 min slice** (`07`) end-to-end in greybox:
  S1–S9 + ending hook, including the Aputhiran embedded memory (S3) and prison reform
  (S8).
- **Outputs:** complete playable slice with placeholder art/audio, full bilingual text,
  save at scene boundaries, aftermath/journal layer (`GM-11`/`GM-12`).
- **Acceptance criteria:** the `07` vertical-slice acceptance criteria (all 8) pass in
  greybox; no violence verb; no karma meter; canonical fixed beats intact; no
  screenplay/`AD-*` modified.
- **Dependencies:** G2+G3; sensitive-content review of S3 (Aputhiran/self-starvation,
  `RISK-012`) and S5 fire staging (`RISK` coercion) **before** they are built.
- **Stop/Go:** GO to art only if the greybox holds up as an experience; else iterate.

## Phase G5 — Art & Audio Vertical Slice

- **Objective:** Bring the slice to **presentation quality** for the core segments,
  using storyboard/production-design references (`SB-031/032/034`; `11`).
- **Outputs:** painterly 2.5D backgrounds for S5/S6/S8; character portraits with states;
  Tamil typography finalised; diegetic soundscape + the single household motif; text-
  only dialogue (no VO, `11`). Every asset carries an evidence label + rights state
  (`13`).
- **Acceptance criteria:** `11`/`12` acceptance checks pass; no `[INTERPRETATION]`
  shown as `[HISTORY]`; all assets have provenance + cleared licences (fonts/music) or
  are marked prototype-only under Option B (`13`).
- **Dependencies:** G4; art provenance/rights process (`13`); Tamil review (`GRT-11`).
- **Stop/Go:** GO if it reads as a coherent, respectful, accessible experience.

## Phase G6 — Player Testing

- **Objective:** Validate the slice with **real players**, including **Tamil-first**
  and **accessibility** testers.
- **Outputs:** structured playtests (fun, comprehension, emotional landing of "Enough",
  perceived fairness of fixed tragedies `GRT-18`, cultural resonance, a11y); findings
  log; prioritised fixes.
- **Acceptance criteria:** players describe it as a *game* (not clicked-through story,
  `GRT-02`); Tamil-first players complete comfortably; a11y checks pass with real
  assistive-tech users; no tester reports the coercion/trauma content as exploitative
  (`GRT-07`); hunger is understood as systemic, not solved (`GRT-06`).
- **Dependencies:** G5; recruited testers incl. Tamil speakers and a11y participants.
- **Stop/Go:** GO to the full-game decision only if the slice succeeds on fun **and**
  cultural/ethical grounds; else revise and re-test, or STOP.

## Phase G7 — Full-Game Decision Gate

- **Objective:** Decide, with evidence, whether to build the full 8–12h game — and on
  what stack, budget, rights basis and timeline.
- **Outputs:** a decision memo covering: production stack (web vs Godot vs Unity, `10`);
  team/budget/timeline; **rights clearance plan and `SR-013` outcome** (Option B →
  release licence; Venpa/translation/font/AI clearances, `13`); which of the ten
  chapters ship and in what order (`06`); a VO strategy decision (`GRT-16`).
- **Acceptance criteria:** a funded, rights-cleared, scoped plan exists **or** a
  deliberate decision to stop / keep it as a slice / seek partners.
- **Dependencies:** G6 success; `SR-013` legal review; owner intent on commercialisation
  (`16`).
- **Stop/Go:** The **only** gate at which full-game production may begin. STOP here is
  entirely acceptable — a polished, meaningful **vertical slice is a legitimate final
  deliverable** on its own.

---

## Gate summary

| Gate | Proves | Cheapest-possible test | STOP means |
|---|---|---|---|
| G0 | Plan is source-aware | This document | Rework the plan |
| G1 | Core loop works | Paper/cards | Redesign loop |
| G2 | Bilingual dialogue + Ledger | Thin web build (S1–S2) | Fix tooling/writing |
| G3 | Feeding is fun & honest | Greybox S6 | Redesign bowl system |
| G4 | Whole slice coheres | Greybox S1–S9 | Iterate structure |
| G5 | It's presentable & rights-clean | Art on core segments | Fix art/rights/a11y |
| G6 | Players & culture validate it | Real playtests | Revise or stop |
| G7 | Build the full game? | Decision memo + SR-013 | Ship slice only / stop / seek partners |

## Guiding constraints across all phases

- **Mechanics before art; Tamil before polish; fun before scale.**
- **Never** edit `docs/01`–`11`, `releases/`, `evidence/`, or `.fountain` files
  (`GRT-17`).
- **Never** ship `status_unknown`/AI-provenance-uncertain assets under Option B
  (`13`, `GRT-14`).
- Treat proposed-but-unapproved screenplay material (e.g. `VENPA-USE-021`–`023`) as
  unavailable (`README` guardrail 4).
- Any gate may be revisited; the roadmap is designed to be **safe to stop** at G1, G3,
  G4, G6 or G7 with a coherent partial result.
