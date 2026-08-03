# Documentation Index

This index is the shortest route into the repository. It does not replace the detailed README files inside each phase.

## Project control

- [Project status dashboard](../STATUS.md)
- [Root README](../README.md)
- [Full repository audit](11-project-governance/2026-07-21-full-repository-audit.md)
- [Executable validation and current full audit](11-project-governance/2026-07-22-executable-validation-and-full-audit.md)
- [Latest exhaustive repository audit](11-project-governance/2026-07-28-exhaustive-repository-audit.md)
- [Per-file audit ledger](11-project-governance/repository-file-audit.csv)
- [Bilingual Screenplay Release 0.1](../releases/0.1/)
- [Contributing guide](../CONTRIBUTING.md)
- [Rights and permissions](../RIGHTS_AND_PERMISSIONS.md)
- [Interim rights notice](../NOTICE)
- [Changelog](../CHANGELOG.md)
- [External review reconciliation](11-project-governance/2026-07-21-external-repository-review.md)
- [Adaptation risk register](11-project-governance/adaptation-risk-register.md)
- [Specialist review register](11-project-governance/specialist-review-register.csv)
- [Specialist review packets](11-project-governance/specialist-review-packets/)
- [Reviewer selection rubric](11-project-governance/reviewer-selection-rubric.csv)
- [Reviewer sourcing shortlist](11-project-governance/reviewer-sourcing-shortlist.md)
- [Critical review candidate slate](11-project-governance/critical-review-candidate-slate.md)
- [Remaining specialist candidate slate](11-project-governance/remaining-specialist-candidate-slate.md)
- [Reviewer invitation and intake kit](11-project-governance/specialist-review-packets/reviewer-invitation-and-intake.md)
- [External review outreach batch](11-project-governance/external-review-outreach-batch.md)
- [Owner rights and licensing decision](11-project-governance/owner-rights-and-licensing-decision.md)
- [Rights decision execution checklist](11-project-governance/rights-decision-execution-checklist.md)
- [Evidence-to-source crosswalk](11-project-governance/evidence-source-crosswalk.md)

## Audited repository baseline

- 282 current tracked paths audited;
- 45 registered sources;
- 318 evidence records;
- 170 adaptation decisions;
- 154 screenplay-source concepts;
- 72 active feature units;
- ten English and ten Tamil screenplay sequences;
- 6 approved, 0 proposed, 7 deferred and 18 rejected Venpa decisions.

## Research and adaptation phases

| Phase | Area | Purpose |
|---|---|---|
| [01](01-vision/) | Vision | Project purpose, scope and adaptation principles |
| [02](02-literary-analysis/) | Literary analysis | Epic structure, themes, poetics and narrative problems |
| [03](03-historical-world/) | Historical world | Puhar, trade, social systems, material culture and historical cautions |
| [04](04-characters/) | Character bibles | Evidence-based psychology, agency, relationships and performance risks |
| [05](05-philosophy/) | Philosophy bible | Schools, knowledge, causation, ethics and Manimekalai's intellectual journey |
| [06](06-adaptation-decisions/) | Adaptation decisions | Permanent `AD-*` choices, alternatives and rationales |
| [07](07-screenplay-evidence-matrix/) | Screenplay evidence matrix | Permanent `SC-*` concepts and evidence inheritance |
| [08](08-storyboard-bible/) | Storyboard bible | Visual grammar and interpretation-labelled image planning |
| [09](09-production-design/) | Production design | Architecture, costume, objects, geography, maritime silhouettes and production reconstruction |

Key production plate: [season and water continuity calendar](09-production-design/season-and-water-continuity-calendar.md).
Prop continuity: [Amudhasurabhi plate](09-production-design/amudhasurabhi-prop-continuity.md).
Service design: [food, vessel and service workflow](09-production-design/food-vessel-and-service-workflow.md).
Animal production: [animal action and welfare plan](09-production-design/animal-action-and-welfare-plan.md).
Custody and violence: [guard, custody and weapon handling](09-production-design/guard-custody-and-weapon-handling.md).
| [10](10-screenplay-architecture/) | Screenplay architecture | Feature architecture, beat sheets, treatment, bilingual drafts and review gates |
| [11](11-project-governance/) | Governance | Audits, external reviews, risks, specialist consultation and collaboration process |

## Screenplay development

- [10A–10H architecture, screenplay and review index](10-screenplay-architecture/)
- [English Screenplay Draft 0.1](10-screenplay-architecture/10E-screenplay-draft/README.md)
- [Bilingual screenplay edition](10-screenplay-architecture/10F-bilingual-screenplay/README.md)
- [10G dialogue and parity review](10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Sequence review register](10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv)
- [Tamil terminology and cue policy](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-terminology-and-cue-policy.md)
- [Tamil terminology register](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-terminology-register.csv)
- [Tamil Sequence 03 semantic review](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-03-semantic-review.md)
- [Tamil Sequence 05 spoken-performance review](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-05-spoken-performance-review.md)
- [Tamil Sequence 06 spoken-performance review](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-06-spoken-performance-review.md)
- [Tamil Sequence 07 spoken-performance review](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-07-spoken-performance-review.md)
- [Tamil Sequences 01–10 internal review index](10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Venpa master decision register](10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [Venpa perspective and evidence index](10-screenplay-architecture/10H-source-perspectives/README.md)
- [Aadhirai approval record](10-screenplay-architecture/10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md)

## Validation commands

Repository registers:

```bash
python3 scripts/validate_repository.py
```

Bilingual screenplay structure:

```bash
python3 scripts/validate_bilingual_screenplay.py
```

Every tracked file and the per-file ledger:

```bash
python3 scripts/audit_all_tracked_files.py
```

Regression tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

The 2026-07-28 audit records the latest exhaustive path-level pass. Both hosted workflows passed on merged PR #12 for the completed Venpa decision cycle.
