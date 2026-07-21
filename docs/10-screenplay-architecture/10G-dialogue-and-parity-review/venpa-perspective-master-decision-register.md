# Venpa Perspective — Master Decision Register

## Status

**Register scope:** `VENPA-USE-001` through `VENPA-USE-031`  
**Perspective:** `VENPA-BHARATHIDASAN`  
**Screenplay text changed by this register:** No  
**TRACE records changed:** No  
**Scene count changed:** No  
**Runtime parity gate:** Still unconfirmed  
**Authority:** This file consolidates decisions; the detailed review, evidence and approval memos remain the reasoning record.

## Decision totals

| Status | Count | Meaning |
|---|---:|---|
| `APPROVED` | 2 | The owner approved the linked Aadhirai pair and it has been implemented bilingually; post-implementation validation and quality gates remain open. |
| `PROPOSED` | 11 | A narrowly defined change may be considered after all listed gates pass. It is not approved for insertion. |
| `DEFERRED` | 7 | The idea is not actionable until missing evidence, terminology review or performance testing is completed. |
| `REJECTED` | 11 | The idea conflicts with the current adaptation architecture and must not be inserted unless a future adaptation explicitly reopens that decision. |
| **Total** | **31** | Only `VENPA-USE-007` and `VENPA-USE-008` are currently approved and implemented. |

## Global gate codes

| Code | Gate |
|---|---|
| `G1` | Run the regression suite and full bilingual validator successfully against the actual repository. |
| `G2` | Verify the relevant Bharathidasan *Manimekalai Venpa* passage against a reliable page image or printed edition; OCR alone is insufficient for close adaptation. |
| `G3` | Check compatibility with the primary epic source and the current screenplay's source architecture. |
| `G4` | Make any approved insertion in English and Tamil together, preserving scene numbers and TRACE metadata exactly. |
| `G5` | Complete line-by-line and spoken-Tamil review, especially for restored Tamil Sequences 05–07. |
| `G6` | Complete terminology, transliteration and historical-register review. |
| `G7` | Test the proposal through performance, blocking or dialogue rehearsal. |
| `G8` | Coordinate with related proposals so two revisions do not duplicate, contradict or overload the same scene. |

## Master register

| ID | Area | Destination | Use type | Status | Consolidated decision | Evidence requirement | Approval dependency | Detailed memo |
|---|---|---|---|---|---|---|---|---|
| `VENPA-USE-001` | Madhavi | Seq 02, Scene `#13#`; `FU-012 / SC-085 / ABSORBS SC-076` | `THEMATIC` | `PROPOSED` | Madhavi stops before raising the household alarm and asks Sudhamathi for witnessed truth rather than the city's story. | Verify Madhavi grief, daughter and renunciation movement. | `G1 G2 G3 G4 G8` | [Madhavi review](madhavi-sequences-01-02-review.md) |
| `VENPA-USE-002` | Madhavi | Seq 01, Scene `#4#`; `BR-001 / SC-097` | `ADAPTED` | `REJECTED` | Do not add further Kovalan–Kannagi exposition; the scene already contains the necessary history and present consequence. | None unless a different adaptation brief reopens prior-epic exposition. | Closed under current architecture. | [Madhavi review](madhavi-sequences-01-02-review.md) |
| `VENPA-USE-003` | Madhavi | Seq 01, Scene `#5#`; `FU-004 / SC-075` | `THEMATIC` | `DEFERRED` | Possible line: Madhavi's fear must not name Manimekalai's life. Current action may already communicate this. | Verify source movement; determine whether dialogue adds meaning or merely repeats performance. | `G1 G2 G7 G8` | [Madhavi review](madhavi-sequences-01-02-review.md) |
| `VENPA-USE-004` | Sudhamathi | Seq 02, Scene `#8#`; `FU-007 / SC-082 / ABSORBS SC-056` | `THEMATIC` | `PROPOSED` | Add the practical method: count doors before faces because a door can become a witness. | Verify Sudhamathi protector and practical-interpreter movement. | `G1 G2 G3 G4 G7` | [Sudhamathi review](sudhamathi-sequences-01-02-review.md) |
| `VENPA-USE-005` | Sudhamathi | Seq 02, Scene `#9#`; `FU-008 / SC-055 / ABSORBS SC-005, SC-083, SC-089` | `THEMATIC` | `DEFERRED` | Consider protective blocking between Udayakumaran and Manimekalai without displacing Manimekalai's own refusal. | Performance evidence rather than additional source exposition. | `G1 G7 G8` | [Sudhamathi review](sudhamathi-sequences-01-02-review.md) |
| `VENPA-USE-006` | Sudhamathi | Seq 02, Scene `#8#`; `FU-007 / SC-082 / ABSORBS SC-056` | `DIRECT` or `ADAPTED` | `REJECTED` | Do not fully dramatise the violence in Sudhamathi's past; concrete knowledge is needed, not trauma spectacle. | None under current ethical architecture. | Closed under current architecture. | [Sudhamathi review](sudhamathi-sequences-01-02-review.md) |
| `VENPA-USE-007` | Aadhirai | Seq 04, Scene `#31#`; `FU-021 / SC-153 / ABSORBS SC-017, SC-154` | `ADAPTED` | `APPROVED` | Implemented: Aadhirai fills the vessel with cooked rice and curry from her household; ghee catches the light; existing dialogue and quiet threshold remain. | Venpa e-text and primary Chapter 16 core recorded; visual scan, culinary terminology and spoken-Tamil checks remain. | Implemented bilingually; `G1 G2 G6 G7` remain post-implementation quality gates. | [Aadhirai review](aadhirai-sequence-04-perspective-review.md) · [approval record](../10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md) |
| `VENPA-USE-008` | Aadhirai | Seq 04, Scene `#32#`; `FU-022 / SC-068 / ABSORBS SC-006, SC-018` | `ADAPTED` | `APPROVED` | Implemented: Manimekalai serves Aadhirai's prepared food, looks back and sees that the level has not fallen before crowd pressure begins. | Venpa order and primary offering/fullness movement recorded; visual source and blocking review remain. | Implemented with `VENPA-USE-007`; `G1 G2 G7` remain post-implementation quality gates. | [Aadhirai review](aadhirai-sequence-04-perspective-review.md) · [approval record](../10H-source-perspectives/venpa-use-007-008-aadhirai-approval.md) |
| `VENPA-USE-009` | Aadhirai | Seq 04, Scenes `#31#–#32#` | `DIRECT` | `REJECTED` | Do not move the whole crowd to Aadhirai's doorstep; preserve the intimate threshold followed by public gathering. | None under the present cinematic architecture. | Closed under current architecture. | [Aadhirai review](aadhirai-sequence-04-perspective-review.md) |
| `VENPA-USE-010` | Aadhirai | Seq 04, Scene `#31#`; `FU-021 / SC-153` | `THEMATIC` | `DEFERRED` | A warm spoken welcome is possible, but opening the stores may already communicate welcome more strongly. | Verify exact welcome movement and test dialogue economy. | `G1 G2 G6 G7 G8` | [Aadhirai review](aadhirai-sequence-04-perspective-review.md) |
| `VENPA-USE-011` | Kayasandihai | Seq 04, Scene `#33#`; `FU-023 / SC-019` | `THEMATIC` | `PROPOSED` | Let Kayasandihai identify immediate needs and recover a counsellor function after hunger relief; exact revised wording remains undecided. | Verify Chapter 17 and Bharathidasan movement; use the revision-options memo rather than the superseded original line. | `G1 G2 G3 G4 G6 G7` | [Kayasandihai review](kayasandihai-kanchanan-sequences-04-05-perspective-review.md) · [revision options](../10H-source-perspectives/venpa-use-011-kayasandihai-revision-options.md) |
| `VENPA-USE-012` | Kayasandihai | Seq 05, Scene `#37#`; `BR-009 / SC-131 / ABSORBS SC-129, SC-130` | `ADAPTED` | `DEFERRED` | A Kayasandihai-centred image may balance Kanchanan's search montage, but her departure, intention or fate must not be invented. | Exact Venpa and primary-source verification of her separate movement. | `G2 G3 G5 G6` | [Kayasandihai–Kanchanan review](kayasandihai-kanchanan-sequences-04-05-perspective-review.md) |
| `VENPA-USE-013` | Kanchanan | Seq 05, Scene `#39#`; `FU-029 / SC-133 / ABSORBS SC-093` | `THEMATIC` | `REJECTED` | Do not let Kanchanan knowingly hear the complete refusal and attack anyway; preserve fatal inference from partial evidence. | None under the current causality architecture. | Closed under current architecture. | [Kayasandihai–Kanchanan review](kayasandihai-kanchanan-sequences-04-05-perspective-review.md) |
| `VENPA-USE-014` | Kanchanan | Seq 05, Scenes `#41#–#42#`; `FU-031–FU-032` | `DIRECT` or `THEMATIC` | `REJECTED` | Do not make fate or an older causal chain move the sword; Kanchanan's present choice remains decisive. | None under the current accountability architecture. | Closed under current architecture. | [Kayasandihai–Kanchanan review](kayasandihai-kanchanan-sequences-04-05-perspective-review.md) |
| `VENPA-USE-015` | Kayasandihai | Seq 05, Scene `#42#`; `FU-032 / SC-136` | `DIRECT` or `ADAPTED` | `DEFERRED` | Do not specify Kayasandihai's final destination or fate until textual and terminology evidence is secure. | Exact source wording, edition comparison and terminology review. | `G2 G3 G5 G6` | [Kayasandihai–Kanchanan review](kayasandihai-kanchanan-sequences-04-05-perspective-review.md) |
| `VENPA-USE-016` | Aputhiran | Seq 04, Scene `#24#`; `BR-005 / SC-124` | `THEMATIC` | `PROPOSED` | After rejecting Indra's reward, Aputhiran turns immediately to serve an elderly hungry traveller. | Verify the reward-refusal and hunger-relief passage. | `G1 G2 G3 G4 G6` | [Aputhiran review](aputhiran-sequences-04-08-perspective-review.md) |
| `VENPA-USE-017` | Aputhiran / Punniyarajan | Seq 08, Scene `#59#`; `FU-049 / SC-146 / ABSORBS SC-147` | `COMBINED` | `PROPOSED` | Require relief routes and store access to continue without one ruler, seal or heroic life by naming local custodians. | Verify the collective-giving movement and test institutional/historical register. | `G1 G2 G3 G4 G6` | [Aputhiran review](aputhiran-sequences-04-08-perspective-review.md) |
| `VENPA-USE-018` | Aputhiran | Seq 04, Scene `#24#`; `BR-005 / SC-124` | `DIRECT` or `ADAPTED` | `REJECTED` | Do not expand the Indra exchange into a long cosmological debate that displaces hunger and service. | None under the current scene purpose. | Closed under current architecture. | [Aputhiran review](aputhiran-sequences-04-08-perspective-review.md) |
| `VENPA-USE-019` | Aputhiran | Seq 04, Scene `#22#`; `BR-003 / SC-121` | `DIRECT` or `ADAPTED` | `DEFERRED` | An organised reactionary conspiracy is not supportable from the present OCR evidence. | Reliable page image establishing action, chronology and agency. | `G2 G3 G6` | [Aputhiran review](aputhiran-sequences-04-08-perspective-review.md) |
| `VENPA-USE-020` | Aputhiran | Seq 04, Scene `#27#`; `BR-008 / SC-128` | `THEMATIC` | `REJECTED` | Do not present the final fast as a triumphant ideal for Manimekalai or Punniyarajan to imitate. | None under the shared-service architecture. | Closed under current architecture. | [Aputhiran review](aputhiran-sequences-04-08-perspective-review.md) |
| `VENPA-USE-021` | Prison / education | Seq 04, Scene `#34#`; `FU-024 / SC-020 / ABSORBS SC-037, SC-051` | `COMBINED` | `PROPOSED` | Make one former cell an open records-and-learning room where people can read and challenge entries. | Verify prison-worker, public-responsibility and education–feeding passages; review historical register. | `G1 G2 G3 G4 G6 G8` | [Institutional reform review](prison-education-institutional-reform-sequences-04-07-perspective-review.md) |
| `VENPA-USE-022` | Prison / public witness | Seq 05, Scene `#43#`; `FU-033 / SC-069 / ABSORBS SC-096` | `THEMATIC` | `PROPOSED` | The former prisoner records the guards, sending official and stated destination so the arrest cannot proceed anonymously. | Verify public protest, supporter and prison-worker witness movement. | `G1 G2 G3 G4 G5 G6 G8` | [Institutional reform review](prison-education-institutional-reform-sequences-04-07-perspective-review.md) |
| `VENPA-USE-023` | Custody records | Seq 07, Scene `#53#`; `FU-043 / SC-119 / ABSORBS SC-053, SC-079` | `COMBINED` | `PROPOSED` | Rajamadevi establishes that no one may be released in one record and confined in another; doors, guards and withheld rations share one public account. | Verify prison witness and public-responsibility movement; test institutional terminology. | `G1 G2 G3 G4 G5 G6 G8` | [Institutional reform review](prison-education-institutional-reform-sequences-04-07-perspective-review.md) |
| `VENPA-USE-024` | Prison / education | Seq 04, Scene `#34#`; `FU-024 / SC-020` | `ADAPTED` or `THEMATIC` | `DEFERRED` | Do not declare a literal modern school without stronger evidence; the smaller records-and-literacy beat remains the supportable option. | Exact evidence for a literal prison-to-school conversion and historical-form review. | `G2 G3 G6 G8` | [Institutional reform review](prison-education-institutional-reform-sequences-04-07-perspective-review.md) |
| `VENPA-USE-025` | Public protest | Seq 05, Scene `#43#`; `FU-033 / SC-069` | `DIRECT` | `REJECTED` | Do not stage a weapon-breaking crowd rescue; preserve nonviolent witness, records and the later hearing. | None under the current institutional-accountability arc. | Closed under current architecture. | [Institutional reform review](prison-education-institutional-reform-sequences-04-07-perspective-review.md) |
| `VENPA-USE-026` | Udayakumaran evidence | Seq 06, Scene `#44#`; `FU-034 / SC-050` | `COMBINED` | `PROPOSED` | The court scribe places five refusals, warnings and returns in chronological order before motive is named. | Verify the repeated-approach, warning and death sequence; review restored Tamil hearing language. | `G1 G2 G3 G4 G5 G6 G8` | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) |
| `VENPA-USE-027` | Manimekalai's grief | Seq 05, Scene `#43#`; `FU-033 / SC-069 / ABSORBS SC-096` | `ADAPTED` | `PROPOSED` | Permit grief while preserving the truth of present refusal; the preferred source-aware reinterpretation explicitly distinguishes previous-life memory from the current-life answer. | Verify the Chapter 21 lament and Bharathidasan passage; complete Buddhist, consent and performance review. | `G1 G2 G3 G4 G5 G6 G7 G8` | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) · [reinterpretation options](../10H-source-perspectives/venpa-use-027-manimekalai-grief-reinterpretation-options.md) |
| `VENPA-USE-028` | Rajamadevi / Vasantavai | Seq 06, Scene `#45#`; `FU-035 / SC-112 / ABSORBS SC-052, SC-094, SC-111` | `COMBINED` | `PROPOSED` | Vasantavai permits mourning the son while refusing to make pursuit that harmed another woman his memorial. | Verify the death-and-grief movement; test terminology and restored Tamil dialogue. | `G1 G2 G3 G4 G5 G6 G8` | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) |
| `VENPA-USE-029` | Udayakumaran | Seq 05, Scene `#41#`; `FU-031 / SC-135` | `DIRECT`, `ADAPTED` or `THEMATIC` | `REJECTED` | Do not add mutual-love closure, a Lakshmi–Ragulan reunion, a kiss or posthumous consent. | None; death cannot supply consent refused during life. | Closed under current architecture. | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) |
| `VENPA-USE-030` | Manimekalai's grief | Seq 05, Scene `#43#`; `FU-033 / SC-069` | `DIRECT` | `REJECTED` | Do not imply that Manimekalai's thought, fear, disguise or refusal caused the killing. | None under the current responsibility architecture. | Closed under current architecture. | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) |
| `VENPA-USE-031` | Fate and accountability | Seq 05, Scenes `#41#–#42#`; `FU-031–FU-032` | `DIRECT` or `THEMATIC` | `REJECTED` | Do not make fate, karma or supernatural necessity directly move the prince or the sword; prior causes do not remove present choice. | None under the current causality architecture. | Closed under current architecture. | [Udayakumaran review](udayakumaran-grief-accountability-sequences-02-07-perspective-review.md) |

## Decision batches

The remaining proposed records must not be approved as one undifferentiated package.

### Batch A — character agency and emotional precision

- `VENPA-USE-001`
- `VENPA-USE-004`
- `VENPA-USE-011`
- `VENPA-USE-016`
- `VENPA-USE-027`
- `VENPA-USE-028`

These are short beats or lines. Each still requires its listed source, terminology and performance gates.

### Batch B — first offering and abundance — approved and implemented

- `VENPA-USE-007`
- `VENPA-USE-008`

These were approved together as one causal unit and inserted in both languages. Their post-implementation validator, visual-source, culinary terminology and performance gates remain open.

### Batch C — institutional continuity and public evidence

- `VENPA-USE-017`
- `VENPA-USE-021`
- `VENPA-USE-022`
- `VENPA-USE-023`
- `VENPA-USE-026`

These proposals interact through records, distributed authority and public evidence. They require a duplication review so the feature does not over-explain its institutional theme.

## Current locks

1. No remaining `PROPOSED` record is approved for insertion.
2. `VENPA-USE-007` and `VENPA-USE-008` are approved and implemented; removing or materially altering them requires a new recorded decision.
3. No `DEFERRED` record may enter a screenplay edit queue.
4. No `REJECTED` record may be inserted into the current 72-scene feature.
5. Source verification must distinguish Bharathidasan's interpretive perspective from the primary epic source.
6. Any approved change must be inserted in English and Tamil together.
7. Scene numbers and TRACE signatures must remain unchanged unless a separately authorised structural revision reopens them.
8. Tamil Sequences 05–07 require dedicated line-by-line and spoken-Tamil quality review before dialogue lock.
9. The regression tests and full bilingual validator must pass after every approved insertion batch.

## Next authorised activity

1. Run and record regression tests and the full bilingual validator for the implemented Aadhirai pair.
2. Complete visual-source, culinary terminology and spoken-Tamil checks for Scenes `#31#–#32#`.
3. Record an explicit decision on the prepared revision options for `VENPA-USE-011` and `VENPA-USE-027` before editing either scene.
4. Continue remaining evidence and duplication review without inserting other proposed records.

Until those gates pass, only the approved Aadhirai pair is authorised in the screenplay.