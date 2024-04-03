import React, { createContext, useState, ReactNode } from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { VisibilitySelectionMap } from './constants';
import { getNewSelectionMap, mapUIDisplayDataToSelectionMap } from './utils';
import { SelectionType } from './types';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  highlightedAgents: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  setHiddenAgents: React.Dispatch<React.SetStateAction<VisibilitySelectionMap>>;
  toggleAgentVisibility: (
    agentName: string,
    selectionType: SelectionType
  ) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  highlightedAgents: {},
  receiveUIDisplayData: () => {},
  setHiddenAgents: () => {},
  toggleAgentVisibility: () => {},
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

  const toggleAgentVisibility = (
    agentName: string,
    selectionType: SelectionType
  ) => {
    switch (selectionType) {
      case SelectionType.Hide:
        setHiddenAgents((prevHiddenAgents) =>
          getNewSelectionMap(agentName, prevHiddenAgents)
        );
        break;
      case SelectionType.Highlight:
        setHighlightedAgents((prevHighlightedAgents) =>
          getNewSelectionMap(agentName, prevHighlightedAgents)
        );
        break;
      default:
        break;
    }
  };

  const vis = {
    uiDisplayData,
    hiddenAgents,
    highlightedAgents,
    receiveUIDisplayData,
    setHiddenAgents,
    toggleAgentVisibility,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
