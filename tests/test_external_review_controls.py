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

    def test_execution_documents_exist(self) -> None:
        for name in (
            "external-review-execution-protocol.md",
            "tamil-table-read-protocol.md",
            "rights-decision-execution-checklist.md",
        ):
            self.assertTrue((GOV / name).is_file(), name)


if __name__ == "__main__":
    unittest.main()
