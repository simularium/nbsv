import React, { useContext } from 'react';
import { Tooltip } from 'antd';

import { CheckboxState, TOOLTIP_COLOR } from '../constants';
import { CheckboxProps, HighlightDisplayOption } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';
import { getChildren } from '../utils';

const HighlightCheckbox: React.FunctionComponent<CheckboxProps> = (
  props: CheckboxProps
): JSX.Element => {
  const { agent } = props;

  const { handleHighlightChange, highlightedAgents } =
    useContext(VisibilityContext);

  const selections = highlightedAgents[agent.name];
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

  const getHighlightDisplayOptions = (
    checkboxStatus: CheckboxState
  ): HighlightDisplayOption => {
    switch (checkboxStatus) {
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

  const checkboxStatus = getCheckboxStatus();
  const { tooltipText, ariaLabel, icon } =
    getHighlightDisplayOptions(checkboxStatus);
  const children = getChildren(agent);

  return (
    <Tooltip placement="top" title={tooltipText} color={TOOLTIP_COLOR}>
      <input
        type="checkbox"
        aria-label={ariaLabel}
        tabIndex={0}
        style={{
          position: 'absolute',
          opacity: 0,
          cursor: 'pointer',
        }}
        onClick={() => handleHighlightChange(agent.name, children)}
      />
      <label style={{ fill: '#d3d3d3' }}>{icon}</label>
    </Tooltip>
  );
};

export default HighlightCheckbox;
