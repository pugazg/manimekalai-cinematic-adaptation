#!/usr/bin/env python3
"""Build a deterministic three-shot storyboard plan for every active feature unit."""
from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCH = ROOT / "docs/10-screenplay-architecture"
STORYBOARD = ROOT / "docs/08-storyboard-bible"
UNITS = ARCH / "10B_feature_unit_matrix.csv"
RUNTIME = ARCH / "10C_unit_runtime_matrix.csv"
OUTPUT = STORYBOARD / "storyboard-shot-matrix.csv"
SCENE_DIR = ROOT / "docs/07-screenplay-evidence-matrix"

FIELDS = [
    "shot_id",
    "unit_order",
    "sequence_id",
    "feature_unit_id",
    "primary_scene_id",
    "feature_unit_title",
    "shot_role",
    "location",
    "time_period",
    "frame_brief",
    "character_or_action_focus",
    "camera_and_lens",
    "lighting_and_palette",
    "sound_or_transition",
    "practical_vfx_note",
    "evidence_ids",
    "adaptation_decision_ids",
    "visual_classification",
    "asset_status",
]


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def scene_records() -> dict[str, dict[str, str]]:
    records: dict[str, dict[str, str]] = {}
    for path in sorted(SCENE_DIR.glob("*.csv")):
        for row in read_csv(path):
            scene_id = row.get("scene_id", "").strip()
            if scene_id:
                records[scene_id] = row
    return records


def split_ids(value: str) -> list[str]:
    return [item.strip() for item in value.replace(",", ";").split(";") if item.strip()]


def unique_join(values: list[str]) -> str:
    return ";".join(dict.fromkeys(values))


def camera_set(presentation: str) -> tuple[str, str, str]:
    if presentation == "visual-led":
        return (
            "28mm human-scale establishing frame; restrained lateral movement",
            "50mm observed action; camera remains at participant height",
            "75mm consequence detail or environmental handoff",
        )
    if presentation == "dialogue-led":
        return (
            "40mm relational master preserving distance and power",
            "65mm listening single; reaction before assertion",
            "50mm two-plane reversal or exit",
        )
    return (
        "35mm spatial master linking person and institution",
        "50mm decisive action or exchange",
        "65mm knowledge-change detail leading the transition",
    )


def palette(sequence_id: str) -> str:
    sequence_number = int(sequence_id.split("-")[1])
    if sequence_number <= 2:
        return "Puhar: humid gold, indigo shade, dyed textile colour; no fantasy glow"
    if sequence_number == 3:
        return "Manipallavam: pearl grey, salt white, shallow-water green; light remains physical"
    if sequence_number <= 5:
        return "Service and danger: earthen food tones, working courtyards, gathering dusk"
    if sequence_number <= 7:
        return "Palace grief: controlled lamplight, stone shadow, colour withheld without monochrome"
    if sequence_number == 8:
        return "Savaka and memory: fertile green against bone, sand and administrative cloth"
    if sequence_number == 9:
        return "Inquiry: neutral daylight, distinct school textures, no winner's halo"
    return "Kanchi: dust and depleted colour recovering through water, labour and shared food"


def build_rows() -> list[dict[str, str]]:
    units = read_csv(UNITS)
    runtimes = {row["feature_unit_id"]: row for row in read_csv(RUNTIME)}
    scenes = scene_records()
    output: list[dict[str, str]] = []

    for unit in units:
        primary_id = unit["primary_scene_id"]
        related = [primary_id, *split_ids(unit["absorbed_scene_ids"])]
        related_records = [scenes[item] for item in related if item in scenes]
        primary = scenes.get(primary_id, {})
        evidence = unique_join(
            evidence_id
            for record in related_records
            for evidence_id in split_ids(record.get("evidence_ids", ""))
        )
        decisions = unique_join(
            decision_id
            for record in related_records
            for decision_id in split_ids(record.get("adaptation_decision_ids", ""))
        )
        runtime = runtimes[unit["feature_unit_id"]]
        cameras = camera_set(runtime["presentation"])
        dramatic_function = primary.get("dramatic_function", unit["consolidation_summary"])
        location = primary.get("location", "Location to confirm from screenplay")
        time_period = primary.get("time_period", "Time to confirm from screenplay")
        roles = [
            (
                "ENTRY",
                f"Establish {location} as lived space before foregrounding “{unit['feature_unit_title']}.”",
                "Environment, labour and access relationships",
                cameras[0],
                "Carry sound from the previous unit into this geography",
            ),
            (
                "DECISION",
                f"Stage the unit's decisive movement: {dramatic_function}",
                "The person making, resisting or receiving the consequential action",
                cameras[1],
                "Let action and listening lead; music must not pre-decide moral meaning",
            ),
            (
                "CONSEQUENCE",
                f"Hold the changed condition after “{unit['feature_unit_title']}” and hand it to the next unit.",
                "Material consequence, witness, object or altered relationship",
                cameras[2],
                f"Use the registered {runtime['transition_type']} transition",
            ),
        ]
        for index, (role, brief, focus, camera, sound) in enumerate(roles, start=1):
            output.append(
                {
                    "shot_id": f"SB-{int(unit['unit_order']):03d}-{index}",
                    "unit_order": unit["unit_order"],
                    "sequence_id": unit["sequence_id"],
                    "feature_unit_id": unit["feature_unit_id"],
                    "primary_scene_id": primary_id,
                    "feature_unit_title": unit["feature_unit_title"],
                    "shot_role": role,
                    "location": location,
                    "time_period": time_period,
                    "frame_brief": brief,
                    "character_or_action_focus": focus,
                    "camera_and_lens": camera,
                    "lighting_and_palette": palette(unit["sequence_id"]),
                    "sound_or_transition": sound,
                    "practical_vfx_note": (
                        "Prefer practical environment, crowd and object interaction; "
                        "use VFX for extension or sacred discontinuity only, never as evidence."
                    ),
                    "evidence_ids": evidence,
                    "adaptation_decision_ids": decisions,
                    "visual_classification": "[INTERPRETATION] grounded in registered evidence and decisions",
                    "asset_status": "DESCRIPTION_READY",
                }
            )
    return output


def main() -> int:
    rows = build_rows()
    if len(rows) != 216:
        raise SystemExit(f"Expected 216 storyboard shots; found {len(rows)}")
    STORYBOARD.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} storyboard shots to {OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

