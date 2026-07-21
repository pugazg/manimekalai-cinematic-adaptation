# Manimekalai Cinematic Adaptation

A version-controlled research and development repository for a serious, source-traceable Tamil cinematic adaptation of *Manimekalai*.

> **Current phase:** English Screenplay Draft 0.1 and the Tamil bilingual draft are structurally present. Dialogue, source-perspective, terminology and performance review remain active. No screenplay lock has been granted.

## Navigation

- [Project status dashboard](STATUS.md)
- [Documentation index](docs/INDEX.md)
- [Contributing guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Screenplay architecture](docs/10-screenplay-architecture/)
- [Dialogue and parity review](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Venpa master decision register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [Venpa evidence packet](docs/10-screenplay-architecture/10H-source-perspectives/venpa-proposed-evidence-packet.md)
- [External review reconciliation](docs/11-project-governance/2026-07-21-external-repository-review.md)
- [Adaptation risk register](docs/11-project-governance/adaptation-risk-register.md)

## Table of contents

1. [Project goal](#project-goal)
2. [Current status](#current-status)
3. [Core adaptation principles](#core-adaptation-principles)
4. [Evidence labels](#evidence-labels)
5. [Repository map](#repository-map)
6. [Source handling](#source-handling)
7. [Validation](#validation)
8. [Current research and adaptation baseline](#current-research-and-adaptation-baseline)
9. [Open gates](#open-gates)

## Project goal

Build a source-traceable adaptation archive supporting research, screenplay development, bilingual performance, character work, storyboards, production design and scholarly review.

The repository separates:

- primary textual evidence;
- cross-textual support;
- historical evidence;
- interpretive reconstruction;
- adaptation decisions;
- screenplay units;
- bilingual implementation;
- specialist and performance review.

## Current status

| Area | State |
|---|---|
| Research foundation | Complete working foundation; specialist review remains open |
| Character bibles | 11 principal and priority supporting-character bibles completed |
| Philosophy bible | Active and integrated with the feature architecture |
| Feature architecture | 165 minutes, ten sequences, 72 active screenplay units |
| English Screenplay Draft 0.1 | Structurally complete; dialogue lock not granted |
| Tamil bilingual draft | Structurally complete; spoken-Tamil and terminology lock not granted |
| Dialogue and parity review | Active |
| Venpa perspective review | 31 decisions: 13 proposed, 7 deferred, 11 rejected; none approved for insertion |
| Runtime validation | Validators and workflow are present; latest reproducible full pass is not yet recorded |
| Storyboard and production design | Foundation present; systematic visual population pending rights and specialist controls |

See [STATUS.md](STATUS.md) for blockers, locks and the phase roadmap.

## Core adaptation principles

- Preserve the epic's moral centre: compassion, hunger, desire, justice, causation and liberation.
- Do not reduce the work to spectacle or to a generic religious allegory.
- Distinguish textual evidence from cross-textual support, historical evidence and cinematic interpretation.
- Do not project later religious identities or iconography backward without evidence.
- Treat the Indra festival first within its early Tamil civic-sacral context; do not assume identity with every later representation of Indra.
- Do not claim archaeological certainty where evidence is partial or debated.
- Present Puhar as a sophisticated maritime culture without declaring an exact ancient hull, rig or harbour layout proven before specialist review.
- Reconstruct costume through early texts, archaeology, social function and movement; do not use later Bharatanatyam or medieval imperial Chola styling as automatic evidence.
- Represent religious and philosophical plurality without imposing a modern Hindu-versus-Buddhist binary or reducing rival positions to caricature.
- Treat hunger as a political, institutional and ethical system; the Amudhasurabhi does not erase labour, water, access, distribution or recipient dignity.
- Separate textual, historical and cinematic geography; disputed locations such as Manipallavam and Vanji remain explicit hypotheses rather than false modern coordinates.
- Do not map the epic's Nāga identities automatically onto a modern ethnicity, nation or racialized visual system.
- Reconstruct cities through connected infrastructure and institutions; ring wells, poetic splendour and later monuments do not automatically determine early historic function or form.
- Make labour visible behind wealth, performance, trade and relief; imported objects, coins and later guild institutions must not become false shortcuts for the economy.
- Separate royal duty, personal desire, grief and institutional power; karma is not a legal verdict and grief does not excuse coercion.
- Treat female agency as constrained, relational and accountable; beauty, adornment, profession and public visibility never function as consent.
- Build character psychology from traceable evidence and clearly labelled interpretation; do not convert literary figures into modern clinical cases or flawless icons.
- Treat artistic knowledge as biography rather than moral contamination; renunciation does not erase skill, labour, household responsibility or the autonomy of the next generation.
- Give survivors ownership of testimony and continuing life; vigilance is not cowardice, trauma is not a permanent personality and cinematic expansion beyond the poem must remain explicit.
- Treat sincere desire as distinct from consent; royal charisma and previous-life connection do not create a present claim, and death is not romantic purification.
- Let mentors listen, equip and challenge without owning a student's conscience; Buddhist conviction remains explicit while teacher authority, karmic explanation and philosophical claims stay open to evidence and review.
- Treat artistic-household survival strategies with social seriousness while preserving responsibility when protection becomes possession.
- Keep grief emotionally real without allowing royal custody, secrecy, apology or spiritual recognition to conceal coercion or erase accountability.
- Show that compassion precedes miracles; feeding requires labour and recipient agency, prosperity remains good, and sacred self-relinquishment must not become a universal demand for self-erasure.
- Separate observation from proof and care from ownership; mistaken identity, jealousy and fate may explain a violent convergence but never turn lethal judgement into honour, accident or innocence.
- Separate rebirth continuity from present identity; memory of a previous life does not cancel current relationships, duties or responsibilities.
- Treat household giving as skilled social action rather than decorative charity; Aadhirai's first offering connects private resources, women's authority and public responsibility without glorifying marital self-destruction.
- Let philosophy begin in the plot before it becomes explicit dialogue: refusal, revelation, hunger, mistaken inference, grief and governance are all tests of knowledge.
- Give rival philosophical positions their strongest intelligible form; Manimekalai's Buddhist commitment gains meaning through serious listening, disciplined reasoning and ethical consequence rather than easy victory.
- Distinguish private experience, testimony, inference and public proof; true sacred experience within the epic does not remove the need for intellectual humility.
- Consolidate scene concepts without deleting their evidence functions; every merged concept remains traceable to a surviving screenplay unit.
- Convert architecture into treatment and screenplay without weakening evidence controls; prose and dialogue cannot silently create factual certainty or unreviewed terminology.

## Evidence labels

- `[TEXT]` — directly supported by *Manimekalai*.
- `[CROSS]` — supported by another early Tamil literary source.
- `[HISTORY]` — supported by archaeology, inscriptions, numismatics or responsible historical scholarship.
- `[INTERPRETATION]` — production reconstruction adopted because evidence is incomplete.
- `[CAUTION]` — later assumptions must not be projected backward.

## Repository map

```text
docs/
  01-vision/
  02-literary-analysis/
  03-historical-world/
  04-characters/
  05-philosophy/
  06-adaptation-decisions/
  07-screenplay-evidence-matrix/
  08-storyboard-bible/
  09-production-design/
  10-screenplay-architecture/
  11-project-governance/
evidence/
sources/
private_sources/      # ignored; lawfully held source files only
scripts/
tests/
.github/workflows/
```

## Source handling

The supplied full translations, scans and other protected sources are **not committed** by default. Place lawfully held source files in `private_sources/`; the directory is excluded through `.gitignore`.

Public research notes should cite passages precisely while respecting copyright and licence terms. Follow [private-source handling](docs/11-project-governance/private-source-handling.md) for filenames, metadata, hashes, consultation notes and visual references.

## Validation

Repository-register integrity:

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

The register validator checks required fields, permanent-ID formats, global uniqueness and cross-register references. The bilingual validator checks sequence discovery, scene ranges, TRACE records, English–Tamil TRACE parity and recognised ending markers.

A validator's presence is not proof that it has passed. A successful run must be executed and recorded against the actual repository checkout before the structural gate is marked complete.

## Current research and adaptation baseline

The repository contains:

- the vision and literary-analysis foundation;
- the Historical Tamilakam working volume and production-oriented historical dossiers;
- 11 character bibles: Manimekalai, Madhavi, Sudhamathi, Udayakumaran, Aravana Adigal, Chitrapathi, Rajamadevi, Aputhiran, Kanchanan, Punniyarajan and Aadhirai;
- a working Philosophy Bible with school, knowledge, ethics, hunger, liberation and intellectual-journey documents;
- a 165-minute, ten-sequence feature architecture;
- 61 principal `KEEP` scenes and 11 embedded `BRANCH` beats consolidated into 72 active units;
- 45 / 60 / 60-minute act allocations and continuity controls;
- a complete feature treatment;
- structurally complete English and Tamil screenplay drafts;
- dialogue, parity and source-perspective reviews;
- 318 registered evidence records;
- 170 registered adaptation decisions;
- 154 preliminary screenplay scene records;
- 44 registered research sources;
- 31 Venpa perspective decisions with a master register and evidence-preparation packet;
- source-rights safeguards, risk tracking, specialist-review tracking and automated validation foundations.

## Open gates

The project is not dialogue-locked, casting-ready or production-final. Major open gates include:

1. a recorded successful regression and bilingual-validator run;
2. scan-page verification for the thirteen proposed Venpa uses;
3. primary-epic compatibility review;
4. dedicated line-by-line and spoken-Tamil review of restored Sequences 05–07;
5. terminology and transliteration review;
6. historical, Buddhist, philosophical, maritime, costume, gender, animal-welfare and rights consultation;
7. rights-labelled storyboard and production-design pilots;
8. a repository licence decision separating original work from third-party source material.

These remain working research, adaptation and screenplay-review editions—not a shooting script, dubbing script, final subtitle file or production claim.
