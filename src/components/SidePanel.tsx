import React, { useContext } from 'react';
import { isEqual } from '@jupyter-widgets/base';

import { VisibilityContext } from '../AgentVisibilityContext';
import { CheckboxState } from '../constants';
import { SelectionType } from '../types';
import AgentRow from './AgentRow';
import CustomCheckbox from './CustomCheckbox';

import '../../css/side_panel.css';

const SidePanel: React.FC = (): JSX.Element => {
  const {
    handleAllAgentsCheckboxChange,
    hiddenAgents,
    uiDisplayData,
    allAgentsHidden,
    noAgentsHidden,
  } = useContext(VisibilityContext);

  const getCheckboxStatus = () => {
    if (isEqual(hiddenAgents, noAgentsHidden)) {
      return CheckboxState.Checked;
    }
    if (isEqual(hiddenAgents, allAgentsHidden)) {
      return CheckboxState.Unchecked;
    }
    return CheckboxState.Indeterminate;
  };

  const checkboxStatus = getCheckboxStatus();

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <CustomCheckbox
            selectionType={SelectionType.Hide}
            status={checkboxStatus}
            clickHandler={() => handleAllAgentsCheckboxChange(checkboxStatus)}
          />
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
