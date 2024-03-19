import React, { createContext } from 'react';
import { CheckboxState, VisibilitySelectionMap } from './constants';
import { getNewHiddenAgents } from './selectors';
import { UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  hiddenAgents: VisibilitySelectionMap;
  receiveUIDisplayData: (data: UIDisplayData) => void;
  getAllAgentsCheckboxState: (
    visibilityMap: VisibilitySelectionMap
  ) => CheckboxState;
  handleAllAgentsCheckboxChange: (hiddenState: CheckboxState) => void;
}
const { Unchecked, Checked, Indeterminate } = CheckboxState;

export const VisibilityContext = createContext<VisibilityContextType>({
  uiDisplayData: [],
  hiddenAgents: {},
  receiveUIDisplayData: () => {},
  getAllAgentsCheckboxState: (): CheckboxState => {
    return Indeterminate;
  },
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

  // This could be a one line ternary in the component, but will become more complex with
  // indeterminate logic, and to keep logic out of display components it is still here
  const getAllAgentsCheckboxState = (
    visibilityMap: VisibilitySelectionMap
  ): CheckboxState => {
    if (Object.keys(visibilityMap).length === 0) {
      return Checked;
    }
    return Unchecked;
  };

  const handleAllAgentsCheckboxChange = (
    checkboxState: CheckboxState
  ): void => {
    setHiddenAgents(getNewHiddenAgents(uiDisplayData, checkboxState));
  };

  const vis = {
    uiDisplayData,
    hiddenAgents,
    getAllAgentsCheckboxState,
    receiveUIDisplayData,
    handleAllAgentsCheckboxChange,
  };

  return (
    <VisibilityContext.Provider value={vis}>
      {children}
    </VisibilityContext.Provider>
  );
};
