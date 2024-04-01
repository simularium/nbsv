import React from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';
import { CheckboxDisplayOptions } from '../types';

interface CustomCheckboxProps {
  checkboxType: 'hide' | 'highlight';
  status: CheckboxState;
  clickHandler: () => void;
}

const CustomCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { checkboxType, status, clickHandler } = props;

  const getDisplayOptions = (): CheckboxDisplayOptions => {
    switch (status) {
      case CheckboxState.Checked:
        return {
          hideTooltipText: 'Hide',
          highlightTooltipText: 'Highlight',
          highlightAriaLabel: 'true',
          highlightIcon: HighlightStar,
        };
      case CheckboxState.Unchecked:
        return {
          hideTooltipText: 'Show',
          highlightTooltipText: 'Remove highlight',
          highlightAriaLabel: 'false',
          highlightIcon: NoHighlightStar,
        };
      case CheckboxState.Indeterminate:
        return {
          hideTooltipText: 'Show',
          highlightTooltipText: 'Remove highlight',
          highlightAriaLabel: 'mixed',
          highlightIcon: IndeterminateHighlightStar,
        };
    }
  };

  const getDisplayElements = (): {
    checkboxToRender: JSX.Element;
    tooltipText: string;
  } => {
    const {
      hideTooltipText,
      highlightTooltipText,
      highlightAriaLabel,
      highlightIcon,
    } = getDisplayOptions();
    switch (checkboxType) {
      case 'hide':
        return {
          checkboxToRender: (
            <Checkbox
              indeterminate={status === 'Indeterminate'}
              checked={status === 'Checked'}
              onClick={clickHandler}
            />
          ),
          tooltipText: hideTooltipText,
        };
      case 'highlight':
        return {
          checkboxToRender: (
            <div
              role="checkbox"
              aria-checked={highlightAriaLabel}
              tabIndex={0}
              style={{ fill: '#d3d3d3' }}
              onClick={clickHandler}
            >
              {highlightIcon}
            </div>
          ),
          tooltipText: highlightTooltipText,
        };
    }
  };

  const { checkboxToRender, tooltipText } = getDisplayElements();

  return (
    <Tooltip placement="right" title={tooltipText}>
      {checkboxToRender}
    </Tooltip>
  );
};

export default CustomCheckbox;
