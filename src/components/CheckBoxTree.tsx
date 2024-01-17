import * as React from 'react';
import { isEqual, sortBy } from 'lodash';

import '../../css/checkbox_tree.css';

import { UIDisplayData } from '@aics/simularium-viewer';
import CheckBoxContents from './CheckBoxContents';
import classNames from 'classnames';
import { useEffect } from 'react';

// TODO placeholder, side panel will receive many props when rendering checkboxes
interface CheckBoxTreeProps {
  uiDisplayData: UIDisplayData;
  currentHiddenAgents: VisibilitySelectionMap;
  currentHighlightedAgents: VisibilitySelectionMap;
  setCurrentHiddenAgents: (hiddenAgents: VisibilitySelectionMap) => void;
  setCurrentHighlightedAgents: (
    highlightedAgents: VisibilitySelectionMap
  ) => void;
}

export interface VisibilitySelectionMap {
  [key: string]: string[];
}

const SidePanel: React.FunctionComponent<CheckBoxTreeProps> = (
  props: CheckBoxTreeProps
): JSX.Element => {
  const {
    uiDisplayData,
    currentHiddenAgents,
    currentHighlightedAgents,
    setCurrentHiddenAgents,
    setCurrentHighlightedAgents,
  } = props;

  const [allAreHidden, setAllAreHidden] = React.useState(false);
  const [someAreHidden, setSomeAreHidden] = React.useState(false);
  const [noneAreHidden, setNoneAreHidden] = React.useState(true);

  useEffect(() => {
    const payloadForNoneAreHidden =
      Object.keys(currentHiddenAgents).length === 0;
    const payloadForAllAreHidden = areMapsEquivalent(
      currentHiddenAgents,
      payloadForHideAll
    );
    const payloadForSomeAreHidden =
      !payloadForNoneAreHidden && !payloadForAllAreHidden;
    setNoneAreHidden(payloadForNoneAreHidden);
    setAllAreHidden(payloadForAllAreHidden);
    setSomeAreHidden(payloadForSomeAreHidden);
    console.log(
      'allAreHidden',
      payloadForAllAreHidden,
      'someAreHidden',
      payloadForSomeAreHidden,
      'noneAreHidden',
      payloadForNoneAreHidden
    );
  }, [currentHiddenAgents]);

  const handleHighlight = (key: string, values?: string[]) => {
    const newHighlighted = { ...currentHighlightedAgents };
    if (!values) {
      values = [];
    }
    if (currentHighlightedAgents[key]) {
      delete newHighlighted[key];
    } else {
      newHighlighted[key] = [...values];
    }
    setCurrentHighlightedAgents(newHighlighted);
  };

  const handleCheck = (key: string, values?: string[]) => {
    const newHidden = { ...currentHiddenAgents };
    if (!values) {
      values = [];
    }
    if (currentHiddenAgents[key]) {
      delete newHidden[key];
    } else {
      newHidden[key] = [...values];
    }
    setCurrentHiddenAgents(newHidden);
  };

  const payloadForHideAll = (() => {
    return uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  })();

  function areMapsEquivalent(
    map1: VisibilitySelectionMap,
    map2: VisibilitySelectionMap
  ) {
    // Get the keys of both maps and sort them
    const keys1 = Object.keys(map1).sort();
    const keys2 = Object.keys(map2).sort();

    // If the sets of keys are different, the maps are not equivalent
    if (!isEqual(keys1, keys2)) {
      return false;
    }

    // Check each key's array, sorting them before comparison
    for (let key of keys1) {
      const array1 = sortBy(map1[key]);
      const array2 = sortBy(map2[key]);
      if (!isEqual(array1, array2)) {
        return false;
      }
    }

    // If all checks pass, the maps are equivalent
    return true;
  }

  const handleCheckAll = () => {
    if (noneAreHidden) {
      setCurrentHiddenAgents(payloadForHideAll);
    } else if (allAreHidden || someAreHidden) {
      setCurrentHiddenAgents({});
    }
  };

  console.log(
    'uidisplaydata in side panel',
    uiDisplayData,
    'type: ',
    typeof uiDisplayData
  );

  return (
    <div className="checkboxtree">
      <div className="item-row">
        <input
          type="checkbox"
          className={classNames('checkbox', 'check-all')}
          onClick={() => handleCheckAll()}
          checked
        />
        <span>
          All agent types
          {/* some odd workaaround while waiting fo SVG assets to be a thing, we will style the checkbox basedo n these states */}
          {noneAreHidden
            ? 'all visible'
            : allAreHidden
            ? 'All hidden'
            : someAreHidden
            ? 'some hidden'
            : null}
        </span>
      </div>
      {uiDisplayData.map((item, index) => (
        <>
          <CheckBoxContents
            item={item}
            handleHighlight={handleHighlight}
            handleCheck={handleCheck}
            currentHighlightedAgents={currentHighlightedAgents}
            currentHiddenAgents={currentHiddenAgents}
            allHidden={allAreHidden}
            noneHidden={noneAreHidden}
          />
        </>
      ))}
    </div>
  );
};

export default SidePanel;
