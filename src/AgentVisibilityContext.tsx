import React, { createContext } from 'react';
import { isEqual } from 'underscore';
import {
  DisplayAction,
  ActiveState,
  VisibilitySelectionMap,
} from './constants';
import {
  getPayloadForHideAll,
  getSelectionStateInfoPayload,
} from './selectors';
import { SelectionStateInfo, UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  selectionStateInfo: SelectionStateInfo;
  allAgentsHiddenState: ActiveState;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  updateVisibilityAndSelection: (
    newValue: VisibilitySelectionMap,
    hideOrHighlight: DisplayAction
  ) => void;
  setAllAgentVisibility: (hiddenState: ActiveState) => void;
}
const { Inactive, Active, Indeterminate } = ActiveState;

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  selectionStateInfo: {
    hiddenAgents: [],
    highlightedAgents: [],
    colorChange: null,
  },
  allAgentsHiddenState: Inactive,
  receiveUIDisplayData: () => {},
  updateVisibilityAndSelection: () => {},
  setAllAgentVisibility: () => {},
});

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uiDisplayData, setuiDisplayData] = React.useState<UIDisplayData>([]);
  const [selectionStateInfo, updateSelectionStateInfo] =
    React.useState<SelectionStateInfo>({
      hiddenAgents: [],
      highlightedAgents: [],
      colorChange: null,
    });
  const [allAgentsHiddenState, setHiddenState] =
    React.useState<ActiveState>(Inactive);

  const receiveUIDisplayData = (data: UIDisplayData) => {
    setuiDisplayData(data);
  };

  const updateVisibilityAndSelection = (
    newValue: VisibilitySelectionMap
  ): void => {
    updateSelectionStateInfo({
      ...selectionStateInfo,
      hiddenAgents: getSelectionStateInfoPayload(newValue),
    });
    updateAllAgentsHiddenState(newValue);
  };

  const updateAllAgentsHiddenState = (
    visibilityMap: VisibilitySelectionMap
  ) => {
    let newHiddenState: ActiveState = Indeterminate;
    if (Object.keys(visibilityMap).length === 0) {
      newHiddenState = Inactive;
    } else if (
      isEqual(
        visibilityMap,
        getPayloadForHideAll(uiDisplayData, allAgentsHiddenState)
      )
    ) {
      newHiddenState = Active;
    }
    setHiddenState(newHiddenState);
  };

  const setAllAgentVisibility = (hiddenState: ActiveState): void => {
    const payload = getPayloadForHideAll(uiDisplayData, hiddenState);
    updateVisibilityAndSelection(payload);
  };

  const vis = {
    uiDisplayData,
    selectionStateInfo,
    allAgentsHiddenState,
    receiveUIDisplayData,
    updateVisibilityAndSelection,
    setAllAgentVisibility,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
