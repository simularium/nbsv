import React, { useContext, useMemo } from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import { CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import { SelectionType } from '../types';
import CustomCheckbox from './CustomCheckbox';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const { toggleAgentVisibility, hiddenAgents, highlightedAgents } =
    useContext(VisibilityContext);

  const getHighlightCheckboxStatus = (): CheckboxState => {
    if (highlightedAgents[agent.name]?.length === 0) {
      return CheckboxState.Checked;
    }
    return CheckboxState.Unchecked;
  };

  const getHideCheckboxStatus = (): CheckboxState => {
    if (hiddenAgents[agent.name]?.length === 0) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const hideCheckboxStatus = useMemo(() => {
    return getHideCheckboxStatus();
  }, [hiddenAgents]);
  const highlightCheckboxStatus = useMemo(() => {
    return getHighlightCheckboxStatus();
  }, [highlightedAgents]);

  return (
    <div className="item-row" style={{ display: 'flex' }}>
      <CustomCheckbox
        selectionType={SelectionType.Highlight}
        status={highlightCheckboxStatus}
        clickHandler={() =>
          toggleAgentVisibility(agent.name, SelectionType.Highlight)
        }
      />
      <div
        className="color-swatch"
        style={{
          backgroundColor: agent.color,
          width: '12px',
          height: '12px',
        }}
      ></div>
      <CustomCheckbox
        selectionType={SelectionType.Hide}
        status={hideCheckboxStatus}
        clickHandler={() =>
          toggleAgentVisibility(agent.name, SelectionType.Hide)
        }
      />
      <span>{agent.name}</span>
    </div>
  );
};

export default AgentRow;
