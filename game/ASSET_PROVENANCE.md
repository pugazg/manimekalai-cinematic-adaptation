# Asset Provenance — G2 Prototype 0.3 (Meaningful Agency)

**Version `0.3.0`.** 0.3 introduces **no new asset types or mechanisms** — the same
procedural in-code visuals, runtime WebAudio and system fonts as 0.2. Its additions are
gameplay logic, dialogue text (English complete; Tamil pending review) and UI. Nothing
below changes.

Every non-code asset is **originally created inside the project**. Nothing is scraped,
copied from films/games, AI-generated, or of uncertain licence. Follows the
repository's placeholder-art policy and Option B rights state
([`../docs/12-game-adaptation/13-rights-and-provenance.md`](../docs/12-game-adaptation/13-rights-and-provenance.md)).

## Visual assets

| Asset | Source | Rights |
|---|---|---|
| World sprites/tiles/figures with **faces & expressions** | Procedurally generated at runtime by `src/game/art/textures.ts` (Phaser `Graphics`) | Original project code (owner-reserved) |
| **Dialogue/ending portraits** (neutral/concerned/tired/relieved/attentive) | Procedurally drawn to an offscreen `<canvas>` by `src/game/art/portraits.ts`; returned as data URLs | Original project code |
| **Meaning icons** (speech / water / food / look / path) | Procedural `Graphics` in `textures.ts` | Original project code |
| Environment (buildings, ground, water, well, pot, mat, bowl) | Procedural shapes | Original project code |

No raster image files, no external textures, no bundled fonts — the UI uses a
**system/OS font stack** only (incl. system Tamil fonts if present). No font files are
shipped, so no font licence is implicated.

## Audio (new in 0.2)

| Sound | Source | Rights |
|---|---|---|
| Footsteps, water, serving, interaction blip, "learn" chime, soft crowd ambience, gentle ending cue | **Synthesised locally at runtime** via the Web Audio API (oscillators + filtered noise) in `src/game/systems/Audio.ts` | Original project code |

No audio files are downloaded or bundled. **No music tracks, no recorded sound, no
voice.** Audio starts only after a user gesture (New Game), respects a mute toggle, and
is never required to understand gameplay. If original synthesis were ever unavailable,
the prototype ships silent rather than sourcing questionable assets.

## Text / language

| Content | Source | Status |
|---|---|---|
| English strings | Original writing (`src/content/localisation/en.json`) | Owner-reserved |
| `மணிமேகலை` | the epic's title/name (proper noun) | standard |
| `போதும்` | everyday Tamil "enough"; the Sequence 04 beat | common usage; consistent with `FU-023` |
| `பாட்டி` | everyday Tamil **kinship term** "grandmother" (a relationship word, not a personal name) | common usage; **review-confirmable** |
| Standard Tamil UI words (`புதிய ஆட்டம்`, `தொடர்க`, `விருப்பங்கள்`, `மொழி`, `இடைநிறுத்தம்`, `மீட்டமை`, `ஒலி`, `ஆம்`, `இல்லை`, `மூடு`, `எழுத்து அளவு`, `சிறியது`/`நடுத்தரம்`/`பெரியது`, `இயக்கு`/`அணை`, `அசைவைக் குறை`, `தொடங்கு`, `பின்`) | standard dictionary UI words | **common-usage; pending named-reviewer confirmation (`GRT-11`)** |
| All other Tamil (dialogue, narrative, coined terms) | **left blank** (`""`) in `ta.json` → English fallback, ⌛ marked | **pending named Tamil review** — no literary Tamil invented |

No third-party translation or Bharathidasan *Venpa* text is reproduced anywhere.

## Summary

- 100% of shipped assets are original project code or system-provided fonts.
- No AI-generated imagery, no scraped/borrowed art, no bundled fonts, no audio files.
- Audio is synthesised at runtime; text pending Tamil is clearly flagged.
