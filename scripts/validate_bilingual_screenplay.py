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

ROOT = Path(__