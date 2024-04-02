import React from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import HideCheckbox from './HideCheckox';
import HighlightCheckbox from './HighlightCheckbox';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  return (
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
    </div>
  );
};

export default AgentRow;
