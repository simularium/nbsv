// Copyright (c) Megan Riel-Mehan
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';
import React from 'react';
import ReactDOM from 'react-dom';

import { MODULE_NAME, MODULE_VERSION } from './version';
import Viewer from './Viewer';

// Import the CSS
import '../css/widget.css';

export class TrajectoryModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: TrajectoryModel.model_name,
      _model_module: TrajectoryModel.model_module,
      _model_module_version: TrajectoryModel.model_module_version,
      _view_name: TrajectoryModel.view_name,
      _view_module: TrajectoryModel.view_module,
      _view_module_version: TrajectoryModel.view_module_version,
      value: 'Hello',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'TrajectoryModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'Viewport'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class Viewport extends DOMWidgetView {
  render(): void {
    this.el.classList.add('custom-widget');
    const component = React.createElement(Viewer);
    // this.value_changed();
    // this.model.on('change:value', this.value_changed, this);

    ReactDOM.render(component, this.el);
    // const test = document.createElement('input');
    // this.el.appendChild(test);
  }

  // value_changed(): void {
  //   this.el.textContent = this.model.get('value');
  // }
}
