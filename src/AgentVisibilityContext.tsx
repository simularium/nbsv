import React, { createContext, useEffect, useMemo } from 'react';
import { CheckboxState, VisibilitySelectionMap } from './constants';
import { UIDisplayData } from '@aics/simularium-viewer';

import { getNewHiddenAgents } from './selectors';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  allAgentsHidden: VisibilitySelectionMap;
  noAgentsHidden: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  handleAllAgentsCheckboxChange: (hiddenState: CheckboxState) => void;
  handleAgentCheckboxChange: (agentName: string) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  allAgentsHidden: {},
  noAgentsHidden: {},
  receiveUIDisplayData: () => {},
  handleAllAgentsCheckboxChange: () => {},
  handleAgentCheckboxChange: () => {},
});

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uiDisplayData, setUiDisplayData] = React.useState<UIDisplayData>([]);
  const [hiddenAgents, setHiddenAgents] =
    React.useState<VisibilitySelectionMap>({});

  /**
   * noAgentsHidden maps each agent name to a value of [agent]
   * allAgentsHidden maps each agent name to an empty array
   * They serve as values for the handler of the hide all agents checkbox,
   * and for checks to determine state of that checkbox.
   * They are memoized to prevent unnecessary re-renders, and
   * set when the uiDisplayData arrives.
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

  useEffect(() => {
    setHiddenAgents(noAgentsHidden);
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

  const handleAgentCheckboxChange = (agentName: string) => {
    setHiddenAgents(getNewHiddenAgents(agentName, hiddenAgents));
  };

  const vis = {
    uiDisplayData,
    hiddenAgents,
    allAgentsHidden,
    noAgentsHidden,
    receiveUIDisplayData,
    handleAllAgentsCheckboxChange,
    handleAgentCheckboxChange,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
