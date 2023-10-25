import {
  SelectionStateInfo,
  SimulariumController,
  UIDisplayData,
} from '@aics/simularium-viewer';
import React, { useEffect, useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';

import Viewer from './Viewer';
import { TimeUnits, VisibilitySelectionMap } from './types';
import SidePanel from './components/SidePanel';

import '../css/app.css';
import { getAgentsToHide, getHighlightedAgents } from './selectors';

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

function AppWidget(props: WidgetProps): JSX.Element {
  const [uidata, setUiData] = useState<UIDisplayData>([]);
  const [selectionStateInfo, setSelectionStateInfo] =
    useState<SelectionStateInfo>({
      highlightedAgents: [],
      hiddenAgents: [],
    });

  const [hiddenAgents, setHiddenAgents] = useState<VisibilitySelectionMap>({});
  const [highlightedAgents, setHighlightedAgents] =
    useState<VisibilitySelectionMap>({});
  const [agentsChecked, setAgentsChecked] = useState<VisibilitySelectionMap>(
    {}
  );

  const updateHiddenAgents = (newAgents: VisibilitySelectionMap) => {
    let value: VisibilitySelectionMap = {};
    for (const key in newAgents) {
      if (newAgents[key].length) {
        value = { ...hiddenAgents, ...newAgents };
      } else {
        const newHiddenAgents = { ...hiddenAgents };
        delete newHiddenAgents[key];
        value = newHiddenAgents;
      }
      setHiddenAgents(value);
    }
  };

  const toggleAllAgents = (agents?: VisibilitySelectionMap) => {
    for (const key in agents) {
      if (agents[key].length) {
        setHiddenAgents(agents);
        return;
      } else {
        setHiddenAgents({});
      }
    }
  };

  const updateHighlightedAgents = (newAgents: VisibilitySelectionMap) => {
    const value = { ...highlightedAgents, ...newAgents };
    setHighlightedAgents(value);
  };

  useEffect(() => {
    setSelectionStateInfo({
      highlightedAgents: getHighlightedAgents(highlightedAgents, uidata),
      hiddenAgents: getAgentsToHide(hiddenAgents, uidata),
    });
  }, [hiddenAgents, highlightedAgents]);

  return (
    <div className="app-container">
      <SidePanel
        title="some words"
        uiData={uidata}
        hiddenAgents={hiddenAgents}
        setHiddenAgents={updateHiddenAgents}
        highlightedAgents={highlightedAgents}
        setHighlightedAgents={updateHighlightedAgents}
        agentsChecked={agentsChecked}
        setAgentsChecked={setAgentsChecked}
        toggleAllAgents={toggleAllAgents}
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
        selectionStateInfo={selectionStateInfo}
      />
    </div>
  );
}

export default AppWidget;
