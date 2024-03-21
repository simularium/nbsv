import React, { createContext, useEffect, useMemo } from 'react';
import { CheckboxState, VisibilitySelectionMap } from './constants';
import { UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  allAgentsHidden: VisibilitySelectionMap;
  noAgentsHidden: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  handleAllAgentsCheckboxChange: (hiddenState: CheckboxState) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  allAgentsHidden: {},
  noAgentsHidden: {},
  receiveUIDisplayData: () => {},
  handleAllAgentsCheckboxChange: () => {},
});

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uiDisplayData, setuiDisplayData] = React.useState<UIDisplayData>([]);
  const [hiddenAgents, setHiddenAgents] =
    React.useState<VisibilitySelectionMap>({});

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
    setuiDisplayData(data);
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

  const vis = {
    uiDisplayData,
    hiddenAgents,
    allAgentsHidden,
    noAgentsHidden,
    receiveUIDisplayData,
    handleAllAgentsCheckboxChange,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
