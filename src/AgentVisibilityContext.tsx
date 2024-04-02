import React, { createContext, useState, ReactNode } from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { CheckboxState, VisibilitySelectionMap } from './constants';
import { getNewSelectionMap } from './utils';
import { SelectionType } from './types';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  highlightedAgents: VisibilitySelectionMap;
  allAgentsHidden: VisibilitySelectionMap;
  noAgentsHidden: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  handleAllAgentsCheckboxChange: (hiddenState: CheckboxState) => void;
  toggleAgentVisibility: (
    agentName: string,
    selectionType: SelectionType
  ) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  highlightedAgents: {},
  allAgentsHidden: {},
  noAgentsHidden: {},
  receiveUIDisplayData: () => {},
  handleAllAgentsCheckboxChange: () => {},
  toggleAgentVisibility: () => {},
});

export const VisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [uiDisplayData, setUiDisplayData] = useState<UIDisplayData>([]);
  const [hiddenAgents, setHiddenAgents] = useState<VisibilitySelectionMap>({});
  const [highlightedAgents, setHighlightedAgents] =
    useState<VisibilitySelectionMap>({});

  /**
   * These two states are used as values for the "hide all agents"
   * checkbox when it is clicked, and get set when the UI display data
   * is received.
   */
  const [allAgentsHidden, setAllAgentsHidden] =
    useState<VisibilitySelectionMap>({});
  const [noAgentsHidden, setNoAgentsHidden] = useState<VisibilitySelectionMap>(
    {}
  );

  const receiveUIDisplayData = (data: UIDisplayData) => {
    setUiDisplayData(data);

    const allHidden: VisibilitySelectionMap =
      data.reduce<VisibilitySelectionMap>((acc, item) => {
        acc[item.name] = [];
        return acc;
      }, {});

    const noneHidden: VisibilitySelectionMap =
      data.reduce<VisibilitySelectionMap>((acc, item) => {
        acc[item.name] = [item.name];
        return acc;
      }, {});

    const noneHighlighted: VisibilitySelectionMap =
      data.reduce<VisibilitySelectionMap>((acc, item) => {
        acc[item.name] = [item.name];
        return acc;
      }, {});

    setAllAgentsHidden(allHidden);
    setNoAgentsHidden(noneHidden);
    setHiddenAgents(noneHidden);
    setHighlightedAgents(noneHighlighted);
  };

  const handleAllAgentsCheckboxChange = (
    prevCheckboxState: CheckboxState
  ): void => {
    const newHidden =
      prevCheckboxState === CheckboxState.Checked
        ? allAgentsHidden
        : noAgentsHidden;
    setHiddenAgents(newHidden);
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
    allAgentsHidden,
    noAgentsHidden,
    receiveUIDisplayData,
    handleAllAgentsCheckboxChange,
    toggleAgentVisibility,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
