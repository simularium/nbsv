import React, { useContext } from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import HideCheckbox from './HideCheckbox';
import HighlightCheckbox from './HighlightCheckbox';
import { Button } from 'antd';
import ChildHideCheckbox from './ChildHideCheckbox';
import ChildHighlightCheckbox from './ChildHighlightCheckbox';
import { VisibilityContext } from '../AgentVisibilityContext';
import { getChildren } from '../utils';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const {
    handleHideCheckboxChange,
    handleHideChildCheckboxChange,
    handleHighlightChange,
    handleChildHighlightChange,
    highlightedAgents,
    hiddenAgents,
  } = useContext(VisibilityContext);
  const highlightSelections = highlightedAgents[agent.name];
  const hiddenSelections = hiddenAgents[agent.name];

  const [showChildren, setShowChildren] = React.useState(false);
  const hasChildren = agent.displayStates.length > 0;

  const getChildRows = (agent: UIDisplayEntry) => {
    return agent.displayStates.map((displayState) => {
      return (
        <div className="item-row" style={{ display: 'flex' }}>
          <ChildHighlightCheckbox
            name={displayState.name}
            selections={highlightSelections}
            clickHandler={() => {
              handleChildHighlightChange(displayState.name, agent.name);
            }}
          />
          <div
            className="color-swatch"
            style={{
              backgroundColor: displayState.color,
              width: '12px',
              height: '12px',
            }}
          ></div>
          <ChildHideCheckbox
            name={displayState.name}
            selections={hiddenSelections}
            clickHandler={() =>
              handleHideChildCheckboxChange(displayState.name, agent.name)
            }
          />
          <span>{displayState.name}</span>
        </div>
      );
    });
  };

  const childRows = hasChildren && getChildRows(agent);
  const children = getChildren(agent);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="item-row" style={{ display: 'flex' }}>
        <HighlightCheckbox
          agent={agent}
          selections={highlightSelections}
          clickHandler={() => handleHighlightChange(agent.name, children)}
        />
        <div
          className="color-swatch"
          style={{
            backgroundColor: agent.color,
            width: '12px',
            height: '12px',
          }}
        ></div>
        <HideCheckbox
          agent={agent}
          selections={hiddenSelections}
          clickHandler={() => handleHideCheckboxChange(agent.name, children)}
        />
        <span>{agent.name}</span>
        {hasChildren && (
          <Button
            style={{ paddingLeft: '30px' }}
            onClick={() => setShowChildren(!showChildren)}
          >
            show child rows
          </Button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {showChildren && childRows}
      </div>
    </div>
  );
};

export default AgentRow;
