# Owner Rights and Licensing Decision

## Status

**Owner decision required. No licence is granted by this document.**

The repository contains code, original research synthesis, original screenplay material, third-party literary and scholarly sources, and generated visual studies. One blanket licence is not appropriate.

## Recommended split

| Layer | Recommended interim treatment | Reason |
|---|---|---|
| Validation scripts, tests and workflows | Apache License 2.0 | Permissive reuse with an explicit patent grant and notice requirements |
| Original research and governance documentation | CC BY-NC-SA 4.0, excluding third-party quotations and assets | Allows attributed non-commercial scholarly reuse while preserving share-alike terms |
| English and Tamil screenplay, treatment and character creative expression | All rights reserved | Preserves production, adaptation and commercial negotiation control |
| Primary texts, translations, Bharathidasan material and scholarship | Citation-only or private according to the underlying right | The project cannot license work it does not own |
| Generated and commissioned visual assets | All rights reserved pending asset-level clearance | Tool terms, human contribution, references and future commissions require individual provenance |

This recommendation must be reviewed under `SR-013` before licence files or badges are added.

## Alternative owner choices

### Option A — Recommended split

Adopt the five-layer model above after legal/open-licensing review.

### Option B — Fully reserved interim state

Keep all original repository material “all rights reserved” while allowing only GitHub’s ordinary viewing and contribution workflow. Revisit public licences after production financing and source clearance.

This is simpler and more protective, but limits external research and tooling reuse.

### Option C — Broad open collaboration

Use a permissive code licence, CC BY-SA for original documentation and a separately defined screenplay licence.

This maximises reuse but creates the greatest risk of uncontrolled derivative screenplay and visual use. It is not recommended before specialist and source-rights review.

## Owner decision record

Complete only after receiving qualified advice:

- Selected option:
- Modifications:
- Owner name:
- Decision date:
- Adviser / reviewer:
- Review record:
- Effective commit:

## Actions after decision

1. Add the exact reviewed licence files.
2. Add a `NOTICE` file separating excluded third-party materials.
3. Add per-directory rights notices for screenplay, documentation and visual assets.
4. Update `CONTRIBUTING.md` with contributor terms.
5. Update private-source and asset manifests.
6. Add badges only after the licence files are live.
7. Run the full audit and release check.

Until then, the repository must continue to say that licensing is unresolved.

