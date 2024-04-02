import React, { useContext, useMemo } from 'react';
import { Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import {
  HighlightStar,
  IndeterminateHighlightStar,
  NoHighlightStar,
} from './Icons';
import { HighlightDisplayOption, SelectionType } from '../types';
import { VisibilityContext } from '../AgentVisibilityContext';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

interface CustomCheckboxProps {
  agent: UIDisplayEntry;
}

const CustomCheckbox: React.FunctionComponent<CustomCheckboxProps> = (
  props: CustomCheckboxProps
): JSX.Element => {
  const { agent } = props;

  const { toggleAgentVisibility, highlightedAgents } =
    useContext(VisibilityContext);

  const getHighlightCheckboxStatus = (): CheckboxState => {
    if (highlightedAgents[agent.name]?.length === 0) {
      return CheckboxState.Checked;
    }
    return CheckboxState.Unchecked;
  };

  const checkboxStatus = useMemo(() => {
    return getHighlightCheckboxStatus();
  }, [highlightedAgents]);

  const getHighlightDisplayOptions = (): HighlightDisplayOption => {
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

  const { tooltipText, ariaLabel, icon } = getHighlightDisplayOptions();

  return (
    <Tooltip placement="right" title={tooltipText}>
      <input
        type="checkbox"
        aria-label={ariaLabel}
        tabIndex={0}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => {
          toggleAgentVisibility(agent.name, SelectionType.Highlight);
        }}
      />
      <label style={{ fill: '#d3d3d3' }}>{icon}</label>
    </Tooltip>
  );
};

export default CustomCheckbox;
