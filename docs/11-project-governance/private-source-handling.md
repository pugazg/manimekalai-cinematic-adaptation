# Private Source Handling

## Purpose

This repository may rely on lawfully held scans, books, translations, articles and consultation notes that must not be committed publicly. The ignored `private_sources/` directory is the local holding area for such files.

## Filename convention

Use:

```text
<source-id>__<author-or-institution>__<short-title>__<edition-year>__<language>.<ext>
```

Example:

```text
SRC-0045__bharathidasan__manimekalai-venpa__1990__ta.pdf
```

Do not place personal names, account identifiers, download tokens or access credentials in filenames.

## Companion metadata

For every private file, create or update a public metadata record that contains only information safe and lawful to publish:

```yaml
source_id: SRC-0000
title: ""
author_or_institution: ""
edition_or_publication: ""
year: ""
language: ""
material_type: scan|book|article|translation|consultation|image|other
rights_status: owned|licensed|library-access|public-domain|permission-required|unknown
public_url: ""
local_filename: ""
sha256: ""
used_for:
  - EV-0000
  - AD-0000
page_or_location_notes: ""
quotation_permission: none|short-excerpts|granted|public-domain|unknown
review_notes: ""
```

The `local_filename` may be recorded in a private local manifest rather than the public repository when its disclosure creates a privacy or security risk.

## Storage rules

- Keep source scans and full copyrighted texts inside `private_sources/` or another access-controlled location.
- Do not commit private PDFs, page images, full translations or consultation recordings merely because they support a public research note.
- Prefer page numbers, chapter/line anchors, short compliant excerpts and source IDs in public documentation.
- Store a SHA-256 hash when integrity or edition identity matters.
- Keep the Project Madurai header intact when redistributing a permitted e-text under its stated conditions.
- Do not assume that access to a file grants permission to publish it.

## Evidence workflow

1. Register the source and rights status.
2. Record the exact page, line, figure or timestamp used.
3. Create or update the relevant `EV-*` record.
4. Link adaptation decisions to evidence IDs rather than to an undocumented local filename.
5. Mark OCR-derived readings as provisional until checked against the scan.
6. Record conflicts between editions; do not silently harmonise them.
7. Keep direct quotations within rights and project quotation limits.

## Consultation materials

For expert consultation:

- record reviewer role and scope in `specialist-review-register.csv`;
- obtain permission before publishing a person's name, comments or correspondence;
- distinguish a specialist's factual correction from an adaptation preference;
- preserve the date and version of the material reviewed;
- do not treat a single consultation as universal scholarly consensus.

## Visual references

Every image or visual reference must record:

- creator or holding institution;
- date or estimated period;
- source URL or catalogue identifier;
- rights/licence status;
- whether it is `[TEXT]`, `[HISTORY]`, `[INTERPRETATION]` or `[CAUTION]`;
- what adaptation decision it informs;
- whether the image itself may appear in a public moodboard.

An image that may be viewed for research may still be unsuitable for redistribution.

## Security and cleanup

Before packaging or publishing repository artifacts:

- verify that `private_sources/` remains ignored;
- scan for accidental PDFs, images, credentials, temporary exports and editor backups;
- remove `.DS_Store`, `__MACOSX`, thumbnails and other operating-system artifacts;
- confirm that public notes do not expose private local paths unnecessarily.
