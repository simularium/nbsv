import * as React from 'react';
import classNames from 'classnames';

import '../../css/checkbox_row.css';

import {
  CaretDown,
  CaretRight,
  NoHighlightStar,
  HighlightStar,
  IndeterminateHighlightStar,
  VisibleCheck,
  HiddenCheck,
  IndeterminateCheck,
} from './Icons';
import {
  DisplayAction,
  DisplayStateEntry,
  HiddenOrHighlightedState,
} from '../constants';
//TODO get UIDisplayEntry and DisplayStateEntry exported from simularium-viewer
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
  const hiddenStateIcon = {
    [Inactive]: VisibleCheck,
    [Active]: HiddenCheck,
    [Indeterminate]: IndeterminateCheck,
  };
  const highlightStateIcon = {
    [Active]: HighlightStar,
    [Inactive]: NoHighlightStar,
    [Indeterminate]: IndeterminateHighlightStar,
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
        <div
          className="checkbox"
          onClick={() => handleDisplayAction(name, isTopLevel, Highlight)}
        >
          {highlightStateIcon[highlightStatus]}
        </div>
        <div
          className="color-swatch"
          style={{
            backgroundColor: color,
            marginRight: swatchMargin,
          }}
        ></div>
        <div
          className={classNames('custom-checkbox', 'checkbox')}
          onClick={() => handleDisplayAction(name, isTopLevel, Hide)}
        >
          {hiddenStateIcon[hiddenStatus]}
        </div>
        <span>{name}</span>
      </div>
    </>
  );
};

export default CheckBoxRow;
