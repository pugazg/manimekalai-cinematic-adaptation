# Manimekalai Bilingual Screenplay Release 0.1

## Deliverables

- `manimekalai_en_draft_0.1.fountain`
- `manimekalai_en_draft_0.1.md`
- `manimekalai_ta_draft_0.1.fountain`
- `manimekalai_ta_draft_0.1.md`
- `release-manifest.csv`
- `checksums.sha256`

## Status

This package is a **structurally verified working draft**, not a dialogue-locked or production-locked screenplay.

Verified:

- ten English and ten Tamil source sequences;
- Scenes `#1#–#72#` exactly once in each Fountain package;
- equal English–Tamil TRACE counts;
- matching structural source validation;
- deterministic package checksums.

Still open:

- named external Tamil dialogue review and actor table reads;
- classical-Tamil and source-edition review;
- Buddhist, philosophy, institutions, food, historical and visual specialist approval;
- `SR-013` legal review of the implemented Option B fully reserved interim rights state;
- production timing and page-layout lock.

## Rebuild

Run:

```text
python3 scripts/build_bilingual_release.py
```

The committed package must reproduce byte-for-byte.
