import React, { useContext } from 'react';
import classNames from 'classnames';
import { isEqual } from 'underscore';
import { Checkbox, Tooltip } from 'antd';
import { UIDisplayData } from '@aics/simularium-viewer';

import {
  DisplayAction,
  HiddenOrHighlightedState,
  TOOLTIP_COLOR,
} from '../constants';
import { getPayloadForHideAll } from '../selectors';
import { VisibilityContext } from '../AgentVisibilityContext';
import CheckBoxContents from './CheckBoxContents';

import '../../css/side_panel.css';

interface SidePanelProps {
  uiDisplayData: UIDisplayData;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  const { uiDisplayData } = props;

  const { currentVisibilityStates, updateCurrentVisibilityStates } =
    useContext(VisibilityContext);

  const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;
  const [hiddenState, setHiddenState] =
    React.useState<HiddenOrHighlightedState>(Inactive);

  const hiddenStateTooltipText = {
    [Active]: 'Show',
    [Inactive]: 'Hide',
    [Indeterminate]: 'Show',
  };

  React.useEffect(() => {
    let newHiddenState: HiddenOrHighlightedState = Indeterminate;
    if (Object.keys(currentVisibilityStates.hidden).length === 0) {
      newHiddenState = Inactive;
    } else if (
      isEqual(
        currentVisibilityStates.hidden,
        getPayloadForHideAll(uiDisplayData, hiddenState)
      )
    ) {
      newHiddenState = Active;
    }
    setHiddenState(newHiddenState);
  }, [currentVisibilityStates.hidden]);

  const handleHideAll = () => {
    updateCurrentVisibilityStates(
      getPayloadForHideAll(uiDisplayData, hiddenState),
      DisplayAction.Hide
    );
  };

  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <Tooltip
            placement="right"
            title={hiddenStateTooltipText[hiddenState]}
            color={TOOLTIP_COLOR}
          >
            <Checkbox
              className={classNames('checkbox', 'check-all')}
              indeterminate={hiddenState === 'Indeterminate'}
              checked={hiddenState === 'Inactive'}
              onClick={handleHideAll}
            />
          </Tooltip>
          <span>All agent types</span>
        </div>
        {uiDisplayData.map((agent) => (
          <>
            <CheckBoxContents agent={agent} />
          </>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
