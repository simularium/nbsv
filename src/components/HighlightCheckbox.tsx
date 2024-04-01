import React from 'react';
import { Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';
import { HighlightDisplayOption } from '../types';

interface CustomCheckboxProps {
  status: CheckboxState;
  clickHandler: () => void;
}

const CustomCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { status, clickHandler } = props;

  const getHighlightDisplayOptions = (): HighlightDisplayOption => {
    switch (status) {
      case CheckboxState.Checked:
        return {
          tooltipText: 'Remove highlight',
          ariaLabel: 'true',
          icon: HighlightStar,
        };
      case CheckboxState.Unchecked:
        return {
          tooltipText: 'Highlight',
          ariaLabel: 'false',
          icon: NoHighlightStar,
        };
      case CheckboxState.Indeterminate:
        return {
          tooltipText: 'Highlight',
          ariaLabel: 'mixed',
          icon: IndeterminateHighlightStar,
        };
    }
  };

  const { tooltipText, ariaLabel, icon } = getHighlightDisplayOptions();

  return (
    <Tooltip placement="right" title={tooltipText}>
      <div
        role="checkbox"
        aria-checked={ariaLabel}
        tabIndex={0}
        style={{ fill: '#d3d3d3' }}
        onClick={clickHandler}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export default CustomCheckbox;
