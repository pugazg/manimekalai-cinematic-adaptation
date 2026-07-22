# Evidence-to-Source Crosswalk

## Result

All 318 `EV-*` records now have one deterministic provenance row in `evidence/evidence_source_crosswalk.csv`. The crosswalk connects each record's existing `source_work` label to registered `SRC-*` identifiers while preserving a distinct status for internal project methodology or interpretation.

## Status meanings

- `PRIMARY_WITH_TRANSLATION_AID` — primary *Manimekalai* plus the registered working translation.
- `REGISTERED_SOURCE` — one directly corresponding registered source.
- `MULTI_SOURCE` — a claim explicitly draws on more than one registered work.
- `RECORD_LEVEL_CROSSWALK` — a broad label was resolved using the evidence title and location.
- `INTERPRETIVE_SOURCE` — scholarship informs an adaptation method rather than proving an ancient event.
- `INTERNAL_PROJECT_RECORD` — an internal method or decision requiring no external citation.

## Safeguards

- Blank `source_ids` are allowed only for `INTERNAL_PROJECT_RECORD`.
- Every other row must cite a known `SRC-*` ID.
- Every `EV-0001`–`EV-0318` must appear exactly once.
- `source_work` must match the authoritative evidence record.
- Crosswalking does not upgrade verification, resolve rights, or supply missing page and line references.
- The generator fails on an unrecognized provenance label.

## Rebuild and validation

```bash
python3 scripts/build_evidence_source_crosswalk.py
python3 scripts/validate_repository.py
```
