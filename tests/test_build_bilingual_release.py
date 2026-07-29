"""Regression tests for the deterministic bilingual release builder."""
from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "build_bilingual_release",
    ROOT / "scripts/build_bilingual_release.py",
)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class BilingualReleaseTests(unittest.TestCase):
    def test_source_sequence_counts(self) -> None:
        self.assertEqual(10, len(MODULE.sequence_files(MODULE.EN_DIR)))
        self.assertEqual(10, len(MODULE.sequence_files(MODULE.TA_DIR)))

    def test_built_fountain_parity(self) -> None:
        en = MODULE.build_fountain(MODULE.sequence_files(MODULE.EN_DIR))
        ta = MODULE.build_fountain(MODULE.sequence_files(MODULE.TA_DIR))
        self.assertEqual((72, 1, 72), MODULE.stats(en)[:3])
        self.assertEqual((72, 1, 72), MODULE.stats(ta)[:3])
        self.assertEqual(MODULE.stats(en)[3], MODULE.stats(ta)[3])

    def test_committed_release_is_deterministic(self) -> None:
        before = {
            path.name: path.read_bytes()
            for path in MODULE.OUTPUT.iterdir()
            if path.is_file()
        }
        MODULE.write_release()
        after = {
            path.name: path.read_bytes()
            for path in MODULE.OUTPUT.iterdir()
            if path.is_file()
        }
        self.assertEqual(before, after)


if __name__ == "__main__":
    unittest.main()

