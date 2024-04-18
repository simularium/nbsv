import React from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import HideCheckbox from './HideCheckbox';
import HighlightCheckbox from './HighlightCheckbox';
import { ChildCheckboxProps } from '../types';
import { Button } from 'antd';
import ChildHideCheckbox from './ChildHideCheckbox';
import ChildHighlightCheckbox from './ChildHighlightCheckbox';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const [showChildren, setShowChildren] = React.useState(false);
  const hasChildren = agent.displayStates.length > 0;

  const getChildRows = (agent: UIDisplayEntry) => {
    return agent.displayStates.map((displayState) => {
      const checkboxProps: ChildCheckboxProps = {
        name: displayState.name,
        parentName: agent.name,
      };
      return (
        <div className="item-row" style={{ display: 'flex' }}>
          <ChildHighlightCheckbox {...checkboxProps} />
          <div
            className="color-swatch"
            style={{
              backgroundColor: displayState.color,
              width: '12px',
              height: '12px',
            }}
          ></div>
          <ChildHideCheckbox {...checkboxProps} />
          <span>{displayState.name}</span>
        </div>
      );
    });
  };

  const childRows = hasChildren && getChildRows(agent);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="item-row" style={{ display: 'flex' }}>
        <HighlightCheckbox agent={agent} />
        <div
          className="color-swatch"
          style={{
            backgroundColor: agent.color,
            width: '12px',
            height: '12px',
          }}
        ></div>
        <HideCheckbox agent={agent} />
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
