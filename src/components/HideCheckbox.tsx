import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxProps } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import { CheckboxState, tooltipMap } from '../constants';
import { getChildren } from '../utils';

const HideCheckbox: React.FunctionComponent<CheckboxProps> = (
  props: CheckboxProps
): JSX.Element => {
  const { agent } = props;
  const { handleHideCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const selections = hiddenAgents[agent.name];
  const maxSelections =
    agent.displayStates.length > 0 ? agent.displayStates.length : 1;

  const getCheckboxStatus = () => {
    if (selections?.length === 0) {
      return CheckboxState.Checked;
    }
    if (selections?.length === maxSelections) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const checkboxStatus = getCheckboxStatus();
  const tooltipText = tooltipMap[checkboxStatus];
  const children = getChildren(agent);

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={() => handleHideCheckboxChange(agent.name, children)}
      />
    </Tooltip>
  );
};

export default HideCheckbox;
