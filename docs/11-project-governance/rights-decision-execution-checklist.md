# Rights Decision Execution Checklist

## Current state

No public licence has been selected. The owner decision remains the final
authority, informed by `SR-013`. Until that decision, the repository must not
display a licence badge or imply permission beyond applicable law and the
hosting platform's ordinary terms.

## Owner input required

Select one pathway in
[`owner-rights-and-licensing-decision.md`](owner-rights-and-licensing-decision.md):

- `A` — reviewed split licensing;
- `B` — fully reserved interim state;
- `C` — broad open collaboration after review.

Record the owner's name, date, modifications and review authority. A choice
is not effective until the corresponding files and exclusions are committed.

## Pre-decision review

- [ ] `SR-013` reviewer is named and conflict-checked.
- [ ] Code ownership and contributor history are checked.
- [ ] Original research prose is separated from third-party quotations.
- [ ] Screenplay, treatment and character creative expression are identified.
- [ ] Primary texts, translations, Bharathidasan material and scholarship are
      classified by underlying rights.
- [ ] Each generated or commissioned visual asset has provenance and intended
      use recorded.
- [ ] Private sources are excluded from public licensing.
- [ ] Jurisdiction-specific legal advice and attribution requirements are
      recorded.

## Option A implementation

- [ ] Add reviewed Apache-2.0 licence and notice for validation code only.
- [ ] Add reviewed CC BY-NC-SA 4.0 notice for eligible original documentation.
- [ ] Add an all-rights-reserved notice for screenplay and creative materials.
- [ ] Add exclusions for third-party texts, quotations and assets.
- [ ] Add per-directory rights files so one root licence cannot be misread as
      covering the entire repository.

## Option B implementation

- [ ] Add an explicit all-rights-reserved repository notice for original work.
- [ ] State that third-party material remains governed by its own rights.
- [ ] State that contribution acceptance does not grant production rights.
- [ ] Schedule a future split-licensing review date.

## Option C implementation

- [ ] Define separate code, documentation and screenplay licences.
- [ ] Confirm compatibility with every included contribution and asset.
- [ ] Define commercial, adaptation, attribution and share-alike consequences.
- [ ] Obtain explicit owner acceptance of derivative-screenplay risk.

## Post-decision controls

1. Add exact reviewed licence and `NOTICE` files.
2. Update `CONTRIBUTING.md`, private-source rules and asset manifests.
3. Update the owner-decision record and `SR-013` result.
4. Add badges only after the effective files exist.
5. Rebuild release manifests if rights metadata changes.
6. Run all tests, validators and the exhaustive tracked-file audit.
7. Record the effective commit in the decision file.

## Closure condition

The rights gate is complete only when the owner selects a pathway, qualified
review is recorded, the exact implementation files are committed and the
post-decision audit passes. This checklist deliberately cannot select a
licence on the owner's behalf.
