# Project Handover — 2026-07-21

## 1. Handover decision

**Repository:** `pugazg/manimekalai-cinematic-adaptation`  
**Default branch:** `main`  
**Visibility:** Public  
**Baseline reviewed through commit:** `0d3d2e0c602af00a67d085856d2ac1572889b6d0`  
**Current phase:** `10G–10H — Dialogue, parity, source and evidence review`  
**Core architecture status:** Complete and statically reconciled  
**Screenplay status:** English and Tamil Draft 0.1 structurally complete; dialogue and production lock not granted  
**Full repository audit:** Complete for the 175 paths present at the audited baseline  
**Executable validator result:** Not yet recorded

This document is the operational handover for the next contributor or work session. It must be read together with the [project status dashboard](../../STATUS.md), [full repository audit](2026-07-21-full-repository-audit.md), [per-file audit ledger](repository-file-audit.csv), [adaptation risk register](adaptation-risk-register.md) and [specialist review register](specialist-review-register.csv).

The repository does not need reconstruction. Its next work is controlled validation, Tamil performance review, source verification, terminology reconciliation, rights decisions and production-facing development.

---

## 2. Project purpose and governing method

The project is a source-traceable, historically cautious and ethically controlled cinematic adaptation of *Manimekalai*. Its governing method separates:

- primary literary evidence;
- cross-textual support;
- historical and archaeological evidence;
- modern analytical frameworks;
- cinematic interpretation;
- unresolved or prohibited assumptions.

Permanent IDs carry decisions through the repository:

- `SRC-*` — registered sources;
- `EV-*` — evidence records;
- `AD-*` — adaptation decisions;
- `SC-*` — preliminary screenplay-source concepts;
- `FU-*` and `BR-*` — active feature and branch units;
- `VENPA-USE-*` — Bharathidasan *Manimekalai Venpa* perspective decisions.

Do not replace permanent IDs, silently rewrite their meaning or create an alternative unregistered numbering system.

---

## 3. Certified current baseline

| Measure | Audited value |
|---|---:|
| Tracked paths in the completed audit | 175 |
| Registered sources | 45 (`SRC-0001`–`SRC-0045`) |
| Evidence records | 318 (`EV-0001`–`EV-0318`) |
| Adaptation decisions | 170 (`AD-0001`–`AD-0170`) |
| Screenplay-source concepts | 154 (`SC-001`–`SC-154`) |
| Disposition ledger | 61 KEEP / 11 BRANCH / 69 MERGE / 10 RESERVE / 3 OMIT |
| Active feature units | 72 |
| English screenplay sequences | 10 |
| Tamil screenplay sequences | 10 |
| Paired screenplay scenes | 72 (`#1#`–`#72#`) |
| Runtime design | 45 / 60 / 60 = 165 minutes |
| Venpa decisions | 2 approved / 11 proposed / 7 deferred / 11 rejected |

The evidence, decision and scene ranges are unique and contiguous. Every `SC-*` record has exactly one disposition. Every surviving feature unit appears in the beat sheets, runtime matrix and treatment traceability appendix.

---

## 4. Work completed before handover

### 4.1 Research and adaptation foundation

The working foundation is complete across:

- vision and adaptation principles;
- literary analysis;
- historical Tamilakam and Puhar dossiers;
- maritime trade, textiles, religious communities, food, geography, architecture, economy, kingship and gender;
- eleven character bibles;
- philosophy and comparative-school analysis;
- evidence, decision and screenplay-source registers.

These are working scholarly-production documents, not claims of final academic consensus. Specialist gates remain explicit.

### 4.2 Feature architecture

The feature is designed as ten sequences and 72 active units within a 165-minute ceiling:

1. The City Before the Storm — 15 minutes
2. The Woman Who Refuses a Destiny — 15 minutes
3. The Island of Memory — 15 minutes
4. The Bowl and the Hungry City — 20 minutes
5. The Prince and the Shadow — 20 minutes
6. The Palace of Grief — 20 minutes
7. The Queen Learns to Listen — 18 minutes
8. The King Who Was a Beggar — 15 minutes
9. The Questions of Truth — 17 minutes
10. The Bowl Beyond Its Owner — 10 minutes

The architecture preserves Manimekalai as the protagonist while using Aputhiran, Aadhirai and Kanchanan as bounded branch structures that return to a present-tense ethical decision.

### 4.3 Bilingual screenplay

All twenty Fountain files are present and terminate correctly.

- English and Tamil scene order is identical.
- Scene numbers are identical.
- TRACE signatures are identical under static inspection.
- All 72 scenes are present in both languages.
- No TRACE or scene-count change was made during the full audit.

Structural parity is not equivalent to semantic, spoken-language or performance approval.

### 4.4 Venpa perspective work

Bharathidasan's *Manimekalai Venpa* is registered as `SRC-0045` and governed as an independent creative witness, not a replacement for the primary epic.

Only the following decisions are approved and implemented:

- `VENPA-USE-007` — prepared rice/curry and ghee at Aadhirai's threshold in Scene `#31#`;
- `VENPA-USE-008` — the first servings continue from Aadhirai's food and the vessel level remains unchanged in Scene `#32#`.

All other `VENPA-USE-*` items remain proposed, deferred or rejected exactly as recorded in the master decision register. No proposal may enter the screenplay merely because it appears attractive or source-compatible.

### 4.5 Full repository audit and repairs

The audit reviewed every tracked path at the baseline and repaired six material integrity classes:

1. restored the corrupted Aadhirai character bible;
2. moved five kingship decisions and six kingship scenes into canonical validator-scanned directories;
3. registered Bharathidasan's *Manimekalai Venpa* as `SRC-0045`;
4. added authoritative errata for the Udayakumaran decision crosswalk;
5. repaired stale or broken live indexes and links;
6. hardened repository and bilingual validators against range, reference, duplication and absorption failures.

Permanent `EV-*`, `AD-*`, `SC-*`, `FU-*`, `BR-*` and scene identifiers were not renumbered.

---

## 5. Current locks — do not bypass

The following rules are binding until a new recorded decision changes them:

1. `VENPA-USE-007` and `VENPA-USE-008` are approved and implemented. Material alteration requires a new decision record.
2. No other `VENPA-USE-*` proposal is approved for insertion.
3. No one-language-only screenplay edit is permitted.
4. Scene numbers `#1#–#72#` are frozen.
5. TRACE unit, primary-scene and absorption signatures are frozen unless the architecture registers are deliberately revised together.
6. Previous-life memory must never become present consent, ownership or identity replacement.
7. Udayakumaran's sincerity must not excuse pursuit.
8. Kanchanan's grief and mistaken recognition must not excuse concealment or killing.
9. Rajamadevi's grief must not erase delegated institutional harm or compel forgiveness.
10. Hunger must not be solved by miracle alone; water, labour, access, sanitation, livelihood and governance remain part of the dramatic system.
11. Aputhiran's final fast must not be presented as a universal model of self-erasure.
12. Static audit completion must not be described as an executed validator or CI pass.
13. Dialogue lock, specialist terminology approval, performance timing approval and production lock are not granted.

---

## 6. Open blockers

### P0 — executable validation

A successful runtime pass has not been preserved. The command environment used for the audit could not obtain a checkout because outbound DNS was unavailable, and no usable GitHub Actions result was exposed for the audited head.

Run in a real checkout or CI runner:

```bash
python3 -m unittest tests/test_validate_repository.py
python3 scripts/validate_repository.py
python3 -m unittest tests/test_validate_bilingual_screenplay.py
python3 scripts/validate_bilingual_screenplay.py
```

A successful run must be recorded with:

- repository commit SHA;
- Python version;
- exact commands;
- stdout/stderr or CI run link;
- pass/fail result;
- files changed after the run, if any.

Recommended record path:

```text
docs/11-project-governance/YYYY-MM-DD-validation-result.md
```

Do not remove the creative freeze merely because the validators pass. Passing validates registered structure, not historical accuracy, source interpretation or dialogue quality.

### P1 — Tamil screenplay review

The critical language work is:

1. semantic comparison of Tamil Sequence 03, which is materially compressed relative to English;
2. line-by-line and spoken-Tamil review of restored Sequences 05–07;
3. naturalness, character differentiation and read-aloud timing across all sequences;
4. normalization decision for `இராசமாதேவி` versus `ராஜமாதேவி`;
5. normalization decision for Tamil-script versus Roman-uppercase character cues;
6. specialist review of Buddhist, philosophical, institutional and food terminology.

Do not mass-normalize names or character cues before a policy decision is recorded. The translation guide and screenplay currently disagree.

### P2 — Venpa verification and decisions

Before approving any additional Venpa proposal:

1. verify the exact printed page or reliable source image;
2. compare the reading against the primary *Manimekalai* passage;
3. classify the contribution as direct support, compatible interpretation, cross-textual development or unsupported invention;
4. assess duplicate runtime and causal effects;
5. prepare paired English and Tamil wording;
6. record approval, revision, deferral or rejection;
7. update the master register and affected review documents;
8. run bilingual and repository validation after implementation.

The 11 proposed Venpa uses remain blocked until reliable page-level verification is available.

### P3 — documentation reconciliation

Open editorial work:

- update historical pre-approval Aadhirai wording such as “first handful” and “grain” where the approved screenplay is now authoritative;
- reconcile `CHANGELOG.md` after release 0.24.0, preferably as a controlled 0.25.0 entry rather than rewriting historical releases;
- refresh the per-file audit ledger after any new tracked path or material modification;
- preserve superseded reasoning as historical unless it is unsafe or factually false.

### P4 — rights and licensing

The repository is public but has no selected licence. A licence decision must distinguish:

- validator/test code;
- original research and documentation;
- original screenplay content;
- quotations and third-party source material;
- private scans, translations and consultation material;
- future visual references and storyboards.

Do not add a licence badge or broad reuse statement before the owner/legal decision is recorded.

### P5 — storyboard and production design

Phases 08 and 09 contain policy foundations only. They are not populated storyboard or production-design deliverables.

Before visual intake:

- define image metadata and rights rules;
- record source, creator, date, licence and permitted use;
- label each visual claim as `[TEXT]`, `[HISTORY]`, `[INTERPRETATION]` or `[CAUTION]`;
- obtain costume, maritime, architecture and material-culture review;
- avoid later Bharatanatyam and imperial-Chola defaults unless explicitly justified.

---

## 7. Recommended restart order

### Work package 1 — establish a reproducible green baseline

1. Clone or open the repository at the current `main` head.
2. Run all four validation commands.
3. Fix only validator/test defects required to reproduce the statically certified baseline.
4. Add a dated validation result under project governance.
5. Update `STATUS.md` from “not recorded” only when evidence exists.

**Exit condition:** all tests and validators pass at a named commit, with a preserved result.

### Work package 2 — Tamil critical review

1. Review Sequence 03 against English line by line.
2. Review restored Sequences 05–07 with a Tamil screenwriter/dialogue editor.
3. Decide name and cue normalization policy.
4. Apply changes in paired English/Tamil commits only where meaning or architecture requires both languages to move.
5. Re-run validation after every controlled batch.

**Exit condition:** the specialist review register records completed outputs, and no structural divergence is introduced.

### Work package 3 — source-verified Venpa batch

Process proposed uses in a small thematic batch rather than individually scattering changes. Recommended order:

1. Kayasandihai future-facing agency;
2. Aputhiran ethical continuity;
3. prison/reform institutional continuity;
4. grief and accountability proposals.

**Exit condition:** every approved item has a reliable page anchor, primary-text compatibility decision, paired language wording and validation result.

### Work package 4 — governance and release reconciliation

1. prepare the post-0.24.0 changelog entry;
2. refresh file audit ledger and status counts;
3. decide licensing strategy;
4. confirm repository description and topics manually in GitHub settings;
5. define readiness criteria for storyboard and production-design intake.

---

## 8. Controlled change workflow

For every material change:

1. Identify the governing `EV-*`, `AD-*`, `SC-*`, `FU-*`, `BR-*` or `VENPA-USE-*` records.
2. State whether the change is evidence correction, interpretation, dialogue refinement, terminology normalization or structural revision.
3. Update the authoritative register before or in the same change as dependent prose.
4. Preserve English–Tamil pairing.
5. Preserve scene numbers and TRACE signatures unless a formally approved architecture revision says otherwise.
6. Run relevant tests and validators.
7. Update the sequence review register and specialist review register when applicable.
8. Refresh `STATUS.md`, the per-file audit ledger and this handover only when their factual state changes.
9. Do not convert a proposed or deferred item into an approved state through screenplay text alone.

### Minimum evidence for a screenplay insertion

A new insertion requires:

- source and location;
- rights/verification status;
- primary-text compatibility;
- adaptation rationale;
- affected scene and TRACE record;
- English wording;
- Tamil wording;
- causal and runtime assessment;
- explicit decision state;
- successful structural validation.

---

## 9. Key repository map

### Status and governance

- [`STATUS.md`](../../STATUS.md)
- [`README.md`](../../README.md)
- [`docs/INDEX.md`](../INDEX.md)
- [Full repository audit](2026-07-21-full-repository-audit.md)
- [Per-file audit ledger](repository-file-audit.csv)
- [Adaptation risk register](adaptation-risk-register.md)
- [Specialist review register](specialist-review-register.csv)
- [Private source handling](private-source-handling.md)
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- [`RIGHTS_AND_PERMISSIONS.md`](../../RIGHTS_AND_PERMISSIONS.md)

### Architecture and screenplay

- [`10A_master_feature_architecture.md`](../10-screenplay-architecture/10A_master_feature_architecture.md)
- [`10B_scene_disposition_ledger.csv`](../10-screenplay-architecture/10B_scene_disposition_ledger.csv)
- [`10B_feature_unit_matrix.csv`](../10-screenplay-architecture/10B_feature_unit_matrix.csv)
- [`10C_sequence_beat_sheets.md`](../10-screenplay-architecture/10C_sequence_beat_sheets.md)
- [`10C_unit_runtime_matrix.csv`](../10-screenplay-architecture/10C_unit_runtime_matrix.csv)
- [`10D_feature_treatment.md`](../10-screenplay-architecture/10D_feature_treatment.md)
- [English screenplay](../10-screenplay-architecture/10E-screenplay-draft/README.md)
- [Tamil screenplay](../10-screenplay-architecture/10F-bilingual-screenplay/TA/README.md)
- [Translation guidelines](../10-screenplay-architecture/10F-bilingual-screenplay/translation_guidelines.md)

### Dialogue, parity and Venpa decisions

- [10G review index](../10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Sequence review register](../10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv)
- [Venpa master decision register](../10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [10H source-perspective index](../10-screenplay-architecture/10H-source-perspectives/README.md)
- [Aadhirai approval record](../10-screenplay-architecture/10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md)
- [Venpa proposed evidence packet](../10-screenplay-architecture/10H-source-perspectives/venpa-proposed-evidence-packet.md)
- [Venpa primary-source compatibility packet](../10-screenplay-architecture/10H-source-perspectives/venpa-primary-source-compatibility-packet.md)

### Registers and validators

- [`sources/source_register.csv`](../../sources/source_register.csv)
- [`evidence/`](../../evidence/)
- [`docs/06-adaptation-decisions/`](../06-adaptation-decisions/)
- [`docs/07-screenplay-evidence-matrix/`](../07-screenplay-evidence-matrix/)
- [`scripts/validate_repository.py`](../../scripts/validate_repository.py)
- [`scripts/validate_bilingual_screenplay.py`](../../scripts/validate_bilingual_screenplay.py)
- [`tests/test_validate_repository.py`](../../tests/test_validate_repository.py)
- [`tests/test_validate_bilingual_screenplay.py`](../../tests/test_validate_bilingual_screenplay.py)

---

## 10. Non-obvious cautions for the next contributor

- The repository is highly structured; an apparently small prose change may contradict a permanent register.
- Historical phase documents may contain valid old “next stage” wording. Prefer updating live indexes and status authorities instead of rewriting all historical documents.
- Tamil line count does not need to equal English line count. Scene order, causal action, knowledge state, consent, responsibility and TRACE structure must remain equivalent.
- The English screenplay is a working structural master, not an unquestionable final literary authority.
- The Venpa is a creative witness. It may sharpen emphasis but cannot silently override the primary epic.
- Source access is not redistribution permission.
- A successful validator cannot approve a doctrinal, historical, culinary, linguistic or rights claim.
- A static audit can verify repository coherence but cannot substitute for execution.
- “Complete” in this repository usually means complete working foundation, not scholarly, dialogue or production lock.

---

## 11. Handover acceptance checklist

The next contributor should be able to confirm all of the following before beginning new creative work:

- [ ] I have read `STATUS.md` and the full repository audit.
- [ ] I understand that the audited baseline contains 45 sources, 318 evidence records, 170 decisions, 154 scene concepts and 72 active units.
- [ ] I understand that only `VENPA-USE-007` and `VENPA-USE-008` are approved.
- [ ] I will not make a one-language-only screenplay change.
- [ ] I will not renumber scenes or permanent IDs casually.
- [ ] I will not claim an executable pass until I have preserved the result.
- [ ] I will run validators after each material batch.
- [ ] I will record source rights and verification state.
- [ ] I will route terminology and specialist-sensitive claims through the review register.
- [ ] I will update live status and audit controls when the repository state materially changes.

---

## 12. Final handover state

The project is structurally healthy and ready for disciplined continuation.

The immediate next action is not another broad rewrite. It is to establish a reproducible executable validation baseline, then complete Tamil semantic and spoken-performance review before approving further source-perspective insertions.

The architecture, evidence system and ethical safeguards should be treated as working assets to protect. The remaining work should increase verification and performance quality without weakening traceability, consent, accountability, historical caution or institutional depth.
