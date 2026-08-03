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

        control_text = (DESIGN / "maps/puhar-production-zone-map.md").read_text(
            encoding="utf-8"
        )
        self.assertIn("RELATIONSHIP_MAP_0_1_READY", control_text)
        self.assertIn("No distance may be measured", control_text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("RELATIONSHIP_MAP_0_1_READY", rows["PD-001"]["status"])
        self.assertIn("without converting", rows["PD-001"]["next_deliverable"])

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

    def test_amudhasurabhi_plate_controls_custody_and_effects(self) -> None:
        path = DESIGN / "amudhasurabhi-prop-continuity.md"
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        for handling in range(0, 7):
            self.assertIn(f"`H{handling}", text)
        for level in range(0, 6):
            self.assertIn(f"`F{level}", text)
        for cleanliness in range(0, 5):
            self.assertIn(f"`C{cleanliness}", text)
        self.assertIn("`F2 → F3`", text)
        self.assertIn("No jewels", text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("CONTINUITY_PLATE_0_1_READY", rows["PD-008"]["status"])

    def test_food_service_plate_controls_zones_and_clean_routes(self) -> None:
        path = DESIGN / "food-vessel-and-service-workflow.md"
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        for zone in range(1, 10):
            self.assertIn(f"`Z{zone}", text)
        for state in range(0, 8):
            self.assertIn(f"`S{state}", text)
        for prop in ("FV-HS", "FV-PR", "FV-AS", "FV-SV", "FV-RC", "FV-WT", "FV-CL", "FV-RM", "FV-TR"):
            self.assertIn(f"`{prop}`", text)
        self.assertIn("Clean / used route prohibition", text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("WORKFLOW_PLATE_0_1_READY", rows["PD-007"]["status"])

    def test_animal_plan_prohibits_live_distress_and_impact(self) -> None:
        path = DESIGN / "animal-action-and-welfare-plan.md"
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        for action_class in range(0, 6):
            self.assertIn(f"`A{action_class}", text)
        for plate in range(1, 10):
            self.assertIn(f"`COW-{plate:02d}`", text)
        self.assertIn("No shot requires real fear", text)
        self.assertIn("no live cow in impact setup", text)
        self.assertIn("stop-work authority", text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("WELFARE_PLAN_0_1_READY", rows["PD-012"]["status"])

    def test_guard_weapon_plate_preserves_choice_and_safe_action(self) -> None:
        path = DESIGN / "guard-custody-and-weapon-handling.md"
        text = path.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        for guard_state in range(0, 7):
            self.assertIn(f"`G{guard_state}", text)
        for weapon_state in range(0, 8):
            self.assertIn(f"`K{weapon_state}", text)
        for plate in range(1, 11):
            self.assertIn(f"`SWORD-{plate:02d}`", text)
        self.assertIn("not an equal duel", text)
        self.assertIn("No sharpened or live-edge weapon", text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("HANDLING_PLATE_0_1_READY", rows["PD-010"]["status"])

    def test_maritime_silhouette_family_preserves_uncertainty(self) -> None:
        document = DESIGN / "maritime-vessel-silhouette-family.md"
        text = document.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NOT AN EXACT ANCIENT SHIP RECONSTRUCTION", text)
        self.assertIn("`SR-010`", text)
        for vessel in range(1, 6):
            self.assertIn(f"`V{vessel}`", text)

        plate = DESIGN / "plates/maritime-vessel-silhouette-family.svg"
        ET.parse(plate)
        plate_text = plate.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", plate_text)
        self.assertIn("NOT AN EXACT ANCIENT SHIP RECONSTRUCTION", plate_text)
        for vessel in range(1, 6):
            self.assertIn(f"V{vessel}", plate_text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("SILHOUETTE_PLATE_0_1_READY", rows["PD-003"]["status"])
        self.assertIn("specialist review", rows["PD-003"]["next_deliverable"])

    def test_architecture_water_plate_separates_city_systems(self) -> None:
        document = DESIGN / "architecture-water-comparative-plate.md"
        text = document.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NOT AN EXACT ANCIENT CITY PLAN", text)
        for city in range(1, 4):
            self.assertIn(f"`A{city}", text)
        for state in "ABCDEF":
            self.assertIn(f"`W-{state}`", text)
        self.assertIn("later Pallava", text)

        plate = DESIGN / "plates/architecture-water-comparative-plate.svg"
        ET.parse(plate)
        plate_text = plate.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", plate_text)
        self.assertIn("NOT AN EXACT ANCIENT CITY PLAN", plate_text)
        for city in range(1, 4):
            self.assertIn(f"A{city}", plate_text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("COMPARATIVE_PLATE_0_1_READY", rows["PD-004"]["status"])

    def test_indra_festival_map_is_civic_and_non_anachronistic(self) -> None:
        document = DESIGN / "indra-festival-public-space-map.md"
        text = document.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NOT A RECONSTRUCTED RITUAL ITINERARY", text)
        self.assertIn("twenty-eight-day", text)
        for zone in range(1, 10):
            self.assertIn(f"`F{zone}`", text)
        for phase in range(0, 7):
            self.assertIn(f"`P{phase}", text)
        self.assertIn("later calendar-art", text)

        plate = DESIGN / "plates/indra-festival-public-space-map.svg"
        ET.parse(plate)
        plate_text = plate.read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", plate_text)
        self.assertIn("NOT A RECONSTRUCTED RITUAL ITINERARY", plate_text)
        for zone in range(1, 10):
            self.assertIn(f"F{zone}", plate_text)

        with (DESIGN / "production-design-control-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("PUBLIC_SPACE_MAP_0_1_READY", rows["PD-002"]["status"])

    def test_costume_board_controls_layers_families_and_movement(self) -> None:
        text = (DESIGN / "costume-layer-and-movement-board.md").read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NOT EXACT SANGAM DRESS", text)
        for number in range(0, 8):
            self.assertIn(f"`L{number}`", text)
        for number in range(1, 9):
            self.assertIn(f"`C{number}", text)
            self.assertIn(f"`M{number}`", text)
        self.assertIn("Bharatanatyam fan", text)
        plate = DESIGN / "plates/costume-layer-and-movement-board.svg"
        ET.parse(plate)
        self.assertIn("NOT EXACT SANGAM DRESS", plate.read_text(encoding="utf-8"))
        with (DESIGN / "production-design-control-matrix.csv").open(encoding="utf-8", newline="") as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("LAYER_MOVEMENT_BOARD_0_1_READY", rows["PD-005"]["status"])

    def test_ornament_board_controls_material_claims_and_safety(self) -> None:
        text = (DESIGN / "ornament-material-and-movement-board.md").read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("MATERIAL POSSIBILITY IS NOT A COMPLETE COSTUME SET", text)
        for number in range(1, 9):
            self.assertIn(f"`O{number}`", text)
            self.assertIn(f"`P{number}`", text)
            self.assertIn(f"`T{number}", text)
        self.assertIn("temple-jewellery", text)
        plate = DESIGN / "plates/ornament-material-and-movement-board.svg"
        ET.parse(plate)
        self.assertIn("MATERIAL POSSIBILITY IS NOT A COMPLETE COSTUME SET", plate.read_text(encoding="utf-8"))
        with (DESIGN / "production-design-control-matrix.csv").open(encoding="utf-8", newline="") as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("MATERIAL_MOVEMENT_BOARD_0_1_READY", rows["PD-006"]["status"])

    def test_music_dossier_separates_acoustic_worlds_and_score(self) -> None:
        text = (DESIGN / "music-performance-acoustic-evidence-dossier.md").read_text(encoding="utf-8")
        self.assertIn("[INTERPRETATION]", text)
        self.assertIn("NO EXACT ANCIENT ENSEMBLE", text)
        for number in range(0, 10):
            self.assertIn(f"`S{number}`", text)
        for number in range(1, 9):
            self.assertIn(f"`R{number}`", text)
            self.assertIn(f"`I{number}`", text)
        for number in range(1, 11):
            self.assertIn(f"`A{number}`", text)
        self.assertIn("no rival philosophical school assigned villain music", text)
        with (DESIGN / "production-design-control-matrix.csv").open(encoding="utf-8", newline="") as handle:
            rows = {row["design_id"]: row for row in csv.DictReader(handle)}
        self.assertEqual("ACOUSTIC_DOSSIER_0_1_READY", rows["PD-009"]["status"])


if __name__ == "__main__":
    unittest.main()
