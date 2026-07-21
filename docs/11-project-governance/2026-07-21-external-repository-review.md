# External Repository Review — Reconciliation and Pipeline Intake

**Review received:** 2026-07-21  
**Review type:** Repository-quality and process review  
**Pipeline status:** Accepted as a formal governance input  
**Screenplay impact:** None; this review does not authorise screenplay or TRACE changes

## Review summary

The reviewer assessed the repository as unusually rigorous, thoughtful and well structured for a classical-epic adaptation. Particular strengths identified were:

- source-protective core principles;
- professional traceability through `EV-*`, `AD-*`, `SC-*`, CSV registers and validators;
- clear modular documentation;
- disciplined validation foundations;
- ethical care around consent, agency, hunger, philosophy and trauma;
- transparency about the project's current state.

The reviewer located the main remaining gaps in discoverability, automation, collaboration readiness and production-facing documentation rather than in the core adaptation architecture.

## Reconciliation method

Every recommendation is classified as:

- `IMPLEMENTED NOW` — completed in the same pipeline iteration;
- `ALREADY PRESENT` — the repository already meets the recommendation substantially;
- `PARTIAL` — foundations exist but need expansion;
- `BACKLOG` — valid future work, not safe or necessary to complete in this iteration;
- `DECISION REQUIRED` — owner, rights or editorial choice is needed before implementation;
- `MANUAL REPOSITORY SETTING` — cannot be changed through the current file-content workflow.

## Recommendation reconciliation

| Priority | Recommendation | Assessment before review | Pipeline decision | Status |
|---|---|---|---|---|
| High | Add a clear project status dashboard | Root README had a long current-state section but was outdated and did not expose blockers cleanly | Added root `STATUS.md` with roadmap, measurable baseline, blockers, locks and key links | `IMPLEMENTED NOW` |
| High | Add a visual roadmap | No single phase-status view | Added roadmap table in `STATUS.md`; Mermaid may be added later if it improves rather than duplicates the table | `IMPLEMENTED NOW` |
| High | Provide estimated timelines or blockers for 10E | 10E was incorrectly described as future work despite drafts already existing | Replaced date estimates with evidence-based gates and blockers; the project will not promise dates unsupported by resourcing or specialist access | `IMPLEMENTED NOW` |
| High | Improve README navigation and key links | Repository map existed; no concise table of contents or current review links | Root README update and central `docs/INDEX.md` added to the implementation queue in this review iteration | `IMPLEMENTED NOW` |
| High | Add badges | No reliable validation-result badge or settled licence exists | Do not add decorative or stale badges. Add validation and licence badges only after a recorded workflow result and licence decision | `DECISION REQUIRED` |
| Process | Expand `CONTRIBUTING.md` | Existing file defined IDs and broad cautions but not proposal/review workflow | Expand evidence proposals, adaptation decisions, character/treatment review, Markdown/CSV conventions and validation expectations | `IMPLEMENTED NOW` |
| Process | Improve changelog categorisation or conventional commits | Changelog is already substantial and release based; commit messages are concise but not formally conventional | Preserve historical changelog; future entries should group Research, Architecture, Screenplay, Validation and Governance | `PARTIAL` |
| Process | Add automated validation on push/PR | Workflow already exists and runs regression tests plus bilingual validation | Credit as present; runtime result still needs to be recorded and surfaced | `ALREADY PRESENT` |
| Technical | Add validator `--summary` | Current validator prints a concise pass/fail summary but has no option parser | Valid enhancement; implement only with tests and without weakening default CI failure behaviour | `BACKLOG` |
| Technical | Generate `validation-report.md` | No generated report is committed | Add as a deterministic CI artifact or generated file, not a manually maintained claim | `BACKLOG` |
| Technical | Add runtime totals and orphaned-reference checks | Repository validator checks register integrity; bilingual validator checks scene/TRACE parity | Cross-validator summary and orphan checks are valid next technical work | `PARTIAL` |
| Technical | Add central documentation index | Missing | Added `docs/INDEX.md` | `IMPLEMENTED NOW` |
| Technical | Document private-source conventions | Root README mentioned `private_sources/` but lacked a metadata convention | Add governance guidance without committing protected source files | `IMPLEMENTED NOW` |
| Content | Populate storyboard and production-design visual aids | Directories exist; systematic image/reference population is incomplete | Begin only after interpretation labels, rights metadata and source conventions are enforced | `BACKLOG` |
| Content | Start bilingual terminology notes early | 10F bilingual draft, translation guidelines and 10G terminology gates already exist | Credit as already active; consolidate terminology issues in specialist review | `ALREADY PRESENT` |
| Content | Add specialist consultation tracking | Specialist review needs are repeatedly stated but no single register existed | Add a simple register with scope, reviewer, evidence, outcome and affected records | `IMPLEMENTED NOW` |
| Content | Add adaptation risk register | Risks existed across individual documents but not as a consolidated governance record | Add a project-level risk register | `IMPLEMENTED NOW` |
| Polish | Improve repository description | Current description may be less discoverable than the recommended wording | Recommended description: `Scholarly cinematic adaptation project for the Tamil epic Manimekalai with full evidence traceability.` | `MANUAL REPOSITORY SETTING` |
| Polish | Add repository topics | No file-based mechanism changes GitHub topics | Suggested topics: `tamil-literature`, `manimekalai`, `buddhist-studies`, `screenplay-development`, `historical-adaptation` | `MANUAL REPOSITORY SETTING` |
| Polish | Add a licence | No root licence found; source texts, research notes and future screenplay rights may require different treatment | Do not select `CC BY-NC` or another licence automatically. Record an owner decision covering repository code, documentation, original screenplay text and third-party source material | `DECISION REQUIRED` |

## Pipeline actions created

### Completed in this intake

1. Root status dashboard.
2. Central documentation index.
3. Venpa evidence-preparation packet for the thirteen proposed decisions.
4. External review reconciliation.
5. Expanded contribution workflow.
6. Adaptation risk register.
7. Specialist consultation register.
8. Private-source handling guidance.
9. Root README discoverability and current-state correction.

### Technical backlog

| ID | Work item | Acceptance criteria | Dependency |
|---|---|---|---|
| `GOV-TECH-001` | Add validator `--summary` | Default behaviour unchanged; flag prints counts by sequence and check category; tests pass | Validator runtime access |
| `GOV-TECH-002` | Generate validation report | Deterministic Markdown report includes commit, timestamp/source, scene counts, TRACE parity and failures; not hand edited | `GOV-TECH-001` |
| `GOV-TECH-003` | Add orphan-reference checks | Detect missing `EV-*`, `AD-*`, `SC-*`, `VENPA-USE-*` and invalid document links where machine-verifiable | Schema review |
| `GOV-TECH-004` | Surface validation status | README/STATUS links to a real recorded run or badge; never display a guessed pass state | Successful CI run |
| `GOV-TECH-005` | Add repository metadata | Description and topics updated in GitHub settings | Manual owner action |

### Content and collaboration backlog

| ID | Work item | Acceptance criteria | Dependency |
|---|---|---|---|
| `GOV-CONTENT-001` | Storyboard reference pilot | One sequence receives rights-labelled `[TEXT]`, `[HISTORY]`, `[INTERPRETATION]`, `[CAUTION]` visual references | Rights and visual policy |
| `GOV-CONTENT-002` | Production-design reference pilot | One location/costume/object dossier receives provenance, date, uncertainty and adaptation use | Specialist review |
| `GOV-CONTENT-003` | Licence decision | Written decision separates original code/docs/screenplay from third-party texts and images | Owner/legal review |
| `GOV-CONTENT-004` | External collaboration pilot | One evidence proposal is processed through the expanded CONTRIBUTING workflow | Licence and review ownership |

## Governance rule

Praise in an external review is not validation evidence, and a suggested improvement is not automatically a requirement. Recommendations enter the pipeline only after reconciliation with existing work, source obligations, project scope and current gates.

This review authorises repository-governance and evidence work only. It does not approve any Venpa proposal or screenplay revision.
