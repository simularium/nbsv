import React, { useContext, useMemo } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { isEqual } from '@jupyter-widgets/base';

import { CheckboxState, UserChangesMap } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import { getInitialUserSelections } from '../utils';

const HideAllAgentsCheckbox: React.FunctionComponent = (): JSX.Element => {
  const { setHiddenAgents, hiddenAgents, uiDisplayData } =
    useContext(VisibilityContext);

  /**
   * The maps below are values to use when clicking the checkbox, they are
   * essentially constant and only need to be computed when the uiDisplayData changes.
   */
  const initialUserSelections = useMemo(() => {
    return getInitialUserSelections(uiDisplayData);
  }, [uiDisplayData]);

  const allAgentsSelectedMap = useMemo(() => {
    return uiDisplayData.reduce<UserChangesMap>((acc, agent) => {
      if (agent.displayStates && agent.displayStates.length > 0) {
        acc[agent.name] = [...agent.displayStates.map((state) => state.id)];
      } else {
        acc[agent.name] = [agent.name];
      }
      return acc;
    }, {});
  }, [uiDisplayData]);

  const clickHandler = () => {
    const newValue =
      checkboxStatus === CheckboxState.Checked
        ? allAgentsSelectedMap
        : initialUserSelections;
    setHiddenAgents(newValue);
  };

  const tooltipMap = {
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Indeterminate]: 'Show',
  };

  const getCheckboxStatus = () => {
    if (isEqual(hiddenAgents, initialUserSelections)) {
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
    <Tooltip placement="right" title={tooltipText} trigger={['focus', 'hover']}>
      <Checkbox
        indeterminate={checkboxStatus === 'Indeterminate'}
        checked={checkboxStatus === 'Checked'}
        onClick={clickHandler}
      />
    </Tooltip>
  );
};

export default HideAllAgentsCheckbox;
