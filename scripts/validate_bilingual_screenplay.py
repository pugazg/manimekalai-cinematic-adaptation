#!/usr/bin/env python3
"""Validate structural parity between the English and Tamil screenplay drafts.

The validator uses only the Python standard library. It compares paired sequence
files, approved scene ranges, and complete TRACE signatures. ABSORBS lists may
use commas or semicolons because both forms occur in the screenplay corpus.
"""
from __future__ import annotations

import