import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { UIDisplayData } from '@aics/simularium-viewer';

import { CheckboxState, VisibilitySelectionMap } from './constants';
import { getNewSelectionMap } from './selectors';
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
   * The memoized values below are used as arguments when the checkbox
   * that hides all agents is clicked. They are memoized to prevent unnecessary
   * re-renders, and set when the uiDisplayData arrives.
   * noAgentsHidden maps each agent name to a value of [agent]
   * allAgentsHidden maps each agent name to an empty array
   */
  const noAgentsHidden: VisibilitySelectionMap = useMemo(() => {
    return uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [item.name];
      return acc;
    }, {});
  }, [uiDisplayData]);

  const allAgentsHidden: VisibilitySelectionMap = useMemo(() => {
    return uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  }, [uiDisplayData]);

  /**
   * This is never used as an argument but should be set upon arrival
   * of the uiDisplayData to ensure that the highlightedAgents state
   * is not an empty object, but corresponds to the actual agent data.
   */
  const noAgentsHighlighted: VisibilitySelectionMap = useMemo(() => {
    return uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [item.name];
      return acc;
    }, {});
  }, [uiDisplayData]);

  useEffect(() => {
    setHiddenAgents(noAgentsHidden);
    setHighlightedAgents(noAgentsHighlighted);
  }, [noAgentsHidden]);

  const receiveUIDisplayData = (data: UIDisplayData) => {
    setUiDisplayData(data);
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
