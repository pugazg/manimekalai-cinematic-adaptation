#!/usr/bin/env python3
"""Audit every Git-tracked repository file using only the Python standard library."""
from __future__ import annotations

import argparse
import csv
import re
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LEDGER = ROOT / "docs/11-project-governance/repository-file-audit.csv"
MARKDOWN_LINK = re.compile(r"(?<!!)\[[^\]]*]\(([^)]+)\)")
BINARY_SUFFIXES = {".gif", ".jpeg", ".jpg", ".png", ".webp"}


@dataclass
class AuditResult:
    tracked: int = 0
    markdown: int = 0
    csv_files: int = 0
    fountain: int = 0
    binary_assets: int = 0
    local_links: int = 0
    ledger_rows: int = 0
    issues: list[str] = field(default_factory=list)


def tracked_paths() -> list[Path]:
    output = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT
    ).decode("utf-8")
    return [ROOT / item for item in output.split("\0") if item]


def repository_relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def audit_csv(path: Path, text: str, result: AuditResult) -> None:
    result.csv_files += 1
    rows = list(csv.reader(text.splitlines()))
    if not rows:
        result.issues.append(f"{repository_relative(path)}: empty CSV")
        return
    width = len(rows[0])
    for line_number, row in enumerate(rows[1:], start=2):
        if len(row) != width:
            result.issues.append(
                f"{repository_relative(path)}:{line_number}: "
                f"{len(row)} columns; expected {width}"
            )


def audit_markdown(path: Path, text: str, result: AuditResult) -> None:
    result.markdown += 1
    for match in MARKDOWN_LINK.finditer(text):
        target = match.group(1).strip()
        if target.startswith(("#", "http://", "https://", "mailto:", "chatgpt-", "sandbox:")):
            continue
        target_path = target.split("#", 1)[0].strip("<>")
        if not target_path:
            continue
        result.local_links += 1
        resolved = (path.parent / target_path).resolve()
        if not resolved.exists():
            result.issues.append(
                f"{repository_relative(path)}: broken local link {target!r}"
            )


def audit_ledger(paths: list[Path], result: AuditResult) -> None:
    if not LEDGER.exists():
        result.issues.append("repository-file-audit.csv is missing")
        return
    with LEDGER.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["path", "audit_status"]:
            result.issues.append(
                "repository-file-audit.csv must contain path,audit_status"
            )
            return
        rows = list(reader)
    result.ledger_rows = len(rows)
    ledger_paths = [row["path"] for row in rows]
    duplicate_paths = sorted(
        {path for path in ledger_paths if ledger_paths.count(path) > 1}
    )
    for path in duplicate_paths:
        result.issues.append(f"repository-file-audit.csv: duplicate path {path}")
    tracked = {repository_relative(path) for path in paths}
    recorded = set(ledger_paths)
    for path in sorted(tracked - recorded):
        result.issues.append(f"repository-file-audit.csv: missing tracked path {path}")
    for path in sorted(recorded - tracked):
        result.issues.append(f"repository-file-audit.csv: untracked path {path}")
    for line_number, row in enumerate(rows, start=2):
        if not row["audit_status"].strip():
            result.issues.append(
                f"repository-file-audit.csv:{line_number}: empty audit_status"
            )


def run_audit() -> AuditResult:
    result = AuditResult()
    paths = tracked_paths()
    result.tracked = len(paths)
    for path in paths:
        relative = repository_relative(path)
        data = path.read_bytes()
        if not data:
            result.issues.append(f"{relative}: empty file")
            continue
        if path.suffix.lower() in BINARY_SUFFIXES:
            result.binary_assets += 1
            continue
        if b"\0" in data:
            result.issues.append(f"{relative}: contains NUL byte")
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError as error:
            result.issues.append(f"{relative}: invalid UTF-8: {error}")
            continue
        if not data.endswith(b"\n"):
            result.issues.append(f"{relative}: missing terminal newline")
        if path.suffix == ".csv":
            audit_csv(path, text, result)
        elif path.suffix == ".md":
            audit_markdown(path, text, result)
        elif path.suffix == ".fountain":
            result.fountain += 1
    audit_ledger(paths, result)
    return result


def summary(result: AuditResult) -> str:
    state = "PASS" if not result.issues else "FAIL"
    return (
        f"Tracked-file audit {state}: {result.tracked} files; "
        f"{result.markdown} Markdown; {result.csv_files} CSV; "
        f"{result.fountain} Fountain; {result.binary_assets} binary assets; "
        f"{result.local_links} local links; "
        f"{result.ledger_rows} ledger rows; {len(result.issues)} issues."
    )


def render_report(result: AuditResult) -> str:
    lines = [
        "# Tracked-File Audit Report",
        "",
        f"**Result:** {'PASS' if not result.issues else 'FAIL'}",
        "",
        "| Measure | Count |",
        "|---|---:|",
        f"| Git-tracked files | {result.tracked} |",
        f"| Markdown files | {result.markdown} |",
        f"| CSV files | {result.csv_files} |",
        f"| Fountain files | {result.fountain} |",
        f"| Registered binary assets | {result.binary_assets} |",
        f"| Repository-relative Markdown links | {result.local_links} |",
        f"| Per-file ledger rows | {result.ledger_rows} |",
        f"| Issues | {len(result.issues)} |",
        "",
        "## Checks",
        "",
        "- every tracked file is non-empty;",
        "- non-image text files are UTF-8 without NUL bytes;",
        "- registered image suffixes are counted as binary assets rather than decoded as text;",
        "- every tracked text file ends with a newline;",
        "- every CSV row matches its header width;",
        "- every repository-relative Markdown link resolves;",
        "- the audit ledger covers every tracked path exactly once;",
        "- every ledger row has a non-empty audit status.",
        "",
        "## Issues",
        "",
    ]
    if result.issues:
        lines.extend(f"- {issue}" for issue in result.issues)
    else:
        lines.append("- None.")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--report",
        type=Path,
        help="Write a deterministic Markdown report to this path.",
    )
    args = parser.parse_args()
    result = run_audit()
    print(summary(result))
    for issue in result.issues:
        print(f"ERROR: {issue}", file=sys.stderr)
    if args.report:
        destination = args.report
        if not destination.is_absolute():
            destination = ROOT / destination
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(render_report(result), encoding="utf-8")
    return 1 if result.issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
