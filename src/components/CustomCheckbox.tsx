import React from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';
import {
  CheckboxDisplayOptionsHide,
  CheckboxDisplayOptionsHighlight,
  SelectionType,
} from '../types';

interface CustomCheckboxProps {
  selectionType: SelectionType;
  status: CheckboxState;
  clickHandler: () => void;
}

const CustomCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { selectionType: checkboxType, status, clickHandler } = props;

  const getDisplayOptionsHighlight = (): CheckboxDisplayOptionsHighlight => {
    switch (status) {
      case CheckboxState.Checked:
        return {
          highlightTooltipText: 'Remove highlight',
          highlightAriaLabel: 'true',
          highlightIcon: HighlightStar,
        };
      case CheckboxState.Unchecked:
        return {
          highlightTooltipText: 'Highlight',
          highlightAriaLabel: 'false',
          highlightIcon: NoHighlightStar,
        };
      case CheckboxState.Indeterminate:
        return {
          highlightTooltipText: 'Highlight',
          highlightAriaLabel: 'mixed',
          highlightIcon: IndeterminateHighlightStar,
        };
    }
  };

  const getDisplayOptionsHide = (): CheckboxDisplayOptionsHide => {
    switch (status) {
      case CheckboxState.Checked:
        return {
          hideTooltipText: 'Hide',
        };
      case CheckboxState.Unchecked:
        return {
          hideTooltipText: 'Show',
        };
      case CheckboxState.Indeterminate:
        return {
          hideTooltipText: 'Show',
        };
    }
  };
  
  const getDisplayElements = (): {
    checkboxToRender: JSX.Element;
    tooltipText: string;
  } => {
    switch (checkboxType) {
      case SelectionType.Hide: {
        const { hideTooltipText } = getDisplayOptionsHide();
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
      }
      case SelectionType.Highlight: {
        const { highlightTooltipText, highlightAriaLabel, highlightIcon } =
          getDisplayOptionsHighlight();
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
