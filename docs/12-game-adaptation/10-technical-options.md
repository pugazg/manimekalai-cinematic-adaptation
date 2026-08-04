# 10 — Technical Options

Four implementation paths compared against this game's specific needs. The most
demanding requirements here are **excellent Tamil text rendering + bilingual
content**, **dialogue/branching tooling**, **iPhone/iPad/Mac reach**, and **fast,
cheap playtest distribution** for a solo/small owner who already works in web tech.

## Requirement weighting (why the usual "just use Unity" answer is wrong here)

| Requirement | Weight | Why it dominates for *this* game |
|---|---|---|
| Tamil complex-script rendering | ★★★ | Tamil-first is a pillar; broken glyph shaping is a project-killer (`RISK` inaccurate Tamil) |
| Bilingual content pipeline | ★★★ | Every string EN/TA with parity, mirroring the screenplay's 10F discipline |
| Dialogue/branching authoring | ★★★ | Testimony/Ledger/consequence is the core loop (`03`) |
| iPhone/iPad/Mac reach | ★★★ | Owner + diaspora audience are on Apple devices (`01`) |
| Cheap URL playtest distribution | ★★★ | Solo owner needs to hand a link to reviewers/players (`15` G6) |
| 2D/2.5D animation | ★★ | Stylised, not AAA; modest |
| Accessibility (a11y) | ★★ | `12`; text scaling, screen-reader feasibility |
| AI-assisted development fit | ★★ | Owner works with web + AI tooling |
| Long-term maintainability | ★★ | Multi-year, review-gated project |
| Combat/physics/3D | ✕ | Not needed — a reason NOT to pay heavy-engine cost |

## Path 1 — Browser-first (TypeScript + a web game framework)

**Stack [DESIGN]:** TypeScript, a lightweight 2D framework (**PixiJS** for
rendering, or **Phaser** for a batteries-included 2D game loop), **DOM/HTML+CSS for
all text and dialogue UI** (critical — see Tamil note), a data-driven dialogue format
(**Ink** via `inkjs`, or **Yarn Spinner**'s web runtime, or a bespoke JSON graph),
state in a small store, persistence via IndexedDB with export/import.

- **Suitability:** ★★★ Excellent. The game is text-, choice- and 2D-systems-heavy
  with no physics/3D/combat — squarely in web's sweet spot.
- **Tamil text:** ★★★ **Best of all four.** The browser's HarfBuzz-based text engine
  gives correct Tamil shaping/rerandom, bidi, line-breaking and font fallback *for
  free* when text is HTML/CSS (not canvas-rasterised). Keep dialogue in DOM overlays
  over the game canvas. (Canvas-only text in Pixi/Phaser is where Indic shaping breaks
  — so **render Tamil in DOM**, not in WebGL text.)
- **Bilingual content:** ★★★ Trivial i18n (JSON/PO), EN/TA parity linting like 10F.
- **Save systems:** ★★ IndexedDB/localStorage; export/import for playtest hand-back.
  (Weaker than native save infra, but sufficient.)
- **Dialogue tooling:** ★★★ Ink/Yarn are mature, writer-friendly, git-diffable —
  matches the repo's text-first, version-controlled culture.
- **2D animation:** ★★ Spine/DragonBones/Rive runtimes, or frame/tween; fine for
  stylised 2.5D.
- **Deployment:** ★★★ Static hosting; **a URL is the build.** Unbeatable for `15`.
- **iPhone/iPad/Mac:** ★★★ Runs in Safari/Chrome on all three; installable PWA;
  no App Store gatekeeping for playtests.
- **Accessibility:** ★★★ **Best.** DOM = real semantics, screen-reader support, OS
  text-scaling, `prefers-reduced-motion`, focus management — mostly free (`12`).
- **Learning curve:** ★★★ Lowest for this owner (already web).
- **AI-assisted dev:** ★★★ Strongest — TS/HTML/CSS is the best-supported target.
- **Cost:** ★★★ Free/near-free toolchain and hosting.
- **Maintainability:** ★★ Good if disciplined (TS types, tests like the repo's
  validators); web-framework churn is the main risk.
- **Cons:** heavy real-time crowds/particles are weaker than native; if the game ever
  wanted rich 3D/物理 it'd hit a ceiling (it won't); App Store *paid* distribution
  later needs a wrapper (Capacitor).

## Path 2 — Godot (2D/2.5D)

- **Suitability:** ★★★ Strong 2D/2.5D engine; good scene/node model for authored
  neighbourhoods.
- **Tamil text:** ★★ Godot 4 added HarfBuzz-based complex-script support and is
  generally good with Tamil **if** a proper Tamil font is supplied and tested; still
  worth explicit verification (historically Indic shaping was a pain point). Rank
  below browser-DOM.
- **Bilingual:** ★★ Built-in localization (CSV/PO/gettext).
- **Save:** ★★★ Native resource/JSON save; solid.
- **Dialogue tooling:** ★★ Dialogic plugin, or Ink/Yarn via community addons; decent.
- **2D animation:** ★★★ Excellent (AnimationPlayer, skeletal, tilemaps).
- **Deployment:** ★★ Exports to Web (WASM), macOS, iOS. **Web export exists** but is
  heavier/slower to load than a native web build and has more Safari/iOS quirks;
  iOS export needs Xcode + Apple Developer account.
- **iPhone/iPad/Mac:** ★★ Yes, via native export (Apple dev account, code signing).
- **Accessibility:** ★ Weaker; screen-reader support is limited (improving but not
  DOM-grade).
- **Learning curve:** ★★ New engine + GDScript for a web-native owner.
- **AI-assisted dev:** ★★ GDScript decent but less well-supported than TS.
- **Cost:** ★★★ Free, MIT.
- **Maintainability:** ★★★ Open-source, no licensing risk.
- **Best when:** the game grows richer real-time 2.5D animation/crowds than the web
  build handles comfortably, while staying 2D.

## Path 3 — Unity

- **Suitability:** ★★ Overpowered for a no-combat 2D narrative game.
- **Tamil text:** ★★ TextMeshPro + a Tamil font + **explicit HarfBuzz/RTL/complex-
  script setup**; workable but historically fiddly for Indic; needs real testing.
- **Bilingual:** ★★★ Localization package is mature.
- **Save:** ★★★ Mature.
- **Dialogue tooling:** ★★★ Yarn Spinner (first-class Unity support), Ink integration.
- **2D animation:** ★★★ Strong.
- **Deployment:** ★★★ Best multi-platform incl. iOS/Mac/consoles; ★ WebGL export is
  heavy and mobile-Safari-unfriendly.
- **iPhone/iPad/Mac:** ★★★ First-class native.
- **Accessibility:** ★ Custom-built; weakest.
- **Learning curve:** ★ Highest for this owner.
- **AI-assisted dev:** ★★ C# well-supported but engine-specific patterns less so.
- **Cost:** ★ Licensing/runtime-fee history creates uncertainty for a rights-cautious
  owner (`RISK-023` analogue); heavier tooling.
- **Maintainability:** ★★ Capable but engine lock-in + licence exposure.
- **Best when:** a later commercial version wants console ports and studio-grade
  production — decided at gate G7, not now.

## Path 4 — Ren'Py (or other narrative-first VN tool)

- **Suitability:** ★ **Misfit.** Ren'Py excels at visual novels — exactly the format
  the owner ruled out ("not a visual novel of screenplay scenes + dialogue choices").
  It resists spatial traversal, the feeding-logistics arrange verb (`GM-07`), and
  institutional systems (`GM-10`). Bending it to those is more work than a general
  framework.
- **Tamil text:** ★★ Works with a supplied font; generally acceptable.
- **Bilingual:** ★★ Built-in translation framework.
- **Save/dialogue:** ★★★ Both excellent — for VN structure.
- **2D animation:** ★ Limited (ATL); not for our 2.5D traversal.
- **Deployment/iOS:** ★★ Desktop/mobile/web export exist; iOS is possible but awkward.
- **Accessibility:** ★★ Has self-voicing/text scaling — a genuine plus.
- **Why it may still be considered:** fastest path to a *pure dialogue* prototype of
  the Ledger/testimony layer (`15` G2) if the owner wants to validate writing before
  building systems. **But** it would have to be thrown away for the real game, so it's
  only worth it as a disposable writing test — and a web build can do that too.
- **Verdict:** Not recommended even as an interim, because it would validate the one
  format the game must *not* become and can't host the systems that make it a game.

## Scorecard (★ = 1, ★★ = 2, ★★★ = 3; higher is better for this game)

| Criterion | Web(TS) | Godot | Unity | Ren'Py |
|---|---|---|---|---|
| Suitability to design | 3 | 3 | 2 | 1 |
| Tamil rendering | 3 | 2 | 2 | 2 |
| Bilingual pipeline | 3 | 2 | 3 | 2 |
| Save systems | 2 | 3 | 3 | 3 |
| Dialogue tooling | 3 | 2 | 3 | 3 |
| 2D animation | 2 | 3 | 3 | 1 |
| Deployment ease | 3 | 2 | 2 | 2 |
| iPhone/iPad/Mac | 3 | 2 | 3 | 2 |
| Accessibility | 3 | 1 | 1 | 2 |
| Learning curve (owner) | 3 | 2 | 1 | 2 |
| AI-assisted dev | 3 | 2 | 2 | 2 |
| Cost | 3 | 3 | 1 | 3 |
| Maintainability | 2 | 3 | 2 | 2 |
| **Total** | **36** | **30** | **28** | **26** |

## Recommendation

> **Clarification (status of this recommendation).** Browser-first TypeScript is the
> **leading prototype hypothesis, not a final technology lock.** G1 is
> engine-independent; G2 may build a *minimal* browser-based evidence/dialogue
> prototype; and the G3 feeding prototype **must test whether browser technology
> performs adequately** on target devices. **Phaser and PixiJS are alternatives, not a
> combined mandatory stack** — exactly **one** is selected through a small technical
> spike (`15` G2). **Godot remains a valid later-production candidate.** The **full-game
> engine decision is made only after gameplay and device testing** (gate G7).

### Vertical slice → **Browser-first (TypeScript + PixiJS *or* Phaser — one chosen via
a technical spike; DOM dialogue, Ink/Yarn, IndexedDB)**

Reasons that are about the *design*, not just familiarity (owner's caution noted):

1. **Tamil-first is safest in the browser** — HTML/CSS text gets correct Tamil
   shaping and OS-level scaling/screen-reader support that the other stacks must fight
   for. This directly serves Pillars and `12`, the project's non-negotiables.
2. **The game has no technical need the web can't meet** — no 3D, physics or combat;
   it's 2D systems + text.
3. **Playtest velocity** — `15`'s gates (G1–G6) all want "hand a reviewer a link".
   A URL *is* the build; reviewers on iPhone/iPad/Mac open it instantly.
4. **Accessibility dividend** — DOM semantics make `12` largely free.
5. **Owner + AI-assisted development** land on TS/HTML/CSS most productively.

Guardrail (honest risk): **render all Tamil/English text in DOM overlays, never in
WebGL canvas text**, and load-test crowds/particles early (`15` G3) — if S6's stylised
crowd underperforms on older iPhones, reduce fidelity, don't switch engines.

### Later commercial-quality version → **Godot 4** (primary) with **Unity** as the
fallback only if console ports/studio pipeline are required.

- **Godot** keeps costs/licensing clean (matches the owner's rights caution),
  is a true 2D/2.5D engine, exports to iOS/Mac, and can *reuse the Ink/Yarn dialogue
  content and JSON data authored for the web slice* — so the web prototype is not
  throwaway.
- **Unity** only if a publisher/console strategy emerges at gate **G7** (`15`);
  defer that decision — do not adopt heavy tooling before the design is proven.
- A web build can remain a permanent first-class target (PWA + Capacitor wrapper for
  App Store) even in the commercial phase.

**Decision is revisited at G7 (full-game decision gate), not before.**
