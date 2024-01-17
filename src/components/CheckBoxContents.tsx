import * as React from 'react';
import classNames from 'classnames';

import '../../css/checkbox_contents.css';

import { CaretDown, CaretRight, Star, StarFilledIcon } from './Icons';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

// TODO placeholder, side panel will receive many props when rendering checkboxes
interface CheckBoxContentsProps {
  //   uiDisplayData: UIDisplayData;
  item: UIDisplayEntry;
  handleHighlight: (key: string, values?: string[]) => void;
  handleCheck: (key: string, values?: string[]) => void;
  currentHiddenAgents: VisibilitySelectionMap;
  currentHighlightedAgents: VisibilitySelectionMap;
  allHidden: boolean;
  noneHidden: boolean;

  //   setCurrentHiddenAgents: (hiddenAgents: VisibilitySelectionMap) => void;
  //   setCurrentHighlightedAgents: (
  //     highlightedAgents: VisibilitySelectionMap
  //   ) => void;
}

export interface VisibilitySelectionMap {
  [key: string]: string[];
}

const CheckBoxContents: React.FunctionComponent<CheckBoxContentsProps> = (
  props: CheckBoxContentsProps
): JSX.Element => {
  const {
    item,
    handleHighlight,
    handleCheck,
    currentHiddenAgents,
    currentHighlightedAgents,
    noneHidden,
  } = props;

  const [showSubAgents, setShowSubAgents] = React.useState(false);

  const amIVisible = () => {
    if (Object.keys(currentHiddenAgents).some((key) => key === item.name)) {
      return false;
    }
    return true;
  };

  const isVisible = noneHidden || amIVisible();

  return (
    <div className="item-row">
      {item.displayStates.length >= 0 && (
        <span
          className="caret-icon"
          onClick={() => {
            setShowSubAgents(!showSubAgents);
          }}
        >
          {showSubAgents ? CaretDown : CaretRight}
        </span>
      )}
      <div
        className={classNames('custom-checkbox', 'checkbox')}
        onClick={() => handleHighlight(item.name)}
      >
        {currentHighlightedAgents[item.name] ? StarFilledIcon : Star}
      </div>
      <div
        className="color-swatch"
        style={{ backgroundColor: item.color }}
      ></div>
      <input
        type="checkbox"
        className="checkbox"
        onClick={() => handleCheck(item.name)}
        checked
      />
      <span className="item-name">
        {item.name} {isVisible ? 'Visible' : 'Hidden'}
      </span>
    </div>
  );
};

export default CheckBoxContents;
