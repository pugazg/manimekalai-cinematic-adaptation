"""Integrity tests for registered storyboard assets."""
from __future__ import annotations

import csv
import hashlib
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BOARD = ROOT / "docs/08-storyboard-bible"


class StoryboardAssetTests(unittest.TestCase):
    def test_registered_assets_exist_and_match_hashes(self) -> None:
        with (BOARD / "storyboard-asset-register.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(4, len(rows))
        for row in rows:
            asset = BOARD / row["filename"]
            prompt = BOARD / row["prompt_record"]
            self.assertTrue(asset.is_file(), row["asset_id"])
            self.assertTrue(prompt.is_file(), row["asset_id"])
            self.assertEqual(
                row["sha256"],
                hashlib.sha256(asset.read_bytes()).hexdigest(),
                row["asset_id"],
            )
            self.assertEqual("[INTERPRETATION]", row["visual_classification"])
            self.assertEqual("PENDING_SR_013", row["rights_status"])

    def test_every_registered_shot_exists_in_matrix(self) -> None:
        with (BOARD / "storyboard-shot-matrix.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            shots = {row["shot_id"] for row in csv.DictReader(handle)}
        with (BOARD / "storyboard-asset-register.csv").open(
            encoding="utf-8", newline=""
        ) as handle:
            rows = list(csv.DictReader(handle))
        for row in rows:
            for shot_id in row["shot_ids"].split(";"):
                self.assertIn(shot_id, shots)


if __name__ == "__main__":
    unittest.main()

