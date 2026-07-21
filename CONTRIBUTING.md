# Contributing

This repository is an evidence-controlled adaptation archive, not an open-ended screenplay wiki. Contributions are welcome when they preserve permanent identifiers, source distinctions, uncertainty and bilingual parity.

## Before contributing

Read:

1. [Project status](STATUS.md)
2. [Core adaptation principles](README.md#core-adaptation-principles)
3. [Documentation index](docs/INDEX.md)
4. [Adaptation risk register](docs/11-project-governance/adaptation-risk-register.md)
5. the README for the phase or document you intend to change

Do not submit protected source scans, full copyrighted translations or unlicensed images.

## Contribution types

### 1. New evidence

A new factual or textual claim should be proposed as evidence before it changes character, treatment or screenplay material.

Provide:

- exact source identity and edition;
- page, chapter, line, figure or timestamp;
- a short description of the claim;
- evidence class: `[TEXT]`, `[CROSS]`, `[HISTORY]`, `[INTERPRETATION]` or `[CAUTION]`;
- rights status and whether the source file is public or privately held;
- confidence and uncertainty;
- existing `EV-*`, `AD-*` or `SC-*` records affected;
- conflicts with existing evidence.

Do not allocate a new permanent evidence ID by guessing the next number. Confirm the register and validator state first.

### 2. Adaptation decision

Use `AD-0001`, `AD-0002`, and so on. IDs are permanent and must never be reassigned.

Each decision must record:

- source observation;
- uncertainty or risk;
- alternatives considered;
- chosen treatment;
- rationale;
- evidence IDs;
- effect on chronology, character agency, doctrine and production;
- review status;
- superseded or related decisions.

A plausible idea is not automatically an approved adaptation decision.

### 3. Character-bible change

A character change must identify:

- exact character-bible section;
- supporting evidence and decisions;
- effect on agency, relationships and knowledge order;
- whether the change alters another character's responsibility;
- scenes and treatment sections affected;
- risks of anachronism, clinical projection, idealisation or caricature.

Do not use a modern diagnosis as a substitute for literary and historical analysis.

### 4. Treatment or screenplay proposal

A proposal must cite:

- sequence and scene number;
- complete TRACE signature;
- source `SC-*` unit and absorbed records;
- exact current text or location;
- proposed English and Tamil wording when the bilingual phase is involved;
- effect on scene objective, reversal and exit state;
- effect on runtime;
- validation and specialist-review requirements.

No one-language-only screenplay change is permitted after bilingual pairing.

### 5. Source-perspective proposal

Interpretive works such as Bharathidasan's *Manimekalai Venpa* remain independent witnesses. Use `VENPA-USE-*` records or the relevant perspective register.

A perspective proposal must not:

- replace the primary epic;
- silently convert interpretation into primary evidence;
- enter screenplay text without an explicit approve/revise/reject decision;
- bypass source-image, primary-source and bilingual review gates.

### 6. Validation or tooling change

Provide:

- the integrity problem being solved;
- expected default behaviour;
- regression tests;
- failure examples;
- backward-compatibility notes;
- confirmation that CI failure behaviour is not weakened.

Generated validation reports must be deterministic and must not be manually edited to claim a pass.

## Permanent identifiers

### Evidence IDs

Use `EV-0001`, `EV-0002`, and so on.

### Adaptation-decision IDs

Use `AD-0001`, `AD-0002`, and so on.

### Screenplay-source IDs

Use `SC-001`, `SC-002`, and so on.

### Feature and branch units

Use the existing `FU-*` and `BR-*` identifiers. Do not create, renumber, merge or split them without explicit structural approval.

### Perspective-use IDs

Use the relevant perspective register, currently including `VENPA-USE-*`. Rejected IDs remain in the record and must not be recycled.

## Evidence labels

- `[TEXT]` — directly supported by *Manimekalai*.
- `[CROSS]` — supported by another early literary source.
- `[HISTORY]` — archaeology, inscriptions, numismatics or responsible scholarship.
- `[INTERPRETATION]` — adopted production reconstruction where evidence is incomplete.
- `[CAUTION]` — warning against unsupported projection or false certainty.

Do not convert a plausible reconstruction into a factual assertion.

## Markdown style

- UTF-8 is mandatory.
- Use descriptive headings and short paragraphs.
- Prefer repository-relative links.
- Use backticks for IDs, file paths, TRACE signatures and exact technical tokens.
- Distinguish quotation from paraphrase.
- State uncertainty directly; do not hide it in vague language.
- Keep detailed reasoning in the relevant evidence, decision or review memo rather than overloading a summary table.
- Do not add generated praise, promotional language or completion claims as evidence.

## CSV style

- Preserve the existing header order unless a schema change is reviewed.
- One logical record per row.
- Use stable IDs; never renumber rows to close gaps.
- Quote fields containing commas, line breaks or quotation marks.
- Use consistent enumerated values for status and evidence class.
- Separate multiple IDs using the convention already used by that register.
- Do not place formulas, merged cells or presentation-only formatting in canonical CSV files.
- Run validators after every register change.

## File conventions

- Markdown is canonical for research and review prose.
- CSV is canonical for structured registers.
- Use lowercase snake_case except where an established phase convention already exists.
- Preserve existing sequence filename conventions.
- Do not commit `.DS_Store`, `__MACOSX`, editor backups or generated temporary files.

## Private sources

Follow [private-source handling](docs/11-project-governance/private-source-handling.md).

The public repository should contain source metadata, citations, hashes where appropriate and compliant excerpts—not protected source files merely because the contributor can access them.

## Review workflow

1. **Triage** — identify whether the change is evidence, interpretation, architecture, dialogue, validation or governance.
2. **Grounding** — confirm source identity, rights and exact location.
3. **Impact analysis** — list affected IDs, documents, scenes, characters and risks.
4. **Draft** — make the smallest coherent change.
5. **Cross-review** — check related evidence, decisions, character bibles and perspective registers.
6. **Bilingual review** — update English and Tamil together when applicable.
7. **Validation** — run all relevant validators and tests.
8. **Specialist gate** — leave terminology or historical questions open when expertise is still required.
9. **Decision record** — record approve, revise, defer or reject; do not delete rejected reasoning.
10. **Changelog** — add a categorized release entry for meaningful repository changes.

## Required validation

Repository registers:

```bash
python3 scripts/validate_repository.py
```

Bilingual screenplay:

```bash
python3 scripts/validate_bilingual_screenplay.py
```

Regression tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

A change must not be described as validated when the commands were not executed successfully against the actual repository checkout.

## Commit and changelog guidance

Use concise imperative commit messages. For substantial changes, classify the changelog entry under one or more of:

- Research
- Architecture
- Screenplay
- Bilingual
- Validation
- Governance
- Production design

Conventional commit prefixes may be used, but preserving meaningful repository history is more important than retroactively rewriting old commits.

## Review safeguards

Contributions must preserve these principles:

- previous-life continuity is not consent or ownership;
- sincere desire is not entitlement;
- grief does not excuse coercion or violence;
- hunger relief requires labour, access and recipient agency;
- philosophical opponents must not be reduced to caricature;
- sacred experience is not automatically public proof;
- interpretation must remain labelled;
- survivors retain ownership of testimony and continuing life;
- no miracle, ruler, mentor or solitary hero replaces accountable systems.
