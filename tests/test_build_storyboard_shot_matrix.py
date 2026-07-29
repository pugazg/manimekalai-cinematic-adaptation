"""Regression tests for the deterministic storyboard shot matrix."""
from __future__ import annotations

import csv
import importlib.util
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "build_storyboard_shot_matrix",
    ROOT / "scripts/build_storyboard_shot_matrix.py",
)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class StoryboardShotMatrixTests(unittest.TestCase):
    def test_builds_three_shots_for_every_active_unit(self) -> None:
        rows = MODULE.build_rows()
        self.assertEqual(216, len(rows))
        units = {row["feature_unit_id"] for row in rows}
        self.assertEqual(72, len(units))
        for feature_unit_id in units:
            unit_rows = [row for row in rows if row["feature_unit_id"] == feature_unit_id]
            self.assertEqual(
                ["ENTRY", "DECISION", "CONSEQUENCE"],
                [row["shot_role"] for row in unit_rows],
            )

    def test_committed_matrix_matches_generator(self) -> None:
        with MODULE.OUTPUT.open(encoding="utf-8", newline="") as handle:
            committed = list(csv.DictReader(handle))
        self.assertEqual(MODULE.build_rows(), committed)

    def test_every_shot_has_traceability(self) -> None:
        for row in MODULE.build_rows():
            self.assertTrue(row["primary_scene_id"].startswith("SC-"))
            self.assertTrue(row["evidence_ids"])
            self.assertTrue(row["adaptation_decision_ids"])
            self.assertEqual(
                "[INTERPRETATION] grounded in registered evidence and decisions",
                row["visual_classification"],
            )


if __name__ == "__main__":
    unittest.main()

