# 10H — Source Perspectives

## Purpose

This phase preserves later retellings, interpretive works and other non-primary witnesses as independently identifiable perspectives. They may inform a standalone adaptation or a carefully recorded proposal for the current feature, but they do not replace *Manimekalai* as the primary source.

## Current perspective

### Bharathidasan — *Manimekalai Venpa*

- Perspective ID: `VENPA-BHARATHIDASAN`
- Registered source: `SRC-0045`
- Source: Bharathidasan, *Manimekalai Venpa*, Pari Nilayam, 1990; Project Madurai UTF-8 e-text prepared from a Tamil Virtual Academy scan
- Status: independent interpretive witness
- Current feature decisions: 31 total — 4 approved, 7 proposed, 7 deferred, 13 rejected
- Approved screenplay insertions: `VENPA-USE-001`, `007`, `008` and `016`, implemented bilingually
- Evidence preparation: e-text anchors, stable digital location crosswalk and preliminary primary-source compatibility classification recorded
- Stage 1 decisions: `VENPA-USE-011` and `VENPA-USE-027` revision paths selected; both remain unapproved
- Stage 2 decision: Aadhirai linked pair finally approved and implemented using the stronger Venpa-forward cooked-rice, curry and ghee movement
- Stage 3 complete: Madhavi and Aputhiran beats implemented; Sudhamathi and Vasantavai additions rejected as duplicative
- Visual scan-page verification: still pending

## Documents

- [Historical perspective register](../../11-source-perspectives/manimekalai-venpa-perspective-register.md)
- [Historical adaptation audit](../../11-source-perspectives/manimekalai-venpa-adaptation-audit.md)
- [Proposed evidence packet](venpa-proposed-evidence-packet.md)
- [Digital location crosswalk](venpa-digital-location-crosswalk.md)
- [Primary-source compatibility packet](venpa-primary-source-compatibility-packet.md)
- [Decision readiness queue](venpa-decision-readiness-queue.md)
- [VENPA-USE-011 Kayasandihai revision options](venpa-use-011-kayasandihai-revision-options.md)
- [VENPA-USE-027 Manimekalai grief reinterpretation options](venpa-use-027-manimekalai-grief-reinterpretation-options.md)
- [Stage 1 explicit decision record](venpa-stage-1-explicit-decision-record.md)
- [VENPA-USE-007/008 Aadhirai linked options](venpa-use-007-008-aadhirai-linked-decision-options.md)
- [Stage 2 Aadhirai explicit decision record](venpa-stage-2-aadhirai-explicit-decision-record.md)
- [Aadhirai final approval and implementation record](venpa-use-007-008-aadhirai-approval.md)
- [VENPA-USE-016 Aputhiran decision options](venpa-use-016-aputhiran-decision-options.md)
- [Stage 3 short-beats decision record](venpa-stage-3-short-beats-decision-record.md)
- [Master decision register](../10G-dialogue-and-parity-review/venpa-perspective-master-decision-register.md)

The historical perspective register, adaptation audit, creative queue and original Aadhirai proposal memo preserve the reasoning state before the owner-approved Aadhirai exception. Current status is governed by the master register and final approval record.

## Use rules

1. Keep primary-epic evidence and later interpretation separate.
2. Do not use the Venpa to overwrite contradictory primary evidence silently.
3. Record every proposed borrowing with a permanent perspective-use ID.
4. Classify the use as `DIRECT`, `ADAPTED`, `THEMATIC` or `COMBINED`.
5. Verify close wording against a reliable scan page or printed edition; OCR/e-text alone is insufficient.
6. Check compatibility with the primary epic and current adaptation architecture.
7. Make any approved screenplay change in English and Tamil together.
8. Preserve scene numbers and TRACE metadata unless a separately authorised structural revision reopens them.
9. Retain rejected and deferred decisions for auditability.
10. Treat a primary-source compatibility finding or selected revision path as evidence preparation, not automatic approval.
11. Record final owner approval and implementation provenance before changing a master status to `APPROVED`.

## Current gate

The Aadhirai pair is implemented and has passed a complete static file-and-TRACE audit. Executable regression and validator results are still not recorded. Other screenplay insertions remain frozen until:

- regression tests and full bilingual validation pass in an actual checkout or CI run;
- exact Venpa scan pages are recorded through visual or lawful printed-copy review;
- chosen Tamil primary-edition lines are recorded;
- terminology, specialist and spoken-Tamil gates pass;
- performance or blocking review supports the selected wording;
- an explicit final approve or reject decision is entered in the master register.

The next authorised activities are:

1. complete the Aadhirai culinary, visual-source and performance checks;
2. resolve the remaining Stage 1 proposals `VENPA-USE-011` and `027`;
3. review the institutional proposals as one duplication-controlled batch;
4. do not make another screenplay edit or master-status change automatically.
