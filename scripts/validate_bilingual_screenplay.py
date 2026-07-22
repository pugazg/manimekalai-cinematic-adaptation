#!/usr/bin/env python3
"""Validate structural parity between English and Tamil screenplay drafts."""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_DIR = ROOT / "docs/10-screenplay-architecture/10E-screenplay-draft"
TA_DIR = ROOT / "docs/10-screenplay-architecture/10F-bilingual-screenplay/TA"
EXPECTED = {
    1: range(1, 7),
    2: range(7, 14),
    3: range(14, 18),
    4: range(18, 35),
    5: range(35, 44),
    6: range(44, 50),
    7: range(50, 54),
    8: range(54, 60),
    9: range(60, 66),
    10: range(66, 73),
}
FEATURE_MATRIX = ROOT / "docs/10-screenplay-architecture/10B_feature_unit_matrix.csv"
SEQ_RE = re.compile(r"SEQ-(\d{2})_")
SCENE_RE = re.compile(r"#(\d{1,3})#")
TRACE_RE = re.compile(r"/\*\s*TRACE:\s*(.*?)\s*\*/")
ROMAN_CUE_RE = re.compile(r"(?m)^[A-Z][A-Z '()\-]+$")
PROHIBITED_TAMIL_NAME_RE = re.compile(
    r"இ{2,}ராசமாதேவி|ராஜமாதேவி|(?<!இ)ராசமாதேவி"
)
UNIT_RE = re.compile(r"^(?:FU|BR)-\d{3}$")
SC_RE = re.compile(r"^SC-\d{3}$")
Trace = tuple[str, str, tuple[str, ...]]


def load_expected_traces(errors: list[str]) -> dict[str, Trace]:
    """Load the approved unit-to-source-scene mapping from the 10B matrix."""
    expected: dict[str, Trace] = {}
    try:
        with FEATURE_MATRIX.open(encoding="utf-8", newline="") as handle:
            reader = csv.DictReader(handle)
            required = {
                "feature_unit_id",
                "primary_scene_id",
                "absorbed_scene_ids",
            }
            missing = required - set(reader.fieldnames or [])
            if missing:
                errors.append(
                    f"{FEATURE_MATRIX} missing fields: {', '.join(sorted(missing))}"
                )
                return expected
            for row_number, row in enumerate(reader, start=2):
                unit = row["feature_unit_id"].strip()
                primary = row["primary_scene_id"].strip()
                absorbed = tuple(
                    item.strip()
                    for item in row["absorbed_scene_ids"].split(";")
                    if item.strip()
                )
                if unit in expected:
                    errors.append(
                        f"Duplicate feature unit {unit} in {FEATURE_MATRIX}:{row_number}"
                    )
                expected[unit] = (unit, primary, absorbed)
    except OSError as exc:
        errors.append(f"Cannot read feature-unit matrix {FEATURE_MATRIX}: {exc}")
    return expected


def discover(folder: Path, errors: list[str]) -> dict[int, Path]:
    """Discover exactly one Fountain file for every approved sequence."""
    found: dict[int, Path] = {}
    for path in sorted(folder.glob("SEQ-*.fountain")):
        match = SEQ_RE.search(path.name)
        if not match:
            errors.append(f"Cannot read sequence number: {path}")
            continue
        number = int(match.group(1))
        if number in found:
            errors.append(f"Duplicate sequence {number:02d} in {folder}")
        found[number] = path
    missing = sorted(set(EXPECTED) - set(found))
    extra = sorted(set(found) - set(EXPECTED))
    if missing:
        errors.append(f"{folder} missing sequences: {missing}")
    if extra:
        errors.append(f"{folder} unexpected sequences: {extra}")
    return found


def parse_trace(raw: str, path: Path, errors: list[str]) -> Trace | None:
    """Parse and validate one non-printing TRACE comment."""
    parts = [part.strip() for part in raw.split("|") if part.strip()]
    if len(parts) < 2:
        errors.append(f"Malformed TRACE in {path}: {raw!r}")
        return None
    unit, primary = parts[:2]
    absorbed: list[str] = []
    if not UNIT_RE.fullmatch(unit):
        errors.append(f"Invalid unit ID {unit!r} in {path}")
    if not SC_RE.fullmatch(primary):
        errors.append(f"Invalid primary scene ID {primary!r} in {path}")
    for component in parts[2:]:
        match = re.fullmatch(r"ABSORBS\s*:?[ \t]+(.+)", component, re.IGNORECASE)
        if not match:
            errors.append(f"Unknown TRACE component {component!r} in {path}")
            continue
        value = match.group(1)
        for scene_id in filter(None, (item.strip() for item in re.split(r"[,;]", value))):
            if not SC_RE.fullmatch(scene_id):
                errors.append(f"Invalid absorbed scene ID {scene_id!r} in {path}")
            absorbed.append(scene_id)

    duplicate_absorbed = sorted(
        scene_id for scene_id in set(absorbed) if absorbed.count(scene_id) > 1
    )
    if duplicate_absorbed:
        errors.append(
            f"Duplicate absorbed scene ID(s) in {path}: {', '.join(duplicate_absorbed)}"
        )
    if primary in absorbed:
        errors.append(f"Primary scene ID {primary} also appears in ABSORBS in {path}")
    return unit, primary, tuple(absorbed)


def parse(path: Path, number: int, errors: list[str]) -> tuple[Trace, ...]:
    """Validate one sequence file and return its TRACE signatures."""
    text = path.read_text(encoding="utf-8")
    scenes = tuple(map(int, SCENE_RE.findall(text)))
    traces = tuple(
        trace
        for raw in TRACE_RE.findall(text)
        if (trace := parse_trace(raw, path, errors)) is not None
    )
    expected = tuple(EXPECTED[number])
    if scenes != expected:
        errors.append(f"{path}: expected scenes {expected}, got {scenes}")
    if len(traces) != len(expected):
        errors.append(f"{path}: expected {len(expected)} TRACE records, got {len(traces)}")
    if not text.rstrip().endswith(
        ("END.", f"END SEQUENCE {number:02d}", "CUT TO BLACK.")
    ):
        errors.append(f"{path}: missing recognised ending marker")
    return traces


def validate_tamil_style(text: str, path: Path, errors: list[str]) -> None:
    """Enforce Tamil-edition cue script and already-locked name forms."""
    roman_cues = sorted(set(ROMAN_CUE_RE.findall(text)))
    if roman_cues:
        errors.append(
            f"{path}: Roman-script character cue(s) in Tamil edition: "
            f"{', '.join(roman_cues)}"
        )
    prohibited_names = sorted(set(PROHIBITED_TAMIL_NAME_RE.findall(text)))
    if prohibited_names:
        errors.append(
            f"{path}: non-canonical Rajamadevi form(s): "
            f"{', '.join(prohibited_names)}; use இராசமாதேவி"
        )


def validate_corpus_trace_uniqueness(
    language: str,
    traces_by_sequence: list[tuple[int, tuple[Trace, ...]]],
    errors: list[str],
    expected_traces: dict[str, Trace] | None = None,
) -> None:
    """Reject duplicate units or source-scene roles inside one language corpus."""
    seen_units: dict[str, str] = {}
    seen_scenes: dict[str, str] = {}
    for sequence_number, traces in traces_by_sequence:
        for trace_number, (unit, primary, absorbed) in enumerate(traces, start=1):
            location = f"{language} sequence {sequence_number:02d} TRACE {trace_number}"
            if unit in seen_units:
                errors.append(
                    f"Duplicate unit ID {unit} in {seen_units[unit]} and {location}"
                )
            else:
                seen_units[unit] = location
            for role, scene_id in (("primary", primary), *(("absorbed", item) for item in absorbed)):
                if scene_id in seen_scenes:
                    errors.append(
                        f"Duplicate source-scene use {scene_id} in {seen_scenes[scene_id]} "
                        f"and {location} ({role})"
                    )
                else:
                    seen_scenes[scene_id] = f"{location} ({role})"
    if expected_traces is not None:
        actual_traces = {
            trace[0]: trace
            for _, traces in traces_by_sequence
            for trace in traces
        }
        missing_units = sorted(set(expected_traces) - set(actual_traces))
        extra_units = sorted(set(actual_traces) - set(expected_traces))
        if missing_units:
            errors.append(f"{language} corpus missing units: {', '.join(missing_units)}")
        if extra_units:
            errors.append(f"{language} corpus has unexpected units: {', '.join(extra_units)}")
        for unit in sorted(set(expected_traces) & set(actual_traces)):
            if actual_traces[unit] != expected_traces[unit]:
                errors.append(
                    f"{language} {unit} TRACE differs from 10B feature-unit matrix: "
                    f"expected {expected_traces[unit]}, got {actual_traces[unit]}"
                )


def main() -> int:
    errors: list[str] = []
    expected_traces = load_expected_traces(errors)
    english = discover(EN_DIR, errors)
    tamil = discover(TA_DIR, errors)
    english_corpus: list[tuple[int, tuple[Trace, ...]]] = []
    tamil_corpus: list[tuple[int, tuple[Trace, ...]]] = []
    audited = 0

    for number in sorted(EXPECTED):
        if number not in english or number not in tamil:
            continue
        en_traces = parse(english[number], number, errors)
        ta_traces = parse(tamil[number], number, errors)
        validate_tamil_style(tamil[number].read_text(encoding="utf-8"), tamil[number], errors)
        english_corpus.append((number, en_traces))
        tamil_corpus.append((number, ta_traces))
        if en_traces != ta_traces:
            errors.append(f"Sequence {number:02d}: English/Tamil TRACE signatures differ")
        audited += len(tuple(EXPECTED[number]))

    validate_corpus_trace_uniqueness(
        "English", english_corpus, errors, expected_traces
    )
    validate_corpus_trace_uniqueness("Tamil", tamil_corpus, errors, expected_traces)

    if errors:
        print("Bilingual screenplay validation failed:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"Bilingual screenplay validation passed: 10 sequences, {audited} paired scenes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
