#!/usr/bin/env python3
"""Validate permanent IDs and cross-register references using only stdlib."""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ID_PATTERNS = {
    "evidence": re.compile(r"^EV-\d{4}$"),
    "decision": re.compile(r"^AD-\d{4}$"),
    "scene": re.compile(r"^SC-\d{3}$"),
}
REQUIRED_FIELDS = {
    "evidence": {"evidence_id", "evidence_type", "title"},
    "decision": {"decision_id", "title", "evidence_ids"},
    "scene": {"scene_id", "working_scene_title", "evidence_ids", "adaptation_decision_ids"},
}


def read_csv(path: Path, label: str, errors: list[str]) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        fields = set(reader.fieldnames or [])
        missing = REQUIRED_FIELDS[label] - fields
        if missing:
            errors.append(f"{path.relative_to(ROOT)} missing fields: {', '.join(sorted(missing))}")
            return []
        rows = list(reader)
        for row in rows:
            row["_source_file"] = str(path.relative_to(ROOT))
        return rows


def read_registers(directory: Path, pattern: str, label: str, errors: list[str]) -> tuple[list[dict[str, str]], list[Path]]:
    paths = sorted(directory.glob(pattern))
    if not paths:
        errors.append(f"No {label} register files found in {directory.relative_to(ROOT)}")
        return [], []
    rows: list[dict[str, str]] = []
    for path in paths:
        rows.extend(read_csv(path, label, errors))
    return rows, paths


def split_ids(value: str) -> list[str]:
    return [item.strip() for item in value.split(";") if item.strip()]


def validate_ids(label: str, rows: list[dict[str, str]], field: str, errors: list[str]) -> list[str]:
    ids = [row.get(field, "").strip() for row in rows]
    pattern = ID_PATTERNS[label]
    seen: dict[str, str] = {}
    for row, item in zip(rows, ids):
        source_file = row.get("_source_file", "unknown")
        if not pattern.fullmatch(item):
            errors.append(f"Invalid {label} ID {item!r} in {source_file}")
            continue
        if item in seen:
            errors.append(f"Duplicate {label} ID {item}: {seen[item]} and {source_file}")
        else:
            seen[item] = source_file
    return ids


def main() -> int:
    errors: list[str] = []

    evidence_rows, evidence_files = read_registers(
        ROOT / "evidence", "*evidence*.csv", "evidence", errors
    )
    decision_rows, decision_files = read_registers(
        ROOT / "docs/06-adaptation-decisions", "*.csv", "decision", errors
    )
    scene_rows, scene_files = read_registers(
        ROOT / "docs/07-screenplay-evidence-matrix", "*.csv", "scene", errors
    )

    evidence_ids = validate_ids("evidence", evidence_rows, "evidence_id", errors)
    decision_ids = validate_ids("decision", decision_rows, "decision_id", errors)
    scene_ids = validate_ids("scene", scene_rows, "scene_id", errors)

    known_evidence = set(evidence_ids)
    known_decisions = set(decision_ids)

    for row in decision_rows:
        decision_id = row.get("decision_id", "<missing>")
        source_file = row.get("_source_file", "unknown")
        for evidence_id in split_ids(row.get("evidence_ids", "")):
            if evidence_id not in known_evidence:
                errors.append(
                    f"{decision_id} in {source_file} references unknown evidence {evidence_id}"
                )

    for row in scene_rows:
        scene_id = row.get("scene_id", "<missing>")
        source_file = row.get("_source_file", "unknown")
        for evidence_id in split_ids(row.get("evidence_ids", "")):
            if evidence_id not in known_evidence:
                errors.append(
                    f"{scene_id} in {source_file} references unknown evidence {evidence_id}"
                )
        for decision_id in split_ids(row.get("adaptation_decision_ids", "")):
            if decision_id not in known_decisions:
                errors.append(
                    f"{scene_id} in {source_file} references unknown decision {decision_id}"
                )

    if errors:
        print("Repository validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Validation passed: {len(evidence_ids)} evidence records across {len(evidence_files)} files, "
        f"{len(decision_ids)} adaptation decisions across {len(decision_files)} files, "
        f"and {len(scene_ids)} scenes across {len(scene_files)} files."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
