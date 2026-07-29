# New Chat Handover — Manimekalai Cinematic Adaptation

> Use this as a compact orientation record. `STATUS.md` and the live registers remain authoritative.

## Repository

- **Repository:** `pugazg/manimekalai-cinematic-adaptation`
- **Default branch:** `main`
- **Current working phase:** full repository audit, Tamil quality gates, specialist preparation, storyboard, production design and release packaging
- **Screenplay state:** 10 English sequences and 10 Tamil sequences, Scenes `#1#–#72#`, structurally paired and validator-tested
- **Dialogue/production state:** not locked

Read first:

1. `STATUS.md`
2. `docs/INDEX.md`
3. `docs/11-project-governance/repository-file-audit.csv`
4. `docs/11-project-governance/evidence-source-crosswalk.md`
5. `docs/10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv`
6. `docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md`
7. `docs/11-project-governance/specialist-review-register.csv`

## Verified baseline

- tracked repository paths in the current ledger: **199**
- sources: **45** (`SRC-0001`–`SRC-0045`)
- evidence records: **318** (`EV-0001`–`EV-0318`)
- adaptation decisions: **170** (`AD-0001`–`AD-0170`)
- screenplay-source concepts: **154** (`SC-001`–`SC-154`)
- active feature units: **72**
- bilingual scenes: **72**
- runtime design: **45 / 60 / 60 = 165 minutes**
- Venpa dispositions: **6 approved / 0 proposed / 7 deferred / 18 rejected**

All 318 evidence records are crosswalked to permanent `SRC-*` records or explicitly classified as internal project records.

## Completed integrity controls

- repository-register validation;
- bilingual scene and TRACE parity validation;
- exact permanent-ID range checks;
- duplicate and orphan-reference checks;
- Tamil-script cue and `இராசமாதேவி` normalization checks;
- CSV-width, UTF-8, terminal-newline and repository-link audit;
- hosted GitHub validation for the completed Venpa institutional batch.

Run after every controlled change:

```bash
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/validate_repository.py
python3 scripts/validate_bilingual_screenplay.py
python3 scripts/audit_all_tracked_files.py
```

## Implemented Venpa decisions

- `VENPA-USE-001` — Madhavi asks for witnessed truth rather than public rumour.
- `VENPA-USE-007` and `VENPA-USE-008` — Aadhirai's prepared first offering precedes the visible continuation of abundance.
- `VENPA-USE-011` — Kayasandihai regains future-facing agency after hunger relief.
- `VENPA-USE-016` — Aputhiran turns from celestial reward to immediate service.
- `VENPA-USE-021` — the reformed prison includes a public read-aloud and record-correction practice.

No Venpa proposal remains undecided for the current feature. Deferred records stay outside the screenplay unless a new decision cycle is opened.

## Binding locks

1. English and Tamil screenplay changes must remain paired.
2. Scene numbers and TRACE signatures are frozen unless architecture records are revised together.
3. Previous-life continuity never creates present consent or ownership.
4. Udayakumaran's sincerity does not excuse pursuit.
5. Kanchanan's grief or mistaken recognition does not remove responsibility for violence.
6. Rajamadevi's grief does not erase delegated institutional harm.
7. Hunger relief must retain labour, water, access, sanitation, livelihood and governance.
8. Aputhiran's final fast must not be promoted as a universal model.
9. Later religious, political or visual conventions must not be projected backward as documented fact.
10. Specialist, performance, rights and production locks must be recorded separately from structural validation.

## Remaining work

1. conduct external Tamil specialist and actor-led review using the completed ten-sequence internal packet;
2. complete specialist-ready terminology, source, food, history, philosophy and performance packets;
3. populate the storyboard and production-design phases with evidence-labelled deliverables;
4. obtain owner and rights-specialist decisions on licensing;
5. assemble combined English and Tamil Fountain packages and verify final exports;
6. rerun the exhaustive audit and hosted validation before release.

External specialist sign-off must never be invented. Internal review may prepare and narrow questions, but the specialist register remains open until an identified reviewer and review date are recorded.
