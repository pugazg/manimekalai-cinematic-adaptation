#!/usr/bin/env python3
"""Validate structural parity between English and Tamil screenplay drafts."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_DIR = ROOT / "docs/10-screenplay-architecture/10E-screenplay-draft"
TA_DIR = ROOT / "docs/10-screenplay-architecture/10F-bilingual-screenplay/TA"
EXPECTED = {
    1: range(1, 7), 2: range(7, 14), 3: range(14, 18),
    4: range(18, 35), 5: range(35, 44), 6: range(44, 50),
    7: range(50, 54), 8: range(54, 60), 9: range(60, 66),
    10: range(66, 73),
}
SEQ_RE = re.compile(r"SEQ-(\d{2})_")
SCENE_RE = re.compile(r"#(\d{1,3})#")
TRACE_RE = re.compile(r"/\*\s*TRACE:\s*(.*?)\s*\*/")
UNIT_RE = re.compile(r"^(?:FU|BR)-\d{3}$")
SC_RE = re.compile(r"^SC-\d{3}$")


def discover(folder: Path, errors: list[str]) -> dict[int, Path]:
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


def parse_trace(raw: str, path: Path, errors: list[str]) -> tuple[str, str, tuple[str, ...]] | None:
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
        if not component.startswith("ABSORBS:"):
            errors.append(f"Unknown TRACE component {component!r} in {path}")
            continue
        value = component.removeprefix("ABSORBS:").strip()
        for scene_id in filter(None, (item.strip() for item in re.split(r"[,;]", value))):
            if not SC_RE.fullmatch(scene_id):
                errors.append(f"Invalid absorbed scene ID {scene_id!r} in {path}")
            absorbed.append(scene_id)
    return unit, primary, tuple(absorbed)


def parse(path: Path, number: int, errors: list[str]):
    text = path.read_text(encoding="utf-8")
    scenes = tuple(map(int, SCENE_RE.findall(text)))
    traces = tuple(
        trace for raw in TRACE_RE.findall(text)
        if (trace := parse_trace(raw, path, errors)) is not None
    )
    expected = tuple(EXPECTED[number])
    if scenes != expected:
        errors.append(f"{path}: expected scenes {expected}, got {scenes}")
    if len(traces) != len(expected):
        errors.append(f"{path}: expected {len(expected)} TRACE records, got {len(traces)}")
    if not text.rstrip().endswith(("END.", f"END SEQUENCE {number:02d}")):
        errors.append(f"{path}: missing recognised ending marker")
    return traces


def main() -> int:
    errors: list[str] = []
    english = discover(EN_DIR, errors)
    tamil = discover(TA_DIR, errors)
    audited = 0
    for number in sorted(EXPECTED):
        if number not in english or number not in tamil:
            continue
        en_traces = parse(english[number], number, errors)
        ta_traces = parse(tamil[number], number, errors)
        if en_traces != ta_traces:
            errors.append(f"Sequence {number:02d}: English/Tamil TRACE signatures differ")
        audited += len(tuple(EXPECTED[number]))
    if errors:
        print("Bilingual screenplay validation failed:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"Bilingual screenplay validation passed: 10 sequences, {audited} paired scenes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
