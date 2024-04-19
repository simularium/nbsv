import React from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import HideCheckbox from './HideCheckbox';
import HighlightCheckbox from './HighlightCheckbox';
import { ChildCheckboxProps } from '../types';
import ChildHideCheckbox from './ChildHideCheckbox';
import ChildHighlightCheckbox from './ChildHighlightCheckbox';
import { CaretDown, CaretRight } from './Icons';

import '../../css/agent_row.css';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const [showChildren, setShowChildren] = React.useState(false);
  const hasChildren = agent.displayStates.length > 0;

  const Caret = (
    <div
      className="caret-spacer"
      onClick={() => setShowChildren(!showChildren)}
    >
      {showChildren ? CaretDown : CaretRight}
    </div>
  );

  const Spacer = <div className="caret-spacer" />;

  const getChildRows = (agent: UIDisplayEntry) => {
    return agent.displayStates.map((displayState) => {
      const checkboxProps: ChildCheckboxProps = {
        name: displayState.name,
        parentName: agent.name,
      };
      return (
        <div className="item-row" style={{ display: 'flex' }}>
          {Spacer}
          <ChildHighlightCheckbox {...checkboxProps} />
          <div
            className={['color-swatch', 'child'].join(' ')}
            style={{
              backgroundColor: displayState.color,
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
    <div>
      <div className="item-row" style={{ display: 'flex' }}>
        {hasChildren ? Caret : Spacer}
        <HighlightCheckbox agent={agent} />
        <div
          className="color-swatch"
          style={{
            backgroundColor: agent.color,
          }}
        ></div>
        <HideCheckbox agent={agent} />
        <span>{agent.name}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {showChildren && childRows}
      </div>
    </div>
  );
};

export default AgentRow;
