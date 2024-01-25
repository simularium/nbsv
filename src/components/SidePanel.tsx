import * as React from 'react';
import classNames from 'classnames';
import { isEqual } from 'underscore';
import { UIDisplayData } from '@aics/simularium-viewer';

import {
  HiddenOrHighlightedState,
  ViewerVisibilityMap,
  ViewerVisibilityStates,
} from '../constants';
import CheckBoxContents from './CheckBoxContents';

import '../../css/side_panel.css';
import { Checkbox } from 'antd';

interface SidePanelProps {
  uiDisplayData: UIDisplayData;
  currentVisibilityStates: ViewerVisibilityStates;
  setCurrentVisibilityStates: (
    visibilityStates: ViewerVisibilityStates
  ) => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  const { uiDisplayData, currentVisibilityStates, setCurrentVisibilityStates } =
    props;

  const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;
  const [hiddenState, setHiddenState] =
    React.useState<HiddenOrHighlightedState>(Inactive);

  React.useEffect(() => {
    let newHiddenState: HiddenOrHighlightedState = Indeterminate;
    if (Object.keys(currentVisibilityStates.hidden).length === 0) {
      newHiddenState = Inactive;
    } else if (isEqual(currentVisibilityStates.hidden, payloadForHideAll)) {
      newHiddenState = Active;
    }
    setHiddenState(newHiddenState);
  }, [currentVisibilityStates.hidden]);

  const payloadForHideAll = (() => {
    let payload: ViewerVisibilityMap = {};
    if (hiddenState === Inactive) {
      payload = uiDisplayData.reduce<ViewerVisibilityMap>((acc, item) => {
        acc[item.name] = [];
        return acc;
      }, {});
    }
    return payload;
  })();

  const handleHideAll = () => {
    setCurrentVisibilityStates({
      ...currentVisibilityStates,
      hidden: payloadForHideAll,
    });
  };

  console.log('uidisplaydata in side panel', uiDisplayData);
  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
      <div className="checkboxtree">
        <div className="item-row">
          <Checkbox
            className={classNames('checkbox', 'check-all')}
            indeterminate={hiddenState === 'Indeterminate'}
            checked={hiddenState === 'Inactive'}
            onClick={() => handleHideAll()}
          />
          <span>All agent types</span>
        </div>
        {uiDisplayData.map((agent) => (
          <>
            <CheckBoxContents
              agent={agent}
              currentVisibilityStates={currentVisibilityStates}
              setCurrentVisibilityStates={setCurrentVisibilityStates}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
