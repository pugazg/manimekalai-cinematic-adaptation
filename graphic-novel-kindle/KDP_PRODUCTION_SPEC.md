# KDP Production Specification

Verified against Amazon KDP help pages on 2026-08-13.

## Format decision

Use **Kindle fixed-layout comic / graphic novel with Guided View**.

Production path:

1. finish page art as sequential images or a PDF;
2. import into Kindle Create using the **Comics** project type;
3. set reading direction to **Left-to-Right**;
4. use Facing Pages selectively for spreads;
5. define and manually verify Guided View panel order;
6. save the editable `.kcb` project locally;
7. export the publishable `.kpf`;
8. upload KPF through KDP;
9. preview before publication.

Do not build this edition around MOBI. Amazon ended MOBI support for fixed-layout eBooks on 2025-03-18 and recommends KPF or EPUB for current fixed-layout publishing.

## Edition order

### Current production edition

**English** is the active Kindle edition.

All first-pass production tests—page composition, caption density, balloon geometry, Guided View, cover/metadata prototypes and device preview—should use the English edition.

### Deferred Tamil edition

Tamil is a separate later editorial production pass. It must not be treated as a mechanical translation layer over finished English art.

For the Tamil edition:

- reopen balloon/caption geometry where Tamil requires different space;
- select and licence a Tamil font separately;
- perform native literary editing before lettering;
- rerun Guided View and glyph-integrity QA;
- create separate KDP metadata where required.

## Page geometry

Amazon's fixed-layout graphic-novel guidance uses a 1920 × 1200 display reference and recommends source images capable of high-quality magnification.

Internal portrait production standard for this project:

- canvas: **2400 × 3840 px**;
- aspect ratio: **5:8**;
- nominal metadata: **300 ppi or greater**;
- colour: RGB;
- working master: lossless PNG or layered source file;
- Kindle page export: high-quality JPEG unless the art/lettering test shows PNG is materially better;
- no important text or faces inside a 90 px edge-risk zone;
- full-bleed art may extend to the page edge, but balloons and captions may not.

The 2400 × 3840 portrait canvas is a project standard derived from Amazon's 1200 × 1920 portrait equivalent at 2× working resolution. It should be validated in Kindle Create before whole-book production is locked.

## Page construction

Preferred average:

- 3–6 panels per page;
- occasional 1-panel splash;
- occasional 2-page spread only when it improves narrative meaning;
- avoid tiny inset panels that require excessive Guided View zoom;
- preserve a clear left-to-right, top-to-bottom reading path unless the page deliberately interrupts it.

Guided View should not merely zoom mechanically. Each magnified step should preserve dramatic rhythm:

1. establish;
2. action or speech;
3. reaction;
4. consequence.

## English lettering

Rules:

- use a highly legible font with commercial publishing rights;
- avoid thin strokes and decorative display faces for body dialogue;
- use short balloons rather than paragraph balloons;
- reserve dense explanation for captions only when necessary;
- test every page in Guided View on a phone-sized preview;
- never place critical words over visually noisy detail without a solid balloon/caption field;
- do not rely on device font substitution, because comic-page text is part of the page composition;
- preserve editable lettering separately from flattened page exports wherever practical.

Target readability:

- ordinary dialogue should remain comfortably legible at whole-page tablet view;
- phone reading should be excellent in Guided View;
- no panel may depend on pinch zoom for basic reading.

## Tamil lettering gate — later edition

Do not begin final Tamil lettering during the English pilot.

When Tamil production is authorised:

- choose a Tamil font with explicit commercial publishing rights;
- test vowel signs, conjunct behaviour, punctuation and line breaking in the exact production software;
- do not force Tamil text into balloon sizes locked for English;
- rebuild balloon/caption positions where needed;
- test every page again on phone, tablet and Kindle preview;
- archive the final Tamil copy separately from the English copy.

## Guided View authoring

In Kindle Create:

- every narrative panel receives a Guided View region;
- manually verify auto-detected regions;
- set the exact reading order;
- use overlapping regions only when a large action panel genuinely needs staged movement;
- make sure no balloon is cropped in the magnified region;
- check masks do not hide a speaker or reaction that the reader needs to understand the panel;
- preview page transitions, not only individual panels.

## Facing pages

Enable Facing Pages for the project, but mark spreads intentionally.

Use a spread for:

- the first full revelation of Puhar;
- Manipallavam's spatial disorientation;
- major Amudhasurabhi service sequences;
- a philosophical or civic climax where simultaneous actions matter.

Do not make ordinary dialogue dependent on seeing two pages at once.

## File organisation

Recommended production folders outside Git until large binary strategy is decided:

```text
working-art/
  en/
    ch01/
      page-001-master.*
      page-001.jpg
      page-002-master.*
      page-002.jpg
  ta/                         # create only when Tamil edition is reopened
kindle-create/
  en/
    manimekalai-graphic-novel-en.kcb
  ta/
    manimekalai-graphic-novel-ta.kcb
exports/
  en/
    manimekalai-graphic-novel-en.kpf
  ta/
    manimekalai-graphic-novel-ta.kpf
```

Large working files should not be committed casually to this repository.

## QA matrix — active English edition

Before a chapter is marked done, test:

| Check | Phone | Tablet | Kindle e-reader |
|---|---:|---:|---:|
| Whole-page readability | required | required | required |
| Guided View order | required | required | required |
| Balloon crop | required | required | required |
| English text integrity | required | required | required |
| Spread behaviour | required | required | required |
| Page transition rhythm | required | required | required |

The future Tamil edition repeats the full matrix and adds Tamil glyph-integrity and language-specific line-break checks.

## Final KDP gate

Before upload of any edition:

- cover dimensions and metadata checked separately;
- title/subtitle/author fields match the actual edition;
- table of contents works;
- Guided View exists on all story pages that need it;
- no temporary prompts, watermarks, model artefacts or production notes remain in page images;
- rights and AI-content declarations are answered accurately based on the final assets and KDP's then-current form;
- final `.kcb` is archived for later revision;
- final `.kpf` is generated from the exact approved page set.

## Amazon references

Current reference set consulted on 2026-08-13:

- Amazon KDP — *Prepare Comic and Kids' eBooks with Kindle Create*.
- Amazon KDP — *Creating Fixed-Layout Books with Image Pop-Ups or Virtual Panels*.
- Amazon KDP — *Previewing and Publishing Your Kindle Create Book*.
- Amazon KDP — *MOBI Support for eBooks Frequently Asked Questions*.

Re-check these pages before final export because Kindle tooling and submission requirements can change.