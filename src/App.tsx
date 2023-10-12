import { SimulariumController } from '@aics/simularium-viewer';
import React from 'react';

import { WidgetModel } from '@jupyter-widgets/base';

import Viewer from './Viewer';
import { TimeUnits } from './types';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface WidgetProps {
  controller: SimulariumController;
  height: number;
  width: number;
  timeStep: number;
  firstFrameTime: number;
  lastFrameTime: number;
  timeUnits: TimeUnits;
}

function AppWidget(props: WidgetProps): JSX.Element {
  return (
    <Viewer
      controller={props.controller}
      height={props.height}
      width={props.width}
      firstFrameTime={props.firstFrameTime}
      lastFrameTime={props.lastFrameTime}
      timeStep={props.timeStep}
      timeUnits={props.timeUnits}
    />
  );
}

export default AppWidget;
