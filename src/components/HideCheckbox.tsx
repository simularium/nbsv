import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CustomCheckboxProps } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import { CheckboxState, tooltipMap } from '../constants';

const HideCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { agentName, displayStateName } = props;
  const { handleVisibilityCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const selections = hiddenAgents[agentName];
  const isTopLevel = displayStateName === undefined;

  const determineTopLevelCheckboxStatus = () => {
    if (selections?.length === 0) {
      return CheckboxState.Unchecked;
    }
    if (selections?.includes(agentName)) {
      return CheckboxState.Checked;
    }
    return CheckboxState.Indeterminate;
  };

  const determineDisplayStateCheckboxStatus = (displayStateName: string) => {
    if (selections?.includes(displayStateName) || selections?.length === 0) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const checkboxStatus = isTopLevel
    ? determineTopLevelCheckboxStatus()
    : determineDisplayStateCheckboxStatus(displayStateName);
  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={() =>
          handleVisibilityCheckboxChange(agentName, displayStateName)
        }
      />
    </Tooltip>
  );
};

export default HideCheckbox;
