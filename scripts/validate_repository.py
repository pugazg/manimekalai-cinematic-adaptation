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


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def split_ids(value: str) -> list[str]:
    return [item.strip() for item in value.split(";") if item.strip()]


def main() -> int:
    errors: list[str] = []
    evidence_rows = read_csv(ROOT / "evidence/evidence_register.csv")
    decision_rows = read_csv(ROOT / "docs/06-adaptation-decisions/decision_log.csv")
    scene_rows = read_csv(ROOT / "docs/07-screenplay-evidence-matrix/screenplay_evidence_matrix.csv")

    evidence_ids = [row["evidence_id"] for row in evidence_rows]
    decision_ids = [row["decision_id"] for row in decision_rows]
    scene_ids = [row["scene_id"] for row in scene_rows]

    for label, ids in (("evidence", evidence_ids), ("decision", decision_ids), ("scene", scene_ids)):
        pattern = ID_PATTERNS[label]
        duplicates = {item for item in ids if ids.count(item) > 1}
        for item in ids:
            if not pattern.match(item):
                errors.append(f"Invalid {label} ID: {item}")
        for item in sorted(duplicates):
            errors.append(f"Duplicate {label} ID: {item}")

    known_evidence = set(evidence_ids)
    known_decisions = set(decision_ids)

    for row in decision_rows:
        for evidence_id in split_ids(row.get("evidence_ids", "")):
            if evidence_id not in known_evidence:
                errors.append(f"{row['decision_id']} references unknown evidence {evidence_id}")

    for row in scene_rows:
        for evidence_id in split_ids(row.get("evidence_ids", "")):
            if evidence_id not in known_evidence:
                errors.append(f"{row['scene_id']} references unknown evidence {evidence_id}")
        for decision_id in split_ids(row.get("adaptation_decision_ids", "")):
            if decision_id not in known_decisions:
                errors.append(f"{row['scene_id']} references unknown decision {decision_id}")

    if errors:
        print("Repository validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Validation passed: {len(evidence_ids)} evidence records, "
        f"{len(decision_ids)} adaptation decisions, {len(scene_ids)} scenes."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
