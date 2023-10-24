import {
  SelectionStateInfo,
  SimulariumController,
  UIDisplayData,
} from '@aics/simularium-viewer';
import React, { useState } from 'react';

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

  const updateSelectionStateInfo = (newInfo: SelectionStateInfo) => {
    setSelectionStateInfo(newInfo);
  };

  const updateHiddenAgents = (newAgents: VisibilitySelectionMap) => {
    let value: VisibilitySelectionMap = {};
    for (const key in newAgents) {
      if (newAgents[key].length) {
        value = { ...hiddenAgents, ...newAgents };
      } else {
        const newHidden = hiddenAgents;
        delete newHidden[key];
        value = newHidden;
      }
      console.log('value in updateHiddenAgents', value);
      setHiddenAgents(value);
      const newHidden = getAgentsToHide(hiddenAgents, uidata);
      console.log("useEffect's newHidden", newHidden);
      setSelectionStateInfo({
        highlightedAgents: getHighlightedAgents(highlightedAgents, uidata),
        hiddenAgents: newHidden,
      });
    }
  };

  const updateHighlightedAgents = (newAgents: VisibilitySelectionMap) => {
    const value = { ...highlightedAgents, ...newAgents };
    setHighlightedAgents(value);
  };

  return (
    <div className="app-container">
      <SidePanel
        title="some words"
        uiData={uidata}
        selectionStateInfo={selectionStateInfo}
        setSelectionStateInfo={updateSelectionStateInfo}
        hiddenAgents={hiddenAgents}
        setHiddenAgents={updateHiddenAgents}
        highlightedAgents={highlightedAgents}
        setHighlightedAgents={updateHighlightedAgents}
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
        selectionStateInfo={selectionStateInfo}
      />
    </div>
  );
}

export default AppWidget;
