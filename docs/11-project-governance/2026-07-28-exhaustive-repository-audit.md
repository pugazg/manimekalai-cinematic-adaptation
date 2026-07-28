# Exhaustive Repository Audit — 2026-07-28

## Outcome

Every Git-tracked path in the repository was included in the audit population. The path-level authority is `repository-file-audit.csv`; it contains one row per tracked item and no extra or duplicate paths.

The audit separates four different conclusions:

1. **file integrity** — encoding, termination, CSV shape and links;
2. **register integrity** — permanent IDs, cross-references and source crosswalks;
3. **screenplay integrity** — bilingual scene order, TRACE inheritance and current decision implementation;
4. **quality authority** — internal editorial review versus still-required external specialist, actor, rights or owner approval.

A structural pass does not grant historical, philological, performance, production or licensing approval.

## Audited population

| Measure | Count |
|---|---:|
| Git-tracked paths after this audit packet | 193 |
| Markdown files | 99 |
| CSV files | 64 |
| Fountain screenplay files | 20 |
| Python scripts and tests | 7 |
| Workflow files | 2 |
| Per-file ledger rows | 193 |

The 20 Fountain files comprise 10 English sequences and 10 Tamil sequences.

## Executed checks

The following checks were executed from the repository root:

```text
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/validate_repository.py
python3 scripts/validate_bilingual_screenplay.py
python3 scripts/audit_all_tracked_files.py
git diff --check
git fsck --no-dangling
```

The tracked-file audit inspects every path for:

- non-empty content;
- UTF-8 decoding;
- absence of NUL bytes;
- terminal newline;
- CSV row width;
- repository-relative Markdown link resolution;
- exact one-to-one coverage by the per-file audit ledger;
- a non-empty audit status.

## Passing archive baseline

- `SRC-0001`–`SRC-0045`: 45 sources;
- `EV-0001`–`EV-0318`: 318 evidence records;
- `AD-0001`–`AD-0170`: 170 adaptation decisions;
- `SC-001`–`SC-154`: 154 source-scene concepts;
- 72 active feature units;
- 72 English and 72 Tamil numbered scenes;
- 61 KEEP / 11 BRANCH / 69 MERGE / 10 RESERVE / 3 OMIT;
- 45 / 60 / 60 = 165 minutes.

Every evidence record is linked to permanent `SRC-*` records or explicitly classified as an internal project record.

## Screenplay and Venpa result

The current feature has:

- 6 approved and implemented Venpa decisions;
- 0 proposed decisions;
- 7 deferred decisions;
- 18 rejected decisions.

The approved decisions remain paired across English and Tamil. Scene numbers and TRACE signatures were not changed.

PR #12, the completed institutional batch, passed both hosted workflows before merge:

- Validate research registers — success;
- Validate screenplay — success.

## Material findings repaired

### Generated Python caches

Local validation created untracked `__pycache__` directories. They were removed and the ignore policy now excludes Python bytecode and cache directories.

### Aadhirai wording drift

The screenplay already contained the approved prepared-rice, curry and ghee sequence, but the master architecture and treatment retained earlier “handful of grain” language.

The live architecture and treatment now preserve the approved order:

> prepared household food → voluntary giving → first portions → continuing abundance → collective logistics

### Current-state documentation drift

The handover and screenplay-draft index still described executable validation, source crosswalking, Tamil cue normalization and Venpa decisions as incomplete. They have been refreshed to the current baseline.

The original creative revision queue is retained as an archival process record and explicitly points to the master decision register for current authority.

### Audit repeatability

The repository previously documented an exhaustive audit but did not provide one command that checked every tracked path and the ledger itself. `scripts/audit_all_tracked_files.py` and its corpus regression test now provide that control.

## File-group conclusions

| Group | Conclusion |
|---|---|
| Vision, literary analysis and historical-world dossiers | Structurally intact; factual and visual claims remain governed by their evidence labels and specialist cautions |
| Character bibles | Present and internally cross-referenced; no permanent-ID corruption found |
| Philosophy documents | Structurally intact; specialist doctrine and logic review remains open |
| Evidence, decision and scene CSV registers | Exact ranges and references pass executable validation |
| Source register and evidence crosswalk | Complete structural coverage; several rights and edition-verification states remain pending |
| Screenplay architecture and treatment | Complete; approved Aadhirai wording synchronized |
| English screenplay | Structurally complete; dialogue lock not granted |
| Tamil screenplay | Structurally complete; cue/name policy enforced; language, voice and actor timing gates remain |
| Venpa review archive | Decision-complete for the current feature; printed-page and specialist quality verification remains open |
| Storyboard and production design | Foundation-only at this audit point; population is a separate active phase |
| Governance | Strong integrity controls; external specialist reviews and licensing decision remain open |
| Tooling and workflows | Local validators and hosted workflows pass; exhaustive tracked-file auditor added |

## Open dependencies

These are not repository-corruption findings and cannot be truthfully marked complete by an internal audit alone:

1. identified external specialist reviews listed in `specialist-review-register.csv`;
2. actor-led read-aloud and timing sessions;
3. food, vessel and serving-practice review for the approved Aadhirai sequence;
4. printed-page or lawfully held edition verification for the Venpa source layer;
5. owner and rights-specialist licensing decisions;
6. rights-cleared visual-source intake for storyboard and production design.

## Lock statement

- No permanent ID was renumbered.
- No scene number or TRACE signature was changed.
- No external specialist approval is claimed.
- No licence is inferred.
- The per-file ledger is exhaustive for this commit population.
- Any later added or removed path must update the ledger and rerun the exhaustive auditor.
