import React, { useContext } from 'react';
import { Checkbox, Tooltip } from 'antd';

import {
  DisplayAction,
  DisplayStateEntry,
  HiddenOrHighlightedState,
  UIDisplayEntry,
  TOOLTIP_COLOR,
} from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import {
  CaretDown,
  CaretRight,
  NoHighlightStar,
  HighlightStar,
  IndeterminateHighlightStar,
} from './Icons';

import '../../css/checkbox_row.css';

interface CheckBoxRowProps {
  agent: UIDisplayEntry;
  subAgent?: DisplayStateEntry;
  isTopLevel: boolean;
  hasSubAgents: boolean;
  hiddenStatus: HiddenOrHighlightedState;
  highlightStatus: HiddenOrHighlightedState;
  showSubAgentRows?: boolean;
  handleShowSubAgentRows?: (value: boolean) => void;
}

const CheckBoxRow: React.FunctionComponent<CheckBoxRowProps> = (
  props: CheckBoxRowProps
): JSX.Element => {
  const {
    agent,
    subAgent,
    isTopLevel,
    hasSubAgents,
    hiddenStatus,
    highlightStatus,
    showSubAgentRows,
    handleShowSubAgentRows,
  } = props;

  const { handleTopLevelDisplayAction, handleSubAgentDisplayAction } =
    useContext(VisibilityContext);

  const handleDisplayAction = isTopLevel
    ? handleTopLevelDisplayAction
    : handleSubAgentDisplayAction;

  const { name, color } = agent;
  const { Active, Inactive, Indeterminate } = HiddenOrHighlightedState;
  const { Hide, Highlight } = DisplayAction;

  const highlightStateIcon = {
    [Active]: HighlightStar,
    [Inactive]: NoHighlightStar,
    [Indeterminate]: IndeterminateHighlightStar,
  };
  const highlightStateTooltipText = {
    [Active]: 'Remove highlight',
    [Inactive]: 'Highlight',
    [Indeterminate]: 'Remove highlight',
  };
  const hiddenStateTooltipText = {
    [Active]: 'Show',
    [Inactive]: 'Hide',
    [Indeterminate]: 'Show',
  };

  const swatchMargin = isTopLevel ? '10px' : '32px';

  return (
    <>
      <div className="item-row">
        {hasSubAgents && handleShowSubAgentRows ? (
          <div
            className="caret-icon"
            onClick={() => {
              handleShowSubAgentRows(!showSubAgentRows);
            }}
          >
            {showSubAgentRows ? CaretDown : CaretRight}
          </div>
        ) : (
          <div className="caret-placeholder"></div>
        )}
        <Tooltip
          placement="right"
          title={highlightStateTooltipText[highlightStatus]}
          color={TOOLTIP_COLOR}
        >
          <div
            className="star"
            onClick={() => handleDisplayAction(agent, Highlight, subAgent)}
          >
            {highlightStateIcon[highlightStatus]}
          </div>
        </Tooltip>
        <div
          className="color-swatch"
          style={{
            backgroundColor: color,
            marginRight: swatchMargin,
          }}
        ></div>
        <Tooltip
          placement="right"
          title={hiddenStateTooltipText[hiddenStatus]}
          color={TOOLTIP_COLOR}
        >
          <Checkbox
            indeterminate={hiddenStatus === 'Indeterminate'}
            checked={hiddenStatus === 'Inactive'}
            onClick={() => handleDisplayAction(agent, Hide, subAgent)}
          />
        </Tooltip>
        <span>{name}</span>
      </div>
    </>
  );
};

export default CheckBoxRow;
