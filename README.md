# Manimekalai Cinematic Adaptation

A version-controlled research, screenplay and review repository for a serious, source-traceable Tamil cinematic adaptation of *Manimekalai*.

> **Current phase:** English Screenplay Draft 0.1 and the Tamil bilingual draft are structurally complete. A full static, local executable and hosted-CI audit has verified all 72 paired scenes and TRACE signatures. Dialogue, source, terminology and performance gates remain open.

## Navigation

- [Project status dashboard](STATUS.md)
- [Full repository audit](docs/11-project-governance/2026-07-21-full-repository-audit.md)
- [Executable validation and current full audit](docs/11-project-governance/2026-07-22-executable-validation-and-full-audit.md)
- [Per-file audit ledger](docs/11-project-governance/repository-file-audit.csv)
- [Documentation index](docs/INDEX.md)
- [Contributing guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Screenplay architecture](docs/10-screenplay-architecture/)
- [Dialogue and parity review](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/README.md)
- [Venpa master decision register](docs/10-screenplay-architecture/10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)
- [Aadhirai approval record](docs/10-screenplay-architecture/10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md)
- [Adaptation risk register](docs/11-project-governance/adaptation-risk-register.md)

## Current status

| Area | State |
|---|---|
| Research foundation | Complete working foundation; specialist review remains open |
| Character bibles | 11 principal and priority supporting-character dossiers complete; Aadhirai restored during full audit |
| Philosophy bible | Complete working foundation integrated with the feature architecture |
| Feature architecture | 165 minutes, ten sequences, 72 active screenplay units |
| English Screenplay Draft 0.1 | Structurally complete; dialogue lock not granted |
| Tamil bilingual draft | Structurally complete; spoken-Tamil and terminology lock not granted |
| Static bilingual audit | 10 + 10 sequences, 72 paired scenes, matching TRACE signatures and valid endings |
| Venpa perspective review | 31 decisions: 2 approved, 11 proposed, 7 deferred, 11 rejected |
| Approved Venpa use | Aadhirai Scenes `#31#–#32#`, implemented bilingually |
| Runtime validation | Local full pass recorded; hosted `validate` and `bilingual-parity` checks passed on draft PR #2 |
| Storyboard and production design | Policy foundations only; visual population pending rights and specialist controls |

## Audited baseline

- current tracked paths audited: **180**
- registered sources: **45** (`SRC-0001`–`SRC-0045`)
- evidence records: **318** (`EV-0001`–`EV-0318`)
- adaptation decisions: **170** (`AD-0001`–`AD-0170`)
- preliminary screenplay-source concepts: **154** (`SC-001`–`SC-154`)
- active feature units: **72**
- runtime: **45 / 60 / 60 minutes = 165 minutes**

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

## Core adaptation principles

- Preserve the epic's moral centre: compassion, hunger, desire, justice, causation and liberation.
- Do not reduce the work to spectacle or generic religious allegory.
- Distinguish textual evidence, cross-textual support, history and cinematic interpretation.
- Do not project later religious identities, iconography or institutions backward without evidence.
- Do not claim archaeological, geographic, maritime or costume certainty where evidence remains partial.
- Present Puhar as a sophisticated maritime culture without declaring a single exact harbour, hull or urban reconstruction proven.
- Represent philosophical plurality without imposing a modern Hindu-versus-Buddhist binary or reducing rival positions to caricature.
- Treat hunger as a political, institutional and ethical system; the Amudhasurabhi does not erase labour, water, access, sanitation, distribution or recipient dignity.
- Make labour visible behind wealth, performance, trade and relief.
- Separate royal duty, personal desire, grief and institutional power; karma is not a legal verdict and grief does not excuse coercion.
- Treat beauty, profession, adornment and public visibility as never constituting consent.
- Build psychology from traceable evidence and controlled interpretation rather than modern diagnosis or flawless icon-making.
- Treat artistic knowledge as biography rather than moral contamination.
- Give survivors ownership of testimony and continuing life; trauma is not spectacle or permanent personality.
- Treat sincere desire as distinct from consent; previous-life connection does not create a present claim, and death is not romantic purification.
- Let mentors equip and challenge without owning a student's conscience.
- Keep grief emotionally real without allowing custody, secrecy, apology or spiritual recognition to conceal coercion.
- Show that compassion precedes miracles and that prosperity is good; sacred self-relinquishment must not become a universal demand for self-erasure.
- Separate observation from proof and care from ownership; mistaken identity and jealousy may explain convergence but do not erase lethal choice.
- Treat household giving as skilled social action. Aadhirai's material offering connects private labour, women's authority and public responsibility.
- Give rival philosophical positions their strongest intelligible form.
- Distinguish private experience, testimony, inference and public proof.
- Consolidate scene concepts without deleting their evidence functions.
- Convert architecture into treatment and screenplay without silently creating certainty or unreviewed terminology.

## Evidence labels

- `[TEXT]` — directly supported by *Manimekalai*.
- `[CROSS]` — supported by another early Tamil literary source.
- `[HISTORY]` — supported by archaeology, inscriptions, numismatics or responsible scholarship.
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
  11-source-perspectives/
evidence/
sources/
private_sources/      # ignored; lawfully held source files only
scripts/
tests/
.github/workflows/
```

## Source handling

Full translations, scans and other protected sources are not committed by default. Place lawfully held files in `private_sources/`, which is excluded through `.gitignore`.

Public research notes should cite exact passages while respecting copyright and licence terms. Follow [private-source handling](docs/11-project-governance/private-source-handling.md) for filenames, metadata, hashes, consultation notes and visual references.

## Validation

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
python3 scripts/validate_repository.py
python3 scripts/validate_bilingual_screenplay.py
```

The repository validator enforces exact 45 / 318 / 170 / 154 register ranges, required fields, evidence and decision references, and canonical register placement. Evidence records currently use textual `source_work` provenance rather than direct `SRC-*` crosswalks. The bilingual validator checks sequence discovery, scene ranges, parity against the authoritative 10B feature-unit matrix, duplicate units or source-scene use, invalid absorption and recognised endings.

The local executable pass and hosted GitHub Actions results are recorded in the 2026-07-22 audit.

## Open gates

1. Complete scan-page verification and specialist review for Venpa uses.
2. Complete culinary and historical review of the implemented Aadhirai food detail.
3. Complete critical line-by-line and spoken-Tamil review of restored Sequences 06–07; Sequence 05 internal review is complete.
4. Complete specialist terminology and character-voice review of Sequence 03 after its internal semantic restoration.
5. Normalize Tamil naming and character-cue policy.
6. Complete Buddhist, philosophical, historical, maritime, costume, gender, animal-welfare and rights consultation.
7. Begin rights-labelled storyboard and production-design pilots.
8. Decide repository licensing separately for original work and third-party material.

These remain working research, adaptation and screenplay-review editions—not a shooting script, dubbing script, final subtitle file or production claim.
