import * as React from 'react';
import { CheckboxOptionType } from 'antd';

import '../../css/sidePanel.css';
import CheckBoxTree from './CheckBoxTree';
import { SelectionStateInfo } from '@aics/simularium-viewer';
import { VisibilitySelectionMap } from '../App';

interface SidePanelProps {
  title: string;
  uiData: UIDisplayData;
  selectionStateInfo: SelectionStateInfo;
  setSelectionStateInfo: (info: SelectionStateInfo) => void;
  visibleAgents: VisibilitySelectionMap;
  setVisibleAgents: (agents: VisibilitySelectionMap) => void;
  highlightedAgents: VisibilitySelectionMap;
  setHighlightedAgents: (agents: VisibilitySelectionMap) => void;
  agentsChecked: VisibilitySelectionMap;
  setAgentsChecked: (agents: VisibilitySelectionMap) => void;
}
export interface AgentDisplayNode {
  title: string;
  key: string;
  children: CheckBoxWithColor[];
  color: string;
}

interface DisplayStateEntry {
  name: string;
  id: string;
  color: string;
}
export interface UIDisplayEntry {
  name: string;
  displayStates: DisplayStateEntry[];
  color: string;
}
export declare type UIDisplayData = UIDisplayEntry[];

interface CheckBoxWithColor extends CheckboxOptionType {
  color: string;
}

export const getUiDisplayDataTree = (
  uiDisplayData: UIDisplayData
): AgentDisplayNode[] => {
  if (!uiDisplayData.length) {
    return [];
  }
  return uiDisplayData.map((agent) => ({
    title: agent.name,
    key: agent.name,
    color: agent.color,
    children: agent.displayStates.length
      ? [
          ...agent.displayStates.map((state) => ({
            label: state.name,
            value: state.id,
            color: state.color,
          })),
        ]
      : [],
  }));
};

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  console.log('sidepanel log', props.title);
  const treeData = getUiDisplayDataTree(props.uiData);
  return (
    <div className="sp-container">
      {/* <div className="title"> some words </div> */}
      <CheckBoxTree
        treeData={treeData}
        agentsHighlighted={props.selectionStateInfo.highlightedAgents}
        visibleAgents={props.visibleAgents}
        setVisibleAgents={props.setVisibleAgents}
        highlightedAgents={props.highlightedAgents}
        setHighlightedAgents={props.setHighlightedAgents}
        agentsChecked={props.agentsChecked}
        setAgentsChecked={props.setAgentsChecked}
      />
    </div>
  );
};

export default SidePanel;
