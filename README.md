# Manimekalai Cinematic Adaptation

A version-controlled research and development repository for a serious Tamil cinematic adaptation of *Manimekalai*.

## Project goal

Build a source-traceable adaptation archive supporting research, screenplay development, character performance, storyboards, production design and scholarly review.

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
- Convert architecture into treatment without weakening evidence controls; treatment prose cannot silently create factual certainty, final dialogue or unreviewed terminology.

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
evidence/
sources/
private_sources/      # ignored; for lawfully held source files
scripts/
.github/workflows/
```

## Source handling

The supplied full English translation is **not committed** to this repository by default. Place lawfully held source files in `private_sources/`; this directory is excluded through `.gitignore`. Public research notes should cite passages precisely while respecting copyright and source licence terms.

## Validation

Run:

```bash
python3 scripts/validate_repository.py
```

The validator merges all evidence, adaptation-decision and screenplay-scene CSV registers in their respective directories. It checks required fields, permanent ID formats, global uniqueness and cross-register references.

## Current state

The repository contains:

- the initial vision and literary-analysis foundation;
- the complete Historical Tamilakam working volume;
- historical, religious, social, political and production dossiers;
- 11 completed principal and priority supporting-character bibles:
  - Manimekalai;
  - Madhavi;
  - Sudhamathi;
  - Udayakumaran;
  - Aravana Adigal;
  - Chitrapathi;
  - Rajamadevi;
  - Aputhiran;
  - Kanchanan;
  - Punniyarajan;
  - Aadhirai;
- an active Philosophy Bible containing:
  - philosophical map;
  - knowledge and debate foundation;
  - ethics, hunger and liberation foundation;
  - philosophical-schools deep dive;
  - Manimekalai's intellectual-journey map;
  - philosophy-to-screen matrix;
- the 165-minute master feature architecture and ten-sequence map;
- the completed 10B scene-selection architecture:
  - 61 principal `KEEP` scenes;
  - 11 embedded `BRANCH` beats;
  - 69 `MERGE` concepts mapped to surviving scenes;
  - 10 `RESERVE` concepts;
  - 3 `OMIT` concepts;
  - 72 active screenplay units in narrative order;
- the completed 10C beat-sheet architecture:
  - objectives, reversals and exit states for all 72 units;
  - a 45-minute Act I, 60-minute Act II and 60-minute Act III runtime matrix;
  - character-state progression across all ten sequences;
  - continuity and draft-readiness controls;
- the completed 10D feature treatment:
  - master treatment and governing rules;
  - complete Act I, Act II and Act III prose treatments;
  - every active unit mapped to its treatment section and target runtime;
- 318 registered evidence records;
- 170 registered adaptation decisions;
- 154 preliminary screenplay scene records;
- 44 registered research sources;
- source-rights safeguards and automated modular-register validation.

The next planned stage is `10E — Screenplay Draft 0.1`, which will convert the approved treatment into scene headings, action and dialogue while inheriting all evidence, adaptation and continuity controls.

These remain working research and adaptation editions. Original Tamil passages, cross-textual concordances, full excavation reports, historical GIS work, craft reconstructions, numismatic analysis, gender-history review, caste-history review, Indian-philosophy review, Buddhist-logic review, animal-welfare review, trauma-informed character testing and specialist consultation must be completed before screenplay, casting or production designs are treated as final.