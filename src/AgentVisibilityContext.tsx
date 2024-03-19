import React, { createContext } from 'react';
import { CheckboxState, VisibilitySelectionMap } from './constants';
import { getNewHiddenAgents } from './selectors';
import { UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  handleAllAgentsCheckboxChange: (hiddenState: CheckboxState) => void;
}

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
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

  const receiveUIDisplayData = (data: UIDisplayData) => {
    setuiDisplayData(data);
  };

  const handleAllAgentsCheckboxChange = (
    prevCheckboxState: CheckboxState
  ): void => {
    setHiddenAgents(getNewHiddenAgents(uiDisplayData, prevCheckboxState));
  };

  const vis = {
    uiDisplayData,
    hiddenAgents,
    receiveUIDisplayData,
    handleAllAgentsCheckboxChange,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
