import React, { useContext } from 'react';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import { CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import CustomCheckbox from './CustomCheckbox';

interface AgentRowProps {
  agent: UIDisplayEntry;
}

const AgentRow: React.FC<AgentRowProps> = (
  props: AgentRowProps
): JSX.Element => {
  const { agent } = props;

  const { handleAgentCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const getCheckboxStatus = () => {
    if (hiddenAgents[agent.name]?.length === 0) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const checkboxStatus = getCheckboxStatus();

  // below is a temporary dummy status that just reverses
  // the state of the other checkbox as a proof of concept
  // todo: add true highlight state and functionality
  const fakeHighlightState =
    getCheckboxStatus() === CheckboxState.Checked
      ? CheckboxState.Unchecked
      : CheckboxState.Checked;

  return (
    <div className="item-row" style={{ display: 'flex' }}>
      <CustomCheckbox
        checkboxType="highlight"
        status={checkboxStatus}
        clickHandler={() => console.log('highlight clicked')}
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
        checkboxType="hide"
        status={fakeHighlightState}
        clickHandler={() => handleAgentCheckboxChange(agent.name)}
      />
      <span>{agent.name}</span>
    </div>
  );
};

export default AgentRow;
