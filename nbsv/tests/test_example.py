#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Megan Riel-Mehan.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..ViewerWidget import ViewerWidget


def test_example_creation_blank():
    w = ViewerWidget()
    assert w.value == 'Hello World'
