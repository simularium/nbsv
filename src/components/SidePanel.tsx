import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { isEqual } from '@jupyter-widgets/base';
import classNames from 'classnames';

import { CheckboxState, TOOLTIP_COLOR } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import AgentRow from './AgentRow';

import '../../css/side_panel.css';

const SidePanel: React.FC = (): JSX.Element => {
  const {
    handleAllAgentsCheckboxChange,
    hiddenAgents,
    uiDisplayData,
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

  const checkboxState = getCheckboxState();

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
            title={tooltipText[checkboxState]}
            color={TOOLTIP_COLOR}
          >
            <Checkbox
              className={classNames('checkbox', 'check-all')}
              indeterminate={checkboxState === CheckboxState.Indeterminate}
              checked={checkboxState === CheckboxState.Checked}
              onClick={() => handleAllAgentsCheckboxChange(checkboxState)}
            />
          </Tooltip>
          <span>All agent types</span>
          {uiDisplayData.map((agent) => (
            <AgentRow key={agent.name} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
