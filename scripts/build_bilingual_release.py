#!/usr/bin/env python3
"""Build deterministic English and Tamil Fountain and Markdown release files."""
from __future__ import annotations

import csv
import hashlib
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCH = ROOT / "docs/10-screenplay-architecture"
EN_DIR = ARCH / "10E-screenplay-draft"
TA_DIR = ARCH / "10F-bilingual-screenplay/TA"
OUTPUT = ROOT / "releases/0.1"
SCENE_RE = re.compile(r"#(\d+)#")
TRACE_RE = re.compile(r"/\*\s*TRACE:", re.IGNORECASE)


def sequence_files(directory: Path) -> list[Path]:
    return sorted(directory.glob("SEQ-*.fountain"))


def strip_title_page(text: str) -> str:
    if not text.startswith("Title:"):
        return text.strip()
    _, _, body = text.partition("\n\n")
    return body.strip()


def build_fountain(files: list[Path]) -> str:
    sections: list[str] = []
    for index, path in enumerate(files):
        text = path.read_text(encoding="utf-8").strip()
        sections.append(text if index == 0 else strip_title_page(text))
    return "\n\n".join(sections) + "\n"


def build_markdown(language: str, files: list[Path]) -> str:
    title = "MANIMEKALAI — English Screenplay Draft 0.1"
    note = (
        "This is the structurally complete English working screenplay. "
        "Dialogue lock and external specialist approval are not granted."
    )
    if language == "TA":
        title = "மணிமேகலை — தமிழ் திரைக்கதை பணிப் பதிப்பு 0.1"
        note = (
            "இது கட்டமைப்பில் முழுமையான தமிழ் பணித் திரைக்கதை. "
            "உரையாடல் பூட்டும் வெளிப்புற நிபுணர் ஒப்புதலும் இன்னும் வழங்கப்படவில்லை."
        )
    lines = [
        f"# {title}",
        "",
        note,
        "",
        "Scene and TRACE identifiers are preserved from the bilingual source files.",
        "",
    ]
    for path in files:
        content = strip_title_page(path.read_text(encoding="utf-8"))
        heading = next(
            (line[2:].strip() for line in content.splitlines() if line.startswith("# ")),
            path.stem,
        )
        lines.extend(
            [
                f"## {heading}",
                "",
                f"Source sequence: `{path.relative_to(ROOT).as_posix()}`",
                "",
                "```fountain",
                content,
                "```",
                "",
            ]
        )
    return "\n".join(lines)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def stats(text: str) -> tuple[int, int, int, int]:
    scenes = [int(item) for item in SCENE_RE.findall(text)]
    return len(scenes), min(scenes), max(scenes), len(TRACE_RE.findall(text))


def write_release() -> list[dict[str, str]]:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    languages = {
        "EN": sequence_files(EN_DIR),
        "TA": sequence_files(TA_DIR),
    }
    if any(len(files) != 10 for files in languages.values()):
        raise SystemExit("Expected ten English and ten Tamil sequence files")

    manifest: list[dict[str, str]] = []
    written: list[Path] = []
    for language, files in languages.items():
        stem = "manimekalai_en_draft_0.1" if language == "EN" else "manimekalai_ta_draft_0.1"
        fountain_path = OUTPUT / f"{stem}.fountain"
        markdown_path = OUTPUT / f"{stem}.md"
        fountain_path.write_text(build_fountain(files), encoding="utf-8")
        markdown_path.write_text(build_markdown(language, files), encoding="utf-8")
        written.extend([fountain_path, markdown_path])
        scene_count, first_scene, last_scene, trace_count = stats(
            fountain_path.read_text(encoding="utf-8")
        )
        if (scene_count, first_scene, last_scene) != (72, 1, 72):
            raise SystemExit(
                f"{language}: expected Scenes 1-72 exactly once; "
                f"found {scene_count} occurrences spanning {first_scene}-{last_scene}"
            )
        manifest.append(
            {
                "language": language,
                "fountain_file": fountain_path.name,
                "markdown_file": markdown_path.name,
                "sequence_count": "10",
                "scene_count": str(scene_count),
                "scene_range": "#1#-#72#",
                "trace_count": str(trace_count),
                "fountain_sha256": sha256(fountain_path),
                "markdown_sha256": sha256(markdown_path),
                "release_status": "STRUCTURALLY_VERIFIED_WORKING_DRAFT",
            }
        )

    if manifest[0]["trace_count"] != manifest[1]["trace_count"]:
        raise SystemExit("English and Tamil TRACE counts differ")

    manifest_path = OUTPUT / "release-manifest.csv"
    with manifest_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(manifest[0]))
        writer.writeheader()
        writer.writerows(manifest)
    written.append(manifest_path)

    checksums = "\n".join(
        f"{sha256(path)}  {path.name}" for path in sorted(written)
    )
    (OUTPUT / "checksums.sha256").write_text(checksums + "\n", encoding="utf-8")
    return manifest


def main() -> int:
    manifest = write_release()
    print(
        "Built bilingual release: "
        + ", ".join(
            f"{row['language']} {row['scene_count']} scenes/{row['trace_count']} TRACE"
            for row in manifest
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

