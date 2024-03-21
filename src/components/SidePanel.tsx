import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { isEqual } from '@jupyter-widgets/base';
import classNames from 'classnames';

import { CheckboxState, TOOLTIP_COLOR } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';

import '../../css/side_panel.css';

const SidePanel: React.FunctionComponent = (): JSX.Element => {
  const {
    handleAllAgentsCheckboxChange,
    hiddenAgents,
    allAgentsHidden,
    noAgentsHidden,
  } = useContext(VisibilityContext);

  const getCheckboxState = () => {
    if (isEqual(hiddenAgents, noAgentsHidden)) {
      return CheckboxState.Checked;
    }
    if (isEqual(hiddenAgents, allAgentsHidden)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const checkboxStatus = getCheckboxState();

  const tooltipText = {
    [CheckboxState.Unchecked]: 'Show',
    [CheckboxState.Checked]: 'Hide',
    [CheckboxState.Indeterminate]: 'Show',
  };

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <Tooltip
            placement="right"
            title={tooltipText[checkboxStatus]}
            color={TOOLTIP_COLOR}
          >
            <Checkbox
              className={classNames('checkbox', 'check-all')}
              checked={checkboxStatus === CheckboxState.Checked}
              onClick={() => handleAllAgentsCheckboxChange(checkboxStatus)}
            />
          </Tooltip>
          <span>All agent types</span>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
