import importlib.util
import contextlib
import io
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

    def test_legacy_absorbs_without_colon(self):
        self.assertEqual(
            self.parse("FU-001 | SC-001 | absorbs SC-002, SC-003"),
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

    def test_primary_scene_cannot_absorb_itself(self):
        errors: list[str] = []
        validator.parse_trace(
            "FU-001 | SC-001 | ABSORBS: SC-001",
            Path("fixture.fountain"),
            errors,
        )
        self.assertTrue(any("also appears in ABSORBS" in error for error in errors))

    def test_duplicate_absorbed_scene_is_reported(self):
        errors: list[str] = []
        validator.parse_trace(
            "FU-001 | SC-001 | ABSORBS: SC-002; SC-002",
            Path("fixture.fountain"),
            errors,
        )
        self.assertTrue(any("Duplicate absorbed scene ID" in error for error in errors))

    def test_corpus_rejects_duplicate_unit_and_scene_use(self):
        errors: list[str] = []
        validator.validate_corpus_trace_uniqueness(
            "English",
            [
                (1, (("FU-001", "SC-001", ("SC-002",)),)),
                (2, (("FU-001", "SC-003", ("SC-002",)),)),
            ],
            errors,
        )
        self.assertTrue(any("Duplicate unit ID FU-001" in error for error in errors))
        self.assertTrue(any("Duplicate source-scene use SC-002" in error for error in errors))

    def test_feature_matrix_contains_all_active_units(self):
        errors: list[str] = []
        expected = validator.load_expected_traces(errors)
        self.assertEqual(errors, [])
        self.assertEqual(len(expected), 72)
        self.assertEqual(
            expected["FU-001"],
            ("FU-001", "SC-039", ("SC-001", "SC-004", "SC-034")),
        )

    def test_current_bilingual_corpus_passes(self):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = validator.main()
        self.assertEqual(result, 0, output.getvalue())

    def test_tamil_style_rejects_roman_character_cue(self):
        errors: list[str] = []
        validator.validate_tamil_style(
            "MANIMEKALAI\n\nஉரையாடல்.\n", Path("tamil.fountain"), errors
        )
        self.assertTrue(any("Roman-script character cue" in error for error in errors))

    def test_tamil_style_rejects_noncanonical_rajamadevi(self):
        errors: list[str] = []
        validator.validate_tamil_style(
            "ராஜமாதேவி\n\nஉரையாடல்.\n", Path("tamil.fountain"), errors
        )
        self.assertTrue(any("use இராசமாதேவி" in error for error in errors))

    def test_tamil_style_accepts_tamil_cue_and_canonical_name(self):
        errors: list[str] = []
        validator.validate_tamil_style(
            "இராசமாதேவி\n\nஉரையாடல்.\n", Path("tamil.fountain"), errors
        )
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
