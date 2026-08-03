# Owner Rights and Licensing Decision

## Status

**Owner selected Option B on 2026-08-03. The fully reserved interim state is
implemented; qualified `SR-013` review remains open.**

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

- Selected option: `B — Fully reserved interim state`
- Modifications: review by 2027-02-03 or earlier if legal, financing or collaboration needs arise
- Owner: repository owner `pugazg`; legal name intentionally not recorded in the public repository
- Decision date: 2026-08-03
- Adviser / reviewer: pending `SR-013`
- Review record: owner selection recorded in the project task; external legal advice not yet claimed
- Effective commit: to be recorded after the implementation commit is created

## Actions after decision

1. Maintain the root `NOTICE` separating original and third-party materials.
2. Maintain per-directory notices for documentation, screenplay, visual assets, releases and tooling.
3. Enforce the contribution restrictions in `CONTRIBUTING.md`.
4. Preserve private-source and asset-level rights metadata.
5. Do not add a licence badge while the interim state has no open licence.
6. Obtain `SR-013` advice before changing to Option A or C.
7. Run the full audit and release check after every rights change.

The owner pathway is resolved as Option B. Legal review, third-party clearance
and any future open or split licensing remain unresolved and must not be
implied by the interim notice.
