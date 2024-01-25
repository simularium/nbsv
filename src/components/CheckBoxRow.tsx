import * as React from 'react';
import { Checkbox, Tooltip } from 'antd';

import '../../css/checkbox_row.css';

import {
  CaretDown,
  CaretRight,
  NoHighlightStar,
  HighlightStar,
  IndeterminateHighlightStar,
} from './Icons';
import {
  DisplayAction,
  DisplayStateEntry,
  HiddenOrHighlightedState,
  TOOLTIP_COLOR,
} from '../constants';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';
interface CheckBoxRowProps {
  agent: UIDisplayEntry | DisplayStateEntry;
  isTopLevel: boolean;
  hasSubAgents: boolean;
  hiddenStatus: HiddenOrHighlightedState;
  highlightStatus: HiddenOrHighlightedState;
  showSubAgentRows: boolean;
  handleShowSubAgentRows: (value: boolean) => void;
  handleDisplayAction: (
    key: string,
    topLevel: boolean,
    hiddenOrHighlight: DisplayAction
  ) => void;
}

const CheckBoxRow: React.FunctionComponent<CheckBoxRowProps> = (
  props: CheckBoxRowProps
): JSX.Element => {
  const {
    agent,
    isTopLevel,
    hasSubAgents,
    hiddenStatus,
    highlightStatus,
    showSubAgentRows,
    handleShowSubAgentRows,
    handleDisplayAction,
  } = props;

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
        {hasSubAgents ? (
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
            onClick={() => handleDisplayAction(name, isTopLevel, Highlight)}
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
            onClick={() => handleDisplayAction(name, isTopLevel, Hide)}
          />
        </Tooltip>
        <span>{name}</span>
      </div>
    </>
  );
};

export default CheckBoxRow;
