import React, { useContext } from 'react';
import { Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import { CustomCheckboxProps, HighlightDisplayOption } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';

const HighlightCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { agentName, displayStateName } = props;

  const { handleHightlightCheckboxChange, highlightedAgents } =
    useContext(VisibilityContext);

  const selections = highlightedAgents[agentName];
  const isTopLevel = displayStateName === undefined;

  const determineTopLevelCheckboxStatus = () => {
    if (selections?.length === 0) {
      return CheckboxState.Checked;
    }
    if (selections?.includes(agentName)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const determineDisplayStateCheckboxStatus = (displayStateName: string) => {
    if (selections?.includes(displayStateName) || selections?.length === 0) {
      return CheckboxState.Checked;
    }
    return CheckboxState.Unchecked;
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

  const checkboxStatus = isTopLevel
    ? determineTopLevelCheckboxStatus()
    : determineDisplayStateCheckboxStatus(displayStateName);
  const { tooltipText, ariaLabel, icon } =
    getHighlightDisplayOptions(checkboxStatus);

  return (
    <Tooltip placement="top" title={tooltipText}>
      <input
        type="checkbox"
        aria-label={ariaLabel}
        tabIndex={0}
        style={{
          position: 'absolute',
          opacity: 0,
          cursor: 'pointer',
        }}
        onClick={() =>
          handleHightlightCheckboxChange(agentName, displayStateName)
        }
      />
      <label style={{ fill: '#d3d3d3' }}>{icon}</label>
    </Tooltip>
  );
};

export default HighlightCheckbox;
