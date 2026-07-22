#!/usr/bin/env python3
"""Regression tests for the repository register validator."""
from __future__ import annotations

import importlib.util
import contextlib
import io
import tempfile
import unittest
from pathlib import Path

SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts/validate_repository.py"
SPEC = importlib.util.spec_from_file_location("validate_repository", SCRIPT_PATH)
assert SPEC and SPEC.loader
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)


class RepositoryValidatorTests(unittest.TestCase):
    def test_split_ids_ignores_empty_values(self) -> None:
        self.assertEqual(
            validator.split_ids("EV-0001; EV-0002;;"),
            ["EV-0001", "EV-0002"],
        )

    def test_validate_ids_reports_duplicate_and_incomplete_range(self) -> None:
        rows = [
            {
                "source_id": "SRC-0001",
                "_source_file": "sources/source_register.csv",
                "_source_line": "2",
            },
            {
                "source_id": "SRC-0001",
                "_source_file": "sources/source_register.csv",
                "_source_line": "3",
            },
        ]
        errors: list[str] = []
        validator.validate_ids("source", rows, "source_id", errors)
        self.assertTrue(any("Duplicate source ID SRC-0001" in error for error in errors))
        self.assertTrue(any("Missing source IDs" in error for error in errors))
        self.assertTrue(any("Expected 45 source records" in error for error in errors))

    def test_validate_references_reports_unknown_id(self) -> None:
        rows = [
            {
                "decision_id": "AD-0001",
                "evidence_ids": "EV-0001;EV-9999",
                "_source_file": "docs/06-adaptation-decisions/decision_log.csv",
                "_source_line": "2",
            }
        ]
        errors: list[str] = []
        validator.validate_references(
            rows,
            "decision_id",
            "evidence_ids",
            {"EV-0001"},
            "evidence",
            errors,
        )
        self.assertEqual(len(errors), 1)
        self.assertIn("unknown evidence EV-9999", errors[0])

    def test_exact_expected_ranges_are_contiguous(self) -> None:
        self.assertEqual(validator.EXPECTED_IDS["source"][0], "SRC-0001")
        self.assertEqual(validator.EXPECTED_IDS["source"][-1], "SRC-0045")
        self.assertEqual(validator.EXPECTED_IDS["evidence"][-1], "EV-0318")
        self.assertEqual(validator.EXPECTED_IDS["decision"][-1], "AD-0170")
        self.assertEqual(validator.EXPECTED_IDS["scene"][-1], "SC-154")

    def test_current_repository_corpus_passes(self) -> None:
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = validator.main()
        self.assertEqual(result, 0, output.getvalue())

    def test_read_csv_reports_short_rows(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "decision.csv"
            path.write_text("decision_id,title\nAD-0001\n", encoding="utf-8")
            errors: list[str] = []
            validator.read_csv(path, "decision", errors)
        self.assertTrue(any("missing CSV field" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
