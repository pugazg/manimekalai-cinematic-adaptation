# Project Status Dashboard

_Last updated: 2026-08-11_

## Current phase

**Active phase:** `11 — Named external review, table read and owner rights decision`

The 72-scene English screenplay and Tamil bilingual draft are structurally present. A complete static and local executable audit has reviewed the current repository and confirmed English–Tamil scene and TRACE parity. A general creative freeze remains in force, with one recorded exception: the approved Aadhirai Venpa pair is implemented in Scenes `#31#–#32#`.

> **Parallel-work note:** Exploratory game-adaptation planning exists under `docs/12-game-adaptation/`, and a downstream playable prototype — **G2 Prototype 0.2 — "Human First"** — lives under `game/`. Prototype 0.2 is locally implemented, technically validated (lint clean, 33/33 tests, build passing, browser playthrough completed) and **child-playtested qualitatively** (owner-reported positive debrief), and is being integrated as the first preserved playable baseline. This is a derivative workstream: the cinematic adaptation remains canonical/upstream. No production implementation or full-game greenlight has been granted. This does not change the active cinematic phase, screenplay structure, source/evidence/adaptation registers, or specialist-review gates. The repository-wide tracked-path audit count includes the game files. See [game/README.md](game/README.md).

## Roadmap

| Phase | Deliverable | State | Gate or blocker |
|---|---|---|---|
| 01–07 | Vision, research, historical world, characters, philosophy, decisions and evidence matrix | Complete working foundation | Specialist review remains open |
| 08 | Storyboard bible | Active | 216-shot evidence-linked matrix complete; twelve concepts registered, including ten sequence anchors and two Sequence 04 expansion frames; remaining rendered panels and specialist review required |
| 09 | Production design | Bible 0.1 active | All twelve families now have a controlled 0.1 foundation, map, plate, board, calendar, plan or acoustic dossier; physical tests and specialist approval remain |
| 10A | Master feature architecture | Complete | 165-minute, ten-sequence structure |
| 10B | Scene selection and consolidation | Complete | 154 source concepts reconciled to 72 active units |
| 10C | Beat sheets, runtime and continuity | Complete | 45 / 60 / 60-minute allocation verified |
| 10D | Feature treatment | Complete | All 72 units traced; Aadhirai's approved prepared-food sequence is synchronized |
| 10E | English Screenplay Draft 0.1 | Structurally complete | Dialogue lock not granted |
| 10F | Tamil bilingual screenplay | Structurally complete | Internal semantic and spoken-Tamil review complete; named language review and actor timing remain |
| 10G | Dialogue and parity review | Internally complete | Local and hosted executable structural validation passed; external language and performance approval remains |
| 10H | Source perspectives and evidence packets | Decision-complete; quality review active | 6 approved, 0 proposed; 7 deferred remain outside the feature |
| 11 | Governance and audit | Active | Full audit and execution kit complete; Option B rights state implemented; all 13 assignment rows remain unassigned and `SR-013` review remains |
| Release 0.1 | English–Tamil screenplay package | Structurally verified | Fountain and Markdown outputs, manifest and checksums complete; dialogue and specialist lock remain open |

## Current measurable baseline

| Measure | Current value |
|---|---:|
| Current tracked paths audited | 346 |
| Registered research sources | 45 |
| Registered evidence records | 318 |
| Registered adaptation decisions | 170 |
| Preliminary screenplay-source records | 154 |
| Active feature units | 72 |
| English screenplay sequences | 10 |
| Tamil screenplay sequences | 10 |
| Paired scenes | 72 |
| Scene range | `#1#–#72#` |
| Runtime allocation | 45 / 60 / 60 = 165 minutes |
| Venpa decisions approved / proposed / deferred / rejected | 6 / 0 / 7 / 18 |

## Audit and validation status

- Full repository audit: **complete**.
- Per-file audit ledger: **346 current paths recorded**.
- Source archive: **`SRC-0001`–`SRC-0045` statically reconciled**.
- Evidence archive: **`EV-0001`–`EV-0318` statically reconciled**.
- Evidence-to-source provenance: **all 318 records crosswalked to registered `SRC-*` IDs or explicitly classified as internal project records**.
- Decision archive: **`AD-0001`–`AD-0170` statically reconciled**.
- Scene archive: **`SC-001`–`SC-154` statically reconciled**.
- Disposition ledger: **61 KEEP / 11 BRANCH / 69 MERGE / 10 RESERVE / 3 OMIT**.
- English–Tamil structure: **72 paired scenes and matching TRACE signatures verified by direct file audit**.
- Repository-register validator: hardened with exact-range and source-reference checks.
- Bilingual validator: hardened with duplicate and absorption integrity checks.
- Regression tests: added or expanded.
- GitHub Actions workflows: present.
- Latest reproducible executable full pass: **recorded on 2026-08-03**.
- Hosted GitHub Actions: **both workflows passed on merged PR #21 for the final 249-item completion-readiness audit**.

## Repairs completed in the full audit

1. Restored the corrupted Aadhirai character bible.
2. Moved kingship decision and scene registers into canonical validator paths.
3. Registered Bharathidasan's *Manimekalai Venpa* as `SRC-0045`.
4. Added authoritative Udayakumaran decision-crosswalk errata.
5. Repaired 10E and 10H broken links and updated the architecture index through 10H.
6. Added a sequence review register and exhaustive per-file audit ledger.
7. Hardened both validators and their CI regression coverage.
8. Executed the full suite, repaired real-corpus schema and TRACE defects, and recorded the passing baseline.
9. Corrected the duplicated-initial Queen-name regression in Tamil Sequences 06, 07 and 09 and added a validator regression guard.

## Active blockers

1. Verify the implemented Aadhirai Venpa passage visually and review `சோறு`, `கறி`, `பசுநெய்`, vessels and serving practice.
2. Complete visual-source and specialist quality review of the 6 implemented Venpa decisions; all feature-film decisions are resolved.
3. Conduct actor-led table reads and timing for Sequences 01–10; internal semantic and spoken-performance review is complete.
4. Assign named reviewers to the 13 prepared specialist packets and record their findings; internal preparation is complete but external approval is not.
   Public institutional routes and qualification-checked slates now cover all 13 gates; no reviewer is assigned until identity, qualification, conflict and scope checks pass.
5. Complete specialist terminology review of the controlled register, especially doctrine, philosophy and early institutions; every term now has a source and reviewer crosswalk.
6. Continue storyboard and department plates; run prop/service/weapon previs and obtain the required historical, welfare, consent, trauma and rights reviews before lock.
7. Obtain `SR-013` review of the implemented Option B rights state before changing licences, opening derivative collaboration or adding licence badges.

## Current locks

- `VENPA-USE-001`, `007`, `008`, `011`, `016` and `021` are approved and implemented; material alteration requires a new recorded decision.
- No `VENPA-USE` proposal remains pending; deferred items remain excluded.
- No one-language-only screenplay change is permitted.
- Scene numbers and TRACE signatures remain frozen.
- Dialogue lock, specialist terminology approval and performance-timing approval are not granted.
- Option B is the effective interim rights state; no open licence or reuse permission is granted.
- Static audit completion must not be represented as an executed validator pass.

## Key links

- [Root README](README.md)
- [Full repository audit](docs/11-project-governance/2026-07-21-full-repository-audit.md)
- [Latest exhaustive repository audit](docs/11-project-governance/2026-07-28-exhaustive-repository-audit.md)
- [Final completion-readiness audit](docs/11-project-governance/2026-07-29-final-completion-readiness-audit.md)
- [Per-file audit ledger](docs/11-project-governance/repository-file-audit.csv)
- [Documentation index](docs/INDEX.md)
- [Dialogue and parity review](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Sequence review register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv)
- [Tamil Sequence 03 semantic review](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-03-semantic-review.md)
- [Venpa master decision register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [Aadhirai approval record](docs/10-screenplay-architecture/10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md)
- [Adaptation risk register](docs/11-project-governance/adaptation-risk-register.md)
- [Specialist review packets](docs/11-project-governance/specialist-review-packets/)
- [Reviewer selection rubric](docs/11-project-governance/reviewer-selection-rubric.csv)
- [Reviewer sourcing shortlist](docs/11-project-governance/reviewer-sourcing-shortlist.md)
- [Critical review candidate slate](docs/11-project-governance/critical-review-candidate-slate.md)
- [Remaining specialist candidate slate](docs/11-project-governance/remaining-specialist-candidate-slate.md)
- [Reviewer invitation and intake kit](docs/11-project-governance/specialist-review-packets/reviewer-invitation-and-intake.md)
- [External review outreach batch](docs/11-project-governance/external-review-outreach-batch.md)
- [External review assignment register](docs/11-project-governance/external-review-assignment-register.csv)
- [Tamil table-read protocol](docs/11-project-governance/tamil-table-read-protocol.md)
- [Rights decision checklist](docs/11-project-governance/rights-decision-execution-checklist.md)
- [Tamil terminology source crosswalk](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-terminology-source-crosswalk.csv)
- [Storyboard shot matrix](docs/08-storyboard-bible/storyboard-shot-matrix.csv)
- [Production-design control matrix](docs/09-production-design/production-design-control-matrix.csv)
- [Bilingual Screenplay Release 0.1](releases/0.1/)
