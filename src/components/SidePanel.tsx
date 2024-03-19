import React, { useContext } from 'react';
import classNames from 'classnames';
import { Checkbox, Tooltip } from 'antd';

import { CheckboxState, TOOLTIP_COLOR } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';

import '../../css/side_panel.css';

const SidePanel: React.FunctionComponent = (): JSX.Element => {
  const {
    handleAllAgentsCheckboxChange,
    hiddenAgents,
    getAllAgentsCheckboxState,
  } = useContext(VisibilityContext);

  const { Unchecked, Checked, Indeterminate } = CheckboxState;

  const checkboxState: CheckboxState = getAllAgentsCheckboxState(hiddenAgents);

  const tooltipText = {
    [Unchecked]: 'Show',
    [Checked]: 'Hide',
    [Indeterminate]: 'Show',
  };

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <Tooltip
            placement="right"
            title={tooltipText[checkboxState]}
            color={TOOLTIP_COLOR}
          >
            <Checkbox
              className={classNames('checkbox', 'check-all')}
              indeterminate={checkboxState === Indeterminate}
              checked={checkboxState === Checked}
              onClick={() => handleAllAgentsCheckboxChange(checkboxState)}
            />
          </Tooltip>
          <span>All agent types</span>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
