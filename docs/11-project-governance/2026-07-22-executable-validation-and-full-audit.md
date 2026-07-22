# Executable Validation and Full Repository Audit — 2026-07-22

## Outcome

The complete repository was checked from a fresh checkout of `main`, beginning at commit `6848884`. The audit covered every tracked path, the approved Aadhirai implementation, all register rows, all twenty Fountain files, both validators, both test modules, workflows, internal Markdown links, CSV shape, UTF-8 decoding, terminal newlines and Git object integrity.

After the repairs recorded below, the complete executable suite passed locally under Python 3.11.3.

## Commands and results

```text
python3 -m unittest discover -s tests -p 'test_*.py' -v
17 tests passed

python3 scripts/validate_repository.py
Validation passed: 45 sources, 318 evidence records across 17 files,
170 adaptation decisions across 17 files, and 154 scenes across 17 files.

python3 scripts/validate_bilingual_screenplay.py
Bilingual screenplay validation passed: 10 sequences, 72 paired scenes.
```

Additional checks:

- all tracked files decode as UTF-8;
- no tracked file is empty or contains a NUL byte;
- all CSV rows match their header width;
- all repository-relative Markdown links resolve;
- every tracked text file ends with a newline;
- `git diff --check` reports no whitespace errors;
- `git fsck --no-dangling` reports no object-integrity errors.

GitHub Actions also passed on draft PR #2 after publication:

- `validate` — passed;
- `bilingual-parity` — passed.

The hosted checks independently ran the repository tests and validators under the workflow's Python 3.12 environment.

## Aadhirai post-implementation validation

The approved `VENPA-USE-007` and `VENPA-USE-008` implementation is present in both languages:

- Scene `#31#` gives Aadhirai prepared rice and curry, with ghee visible across the rice;
- Scene `#32#` shows Manimekalai serving the first portions before the unchanged vessel level reveals continuing abundance;
- English and Tamil scene numbers and TRACE signatures match;
- the public water, access, translation, queue, cleaning and safety work remains present.

The implementation is structurally validated. Culinary, material-culture and spoken-Tamil specialist review remains open.

## Material defects found and repaired

### Repository validator schema mismatch

The validator required an absent `source_id` column even though every evidence register uses the established `source_work` field. It also incorrectly required every decision to cite evidence, despite governance decision `AD-0004` intentionally having no `EV-*` reference.

The validator now checks the corpus's real schema. Evidence-to-source-register ID crosswalking remains an explicit future provenance improvement; the local pass must not be described as proving that such a crosswalk already exists.

### Udayakumaran decision-register corruption

Rows `AD-0102`–`AD-0107` had one fewer CSV field than the header. Their evidence IDs had shifted into the rationale column and review requirements into the evidence column. The rows were repaired, and the prose character-bible crosswalk and errata were synchronized with the canonical decision register.

### Bilingual TRACE parser mismatch

The corpus uses both `ABSORBS:` and the older `absorbs` form without a colon. The parser accepted only the colon form. Sequence 01 also ends with `CUT TO BLACK.` rather than an `END` marker. Both valid corpus forms are now recognized and covered by regression tests.

### Missing merged-scene TRACE inheritance

Eight `MERGE` records in the authoritative 10B disposition ledger were absent from both language TRACE corpora:

- `SC-008` → `FU-058`;
- `SC-012` → `FU-055`;
- `SC-022` → `FU-059`;
- `SC-038` → `FU-057`;
- `SC-061` → `FU-052`;
- `SC-072` and `SC-080` → `FU-062`;
- `SC-103` → `FU-050`.

Their non-printing TRACE metadata was restored in paired English and Tamil files. No scene dialogue, action, numbering or runtime was changed.

The bilingual validator now derives all 72 expected TRACE signatures from `10B_feature_unit_matrix.csv`, preventing the screenplay and architecture matrix from silently diverging again.

### Test coverage gap

The earlier unit tests passed while both real validators failed. Corpus-level tests now call each validator against the actual repository, in addition to isolated parser tests. The bilingual suite also checks the 72-unit feature matrix, and the repository suite rejects short or over-wide CSV rows.

### Text-file termination

Fifty-six older text files lacked a final newline. They were normalized mechanically without changing their textual content.

## Archive mathematics confirmed

- sources: `SRC-0001`–`SRC-0045` — 45 records;
- evidence: `EV-0001`–`EV-0318` — 318 records;
- decisions: `AD-0001`–`AD-0170` — 170 records;
- source-scene concepts: `SC-001`–`SC-154` — 154 records;
- active feature units: 72;
- screenplay scenes: `#1#`–`#72#` in both languages;
- runtime design: 45 / 60 / 60 = 165 minutes;
- disposition ledger: 61 KEEP / 11 BRANCH / 69 MERGE / 10 RESERVE / 3 OMIT.

## Open findings

1. Evidence registers use textual `source_work` provenance rather than permanent `SRC-*` references. A controlled crosswalk is still needed if direct evidence-to-source-register enforcement is desired.
2. Tamil Sequence 03 remains materially compressed and needs semantic comparison.
3. Restored Tamil Sequences 05–07 still need line-by-line and spoken-performance review.
4. Rajamadevi spelling and Tamil-versus-Roman character-cue policy remain unresolved.
5. Aadhirai's food, vessels and serving practice require culinary and material-culture review.
6. Eleven proposed Venpa uses still require reliable page verification and explicit decisions.
7. Storyboard and production-design folders remain foundations rather than populated deliverables.
8. Repository licensing remains an owner and rights-specialist decision.

## Lock state

- No screenplay dialogue or action was changed by this audit.
- No permanent `EV-*`, `AD-*`, `SC-*`, `FU-*`, `BR-*` or numbered scene was renumbered.
- Paired TRACE metadata changed only to restore inheritance already required by the authoritative 10B matrix.
- Only `VENPA-USE-007` and `VENPA-USE-008` remain approved and implemented.
- Dialogue, terminology, performance, specialist and production locks are not granted.
