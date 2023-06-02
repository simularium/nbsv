#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Megan Riel-Mehan.
# Distributed under the terms of the Modified BSD License.


version_info = (0, 1, 0, "dev-0")
public_version = version_info[0:3]
extra = version_info[3]
__version__ = f'".".join(map(str, (public_version,)))-{extra}'
