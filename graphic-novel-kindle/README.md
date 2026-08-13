# Manimekalai — Kindle Graphic Novel Workstream

Status: **ACTIVE PILOT / isolated derivative workstream**

This folder is a separate publishing project for a Tamil-first Kindle graphic novel adaptation of *Manimekalai*. It is intentionally isolated from the cinematic screenplay, TRACE records, evidence registers, adaptation-decision registers, storyboard bible, production-design files, releases, game workstream and existing repository governance files.

**No existing file in the repository is to be changed as part of this workstream unless the owner explicitly authorises it later.**

## Creative direction

The book will adapt the classical *Manimekalai* epic while drawing on the social and poetic emphases registered in the repository for Bharathidasan's *Manimekalai Venpa*.

Working perspective tag:

`PERSPECTIVE: VENPA-BHARATHIDASAN`

Default use type for this workstream:

`THEMATIC`

The intended Bharathidasan flavour is not quotation or pastiche for its own sake. It means:

- hunger treated as the great social antagonist;
- compassion shown as action rather than sentiment;
- Manimekalai's renunciation shown as active responsibility, not withdrawal;
- women's autonomy made dramatically explicit;
- labour, food, water and institutions kept visible behind splendour;
- moral argument expressed with lyrical compression and social clarity;
- philosophy tested against ordinary human suffering.

Exact Bharathidasan wording must not be copied into book dialogue or captions until the relevant verse is visually verified and publication rights for the intended territories are cleared.

## Edition strategy

Primary edition: **Tamil**  
Format: **Kindle fixed-layout comic / graphic novel with Guided View**  
Reading direction: **left-to-right**  
Working output: **KPF via Kindle Create**  
Possible later outputs: EPUB fixed-layout archive, print edition, English edition.

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
      script.md
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

The first production unit is **Chapter 1 — இந்திர விழா / The Indra Festival**.

It will establish Puhar not only as spectacle but as a city made by workers, traders, artists, water carriers, flower sellers, animal keepers and households. The festival's beauty should be real, while the page composition quietly asks who labours, who eats, who waits and who is seen.

The pilot is designed to prove four things before the whole book is drawn:

1. Tamil lettering remains readable on a phone in Guided View.
2. Character continuity can be maintained across generated/commissioned art.
3. The classical narrative and Bharathidasan perspective can coexist without silently overwriting one another.
4. Kindle page weight, image quality and panel navigation remain practical for a full-length book.

## Current repository dependencies

The workstream is grounded in, but does not modify:

- `docs/02-literary-analysis/02_literary_analysis.md`
- `docs/08-storyboard-bible/visual-language-and-evidence-policy.md`
- `docs/08-storyboard-bible/storyboard-shot-matrix.csv`
- `docs/10-screenplay-architecture/10H-source-perspectives/README.md`
- `docs/11-source-perspectives/manimekalai-venpa-perspective-register.md`
- `RIGHTS_AND_PERMISSIONS.md`
- `releases/0.1/`

## Definition of done for the pilot

The pilot chapter is not considered publication-ready until:

- page-by-page script is locked;
- every page has a panel order;
- Tamil copy is proofread;
- visual continuity references are fixed;
- all source/perspective uses are labelled;
- generated/commissioned art has provenance records;
- Kindle Create Guided View is tested on phone, tablet and Kindle previews;
- rights review is complete for all text, fonts and artwork;
- the exported KPF passes final preview without cropped text, broken panel order or unreadable lettering.
