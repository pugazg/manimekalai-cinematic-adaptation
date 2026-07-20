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

The validator checks evidence IDs, adaptation decision IDs and screenplay evidence references.

## Current state

The repository contains the initial vision, literary analysis, historical Tamilakam foundation, Puhar city dossier and Indra festival dossier. These are working editions and require expansion with original Tamil passages, cross-textual evidence, archaeology and specialist review.
