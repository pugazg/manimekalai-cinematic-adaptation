# New Chat Handover — Manimekalai Cinematic Adaptation

> Paste this document into a new ChatGPT or coding-agent chat before asking it to continue repository work.

## Repository

- **Repository:** `pugazg/manimekalai-cinematic-adaptation`
- **Default branch:** `main`
- **Current audited release:** `0.25.0` (see the 2026-07-22 executable audit for its checkout baseline)
- **Project status:** English and Tamil Screenplay Draft 0.1 are structurally complete; dialogue, specialist and production locks are not granted.
- **Active phase:** `10G–10H — dialogue, bilingual parity, source and evidence review`

Read these authority documents first:

1. `STATUS.md`
2. `docs/11-project-governance/2026-07-21-project-handover.md`
3. `docs/11-project-governance/2026-07-21-full-repository-audit.md`
4. `docs/11-project-governance/2026-07-22-executable-validation-and-full-audit.md`
5. `docs/11-project-governance/repository-file-audit.csv`
6. `docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md`
7. `docs/10-screenplay-architecture/10H-source-perspectives/README.md`

## Verified repository baseline

The current static and executable audit covers all **178 repository paths** in the refreshed ledger.

- registered sources: **45** (`SRC-0001`–`SRC-0045`)
- evidence records: **318** (`EV-0001`–`EV-0318`)
- adaptation decisions: **170** (`AD-0001`–`AD-0170`)
- screenplay-source concepts: **154** (`SC-001`–`SC-154`)
- active feature units: **72**
- English sequences: **10**
- Tamil sequences: **10**
- paired scenes: **72**, numbered `#1#–#72#`
- runtime design: **45 / 60 / 60 = 165 minutes**
- Venpa decisions: **2 approved / 11 proposed / 7 deferred / 11 rejected**

The 154 scene concepts are completely reconciled in the disposition ledger:

- 61 `KEEP`
- 11 `BRANCH`
- 69 `MERGE`
- 10 `RESERVE`
- 3 `OMIT`

Every surviving feature unit appears in the beat sheets, runtime matrix and treatment traceability appendix.

## Important work already completed

### Full repository audit

A file-by-file audit was completed across research documents, character bibles, registers, architecture, all twenty screenplay files, validators, tests, workflows, source controls, rights controls and governance records.

The audit repaired these material defects:

1. restored the corrupted Aadhirai character bible;
2. moved kingship decision and scene records into the canonical directories scanned by the validator;
3. registered Bharathidasan’s *Manimekalai Venpa* as `SRC-0045`;
4. added authoritative Udayakumaran decision-crosswalk errata;
5. repaired broken and stale live indexes;
6. hardened repository and bilingual validators against missing ranges, broken references, duplicate units, duplicate source-scene use, duplicate absorbed IDs and primary/absorbed self-conflict.

Permanent `EV-*`, `AD-*`, `SC-*`, `FU-*`, `BR-*` and scene identifiers were not renumbered.

### Bilingual screenplay audit

All twenty Fountain files were read directly.

- English and Tamil scene order is identical.
- Scene numbers match.
- TRACE signatures match under static inspection.
- All sequences terminate correctly.
- No structural bilingual divergence remains.

Open language gates:

- Tamil Sequence 03 is materially compressed and needs semantic comparison.
- Restored Tamil Sequences 05–07 require critical line-by-line and spoken-Tamil review.
- All sequences still require performance, voice and timing review.
- Translation guidance and screenplay disagree on `இராசமாதேவி` versus `ராஜமாதேவி`.
- The guide requires Tamil-script character cues, while many current cues remain Roman uppercase.

Do not mass-normalize names or cues without first recording a terminology/format policy decision.

## Approved Venpa implementation

Only these two Venpa decisions are approved and implemented:

- `VENPA-USE-007`
- `VENPA-USE-008`

They affect Sequence 04:

- Scene `#31#`: Aadhirai fills the Amudhasurabhi with prepared rice and curry; ghee catches the light.
- Scene `#32#`: Manimekalai serves the first portions of Aadhirai’s food; the vessel level remains unchanged before the public logistics sequence continues.

This implementation follows the dramatic order:

> household labour → voluntary giving → first portions → continuing abundance → collective logistics

All other `VENPA-USE-*` items remain proposed, deferred or rejected exactly as stated in the master register. Do not insert them without a new explicit decision.

## Binding locks

Do not bypass these rules:

1. No one-language-only screenplay change.
2. Scene numbers `#1#–#72#` remain frozen.
3. TRACE signatures remain frozen unless the architecture registers are deliberately revised together.
4. `VENPA-USE-007` and `VENPA-USE-008` may not be materially altered without a new decision record.
5. No other Venpa proposal is approved.
6. Previous-life memory cannot become present consent or ownership.
7. Udayakumaran’s sincerity cannot excuse pursuit.
8. Kanchanan’s grief and mistaken recognition cannot excuse violence.
9. Rajamadevi’s grief cannot erase delegated institutional harm or compel forgiveness.
10. Hunger cannot be solved by miracle alone; water, access, labour, sanitation, livelihood and governance must remain visible.
11. Aputhiran’s final fast cannot be romanticised as a universal ethical model.
12. Future structural changes must preserve both local validation and hosted GitHub Actions results.
13. Dialogue lock, specialist terminology approval, performance timing approval and production lock are not granted.

## Completed executable baseline

The full local validation suite passed under Python 3.11.3 and is preserved in the 2026-07-22 audit. Rerun it after every controlled screenplay or register change:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
python3 scripts/validate_repository.py
python3 scripts/validate_bilingual_screenplay.py
```

## Immediate next activity

### 1. Tamil critical review

- compare Sequence 03 line by line against English;
- review restored Sequences 05–07 with a Tamil screenwriter/dialogue editor;
- decide Rajamadevi spelling policy;
- decide Tamil versus Roman character-cue policy;
- review Buddhist, philosophical, institutional and culinary vocabulary;
- run validation after each controlled batch.

### 2. Source-verified Venpa review

Before approving any further Venpa use:

- verify exact printed page or reliable source image;
- compare with the primary *Manimekalai* passage;
- classify direct support versus later interpretation;
- assess runtime and duplication;
- prepare paired English and Tamil wording;
- record an explicit approval/revision/deferral/rejection;
- rerun validation after implementation.

Recommended review order:

1. Kayasandihai future-facing agency;
2. Aputhiran ethical continuity;
3. prison and institutional reform proposals as one coordinated batch;
4. grief and accountability proposals.

### 3. Governance and release cleanup

- reconcile `CHANGELOG.md` after version 0.24.0;
- refresh the file-audit ledger after new files or material changes;
- decide licensing separately for code, documentation, original screenplay and third-party material;
- update GitHub repository description and topics manually;
- define rights-controlled intake for storyboards and production design.

## Minimum requirements for any new screenplay insertion

Every insertion must have:

- source ID and exact location;
- rights and verification state;
- primary-text compatibility decision;
- adaptation rationale;
- affected scene and TRACE record;
- English wording;
- Tamil wording;
- causal and runtime assessment;
- explicit approval status;
- successful structural validation.

A proposed or deferred item cannot become approved merely because it has been written into a screenplay file.

## Current known open blockers

1. Aadhirai’s `சோறு`, `கறி`, `பசுநெய்`, vessels and serving practice need specialist visual/culinary review.
2. Eleven proposed Venpa uses require reliable page verification.
3. Tamil Sequence 03 requires semantic review.
4. Tamil Sequences 05–07 require spoken-performance review.
5. Tamil spelling and character-cue policy is unresolved.
6. Institutional proposals may duplicate one another or create false historical certainty if approved separately.
7. Evidence records use `source_work` labels and are not yet directly crosswalked to permanent `SRC-*` IDs.
8. No repository licence has been selected.
9. Storyboard and production-design phases contain foundations only, not populated deliverables.

## How to continue safely

For every material change:

1. locate the governing permanent records;
2. classify the change as evidence correction, interpretation, dialogue refinement, terminology normalization or structural revision;
3. update the authoritative register with dependent prose;
4. preserve English–Tamil pairing;
5. preserve scene and TRACE structure unless formally revising architecture;
6. run relevant tests and validators;
7. update sequence and specialist review registers;
8. update `STATUS.md` and audit controls only when their factual state changes.

## Instruction for the new chat

Continue work directly in `pugazg/manimekalai-cinematic-adaptation` without asking the user to repeat repository history. Begin by reading the authority documents listed above. Preserve the current screenplay freeze and permanent-ID system. Proceed to Tamil Sequence 03 semantic comparison, followed by spoken-performance review of Sequences 05–07. Rerun the complete validation suite after every controlled batch. Do not approve or insert any additional Venpa proposal unless its source, primary-text compatibility, bilingual wording and decision record are complete.
