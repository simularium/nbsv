import React, { createContext, useState, ReactNode } from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { VisibilitySelectionMap } from './constants';
import {
  getNewMapAfterChildAgentClick,
  mapUIDisplayDataToSelectionMap,
  getNewMapAfterTopLevelCheckboxClick,
} from './utils';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  highlightedAgents: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  setHiddenAgents: React.Dispatch<React.SetStateAction<VisibilitySelectionMap>>;
  handleVisibilityCheckboxChange: (
    agentName: string,
    childAgentName?: string
  ) => void;
  handleHightlightCheckboxChange: (
    agentName: string,
    childAgentName?: string
  ) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  highlightedAgents: {},
  receiveUIDisplayData: () => {},
  setHiddenAgents: () => {},
  handleVisibilityCheckboxChange: () => {},
  handleHightlightCheckboxChange: () => {},
});

export const VisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [uiDisplayData, setUiDisplayData] = useState<UIDisplayData>([]);
  const [hiddenAgents, setHiddenAgents] = useState<VisibilitySelectionMap>({});
  const [highlightedAgents, setHighlightedAgents] =
    useState<VisibilitySelectionMap>({});

  const receiveUIDisplayData = (data: UIDisplayData) => {
    setUiDisplayData(data);
    const noAgentsSelectedMap = mapUIDisplayDataToSelectionMap(data);
    setHighlightedAgents(noAgentsSelectedMap);
    setHiddenAgents(noAgentsSelectedMap);
  };

  const getChildren = (agentName: string): string[] => {
    const agentEntry = uiDisplayData.find((entry) => entry.name === agentName);
    if (agentEntry === undefined) {
      return [];
    }
    return agentEntry.displayStates.map((state) => state.name);
  };

  const handleVisibilityCheckboxChange = (
    agentName: string,
    childAgentName?: string
  ) => {
    if (childAgentName !== undefined) {
      const children = getChildren(agentName);
      setHiddenAgents((prevHiddenAgents) =>
        getNewMapAfterChildAgentClick(
          agentName,
          childAgentName,
          children,
          prevHiddenAgents
        )
      );
    } else {
      setHiddenAgents((prevHiddenAgents) =>
        getNewMapAfterTopLevelCheckboxClick(agentName, prevHiddenAgents)
      );
    }
  };

  const handleHightlightCheckboxChange = (
    agentName: string,
    childAgentName?: string
  ) => {
    if (childAgentName !== undefined) {
      const children = getChildren(agentName);
      setHighlightedAgents((prevHiddenAgents) =>
        getNewMapAfterChildAgentClick(
          agentName,
          childAgentName,
          children,
          prevHiddenAgents
        )
      );
    } else {
      setHighlightedAgents((prevHiddenAgents) =>
        getNewMapAfterTopLevelCheckboxClick(agentName, prevHiddenAgents)
      );
    }
  };

  const vis = {
    uiDisplayData,
    hiddenAgents,
    highlightedAgents,
    receiveUIDisplayData,
    setHiddenAgents,
    handleHightlightCheckboxChange,
    handleVisibilityCheckboxChange,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
