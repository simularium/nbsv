import React, { useContext, useMemo } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { isEqual } from '@jupyter-widgets/base';

import { CheckboxState } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import { mapUIDisplayDataToSelectionMap } from '../utils';

const HideAllAgentsCheckbox: React.FunctionComponent = (): JSX.Element => {
  const { setHiddenAgents, hiddenAgents, uiDisplayData } =
    useContext(VisibilityContext);

  /**
   * The maps below are values to use when clicking the checkbox, they are
   * essentially constant and only need to be computed when the uiDisplayData changes.
   */
  const noAgentsSelectedMap = useMemo(() => {
    return mapUIDisplayDataToSelectionMap(uiDisplayData);
  }, [uiDisplayData]);

  const allAgentsSelectedMap = useMemo(() => {
    // the boolean tells the util to select all agents, it defaults to false
    const selectAllAgents = true;
    return mapUIDisplayDataToSelectionMap(uiDisplayData, selectAllAgents);
  }, [uiDisplayData]);

  const clickHandler = () => {
    const newValue =
      checkboxStatus === CheckboxState.Checked
        ? allAgentsSelectedMap
        : noAgentsSelectedMap;
    setHiddenAgents(newValue);
  };

  const tooltipMap = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: 'Show',
  };

  const getCheckboxStatus = () => {
    if (isEqual(hiddenAgents, noAgentsSelectedMap)) {
      return CheckboxState.Checked;
    }
    if (isEqual(hiddenAgents, allAgentsSelectedMap)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const checkboxStatus = getCheckboxStatus();
  const tooltipText = tooltipMap[checkboxStatus];

  return (
    <Tooltip placement="right" title={tooltipText}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={clickHandler}
      />
    </Tooltip>
  );
};

export default HideAllAgentsCheckbox;
