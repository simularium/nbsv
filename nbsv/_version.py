#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Megan Riel-Mehan.
# Distributed under the terms of the Modified BSD License.

public_version = ("0", "1", "0")
extra = "dev-0"
version_info = (*public_version, extra)
__version__ = ".".join(map(str, version_info))
