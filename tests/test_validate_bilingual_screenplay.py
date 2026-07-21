import importlib.util
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts/validate_bilingual_screenplay.py"
spec = importlib.util.spec_from_file_location("validator", MODULE_PATH)
validator = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(validator)


class ParseTraceTests(unittest.TestCase):
    def parse(self, raw: str):
        errors: list[str] = []
        result = validator.parse_trace(raw, Path("fixture.fountain"), errors)
        self.assertEqual(errors, [])
        return result

    def test_comma_delimited_absorbs(self):
        self.assertEqual(
            self.parse("FU-001 | SC-001 | ABSORBS: SC-002, SC-003"),
            ("FU-001", "SC-001", ("SC-002", "SC-003")),
        )

    def test_semicolon_delimited_absorbs(self):
        self.assertEqual(
            self.parse("FU-001 | SC-001 | ABSORBS: SC-002; SC-003"),
            ("FU-001", "SC-001", ("SC-002", "SC-003")),
        )

    def test_lowercase_absorbs_label(self):
        self.assertEqual(
            self.parse("FU-001 | SC-001 | absorbs: SC-002, SC-003"),
            ("FU-001", "SC-001", ("SC-002", "SC-003")),
        )

    def test_mixed_delimiters_and_whitespace(self):
        self.assertEqual(
            self.parse("FU-001 | SC-001 | ABSORBS: SC-002 ;SC-003,  SC-004"),
            ("FU-001", "SC-001", ("SC-002", "SC-003", "SC-004")),
        )

    def test_invalid_absorbed_id_is_reported(self):
        errors: list[str] = []
        validator.parse_trace(
            "FU-001 | SC-001 | ABSORBS: BAD-002",
            Path("fixture.fountain"),
            errors,
        )
        self.assertTrue(any("Invalid absorbed scene ID" in error for error in errors))


if __name__ == "__main__":
    unittest.main()