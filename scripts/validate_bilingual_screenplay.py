#!/usr/bin/env python3
"""Validate structural parity between the English and Tamil screenplay drafts.

This validator uses only the Python standard library. It checks that each paired
sequence preserves scene order and the complete TRACE signature, including
primary and absorbed SC identifiers.
"""
from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_DIR = ROOT / "docs/10-screenplay-architecture/10E-screenplay-draft"
TA_DIR = ROOT / "docs/10-screenplay-architecture/10F-bilingual-screenplay/TA"

SEQUENCE_RE = re.compile(r"SEQ-(\d{2})_")
SCENE_RE = re.compile(r"#(\d{1,3})#")
TRACE_RE = re.compile(r"/\*\s*TRACE:\s*(.*?)\s*\*/")
TRACE_ID_RE = re.compile(r"^(?:FU|BR)-\d{3}$")
SC_ID_RE = re.compile(r"^SC-\d{3}$")

EXPECTED_SCENES: dict[int, list[int]] = {
    1: list(range(1, 7)),
    2: list(range(7, 14)),
    3: list(range(14, 18)),
    4: list(range(18, 35)),
    5: list(range(35, 44)),
    6: list(range(44, 50)),
    7: list(range(50, 54)),
    8: list(range(54, 60)),
    9: list(range(60, 66)),
    10: list(range(66, 73)),
}


@dataclass(frozen=True)
class TraceSignature:
    unit_id: str
    primary_scene_id: str
    absorbed_scene_ids: tuple[str, ...]


@dataclass(frozen=True)
class ParsedSequence:
    path: Path
    sequence_number: int
    scenes: tuple[int, ...]
    traces: tuple[TraceSignature, ...]


def relative(path: Path) -> str:
    return str(path.relative_to(ROOT))


def discover(directory: Path, errors: list[str]) -> dict[int, Path]:
    files: dict[int, Path] = {}
    for path in sorted(directory.glob("SEQ-*.fountain")):
        match = SEQUENCE_RE.search(path.name)
        if not match:
            errors.append(f"Cannot determine sequence number from {relative(path)}")
            continue
        number = int(match.group(1))
        if number in files:
            errors.append(
                f"Duplicate sequence {number:02d}: {relative(files[number])} and {relative(path)}"
            )
        else:
            files[number] = path

    expected = set(EXPECTED_SCENES)
    missing = sorted(expected - set(files))
    extra = sorted(set(files) - expected)
    if missing:
        errors.append(
            f"{relative(directory)} missing sequences: "
            + ", ".join(f"{number:02d}" for number in missing)
        )
    if extra:
        errors.append(
            f"{relative(directory)} has unexpected sequences: "
            + ", ".join(f"{number:02d}" for number in extra)
        )
    return files


def parse_trace(raw: str, path: Path, errors: list[str]) -> TraceSignature | None:
    parts = [part.strip() for part in raw.split("|") if part.strip()]
    if len(parts) < 2:
        errors.append(f"Malformed TRACE in {relative(path)}: {raw!r}")
        return None

    unit_id = parts[0]
    primary_scene_id = parts[1]
    absorbed: list[str] = []

    if not TRACE_ID_RE.fullmatch(unit_id):
        errors.append(f"Invalid unit ID {unit_id!r} in {relative(path)}")
    if not SC_ID_RE.fullmatch(primary_scene_id):
        errors.append(f"Invalid primary scene ID {primary_scene_id!r} in {relative(path)}")

    for part in parts[2:]:
        if not part.startswith("ABSORBS:"):
            errors.append(f"Unknown TRACE component {part!r} in {relative(path)}")
            continue
        value = part.removeprefix("ABSORBS:").strip()
        for scene_id in [item.strip() for item in value.split(",") if item.strip()]:
            if not SC_ID_RE.fullmatch(scene_id):
                errors.append(f"Invalid absorbed scene ID {scene_id!r} in {relative(path)}")
            absorbed.append(scene_id)

    return TraceSignature(unit_id, primary_scene_id, tuple(absorbed))


def parse_sequence(path: Path, expected_number: int, errors: list[str]) -> ParsedSequence:
    text = path.read_text(encoding="utf-8")
    filename_match = SEQUENCE_RE.search(path.name)
    number = int(filename_match.group(1)) if filename_match else -1
    if number != expected_number:
        errors.append(
            f"Sequence-number mismatch for {relative(path)}: expected {expected_number:02d}, got {number:02d}"
        )

    scenes = tuple(int(item) for item in SCENE_RE.findall(text))
    traces: list[TraceSignature] = []
    for raw in TRACE_RE.findall(text):
        trace = parse_trace(raw, path, errors)
        if trace is not None:
            traces.append(trace)

    if not text.strip():
        errors.append(f"Empty screenplay file: {relative(path)}")
    if not text.rstrip().endswith(("END.", f"END SEQUENCE {expected_number:02d}")):
        errors.append(f"Missing recognised ending marker in {relative(path)}")

    return ParsedSequence(path, number, scenes, tuple(traces))


def validate_sequence(
    number: int,
    english: ParsedSequence,
    tamil: ParsedSequence,
    errors: list[str],
) -> None:
    expected_scenes = tuple(EXPECTED_SCENES[number])

    for label, sequence in (("English", english), ("Tamil", tamil)):
        if sequence.scenes != expected_scenes:
            errors.append(
                f"{label} sequence {number:02d} scene order mismatch in {relative(sequence.path)}: "
                f"expected {list(expected_scenes)}, got {list(sequence.scenes)}"
            )
        if len(sequence.traces) != len(expected_scenes):
            errors.append(
                f"{label} sequence {number:02d} has {len(sequence.traces)} TRACE records; "
                f"expected {len(expected_scenes)}"
            )

    if english.traces != tamil.traces:
        max_length = max(len(english.traces), len(tamil.traces))
        for index in range(max_length):
            en_trace = english.traces[index] if index < len(english.traces) else None
            ta_trace = tamil.traces[index] if index < len(tamil.traces) else None
            if en_trace != ta_trace:
                scene = expected_scenes[index] if index < len(expected_scenes) else "?"
                errors.append(
                    f"Sequence {number:02d}, scene #{scene} TRACE mismatch: "
                    f"English={en_trace!r}, Tamil={ta_trace!r}"
                )

    english_units = [trace.unit_id for trace in english.traces]
    tamil_units = [trace.unit_id for trace in tamil.traces]
    if len(english_units) != len(set(english_units)):
        errors.append(f"Duplicate English unit ID in sequence {number:02d}: {english_units}")
    if len(tamil_units) != len(set(tamil_units)):
        errors.append(f"Duplicate Tamil unit ID in sequence {number:02d}: {tamil_units}")


def main() -> int:
    errors: list[str] = []
    english_files = discover(EN_DIR, errors)
    tamil_files = discover(TA_DIR, errors)

    audited_scenes = 0
    for number in sorted(EXPECTED_SCENES):
        if number not in english_files or number not in tamil_files:
            continue
        english = parse_sequence(english_files[number], number, errors)
        tamil = parse_sequence(tamil_files[number], number, errors)
        validate_sequence(number, english, tamil, errors)
        audited_scenes += len(EXPECTED_SCENES[number])

    if errors:
        print("Bilingual screenplay validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Bilingual screenplay validation passed: "
        f"10 paired sequences, {audited_scenes} paired scenes, "
        "scene order and TRACE signatures match."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
