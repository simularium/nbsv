import React, { useContext, useMemo } from 'react';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

interface HideCheckboxProps {
  agent: UIDisplayEntry;
}

const HideCheckbox: React.FunctionComponent<HideCheckboxProps> = (
  props: HideCheckboxProps
): JSX.Element => {
  const { agent } = props;

  const { handleVisibilityCheckboxChange, hiddenAgents } =
    useContext(VisibilityContext);

  const getHideCheckboxStatus = (): CheckboxState => {
    if (hiddenAgents[agent.name]?.length === 0) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Checked;
  };

  const checkboxStatus = useMemo(() => {
    return getHideCheckboxStatus();
  }, [hiddenAgents]);

  const tooltipMap = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: 'Show',
  };

  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={() => handleVisibilityCheckboxChange(agent.name)}
      />
    </Tooltip>
  );
};

export default HideCheckbox;
