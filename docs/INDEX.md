# Documentation Index

This index is the shortest route into the repository. It does not replace the detailed README files inside each phase.

## Project control

- [Project status dashboard](../STATUS.md)
- [Root README](../README.md)
- [Full repository audit](11-project-governance/2026-07-21-full-repository-audit.md)
- [Executable validation and current full audit](11-project-governance/2026-07-22-executable-validation-and-full-audit.md)
- [Per-file audit ledger](11-project-governance/repository-file-audit.csv)
- [Contributing guide](../CONTRIBUTING.md)
- [Changelog](../CHANGELOG.md)
- [External review reconciliation](11-project-governance/2026-07-21-external-repository-review.md)
- [Adaptation risk register](11-project-governance/adaptation-risk-register.md)
- [Specialist review register](11-project-governance/specialist-review-register.csv)

## Audited repository baseline

- 179 current tracked paths audited;
- 45 registered sources;
- 318 evidence records;
- 170 adaptation decisions;
- 154 screenplay-source concepts;
- 72 active feature units;
- ten English and ten Tamil screenplay sequences;
- 2 approved, 11 proposed, 7 deferred and 11 rejected Venpa decisions.

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
| [09](09-production-design/) | Production design | Architecture, costume, objects, geography and production reconstruction |
| [10](10-screenplay-architecture/) | Screenplay architecture | Feature architecture, beat sheets, treatment, bilingual drafts and review gates |
| [11](11-project-governance/) | Governance | Audits, external reviews, risks, specialist consultation and collaboration process |

## Screenplay development

- [10A–10H architecture, screenplay and review index](10-screenplay-architecture/)
- [English Screenplay Draft 0.1](10-screenplay-architecture/10E-screenplay-draft/README.md)
- [Bilingual screenplay edition](10-screenplay-architecture/10F-bilingual-screenplay/README.md)
- [10G dialogue and parity review](10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Sequence review register](10-screenplay-architecture/10G-dialogue-and-parity-review/review_register.csv)
- [Tamil Sequence 03 semantic review](10-screenplay-architecture/10G-dialogue-and-parity-review/tamil-sequence-03-semantic-review.md)
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

Regression tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

The 2026-07-22 audit records successful local execution and passing hosted `validate` and `bilingual-parity` checks on draft PR #2.
