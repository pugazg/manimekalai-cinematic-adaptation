#!/usr/bin/env python3
"""Build the deterministic EV-to-SRC provenance crosswalk."""
from __future__ import annotations

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE_DIR = ROOT / "evidence"
OUTPUT = EVIDENCE_DIR / "evidence_source_crosswalk.csv"

WORK_MAP = {
    "Manimekalai": ("SRC-0001;SRC-0002", "PRIMARY_WITH_TRANSLATION_AID"),
    "Silappathikaram": ("SRC-0003", "REGISTERED_SOURCE"),
    "Manimekalai and Silappathikaram": ("SRC-0001;SRC-0002;SRC-0003", "MULTI_SOURCE"),
    "Silappathikaram and Manimekalai": ("SRC-0001;SRC-0002;SRC-0003", "MULTI_SOURCE"),
    "Project adaptation": ("", "INTERNAL_PROJECT_RECORD"),
    "Project methodology": ("", "INTERNAL_PROJECT_RECORD"),
    "Project adaptation informed by modern famine analysis": ("SRC-0023", "INTERPRETIVE_SOURCE"),
    "Staples and Blue": ("SRC-0009", "REGISTERED_SOURCE"),
    "Peter Francis Jr and later scholarship": ("SRC-0035", "REGISTERED_SOURCE"),
    "Gwendolyn O Kelly": ("SRC-0034", "REGISTERED_SOURCE"),
    "Helwing and collaborators": ("SRC-0025", "REGISTERED_SOURCE"),
    "Gunawardhana": ("SRC-0026", "REGISTERED_SOURCE"),
    "Murphy and collaborators": ("SRC-0027", "REGISTERED_SOURCE"),
    "Kingwell-Banham and collaborators": ("SRC-0024", "REGISTERED_SOURCE"),
    "Vikas K Verma": ("SRC-0029", "REGISTERED_SOURCE"),
    "Premathilake and collaborators": ("SRC-0020", "REGISTERED_SOURCE"),
    "Kingwell-Banham": ("SRC-0021", "REGISTERED_SOURCE"),
    "Odelli and collaborators": ("SRC-0022", "REGISTERED_SOURCE"),
}

OVERRIDES = {
    "EV-0007": "SRC-0005", "EV-0008": "SRC-0005", "EV-0015": "SRC-0005",
    "EV-0016": "SRC-0006", "EV-0017": "SRC-0007", "EV-0019": "SRC-0006",
    "EV-0027": "SRC-0011", "EV-0028": "SRC-0011", "EV-0029": "SRC-0012",
    "EV-0030": "SRC-0013", "EV-0031": "SRC-0014",
    "EV-0042": "SRC-0015;SRC-0016;SRC-0017", "EV-0043": "SRC-0018",
    "EV-0078": "SRC-0028", "EV-0079": "SRC-0028",
    "EV-0093": "SRC-0005", "EV-0094": "SRC-0011", "EV-0095": "SRC-0041",
    "EV-0096": "SRC-0039", "EV-0097": "SRC-0040", "EV-0109": "SRC-0013",
    "EV-0110": "SRC-0028", "EV-0111": "SRC-0007", "EV-0114": "SRC-0033",
    "EV-0115": "SRC-0032", "EV-0140": "SRC-0043", "EV-0141": "SRC-0042",
}


def evidence_rows() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for path in sorted(EVIDENCE_DIR.glob("*.csv")):
        if path == OUTPUT:
            continue
        with path.open(encoding="utf-8", newline="") as handle:
            rows.extend(csv.DictReader(handle))
    return sorted(rows, key=lambda row: int(row["evidence_id"].split("-")[1]))


def main() -> int:
    result: list[dict[str, str]] = []
    unresolved: list[str] = []
    for row in evidence_rows():
        evidence_id = row["evidence_id"]
        source_work = row["source_work"]
        if evidence_id in OVERRIDES:
            source_ids, status = OVERRIDES[evidence_id], "RECORD_LEVEL_CROSSWALK"
        elif source_work in WORK_MAP:
            source_ids, status = WORK_MAP[source_work]
        else:
            unresolved.append(f"{evidence_id}: {source_work}")
            continue
        result.append(
            {
                "evidence_id": evidence_id,
                "source_ids": source_ids,
                "crosswalk_status": status,
                "source_work": source_work,
                "notes": "Line/page verification remains governed by the source register and evidence record.",
            }
        )
    if unresolved:
        raise SystemExit("Unresolved evidence provenance:\n" + "\n".join(unresolved))
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["evidence_id", "source_ids", "crosswalk_status", "source_work", "notes"],
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(result)
    print(f"Wrote {len(result)} evidence-source crosswalk rows to {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
