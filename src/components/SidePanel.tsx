import * as React from 'react';

import '../../css/sidePanel.css';
import CheckBoxTree from './CheckBoxTree';
import { SelectionStateInfo } from '@aics/simularium-viewer';
import { UIDisplayData, VisibilitySelectionMap } from '../types';
import { getUiDisplayDataTree } from '../selectors';

interface SidePanelProps {
  title: string;
  uiData: UIDisplayData;
  selectionStateInfo: SelectionStateInfo;
  setSelectionStateInfo: (info: SelectionStateInfo) => void;
  hiddenAgents: VisibilitySelectionMap;
  setHiddenAgents: (agents: VisibilitySelectionMap) => void;
  highlightedAgents: VisibilitySelectionMap;
  setHighlightedAgents: (agents: VisibilitySelectionMap) => void;
  agentsChecked: VisibilitySelectionMap;
  setAgentsChecked: (agents: VisibilitySelectionMap) => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  // console.log('sidepanel log', props.title);
  const treeData = getUiDisplayDataTree(props.uiData);
  return (
    <div className="sp-container">
      {/* <div className="title"> some words </div> */}
      <CheckBoxTree
        treeData={treeData}
        agentsHighlighted={props.selectionStateInfo.highlightedAgents}
        hiddenAgents={props.hiddenAgents}
        setHiddenAgents={props.setHiddenAgents}
        highlightedAgents={props.highlightedAgents}
        setHighlightedAgents={props.setHighlightedAgents}
        agentsChecked={props.agentsChecked}
        setAgentsChecked={props.setAgentsChecked}
        selectionStateInfo={props.selectionStateInfo}
        setSelectionStateInfo={props.setSelectionStateInfo}
      />
    </div>
  );
};

export default SidePanel;
