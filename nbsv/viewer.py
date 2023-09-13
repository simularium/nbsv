#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Megan Riel-Mehan.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
import ipywidgets
from simulariumio import TrajectoryData, TrajectoryConverter
from traitlets import Unicode, Int, Instance
from ._frontend import module_name, module_version

@ipywidgets.register
class ViewerWidget(ipywidgets.DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('TrajectoryModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('Viewport').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    trajectory = Instance(TrajectoryData)
    trajectory_str = Unicode("").tag(sync=True)
    width = Int(500).tag(sync=True)
    height = Int(300).tag(sync=True)

    def __init__(self, trajectory: TrajectoryData, width: int = 500, height: int = 300):
        super(ipywidgets.DOMWidget, self).__init__()
        self.trajectory = trajectory
        self.width = width
        self.height = height
        self.load_trajectory()

    def load_trajectory(self):
        self.trajectory_str = TrajectoryConverter(self.trajectory).to_JSON()
