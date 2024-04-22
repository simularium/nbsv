import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { ChildCheckboxProps } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import { CheckboxState, tooltipMap } from '../constants';

const ChildHideCheckbox: React.FunctionComponent<ChildCheckboxProps> = (
  props: ChildCheckboxProps
): JSX.Element => {
  const { name, parentName } = props;
  const { handleHideChildCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  // the selections are initialized with the parents names as keys,
  // so this will always exist, but typeScript doesn't know that.
  const selections = hiddenAgents[parentName] || [];

  const getCheckboxStatus = () => {
    if (selections?.includes(name)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const checkboxStatus = getCheckboxStatus();
  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="right" title={tooltipText} trigger={['focus', 'hover']}>
      <Checkbox
        checked={checkboxStatus === 'Checked'}
        onClick={() => handleHideChildCheckboxChange(name, parentName)}
      />
    </Tooltip>
  );
};

export default ChildHideCheckbox;
