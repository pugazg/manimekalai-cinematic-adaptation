#!/usr/bin/env python3
"""Validate source, evidence, decision and scene registers using only stdlib."""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ID_PATTERNS = {
    "source": re.compile(r"^SRC-\d{4}$"),
    "evidence": re.compile(r"^EV-\d{4}$"),
    "decision": re.compile(r"^AD-\d{4}$"),
    "scene": re.compile(r"^SC-\d{3}$"),
}
REQUIRED_FIELDS = {
    "source": {
        "source_id",
        "creator",
        "title",
        "source_type",
        "rights_status",
        "verification_status",
    },
    "evidence": {
        "evidence_id",
        "evidence_type",
        "title",
        "source_id",
        "rights_status",
        "verification_status",
    },
    "decision": {"decision_id", "title", "evidence_ids"},
    "scene": {
        "scene_id",
        "working_scene_title",
        "evidence_ids",
        "adaptation_decision_ids",
    },
}
EXPECTED_IDS = {
    "source": tuple(f"SRC-{number:04d}" for number in range(1, 46)),
    "evidence": tuple(f"EV-{number:04d}" for number in range(1, 319)),
    "decision": tuple(f"AD-{number:04d}" for number in range(1, 171)),
    "scene": tuple(f"SC-{number:03d}" for number in range(1, 155)),
}


def relative(path: Path) -> str:
    """Return a stable repository-relative path for diagnostics."""
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def read_csv(path: Path, label: str, errors: list[str]) -> list[dict[str, str]]:
    """Read one register and attach its source path to every row."""
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        fields = set(reader.fieldnames or [])
        missing = REQUIRED_FIELDS[label] - fields
        if missing:
            errors.append(f"{relative(path)} missing fields: {', '.join(sorted(missing))}")
            return []
        rows = list(reader)
        for row_number, row in enumerate(rows, start=2):
            row["_source_file"] = relative(path)
            row["_source_line"] = str(row_number)
            for field in REQUIRED_FIELDS[label]:
                if not row.get(field, "").strip():
                    errors.append(
                        f"{relative(path)}:{row_number} has an empty required field {field!r}"
                    )
        return rows


def read_registers(
    directory: Path, pattern: str, label: str, errors: list[str]
) -> tuple[list[dict[str, str]], list[Path]]:
    """Read every canonical register matching a directory pattern."""
    paths = sorted(directory.glob(pattern))
    if not paths:
        errors.append(f"No {label} register files found in {relative(directory)}")
        return [], []
    rows: list[dict[str, str]] = []
    for path in paths:
        rows.extend(read_csv(path, label, errors))
    return rows, paths


def split_ids(value: str) -> list[str]:
    """Split semicolon-delimited permanent IDs."""
    return [item.strip() for item in value.split(";") if item.strip()]


def validate_ids(
    label: str,
    rows: list[dict[str, str]],
    field: str,
    errors: list[str],
) -> tuple[str, ...]:
    """Validate format, uniqueness and exact expected coverage."""
    ids = tuple(row.get(field, "").strip() for row in rows)
    pattern = ID_PATTERNS[label]
    seen: dict[str, str] = {}
    for row, item in zip(rows, ids):
        source_file = row.get("_source_file", "unknown")
        source_line = row.get("_source_line", "?")
        location = f"{source_file}:{source_line}"
        if not pattern.fullmatch(item):
            errors.append(f"Invalid {label} ID {item!r} in {location}")
            continue
        if item in seen:
            errors.append(f"Duplicate {label} ID {item}: {seen[item]} and {location}")
        else:
            seen[item] = location

    expected = set(EXPECTED_IDS[label])
    actual = set(ids)
    missing = sorted(expected - actual)
    extra = sorted(actual - expected)
    if missing:
        errors.append(f"Missing {label} IDs: {', '.join(missing)}")
    if extra:
        errors.append(f"Unexpected {label} IDs: {', '.join(extra)}")
    if len(ids) != len(EXPECTED_IDS[label]):
        errors.append(
            f"Expected {len(EXPECTED_IDS[label])} {label} records, found {len(ids)}"
        )
    return ids


def validate_references(
    rows: list[dict[str, str]],
    owner_field: str,
    reference_field: str,
    known: set[str],
    reference_label: str,
    errors: list[str],
) -> None:
    """Validate semicolon-delimited references from one register to another."""
    for row in rows:
        owner_id = row.get(owner_field, "<missing>")
        source_file = row.get("_source_file", "unknown")
        source_line = row.get("_source_line", "?")
        for reference in split_ids(row.get(reference_field, "")):
            if reference not in known:
                errors.append(
                    f"{owner_id} in {source_file}:{source_line} references unknown "
                    f"{reference_label} {reference}"
                )


def detect_misplaced_registers(errors: list[str]) -> None:
    """Reject decision or scene registers stored outside canonical directories."""
    evidence_directory = ROOT / "evidence"
    for path in sorted(evidence_directory.glob("*.csv")):
        lowered = path.name.lower()
        if "decision" in lowered or "scene" in lowered:
            errors.append(
                f"Misplaced register {relative(path)}: decision registers belong in "
                "docs/06-adaptation-decisions and scene registers in "
                "docs/07-screenplay-evidence-matrix"
            )


def main() -> int:
    errors: list[str] = []
    detect_misplaced_registers(errors)

    source_rows = read_csv(ROOT / "sources/source_register.csv", "source", errors)
    evidence_rows, evidence_files = read_registers(
        ROOT / "evidence", "*evidence*.csv", "evidence", errors
    )
    decision_rows, decision_files = read_registers(
        ROOT / "docs/06-adaptation-decisions", "*.csv", "decision", errors
    )
    scene_rows, scene_files = read_registers(
        ROOT / "docs/07-screenplay-evidence-matrix", "*.csv", "scene", errors
    )

    source_ids = validate_ids("source", source_rows, "source_id", errors)
    evidence_ids = validate_ids("evidence", evidence_rows, "evidence_id", errors)
    decision_ids = validate_ids("decision", decision_rows, "decision_id", errors)
    scene_ids = validate_ids("scene", scene_rows, "scene_id", errors)

    known_sources = set(source_ids)
    known_evidence = set(evidence_ids)
    known_decisions = set(decision_ids)

    validate_references(
        evidence_rows,
        "evidence_id",
        "source_id",
        known_sources,
        "source",
        errors,
    )
    validate_references(
        decision_rows,
        "decision_id",
        "evidence_ids",
        known_evidence,
        "evidence",
        errors,
    )
    validate_references(
        scene_rows,
        "scene_id",
        "evidence_ids",
        known_evidence,
        "evidence",
        errors,
    )
    validate_references(
        scene_rows,
        "scene_id",
        "adaptation_decision_ids",
        known_decisions,
        "decision",
        errors,
    )

    if errors:
        print("Repository validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Validation passed: {len(source_ids)} sources, "
        f"{len(evidence_ids)} evidence records across {len(evidence_files)} files, "
        f"{len(decision_ids)} adaptation decisions across {len(decision_files)} files, "
        f"and {len(scene_ids)} scenes across {len(scene_files)} files."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
