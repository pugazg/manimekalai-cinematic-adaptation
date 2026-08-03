"""Integrity tests for the external-review execution layer."""
from __future__ import annotations

import csv
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GOV = ROOT / "docs/11-project-governance"


def read_csv(name: str) -> list[dict[str, str]]:
    with (GOV / name).open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


class ExternalReviewControlTests(unittest.TestCase):
    def test_assignment_register_exactly_covers_specialist_register(self) -> None:
        specialist = read_csv("specialist-review-register.csv")
        assignments = read_csv("external-review-assignment-register.csv")
        specialist_ids = [row["review_id"] for row in specialist]
        assignment_ids = [row["review_id"] for row in assignments]
        self.assertEqual([f"SR-{number:03d}" for number in range(1, 14)], specialist_ids)
        self.assertEqual(specialist_ids, assignment_ids)
        self.assertEqual(len(assignment_ids), len(set(assignment_ids)))

    def test_unassigned_rows_do_not_claim_review_or_approval(self) -> None:
        assignments = read_csv("external-review-assignment-register.csv")
        for row in assignments:
            self.assertEqual("UNASSIGNED", row["assignment_status"])
            self.assertEqual("", row["reviewer_public_name"])
            self.assertEqual("", row["result"])
            self.assertEqual("", row["repository_disposition"])

    def test_reviewer_rubric_exactly_covers_every_assignment(self) -> None:
        assignments = read_csv("external-review-assignment-register.csv")
        rubric = read_csv("reviewer-selection-rubric.csv")
        self.assertEqual(
            [row["review_id"] for row in assignments],
            [row["review_id"] for row in rubric],
        )
        for row in rubric:
            self.assertTrue(row["minimum_qualification"], row["review_id"])
            self.assertTrue(row["evidence_access_required"], row["review_id"])
            self.assertTrue(row["conflict_or_disqualifier"], row["review_id"])
            self.assertTrue((GOV / row["packet"]).is_file(), row["review_id"])

    def test_execution_documents_exist(self) -> None:
        for name in (
            "external-review-execution-protocol.md",
            "reviewer-sourcing-shortlist.md",
            "critical-review-candidate-slate.md",
            "tamil-table-read-protocol.md",
            "rights-decision-execution-checklist.md",
            "specialist-review-packets/reviewer-invitation-and-intake.md",
        ):
            self.assertTrue((GOV / name).is_file(), name)

    def test_sourcing_shortlist_covers_every_track_without_claiming_assignment(self) -> None:
        shortlist = (GOV / "reviewer-sourcing-shortlist.md").read_text(
            encoding="utf-8"
        )
        for number in range(1, 14):
            self.assertIn(f"`SR-{number:03d}`", shortlist)
        self.assertIn("does **not** name, appoint, endorse", shortlist)
        self.assertIn("remains `UNASSIGNED`", shortlist)

    def test_critical_candidate_slate_preserves_non_assignment(self) -> None:
        slate = (GOV / "critical-review-candidate-slate.md").read_text(
            encoding="utf-8"
        )
        for review_id in ("SR-001", "SR-002", "SR-003", "SR-013"):
            self.assertIn(f"`{review_id}`", slate)
        self.assertIn("authoritative assignment register therefore remains `UNASSIGNED`", slate)
        self.assertIn("INSTITUTIONAL_REFERRAL_REQUIRED", slate)
        self.assertIn("No licence changes while `SR-013` is unassigned", slate)

    def test_option_b_rights_state_is_explicit_and_bounded(self) -> None:
        root_rights = (ROOT / "RIGHTS_AND_PERMISSIONS.md").read_text(encoding="utf-8")
        notice = (ROOT / "NOTICE").read_text(encoding="utf-8")
        decision = (GOV / "owner-rights-and-licensing-decision.md").read_text(
            encoding="utf-8"
        )
        self.assertIn("Option B", root_rights)
        self.assertIn("All rights are reserved", root_rights)
        self.assertIn("Third-party", notice)
        self.assertIn("B — Fully reserved interim state", decision)
        self.assertIn("pending `SR-013`", decision)

    def test_option_b_directory_notices_and_pr_declaration_exist(self) -> None:
        for path in (
            ROOT / "docs/RIGHTS.md",
            ROOT / "docs/08-storyboard-bible/RIGHTS.md",
            ROOT / "docs/10-screenplay-architecture/RIGHTS.md",
            ROOT / "releases/RIGHTS.md",
            ROOT / "scripts/RIGHTS.md",
            ROOT / ".github/pull_request_template.md",
        ):
            self.assertTrue(path.is_file(), path.relative_to(ROOT))
        template = (ROOT / ".github/pull_request_template.md").read_text(
            encoding="utf-8"
        )
        self.assertIn("does not transfer or grant", template)
        self.assertIn("third-party material", template)


if __name__ == "__main__":
    unittest.main()
