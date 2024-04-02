import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import { isEqual } from '@jupyter-widgets/base';

const HideAllAgentsCheckbox: React.FunctionComponent = (): JSX.Element => {
  const {
    handleAllAgentsCheckboxChange,
    hiddenAgents,
    allAgentsHidden,
    noAgentsHidden,
  } = useContext(VisibilityContext);

  const tooltipMap = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: 'Show',
  };

  const getCheckboxStatus = () => {
    if (isEqual(hiddenAgents, noAgentsHidden)) {
      return CheckboxState.Checked;
    }
    if (isEqual(hiddenAgents, allAgentsHidden)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const checkboxStatus = getCheckboxStatus();
  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={() => handleAllAgentsCheckboxChange(checkboxStatus)}
      />
    </Tooltip>
  );
};

export default HideAllAgentsCheckbox;
