# External Review Execution Protocol

## Purpose

This protocol moves the prepared `SR-001`–`SR-013` packets from
`READY_FOR_EXTERNAL_REVIEW` to a documented outcome. It does not permit an
internal contributor or automated system to impersonate a specialist.

The authoritative execution ledger is
[`external-review-assignment-register.csv`](external-review-assignment-register.csv).
The discipline scopes remain in
[`specialist-review-register.csv`](specialist-review-register.csv).

## Assignment sequence

1. Identify a reviewer whose qualifications match the register role.
2. Share the relevant bounded packet and only lawfully accessible sources.
3. Obtain a conflict-of-interest declaration and accepted-scope statement.
4. Record the reviewer, assignment date and target date in the assignment
   register; do not put private contact details in the public repository.
5. Change the corresponding specialist row to `IN_REVIEW` only after the
   reviewer accepts.
6. Require the reviewer to return the specialist response template with
   evidence locators, confidence and explicit exclusions.
7. Preserve the original response under a stable dated path.
8. Triage every finding as blocking, major, minor or advisory.
9. Implement approved changes bilingually where screenplay language is
   affected; preserve scene and TRACE architecture unless separately opened.
10. Rerun the full test, register, bilingual, release, asset and exhaustive
    audit suite.
11. Record the repository disposition and only then move the specialist row
    to its evidence-supported result.

## Allowed status transitions

```text
UNASSIGNED
  → ASSIGNED
  → IN_REVIEW
  → CHANGES_REQUESTED | BLOCKED_EVIDENCE | APPROVED_WITH_NOTES | APPROVED
```

`CHANGES_REQUESTED` returns to `IN_REVIEW` after the reviewer receives the
revised material. `BLOCKED_EVIDENCE` remains open until the missing lawful
source or edition is available.

## Acceptance rule

A review gate closes only when all of the following exist:

- named reviewer and relevant qualification;
- accepted and excluded scope;
- conflict declaration;
- materials and editions consulted;
- dated response record;
- explicit result;
- disposition of every blocking or major finding;
- passing post-change repository validation.

Praise, silence, informal conversation, internal AI review or successful CI
does not substitute for specialist approval.

## Privacy and attribution

- Store email addresses and private contact details outside the public
  repository.
- Record a public name or credit only with the reviewer's permission.
- If public credit is declined, use a stable confidential-review identifier
  and retain identity evidence privately with the owner.
- Do not publish copyrighted source scans as part of a response.

## Completion condition

The specialist phase is complete only when all 13 assignment rows have a
real outcome and every blocking finding is closed or explicitly accepted by
the owner as an unresolved production risk. The current all-`UNASSIGNED`
state is execution-ready, not approved.
