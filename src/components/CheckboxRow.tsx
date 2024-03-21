import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

import { TOOLTIP_COLOR, CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';

interface CheckboxRowProps {
  agent: UIDisplayEntry;
}

const CheckboxRow: React.FC<CheckboxRowProps> = (
  props: CheckboxRowProps
): JSX.Element => {
  const { agent } = props;

  const { handleAgentCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const getCheckboxState = () => {
    if (hiddenAgents[agent.name]?.length === 0) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const checkedState = getCheckboxState();

  const hiddenStateTooltipText = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: '',
  };

  return (
    <div className="item-row" style={{ display: 'flex' }}>
      <div
        className="color-swatch"
        style={{
          backgroundColor: agent.color,
          width: '12px',
          height: '12px',
        }}
      ></div>
      <Tooltip
        placement="right"
        title={hiddenStateTooltipText[checkedState]}
        color={TOOLTIP_COLOR}
      >
        <Checkbox
          checked={checkedState === CheckboxState.Checked}
          onClick={() => handleAgentCheckboxChange(agent.name)}
        />
      </Tooltip>
      <span>{agent.name}</span>
    </div>
  );
};

export default CheckboxRow;
