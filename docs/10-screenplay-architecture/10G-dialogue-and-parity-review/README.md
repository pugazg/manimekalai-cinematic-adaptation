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

## Current baseline

- English sequences present: 10
- Tamil sequences present: 10
- Intended paired scenes: 72
- Intended scene range: `#1#`–`#72#`
- Tamil Draft 0.1: structurally drafted
- Dialogue lock: **not granted**
- Specialist terminology approval: **not granted**
- Performance timing approval: **not granted**

The parity validator and GitHub Actions workflow have been committed. A passing CI result must be recorded before the structural gate is marked complete; repository presence alone is not treated as an executed validation.

## Structural parity gate

Run:

```bash
python3 scripts/validate_bilingual_screenplay.py
```

The checker requires:

- exactly ten English and ten Tamil sequence files;
- the approved scene ranges for each sequence;
- identical English–Tamil scene order;
- one `TRACE` record per scene;
- identical `FU-*` / `BR-*`, primary `SC-*` and `ABSORBS` signatures;
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

- `review_register.csv` — gate status by sequence
- future issue logs should cite sequence, scene, trace unit, exact line and proposed change

This remains a review edition, not a shooting script, dubbing script or final subtitle file.
