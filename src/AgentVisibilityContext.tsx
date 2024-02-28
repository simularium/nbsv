import React, { createContext } from 'react';
import { isEqual } from 'underscore';
import {
  DisplayAction,
  HiddenOrHighlightedState,
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
  allAgentsHiddenState: HiddenOrHighlightedState;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  updateVisibilityAndSelection: (
    newValue: VisibilitySelectionMap,
    hideOrHighlight: DisplayAction
  ) => void;
  hideOrRevealAllAgents: (hiddenState: HiddenOrHighlightedState) => void;
}
const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;

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
  hideOrRevealAllAgents: () => {},
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
    React.useState<HiddenOrHighlightedState>(Inactive);

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
    let newHiddenState: HiddenOrHighlightedState = Indeterminate;
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

  const hideOrRevealAllAgents = (
    hiddenState: HiddenOrHighlightedState
  ): void => {
    const payload = getPayloadForHideAll(uiDisplayData, hiddenState);
    updateVisibilityAndSelection(payload);
  };

  const vis = {
    uiDisplayData,
    selectionStateInfo,
    allAgentsHiddenState,
    receiveUIDisplayData,
    updateVisibilityAndSelection,
    hideOrRevealAllAgents,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
