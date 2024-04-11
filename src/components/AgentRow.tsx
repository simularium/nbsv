import React from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import HideCheckbox from './HideCheckbox';
import HighlightCheckbox from './HighlightCheckbox';
import { AgentProps, AgentType, DisplayStateProps } from '../types';
import { Button } from 'antd';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const [showDisplayStates, setShowDisplayStates] = React.useState(false);
  const hasDisplayStates = agent.displayStates.length > 0;

  const getDisplayStateRows = (agent: UIDisplayEntry) => {
    return agent.displayStates.map((displayState) => {
      const checkboxProps: DisplayStateProps = {
        agentType: AgentType.DisplayState,
        agentName: agent.name,
        displayStateName: displayState.name,
      };
      return (
        <div className="item-row" style={{ display: 'flex' }}>
          <HighlightCheckbox {...checkboxProps} />
          <div
            className="color-swatch"
            style={{
              backgroundColor: displayState.color,
              width: '12px',
              height: '12px',
            }}
          ></div>
          <HideCheckbox {...checkboxProps} />
          <span>{displayState.name}</span>
        </div>
      );
    });
  };

  const displayStateRows = hasDisplayStates && getDisplayStateRows(agent);

  const checkboxProps: AgentProps = {
    agentType: AgentType.Agent,
    agentName: agent.name,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="item-row" style={{ display: 'flex' }}>
        <HighlightCheckbox {...checkboxProps} />
        <div
          className="color-swatch"
          style={{
            backgroundColor: agent.color,
            width: '12px',
            height: '12px',
          }}
        ></div>
        <HideCheckbox {...checkboxProps} />
        <span>{agent.name}</span>
        {hasDisplayStates && (
          <Button
            style={{ paddingLeft: '30px' }}
            onClick={() => setShowDisplayStates(!showDisplayStates)}
          >
            show display states
          </Button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {showDisplayStates && displayStateRows}
      </div>
    </div>
  );
};

export default AgentRow;
