# Manimekalai Cinematic Adaptation

A version-controlled research and development repository for a serious Tamil cinematic adaptation of *Manimekalai*.

## Project goal

Build a source-traceable adaptation archive supporting research, screenplay development, storyboards, production design and scholarly review.

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
- the Historical Tamilakam working volume;
- the Puhar city dossier;
- the Indra festival source dossier;
- the maritime trade and ships dossier;
- the costume, textiles and personal ornament dossier;
- the religious communities and philosophical schools dossier;
- the food, hunger, famine and Amudhasurabhi dossier;
- the geography, travel routes and Manipallavam dossier;
- the architecture, water systems and urban infrastructure dossier;
- the economy, labour, trade guilds and material culture dossier;
- 121 registered evidence records;
- 55 registered adaptation decisions;
- 47 preliminary screenplay scene records;
- 41 registered research sources;
- source-rights safeguards and automated modular-register validation.

These remain working research editions. Original Tamil passages, cross-textual concordances, full excavation reports, historical GIS work, craft reconstructions, numismatic analysis and specialist review must be added before screenplay and production designs are treated as final.
