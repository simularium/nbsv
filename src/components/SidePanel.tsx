import React, { useContext } from 'react';

import { VisibilityContext } from '../AgentVisibilityContext';
import AgentRow from './AgentRow';
import HideAllAgentsCheckbox from './HideAllAgentsCheckbox';

import '../../css/side_panel.css';

const SidePanel: React.FC = (): JSX.Element => {
  const { uiDisplayData } = useContext(VisibilityContext);

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <HideAllAgentsCheckbox />
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
