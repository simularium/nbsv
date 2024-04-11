import React, { createContext, useState, ReactNode } from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { VisibilitySelectionMap } from './constants';
import {
  getNewMapAfterDisplayStateClick,
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
    displayStateName?: string
  ) => void;
  handleHightlightCheckboxChange: (
    agentName: string,
    displayStateName?: string
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

  const getDisplayStates = (agentName: string): string[] => {
    const agentEntry = uiDisplayData.find((entry) => entry.name === agentName);
    if (agentEntry === undefined) {
      return [];
    }
    return agentEntry.displayStates.map((state) => state.name);
  };

  const handleVisibilityCheckboxChange = (
    agentName: string,
    displayStateName?: string
  ) => {
    if (displayStateName !== undefined) {
      const displayStates = getDisplayStates(agentName);
      setHiddenAgents((prevHiddenAgents) =>
        getNewMapAfterDisplayStateClick(
          agentName,
          displayStateName,
          displayStates,
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
    displayStateName?: string
  ) => {
    if (displayStateName !== undefined) {
      const displayStates = getDisplayStates(agentName);
      setHighlightedAgents((prevHiddenAgents) =>
        getNewMapAfterDisplayStateClick(
          agentName,
          displayStateName,
          displayStates,
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
