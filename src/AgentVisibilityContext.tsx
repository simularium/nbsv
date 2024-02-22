import React, { createContext } from 'react';
import { isEqual } from 'underscore';
import {
  DisplayAction,
  DisplayStateEntry,
  HiddenOrHighlightedState,
  SubAgentDisplayMaps,
  TopLevelDisplayStatus,
  UIDisplayEntry,
  VisibilitySelectionMap,
  ViewerVisibilityStates,
} from './constants';
import {
  getPayloadForHideAll,
  getPayloadSubAgentDisplayAction,
  getPayloadTopLevelDisplayAction,
  getSelectionStateInfoPayload,
  getSubAgentDisplayStatePayload,
  getTopLevelDisplayStatePayload,
} from './selectors';
import { SelectionStateInfo, UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  currentVisibilityStates: ViewerVisibilityStates;
  selectionStateInfo: SelectionStateInfo;
  allAgentsHiddenState: HiddenOrHighlightedState;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  updateVisibilityAndSelection: (
    newValue: VisibilitySelectionMap,
    hideOrHighlight: DisplayAction
  ) => void;
  hideOrRevealAllAgents: (hiddenState: HiddenOrHighlightedState) => void;
  getTopLevelDisplayStatus: (agent: UIDisplayEntry) => TopLevelDisplayStatus;
  getSubAgentDisplayMaps: (agent: UIDisplayEntry) => SubAgentDisplayMaps;
  handleTopLevelDisplayAction: (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction
  ) => void;
  handleSubAgentDisplayAction: (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction,
    subAgent?: DisplayStateEntry
  ) => void;
}
const { Hide, Highlight } = DisplayAction;
const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  currentVisibilityStates: { hidden: {}, highlight: {} },
  selectionStateInfo: {
    hiddenAgents: [],
    highlightedAgents: [],
    colorChange: null,
  },
  allAgentsHiddenState: Inactive,
  receiveUIDisplayData: () => {},
  updateVisibilityAndSelection: () => {},
  hideOrRevealAllAgents: () => {},
  getTopLevelDisplayStatus: () => {
    return { hidden: Inactive, highlight: Inactive };
  },
  getSubAgentDisplayMaps: () => {
    return { hidden: {}, highlight: {} };
  },
  handleTopLevelDisplayAction: () => {},
  handleSubAgentDisplayAction: () => {},
});

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uiDisplayData, setuiDisplayData] = React.useState<UIDisplayData>([]);
  const [currentVisibilityStates, setCurrentVisibilityStates] = React.useState({
    hidden: {},
    highlight: {},
  });
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

  // after any display action (hide, highlight)
  // update the visibility and selection state
  // as well as the 'all agents' display status
  // agent specific display status is updated
  // in CheckBoxTree, but functions are provided belwow
  const updateVisibilityAndSelection = (
    newValue: VisibilitySelectionMap,
    hideOrHighlight: DisplayAction
  ): void => {
    if (hideOrHighlight === Hide) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        hidden: newValue,
      });
      updateSelectionStateInfo({
        ...selectionStateInfo,
        hiddenAgents: getSelectionStateInfoPayload(newValue),
      });
      updateAllAgentsHiddenState(newValue);
    } else if (hideOrHighlight === Highlight) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        highlight: newValue,
      });
      updateSelectionStateInfo({
        ...selectionStateInfo,
        highlightedAgents: getSelectionStateInfoPayload(newValue),
      });
    }
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
    updateVisibilityAndSelection(payload, Hide);
  };

  const getTopLevelDisplayStatus = (agent: UIDisplayEntry) => {
    return {
      hidden: getTopLevelDisplayStatePayload(
        agent,
        currentVisibilityStates[Hide]
      ),
      highlight: getTopLevelDisplayStatePayload(
        agent,
        currentVisibilityStates[Highlight]
      ),
    };
  };

  const getSubAgentDisplayMaps = (agent: UIDisplayEntry) => {
    return {
      hidden: getSubAgentDisplayStatePayload(
        agent,
        currentVisibilityStates[Hide]
      ),
      highlight: getSubAgentDisplayStatePayload(
        agent,
        currentVisibilityStates[Highlight]
      ),
    };
  };

  const handleTopLevelDisplayAction = (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction
  ) => {
    const payload: VisibilitySelectionMap = getPayloadTopLevelDisplayAction(
      agent,
      currentVisibilityStates[hideOrHighlight]
    );
    updateVisibilityAndSelection(payload, hideOrHighlight);
  };

  const handleSubAgentDisplayAction = (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction,
    subAgent?: DisplayStateEntry
  ) => {
    if (subAgent === undefined) {
      return;
    }
    const payload: VisibilitySelectionMap = getPayloadSubAgentDisplayAction(
      agent,
      subAgent,
      currentVisibilityStates[hideOrHighlight]
    );
    updateVisibilityAndSelection(payload, hideOrHighlight);
  };

  const vis = {
    uiDisplayData,
    currentVisibilityStates,
    selectionStateInfo,
    allAgentsHiddenState,
    receiveUIDisplayData,
    updateVisibilityAndSelection,
    hideOrRevealAllAgents,
    getTopLevelDisplayStatus,
    getSubAgentDisplayMaps,
    handleTopLevelDisplayAction,
    handleSubAgentDisplayAction,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
