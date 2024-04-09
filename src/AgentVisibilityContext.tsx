import React, { createContext, useState, ReactNode } from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { VisibilitySelectionMap } from './constants';
import { getNewSelectionMap, mapUIDisplayDataToSelectionMap } from './utils';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  highlightedAgents: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  setHiddenAgents: React.Dispatch<React.SetStateAction<VisibilitySelectionMap>>;
  handleVisibilityCheckboxChange: (agentName: string) => void;
  handleHightlightCheckboxChange: (agentName: string) => void;
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

  const handleVisibilityCheckboxChange = (agentName: string) => {
    setHiddenAgents((prevHiddenAgents) =>
      getNewSelectionMap(agentName, prevHiddenAgents)
    );
  };

  const handleHightlightCheckboxChange = (agentName: string) => {
    setHighlightedAgents((prevHighlightedAgents) =>
      getNewSelectionMap(agentName, prevHighlightedAgents)
    );
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
