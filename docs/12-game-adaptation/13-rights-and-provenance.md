# 13 — Rights and Provenance (Game Adaptation)

This document maps the repository's existing rights model onto the game project and
defines the **game-adaptation traceability method**. It **does not change** the
repository's rights position. Qualified legal review (`SR-013` and further) remains
open; matters needing that review are flagged **[LEGAL-OPEN]**.

## Inherited rights position (unchanged)

**[CONFIRMED]** The repository selected **Option B — fully reserved interim state**
(2026-08-03; `RIGHTS_AND_PERMISSIONS.md`, `NOTICE`). Consequences for the game:

- All original project material (screenplay, bibles, and **these game-design
  documents**) is **all-rights-reserved** to the extent owned by the owner/
  contributors. Public visibility of this repo grants **no** licence to build, run,
  fork, ship, monetise or redistribute a game. **[CONFIRMED]**
- The interim state does **not** claim rights in the classical epic, third-party
  translations, Bharathidasan material, scholarship, quotations, images, fonts, music
  or maps owned by others; those remain under their own rights. **[CONFIRMED]**
- The owner is to reconsider Option B by **2027-02-03** or earlier if legal review,
  financing or collaboration requires it — **shipping a game is exactly such a
  trigger.** **[LEGAL-OPEN]**

**The game cannot be publicly released or commercialised until the rights position is
deliberately changed with `SR-013` advice.** Prototyping for private review is
consistent with Option B; public/commercial release is not.

## Rights-status vocabulary (reused from the archive)

Every game asset record carries one of the repo's source rights states:
`public_domain` · `open_licence` · `permission_obtained` · `citation_only` ·
`status_unknown` (`RIGHTS_AND_PERMISSIONS.md`). **`status_unknown` ⇒ must not be
shipped.**

## Rights map by material class

| Material class | In the game | Rights consideration | Flag |
|---|---|---|---|
| **Classical source** (*Manimekalai*, Sāttanār) | Underlying story, characters, events | Classical/likely public-domain **as a text**, but *specific modern editions/typesettings* are not | [LEGAL-OPEN] confirm edition status |
| **Original adaptation material** (screenplay, bibles, `AD/EV/SC/FU`) | The design substrate the game reframes | Owner-reserved (Option B); game is a **derivative** of it | [CONFIRMED] owner-controlled |
| **Translations** (e.g. Kausalya Hart English) | Reference only; **not** quoted in-game | Third-party copyright; `citation_only` | [LEGAL-OPEN] no in-game reproduction without permission |
| **Quotations** (epic lines, dialogue) | Minimal; prefer original adaptation dialogue | Short attributed quotes within legal limits (repo policy); OCR-unverified lines barred (`RISK-018`) | [LEGAL-OPEN] |
| **Bharathidasan *Manimekalai Venpa*** (`SRC-0045`) | The rice/curry/ghee offering detail (`AD-0168`, approved Venpa-use 007/008) | **Modern (20th-c.) work — likely still in copyright** | **[LEGAL-OPEN] critical** — verify status before using the Venpa-derived detail in a shipped game |
| **Artwork** (backgrounds, portraits) | Produced for the game | New work; register provenance + rights like `SB-*` rows | [DESIGN] clear before release |
| **Music / audio** | Score, ambience, pronunciation | New or licensed; no unlicensed tracks | [DESIGN] |
| **Voice recordings** | (Later, partial) | Performer agreements; Tamil table-read discipline | [LEGAL-OPEN] contracts |
| **Fonts** | Tamil + Latin UI type | **Font licences must permit embedding/redistribution in software** | **[LEGAL-OPEN]** verify per-font EULA |
| **Maps** | Avoided as authoritative geography | No false geographic certainty (`RISK-003`); stylised only | [DESIGN] |
| **Photographs** | Not used as in-game assets | Third-party photo rights (`RISK-020`) | [DESIGN] avoid |
| **Third-party references** | Research inputs, not shipped | `citation_only`; keep in `private_sources/` pattern | [CONFIRMED] |
| **AI-generated assets** | Possible art/audio drafts | Provenance + training-data uncertainty (`RISK-024`) | **[LEGAL-OPEN]** not cleared under Option B |
| **Contributor work** | Any collaborator art/code/writing | Requires the repo's contributor rights declaration (`CONTRIBUTING`, `RISK-022`) | [CONFIRMED] process exists |

## Game-adaptation traceability method

The game extends the archive's evidence discipline with a **six-link chain** recorded
for every significant game decision, mechanic and scene. New ID namespaces (do **not**
collide with or alter existing IDs):

- `GD-*` game-design decision · `GM-*` mechanic · `GSC-*` game-scene adaptation ·
  `GRT-*` game risk. Existing `EV-*`, `AD-*`, `SC-*`, `FU-*`/`BR-*`, `SEQ-*`, `SB-*`,
  `PD-*`, `PHL-*` are **referenced, never modified**.

### The chain

```
[1] epic evidence            EV-*        (what the source attests)
      │
[2] cinematic decision       AD-*        (how the film chose to handle it)
      │
[3] screenplay unit          FU-*/BR-*/SC-*/SEQ-*   (where it lives in the film)
      │
[4] game-design decision     GD-*        (how the GAME chooses to handle it)
      │
[5] implemented mechanic/scene  GM-*/GSC-*   (what the player actually does)
      │
[6] review status            proposed / in-review / approved / deferred / rejected
```

### Worked example (feeding logistics)

| Link | Value |
|---|---|
| [1] EV | `EV-0048`–`EV-0067` (feeding/dignity), `EV-0091` (prison→care) |
| [2] AD | `AD-0139` (bowl doesn't erase distribution labour), `AD-0138` (recipients are agents) |
| [3] FU | `FU-022` "Compassion Learns Logistics"; `FU-024` "The Prison Kitchen" |
| [4] GD | `GD-04` *the bowl is one solved variable among ~10; serve-only must fail* |
| [5] GM/GSC | `GM-07` feeding-logistics; `GSC-04-S6` vertical-slice segment |
| [6] status | `proposed` (planning phase) |

### Where the chain lives

- **[DESIGN]** A `game-traceability.csv` (to be created at build start, **not** in
  this planning pass) with columns:
  `game_id, type(GD/GM/GSC/GRT), title, ev_ids, ad_ids, screenplay_units, gd_ids,
  implemented_as, evidence_label, rights_status, review_status, notes`.
- `08-mechanics-register.csv` and `09-scene-interactivity-matrix.csv` already hold the
  mechanic- and scene-level rows; the traceability CSV joins them to `EV/AD/FU`.

## Provenance rules for produced assets

1. Every background/portrait/audio asset gets a record with `evidence_label`,
   `rights_status`, source references, and (if AI-assisted) a provenance note
   (`RISK-024`).
2. `status_unknown` or AI-provenance-uncertain assets are **prototype-only**, never
   shipped, under Option B.
3. Fonts, music and any third-party asset need a cleared licence **before** any public
   build (`RISK-023` analogue for software licences).

## Commercial-release implications (all [LEGAL-OPEN])

Before any public or paid release, `SR-013`-level review must resolve:

1. Change of the **Option B interim state** to a deliberate release licence.
2. **Bharathidasan Venpa** copyright status vs. the game's use of the offering detail.
3. **Translation** copyright (no in-game reproduction of a copyrighted translation).
4. **Font** embedding/redistribution licences for the Tamil typeface.
5. **AI-asset** provenance and whether any AI-generated art/audio is cleared.
6. **Performer/contributor** agreements if VO or collaborators are added.
7. **Platform** terms (App Store/web host) and their content/rights requirements.
8. Trademark/naming of the game title (`01`) and any cultural-sensitivity review of
   public marketing (avoid the propaganda/appropriation risks; `RISK-001`).

## What this document does NOT do

- It does **not** grant any licence.
- It does **not** change Option B, `NOTICE`, or any `RIGHTS.md`.
- It does **not** assert that any third-party material is cleared.
- It defers every binding rights determination to qualified review.
