import React, { useContext } from 'react';
import classNames from 'classnames';
import { Checkbox, Tooltip } from 'antd';

import { HiddenOrHighlightedState, TOOLTIP_COLOR } from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';

import '../../css/side_panel.css';

const SidePanel: React.FunctionComponent = (): JSX.Element => {
  const { hideOrRevealAllAgents, allAgentsHiddenState } =
    useContext(VisibilityContext);

  const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;

  const tooltipText = {
    [Active]: 'Show',
    [Inactive]: 'Hide',
    [Indeterminate]: 'Show',
  };

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <Tooltip
            placement="right"
            title={tooltipText[allAgentsHiddenState]}
            color={TOOLTIP_COLOR}
          >
            <Checkbox
              className={classNames('checkbox', 'check-all')}
              indeterminate={allAgentsHiddenState === Indeterminate}
              checked={allAgentsHiddenState === Inactive}
              onClick={() => hideOrRevealAllAgents(allAgentsHiddenState)}
            />
          </Tooltip>
          <span>All agent types</span>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
