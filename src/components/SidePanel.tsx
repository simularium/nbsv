import * as React from 'react';
import { Card } from 'antd';
import { UIDisplayData } from '@aics/simularium-viewer';

import CheckBoxTree, { VisibilitySelectionMap } from './CheckBoxTree';

import '../../css/side_panel.css';

// TODO placeholder, side panel will receive many props when rendering checkboxes
interface SidePanelProps {
  updateSelectionStateInfo: (selectionStateInfo: any) => void;
  uiDisplayData: UIDisplayData;
  currentHiddenAgents: VisibilitySelectionMap;
  currentHighlightedAgents: VisibilitySelectionMap;
  setCurrentHiddenAgents: (hiddenAgents: VisibilitySelectionMap) => void;
  setCurrentHighlightedAgents: (
    highlightedAgents: VisibilitySelectionMap
  ) => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  const {
    uiDisplayData,
    currentHiddenAgents,
    currentHighlightedAgents,
    setCurrentHiddenAgents,
    setCurrentHighlightedAgents,
  } = props;

  console.log('uidisplaydata in side panel', uiDisplayData);
  return (
    <div className="sp-container">
      <Card className="title-card" bordered={false}>
        Agents
      </Card>
      <CheckBoxTree
        uiDisplayData={uiDisplayData}
        currentHiddenAgents={currentHiddenAgents}
        currentHighlightedAgents={currentHighlightedAgents}
        setCurrentHiddenAgents={setCurrentHiddenAgents}
        setCurrentHighlightedAgents={setCurrentHighlightedAgents}
        // handleAgentCheck={turnAgentsOnByDisplayKey}
        // agentsChecked={agentVisibilityMap}
        // handleHighlight={highlightAgentsByDisplayKey}
        // agentsHighlighted={agentHighlightMap}
        // setAgentsVisible={setAgentsVisible}
        // payloadForSelectAll={payloadForSelectAll}
        // payloadForSelectNone={payloadForSelectNone}
        // isSharedCheckboxIndeterminate={isSharedCheckboxIndeterminate}
        // recentColors={recentColors}
        // setColorChange={setColorChange}
        // setRecentColors={setRecentColors}
      />
    </div>
  );
};

export default SidePanel;
