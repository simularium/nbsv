import React from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState } from '../constants';

interface HideCheckboxProps {
  status: CheckboxState;
  clickHandler: () => void;
}

const HideCheckbox: React.FunctionComponent<HideCheckboxProps> = (
  props: HideCheckboxProps
): JSX.Element => {
  const { status, clickHandler } = props;

  const tooltipMap = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: 'Show',
  };

  const tooltipText = tooltipMap[status];

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={status === 'Indeterminate'}
        checked={status === 'Checked'}
        onClick={clickHandler}
      />
    </Tooltip>
  );
};

export default HideCheckbox;
