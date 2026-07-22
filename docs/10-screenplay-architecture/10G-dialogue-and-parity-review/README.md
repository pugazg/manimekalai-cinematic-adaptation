# 10G — Dialogue and Parity Review

## Purpose

This phase reviews the completed English–Tamil Draft 0.1 without weakening the approved screenplay architecture.

The review order is deliberate:

1. structural parity;
2. spoken-Tamil naturalness;
3. literary, historical, Buddhist and philosophical terminology;
4. character-voice differentiation;
5. read-aloud timing and performance rhythm.

A later gate must not conceal failure at an earlier gate. Natural dialogue cannot compensate for a missing scene or changed causal outcome.

## Authoritative inputs

- English structural master: `../10E-screenplay-draft/`
- Tamil performance adaptation: `../10F-bilingual-screenplay/TA/`
- Translation rules: `../10F-bilingual-screenplay/translation_guidelines.md`
- Automated parity checker: `../../../scripts/validate_bilingual_screenplay.py`
- Sequence review register: [`review_register.csv`](review_register.csv)
- Venpa decision authority: [`venpa-perspective-master-decision-register.md`](venpa-perspective-master-decision-register.md)

The Venpa register consolidates `VENPA-USE-001` through `VENPA-USE-031`. Its current state is 5 approved, 5 proposed, 7 deferred and 14 rejected decisions. The approved Madhavi, Aadhirai, Kayasandihai and Aputhiran beats are implemented bilingually; no other proposal is authorised for insertion.

## Current baseline

- English sequences present: 10
- Tamil sequences present: 10
- Paired scenes: 72
- Scene range: `#1#`–`#72#`
- Static scene and TRACE audit: **complete**
- Executable regression and validator result: **passed locally after the Sequence 03 semantic restoration**
- Tamil Draft 0.1: structurally complete
- Dialogue lock: **not granted**
- Specialist terminology approval: **not granted**
- Performance timing approval: **not granted**

The full repository audit read every English and Tamil sequence directly and confirmed identical scene order, TRACE signatures and recognised endings. This static result is not a substitute for executing the validator in a repository checkout or CI runner.

The Aadhirai insertion retains the same Scene `#31#–#32#` numbers and TRACE signatures in both languages. Tamil Sequences 05–07 remain subject to dedicated line-by-line and spoken-performance review. Sequence 03 has completed its internal semantic comparison; the sensory, vulnerability and epistemic beats necessary for parity are restored, while specialist and performance gates remain open.

## Structural parity gate

Run:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
python3 scripts/validate_bilingual_screenplay.py
```

The checker requires:

- exactly ten English and ten Tamil sequence files;
- the approved scene ranges for each sequence;
- identical English–Tamil scene order;
- one `TRACE` record per scene;
- identical `FU-*` / `BR-*`, primary `SC-*` and `ABSORBS` signatures;
- no duplicated unit or source-scene use within either language;
- no primary scene repeated inside `ABSORBS`;
- recognised screenplay ending markers.

Structural changes after a passing run require the validator to be rerun.

## Review safeguards

Dialogue review must continue to preserve these controls:

- previous-life continuity is not consent, ownership or present obligation;
- desire may be sincere without becoming entitlement;
- Manimekalai does not inherit responsibility for Udayakumaran's pursuit or Kanchanan's violence;
- Rajamadevi's grief explains pain but does not erase coercive authority;
- philosophical schools receive their strongest intelligible form;
- personal sacred experience does not automatically become public proof;
- compassion becomes labour, access, translation, sanitation, livelihood repair and accountable administration;
- the Amudhasurabhi is not privately owned and does not replace systems;
- the final frame belongs to continuing workers and recipients rather than a solitary saviour.

## Gate definitions

### P1 — Structural parity

Scene order and complete trace signatures match. No dialogue-quality claim is implied.

### P2 — Spoken Tamil

Action and dialogue are natural, performable and contemporary without flattening cultural setting or philosophical precision.

### P3 — Terminology

Names and key concepts are consistent. Uncertain historical or religious vocabulary is flagged rather than silently standardised.

### P4 — Character voice

Characters remain distinguishable by rhythm, authority, social position, emotional strategy and intellectual method.

### P5 — Read-aloud timing

Scenes are tested aloud for breath, interruption, emphasis, subtitle feasibility and intended sequence duration.

Only after P1–P5 may a sequence be considered dialogue-locked.

## Working records

- [`review_register.csv`](review_register.csv) — sequence-level static findings and open gates
- [`tamil-terminology-and-cue-policy.md`](tamil-terminology-and-cue-policy.md) — locked editorial rules separated from specialist-open terminology
- [`tamil-terminology-register.csv`](tamil-terminology-register.csv) — controlled Tamil forms and their remaining review gates
- [`tamil-sequence-03-semantic-review.md`](tamil-sequence-03-semantic-review.md) — completed internal semantic comparison and restoration record for Scenes `#14#–#17#`
- [`tamil-sequence-05-spoken-performance-review.md`](tamil-sequence-05-spoken-performance-review.md) — completed internal speakability, voice and causality pass for Scenes `#35#–#43#`
- [`tamil-sequence-06-spoken-performance-review.md`](tamil-sequence-06-spoken-performance-review.md) — completed internal speakability, voice and delegated-state-harm pass for Scenes `#44#–#49#`
- [`tamil-sequence-07-spoken-performance-review.md`](tamil-sequence-07-spoken-performance-review.md) — completed internal speakability, voice and accountable-release pass for Scenes `#50#–#53#`
- [`venpa-perspective-master-decision-register.md`](venpa-perspective-master-decision-register.md) — authoritative status, destination, evidence and dependency register
- [`../10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md`](../10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md) — owner approval and implementation provenance
- detailed perspective memos — historical reasoning and source notes behind each `VENPA-USE-*` record

The creative revision queue and the original Aadhirai proposal memo preserve pre-approval history. Where they state that no screenplay change has occurred, the later approval record and master register supersede that status statement while their reasoning remains part of the audit trail.

This remains a review edition, not a shooting script, dubbing script or final subtitle file.
