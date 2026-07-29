"""Regression tests for the exhaustive tracked-file auditor."""
from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "audit_all_tracked_files", ROOT / "scripts/audit_all_tracked_files.py"
)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class TrackedFileAuditTests(unittest.TestCase):
    def test_current_repository_corpus_passes(self) -> None:
        result = MODULE.run_audit()
        self.assertEqual([], result.issues)
        self.assertEqual(result.tracked, result.ledger_rows)
        self.assertGreaterEqual(result.binary_assets, 1)


if __name__ == "__main__":
    unittest.main()
