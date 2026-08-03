"""Integrity tests for production-design control records."""
from __future__ import annotations

import csv
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "docs/09-production-design"


class ProductionDesignControlTests(unittest.TestCase):
    def test_all_twelve_design_families_are_present(self) -> None:
        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(
            [f"PD-{number:03d}" for number in range(1, 13)],
            [row["design_id"] for row in rows],
        )
        for row in rows:
            self.assertTrue(row["evidence_foundation"])
            self.assertTrue(row["interpretation_boundary"])
            self.assertTrue(row["prohibited_default"])
            self.assertTrue(row["specialist_rows"])

    def test_uncertainty_register_is_complete_and_explicit(self) -> None:
        with (DESIGN / "visual-uncertainty-register.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(24, len(rows))
        self.assertEqual(
            [f"VU-{number:03d}" for number in range(1, 25)],
            [row["uncertainty_id"] for row in rows],
        )
        for row in rows:
            self.assertTrue(row["claim_prohibited"])
            self.assertIn(row["status"], {"OPEN", "LOCKED_PROHIBITION"})

    def test_puhar_map_is_valid_svg_and_labelled_interpretation(self) -> None:
        path = DESIGN / "maps/puhar-production-zone-map.svg"
        ET.parse(path)
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NOT A GEOGRAPHIC MAP", text)

    def test_season_water_calendar_controls_all_sequences(self) -> None:
        path = DESIGN / "season-and-water-continuity-calendar.md"
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        for number in range(1, 11):
            self.assertIn(f"`SEQ-{number:02d}`", text)
        for number in range(0, 6):
            self.assertIn(f"`W{number}", text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("CALENDAR_0_1_READY", rows["PD-011"]["status"])
        self.assertIn("specialist review", rows["PD-011"]["next_deliverable"])


if __name__ == "__main__":
    unittest.main()
