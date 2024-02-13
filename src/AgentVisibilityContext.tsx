import React, { createContext } from 'react';
import {
  DisplayAction,
  DisplayStateEntry,
  HiddenOrHighlightedState,
  SubAgentDisplayMaps,
  TopLevelDisplayStatus,
  UIDisplayEntry,
  ViewerVisibilityMap,
  ViewerVisibilityStates,
} from './constants';
import {
  getPayloadSubAgentDisplayAction,
  getPayloadTopLevelDisplayAction,
  getSubAgentDisplayStateMap,
  getTopLevelDisplayStatus,
} from './selectors';

interface VisibilityContextType {
  currentVisibilityStates: ViewerVisibilityStates;
  updateCurrentVisibilityStates: (
    newValue: ViewerVisibilityMap,
    hideOrHighlight: DisplayAction
  ) => void;
  handleSubAgentDisplayAction: (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction,
    subAgent?: DisplayStateEntry
  ) => void;
  handleDisplayActionTopLevel: (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction
  ) => void;
  updateTopLevelDisplayStatus: (agent: UIDisplayEntry) => TopLevelDisplayStatus;
  updateSubAgentDisplayMaps: (agent: UIDisplayEntry) => SubAgentDisplayMaps;
}
const { Hide, Highlight } = DisplayAction;
const { Inactive } = HiddenOrHighlightedState;

export const VisibilityContext = createContext<VisibilityContextType>({
  currentVisibilityStates: { hidden: {}, highlight: {} },
  updateCurrentVisibilityStates: () => {},
  handleSubAgentDisplayAction: () => {},
  handleDisplayActionTopLevel: () => {},
  updateTopLevelDisplayStatus: () => {
    return { hidden: Inactive, highlight: Inactive };
  },
  updateSubAgentDisplayMaps: () => {
    return { hidden: {}, highlight: {} };
  },
});

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentVisibilityStates, setCurrentVisibilityStates] = React.useState({
    hidden: {},
    highlight: {},
  });

  const updateCurrentVisibilityStates = (
    newValue: ViewerVisibilityMap,
    hideOrHighlight: DisplayAction
  ): void => {
    if (hideOrHighlight === DisplayAction['Hide']) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        hidden: newValue,
      });
    } else if (hideOrHighlight === DisplayAction['Highlight']) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        highlight: newValue,
      });
    }
  };

  const updateTopLevelDisplayStatus = (agent: UIDisplayEntry) => {
    return {
      hidden: getTopLevelDisplayStatus(agent, currentVisibilityStates[Hide]),
      highlight: getTopLevelDisplayStatus(
        agent,
        currentVisibilityStates[Highlight]
      ),
    };
  };

  const updateSubAgentDisplayMaps = (agent: UIDisplayEntry) => {
    return {
      hidden: getSubAgentDisplayStateMap(agent, currentVisibilityStates[Hide]),
      highlight: getSubAgentDisplayStateMap(
        agent,
        currentVisibilityStates[Highlight]
      ),
    };
  };

  const handleDisplayActionTopLevel = (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction
  ) => {
    const payload: ViewerVisibilityMap = getPayloadTopLevelDisplayAction(
      agent,
      currentVisibilityStates[hideOrHighlight]
    );
    updateCurrentVisibilityStates(payload, hideOrHighlight);
  };

  const handleSubAgentDisplayAction = (
    agent: UIDisplayEntry,
    hideOrHighlight: DisplayAction,
    subAgent?: DisplayStateEntry
  ) => {
    if (subAgent === undefined) {
      return;
    }
    const payload: ViewerVisibilityMap = getPayloadSubAgentDisplayAction(
      agent,
      subAgent,
      currentVisibilityStates[hideOrHighlight]
    );
    updateCurrentVisibilityStates(payload, hideOrHighlight);
  };

  const vis = {
    currentVisibilityStates,
    updateCurrentVisibilityStates,
    handleSubAgentDisplayAction,
    handleDisplayActionTopLevel,
    updateTopLevelDisplayStatus,
    updateSubAgentDisplayMaps,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
