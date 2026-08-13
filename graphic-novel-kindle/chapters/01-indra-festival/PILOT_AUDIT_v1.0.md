# Chapter 1 Pilot Audit v1.0

Status: **COMPLETE REVIEW PILOT - NOT PUBLICATION OR SOURCE LOCKED**

Date: 2026-08-13

Active language: English

Pages: 8
Canonical canto: `விழாவறை காதை`

## Verdict

The Chapter 1 English pilot is complete as a coherent internal review artifact. It establishes the intended reader movement:

> labour -> civic proclamation -> arrivals -> public argument -> material test -> festival splendour -> private silence

It is suitable for story, pacing, visual-language and Guided View review. It is not approved for commercial publication.

## Deliverables

- eight unlettered source-art pages;
- eight deterministic English-lettered pages at 2400 x 3840;
- eight-page review PDF;
- phone and tablet preview derivatives;
- Guided View region manifest;
- binary integrity manifest;
- reproducible lettering and package builders;
- visual-reference assets `GN-ASSET-0001` through `0008`, with the known gap that `0007` has two recovered versions and a corrupt legacy JPEG.

## Narrative and source audit

| Page | Required movement | Result | Classification |
|---|---|---|---|
| 1 | Puhar working before dawn | Present; labour dominates | `[HISTORY]+[INTERPRETATION]` |
| 2 | old sand removed; fresh sand spread | Present and immediately legible | `[TEXT]+[INTERPRETATION]` |
| 3 | proclamation; twenty-eight days; public welfare | Present in deterministic lettering | `[TEXT]` paraphrase pending line verification |
| 4 | visitors and many voices | Present without explicit national labels | `[TEXT]+[HISTORY]+[INTERPRETATION]` |
| 5 | teachers of different paths debate | Present with equal visual dignity | `[TEXT]+[INTERPRETATION]` |
| 6 | abundance tested through measures and labour | Present | `VENPA-BHARATHIDASAN THEMATIC / [INTERPRETATION]` |
| 7 | festival reveal retains visible labour | Present | `[TEXT]+[INTERPRETATION]` |
| 8 | silent Madhavi household; Chapter 2 handoff | Present; Madhavi remains silent | `[INTERPRETATION]` |

The unresolved source gate remains `SRC-0001`: select and line-verify the primary Tamil edition before source or quotation lock.

## Reader-interest audit

- **Opening hook:** strong contrast between darkness and coordinated labour.
- **Escalation:** each page expands the civic world rather than repeating preparation.
- **Human continuity:** water carrier, child, porter, flower workers and drummer recur.
- **Intellectual life:** public debate is staged as action and reaction rather than lecture notes.
- **Thematic promise:** Page 6 introduces the book's hunger/distribution concern without replacing the canto.
- **Page turn:** Page 7 public saturation cuts to Page 8 private silence and creates a clear Chapter 2 question.

## Visual continuity audit

Passed for pilot testing:

- coherent painterly ink-and-colour treatment;
- consistent earth/coastal palette;
- human-scale streets and port systems;
- no dominant gopuram, palace or fantasy mega-port;
- no generated prose or pseudo-writing inside the unlettered art;
- clear panel silhouettes at 5:8 portrait scale.

Limitations requiring revision before final art:

1. Several women wear fitted blouse/sari-like combinations that cannot be treated as locked early-historic dress.
2. The Page 1 repair hull and some harbour forms are visually plausible interpretations, not verified Puhar vessels.
3. Page 2 contains empty generated balloon outlines despite the text-free-art rule; deterministic lettering uses them, but final art should reserve space without generated balloons.
4. Page 5 includes paving, mats and teacher objects whose exact period form is unresolved.
5. Page 8's anklet is more ornate than the cautious object baseline.
6. Madhavi's face and acting continuity are usable; her final costume remains unresolved.
7. Manimekalai is correctly partial, but her full Chapter 2 design is not locked.

## Lettering audit

- English copy comes from `script.md` v0.3.
- Lettering is generated deterministically by `letter_pilot.py`, not by image generation.
- All final pages are normalized to 2400 x 3840.
- The current internal pilot uses macOS Arial system fonts. This is acceptable for local review only; a distributable comic font with documented embedding/commercial rights must replace it before publication.
- Tamil is deliberately absent. It will be independently authored after English visual/story lock.

## Kindle and Guided View audit

- Full pages: 2400 x 3840, 5:8 portrait.
- Phone previews: 720 px wide.
- Tablet previews: 1200 px wide.
- `guided-view.json` provides 29 ordered regions across eight pages.
- Pages 3, 5 and 8 depend materially on Guided View for comfortable small-screen reading.
- The package has not been imported into Kindle Create and no KPF has been produced; those remain account/application-level production gates.

## Rights and provenance audit

- All pilot art is newly generated for this project and recorded as `[INTERPRETATION]`.
- No third-party image is embedded as publication art.
- Attached/recovered ChatGPT boards remain internal review references.
- Every source and final binary is hashed in a CSV manifest.
- Commercial-use review of generated imagery, fonts and KDP territories remains required before release.

## Final classification

**PASS:** complete Chapter 1 internal review pilot.

**BLOCKED FROM PUBLICATION:** primary-edition line verification, specialist material/costume review, final redraw/correction pass, distributable font selection, Kindle Create import, Guided View authoring, KPF export and device QA.
