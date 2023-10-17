import {
  SelectionStateInfo,
  SimulariumController,
  UIDisplayData,
} from '@aics/simularium-viewer';
import React, { useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';

import Viewer from './Viewer';
import { TimeUnits } from './types';
import SidePanel from './components/SidePanel';

import '../css/app.css';

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
  title: string;
}

export interface VisibilitySelectionMap {
  [key: string]: string[];
}

function AppWidget(props: WidgetProps): JSX.Element {
  const [uidata, setUiData] = useState<UIDisplayData>([]);
  const [selectionStateInfo, setSelectionStateInfo] =
    useState<SelectionStateInfo>({
      highlightedAgents: [],
      hiddenAgents: [],
    });
  // this may be able to be consolidated with selection state info... as visible === !hidden..
  // for now passing to to make handleAgentCheck work and replace redux store of visible agents
  // once i get this data
  // i need a function that lets setVisibleAgents accept this type of argument { [key: string]: string[] }

  const [visibleAgents, setVisibleAgents] = useState<VisibilitySelectionMap>(
    {}
  );
  const [highlightedAgents, setHighlightedAgents] =
    useState<VisibilitySelectionMap>({});
  const [agentsChecked, setAgentsChecked] = useState<VisibilitySelectionMap>(
    {}
  );

  return (
    <div className="app-container">
      <SidePanel
        title="some words"
        uiData={uidata}
        selectionStateInfo={selectionStateInfo}
        setSelectionStateInfo={setSelectionStateInfo}
        visibleAgents={visibleAgents}
        setVisibleAgents={setVisibleAgents}
        highlightedAgents={highlightedAgents}
        setHighlightedAgents={setHighlightedAgents}
        agentsChecked={agentsChecked}
        setAgentsChecked={setAgentsChecked}
      />
      <Viewer
        controller={props.controller}
        height={props.height}
        width={props.width}
        firstFrameTime={props.firstFrameTime}
        lastFrameTime={props.lastFrameTime}
        timeStep={props.timeStep}
        timeUnits={props.timeUnits}
        title={props.title}
        setUiData={setUiData}
      />
    </div>
  );
}

export default AppWidget;
