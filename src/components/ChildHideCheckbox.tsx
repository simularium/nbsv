import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { ChildCheckboxProps } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import { CheckboxState, TOOLTIP_COLOR, tooltipMap } from '../constants';

const ChildHideCheckbox: React.FunctionComponent<ChildCheckboxProps> = (
  props: ChildCheckboxProps
): JSX.Element => {
  const { name, parentName } = props;
  const { handleHideChildCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const selections = hiddenAgents[parentName];

  const getCheckboxStatus = () => {
    if (selections?.includes(name)) {
      return CheckboxState.Checked;
    }
    return CheckboxState.Unchecked;
  };

  const checkboxStatus = getCheckboxStatus();
  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="top" title={tooltipText} color={TOOLTIP_COLOR}>
      <Checkbox
        checked={checkboxStatus === 'Checked'}
        onClick={() => handleHideChildCheckboxChange(name, parentName)}
      />
    </Tooltip>
  );
};

export default ChildHideCheckbox;
