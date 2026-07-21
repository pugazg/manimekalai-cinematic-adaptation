# Project Status Dashboard

_Last updated: 2026-07-21_

## Current phase

**Active phase:** `10G–10H — Dialogue, parity, source and evidence review`

The 72-scene English screenplay and Tamil bilingual draft are structurally present. A complete static audit has reviewed all 175 tracked files and confirmed English–Tamil scene and TRACE parity. A general creative freeze remains in force, with one recorded exception: the approved Aadhirai Venpa pair is implemented in Scenes `#31#–#32#`.

## Roadmap

| Phase | Deliverable | State | Gate or blocker |
|---|---|---|---|
| 01–07 | Vision, research, historical world, characters, philosophy, decisions and evidence matrix | Complete working foundation | Specialist review remains open |
| 08 | Storyboard bible | Foundation only | Rights-labelled visual intake required |
| 09 | Production design | Foundation only | Historical, costume, maritime and material-culture review required |
| 10A | Master feature architecture | Complete | 165-minute, ten-sequence structure |
| 10B | Scene selection and consolidation | Complete | 154 source concepts reconciled to 72 active units |
| 10C | Beat sheets, runtime and continuity | Complete | 45 / 60 / 60-minute allocation verified |
| 10D | Feature treatment | Complete | All 72 units traced; some Aadhirai terminology is historically stale |
| 10E | English Screenplay Draft 0.1 | Structurally complete | Dialogue lock not granted |
| 10F | Tamil bilingual screenplay | Structurally complete | Semantic, spoken-Tamil and terminology gates remain |
| 10G | Dialogue and parity review | Active | Static audit complete; executable validator result not recorded |
| 10H | Source perspectives and evidence packets | Active | 2 Venpa decisions approved; 11 remain proposed |
| 11 | Governance and audit | Active | Full audit and per-file ledger complete; licence and changelog decisions remain |

## Current measurable baseline

| Measure | Current value |
|---|---:|
| Current tracked paths audited | 175 |
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
| Venpa decisions approved / proposed / deferred / rejected | 2 / 11 / 7 / 11 |

## Audit and validation status

- Full repository audit: **complete**.
- Per-file audit ledger: **175 current paths recorded**.
- Source archive: **`SRC-0001`–`SRC-0045` statically reconciled**.
- Evidence archive: **`EV-0001`–`EV-0318` statically reconciled**.
- Decision archive: **`AD-0001`–`AD-0170` statically reconciled**.
- Scene archive: **`SC-001`–`SC-154` statically reconciled**.
- Disposition ledger: **61 KEEP / 11 BRANCH / 69 MERGE / 10 RESERVE / 3 OMIT**.
- English–Tamil structure: **72 paired scenes and matching TRACE signatures verified by direct file audit**.
- Repository-register validator: hardened with exact-range and source-reference checks.
- Bilingual validator: hardened with duplicate and absorption integrity checks.
- Regression tests: added or expanded.
- GitHub Actions workflows: present.
- Latest reproducible executable full pass: **not recorded**.

## Repairs completed in the full audit

1. Restored the corrupted Aadhirai character bible.
2. Moved kingship decision and scene registers into canonical validator paths.
3. Registered Bharathidasan's *Manimekalai Venpa* as `SRC-0045`.
4. Added authoritative Udayakumaran decision-crosswalk errata.
5. Repaired 10E and 10H broken links and updated the architecture index through 10H.
6. Added a sequence review register and exhaustive per-file audit ledger.
7. Hardened both validators and their CI regression coverage.

## Active blockers

1. Run and record the full regression and validator suite in an actual checkout or CI runner.
2. Verify the implemented Aadhirai Venpa passage visually and review `சோறு`, `கறி`, `பசுநெய்`, vessels and serving practice.
3. Verify the 11 remaining proposed Venpa uses against reliable source pages.
4. Complete semantic review of Tamil Sequence 03.
5. Complete critical line-by-line and spoken-Tamil review of restored Sequences 05–07.
6. Normalize Rajamadevi spelling and Tamil/Roman character-cue policy.
7. Review the institutional proposals together to prevent duplication and false historical certainty.
8. Reconcile `CHANGELOG.md` after release 0.24.0.
9. Decide repository licensing before broad derivative collaboration or licence badges.

## Current locks

- `VENPA-USE-007` and `VENPA-USE-008` are approved and implemented; material alteration requires a new recorded decision.
- No other `VENPA-USE` proposal is approved for insertion.
- No one-language-only screenplay change is permitted.
- Scene numbers and TRACE signatures remain frozen.
- Dialogue lock, specialist terminology approval and performance-timing approval are not granted.
- Static audit completion must not be represented as an executed validator pass.

## Key links

- [Root README](README.md)
- [Full repository audit](docs/11-project-governance/2026-07-21-full-repository-audit.md)
- [Per-file audit ledger](docs/11-project-governance/repository-file-audit.csv)
- [Documentation index](docs/INDEX.md)
- [Dialogue and parity review](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Sequence review register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv)
- [Venpa master decision register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [Aadhirai approval record](docs/10-screenplay-architecture/10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md)
- [Adaptation risk register](docs/11-project-governance/adaptation-risk-register.md)
