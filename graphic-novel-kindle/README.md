# Manimekalai — Kindle Graphic Novel Workstream

Status: **ACTIVE PILOT / isolated derivative workstream**

This folder is a separate publishing project for an English-first Kindle graphic novel adaptation of *Manimekalai*. It is intentionally isolated from the cinematic screenplay, TRACE records, evidence registers, adaptation-decision registers, storyboard bible, production-design files, releases, game workstream and existing repository governance files.

**No existing file outside `graphic-novel-kindle/` is to be changed as part of this workstream unless the owner explicitly authorises it later.**

## Creative direction

The book will adapt the classical *Manimekalai* epic while drawing on the social and poetic emphases registered in the repository for Bharathidasan's *Manimekalai Venpa*.

Working perspective tag:

`PERSPECTIVE: VENPA-BHARATHIDASAN`

Default use type for this workstream:

`THEMATIC`

The intended Bharathidasan flavour is not quotation or imitation of his wording. It means:

- hunger treated as the great social antagonist;
- compassion shown as action rather than sentiment;
- Manimekalai's renunciation shown as active responsibility, not withdrawal;
- women's autonomy made dramatically explicit;
- labour, food, water and institutions kept visible behind splendour;
- moral argument expressed with lyrical compression and social clarity;
- philosophy tested against ordinary human suffering.

Exact Bharathidasan wording must not be copied into book dialogue or captions until the relevant verse is visually verified and publication rights for the intended territories are cleared.

## Language strategy

Active production edition: **English**  
Deferred edition: **Tamil — fresh adaptation after English script + visual lock**  
Format: **Kindle fixed-layout comic / graphic novel with Guided View**  
Reading direction: **left-to-right**  
Working output: **KPF via Kindle Create**

The first Tamil pilot draft was not strong enough for publication. It is preserved for provenance only. It is **not** the translation base for the later Tamil edition.

Tamil will be reopened only after:

1. English story/caption intent is locked;
2. page composition and balloon space are stable;
3. English lettering proves readable in Kindle Guided View;
4. Tamil dialogue/captions are newly adapted with literary editorial review;
5. the Tamil edition receives its own copy-edit and device QA.

## Workstream map

```text
graphic-novel-kindle/
  README.md
  PROGRESS.md
  SOURCE_AND_RIGHTS_POLICY.md
  KDP_PRODUCTION_SPEC.md
  BOOK_ARCHITECTURE.md
  VISUAL_AND_WRITING_BIBLE.md
  chapters/
    01-indra-festival/
      script.md                 # active English production script
      tamil-draft-v0.1.md       # archived, not approved copy
      page-plan.csv
      art-prompts.md
```

## Source hierarchy

1. Classical *Manimekalai* — primary narrative authority.
2. Existing source-traceable research in this repository — historical, philosophical, character and production grounding.
3. Bharathidasan's *Manimekalai Venpa* — independent interpretive perspective, used with explicit labelling.
4. Existing cinematic screenplay — downstream adaptation reference only; never treated as primary textual evidence.
5. New graphic-novel material — `[INTERPRETATION]` unless separately grounded.

## Pilot goal

The first production unit is **Chapter 1 — விழாவறை காதை / The Festival Proclamation**.

It establishes Puhar not only as spectacle but as a city made by workers, traders, artists, water carriers, flower sellers, animal keepers and households. The festival's beauty should be real, while page composition quietly asks who labours, who eats, who waits and who is seen.

The pilot is designed to prove four things before the whole book is drawn:

1. English lettering remains readable on a phone in Guided View.
2. Character continuity can be maintained across generated/commissioned art.
3. The classical narrative and Bharathidasan perspective can coexist without silently overwriting one another.
4. Kindle page weight, image quality and panel navigation remain practical for a full-length book.

A fifth gate follows later: whether a newly written Tamil edition can carry the same dramatic precision without becoming a literal translation of the English.

## Current repository dependencies

The workstream is grounded in, but does not modify:

- `docs/02-literary-analysis/02_literary_analysis.md`
- `docs/08-storyboard-bible/visual-language-and-evidence-policy.md`
- `docs/08-storyboard-bible/storyboard-shot-matrix.csv`
- `docs/10-screenplay-architecture/10H-source-perspectives/README.md`
- `docs/11-source-perspectives/manimekalai-venpa-perspective-register.md`
- `RIGHTS_AND_PERMISSIONS.md`
- `releases/0.1/`

## Definition of done for the English pilot

The pilot chapter is not considered publication-ready until:

- English page-by-page script is locked;
- every page has a panel order;
- English copy is proofread;
- visual continuity references are fixed;
- all source/perspective uses are labelled;
- generated/commissioned art has provenance records;
- Kindle Create Guided View is tested on phone, tablet and Kindle previews;
- rights review is complete for all text, fonts and artwork;
- the exported KPF passes final preview without cropped text, broken panel order or unreadable lettering.

The Tamil edition is a later editorial production gate, not a condition for finishing the English pilot.