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

## Lettering

Tamil is the primary reading language.

Rules:

- use a Tamil font with commercial publishing rights;
- avoid thin strokes;
- use short balloons rather than paragraph balloons;
- reserve dense explanation for captions only when necessary;
- test every page in Guided View on a phone-sized preview;
- never place critical words over visually noisy detail without a solid balloon/caption field;
- preserve punctuation and Tamil orthography during lettering export;
- do not rely on device font substitution, because comic-page text is part of the page composition.

Target readability:

- ordinary dialogue should remain comfortably legible at whole-page tablet view;
- phone reading should be excellent in Guided View;
- no panel may depend on pinch zoom for basic reading.

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
  ch01/
    page-001-master.*
    page-001.jpg
    page-002-master.*
    page-002.jpg
kindle-create/
  manimekalai-graphic-novel.kcb
exports/
  manimekalai-graphic-novel.kpf
```

Large working files should not be committed casually to this repository.

## QA matrix

Before a chapter is marked done, test:

| Check | Phone | Tablet | Kindle e-reader |
|---|---:|---:|---:|
| Whole-page readability | required | required | required |
| Guided View order | required | required | required |
| Balloon crop | required | required | required |
| Tamil glyph integrity | required | required | required |
| Spread behaviour | required | required | required |
| Page transition rhythm | required | required | required |

## Final KDP gate

Before upload:

- cover dimensions and metadata checked separately;
- title/subtitle/author fields match the actual book;
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
