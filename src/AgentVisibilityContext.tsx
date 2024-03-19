import React, { createContext, useEffect } from 'react';
import { CheckboxState, VisibilitySelectionMap } from './constants';
import { getNewHiddenAgents, getNewSelectionStateInfo } from './selectors';
import { SelectionStateInfo, UIDisplayData } from '@aics/simularium-viewer';

interface VisibilityContextType {
  uiDisplayData: UIDisplayData;
  selectionStateInfo: SelectionStateInfo;
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
  selectionStateInfo: {
    hiddenAgents: [],
    highlightedAgents: [],
    colorChange: null,
  },
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
  const [selectionStateInfo, updateSelectionStateInfo] =
    React.useState<SelectionStateInfo>({
      hiddenAgents: [],
      highlightedAgents: [],
      colorChange: null,
    });
  const [hiddenAgents, setHiddenAgents] =
    React.useState<VisibilitySelectionMap>({});

  useEffect(() => {
    updateSelectionStateInfo({
      ...selectionStateInfo,
      hiddenAgents: getNewSelectionStateInfo(hiddenAgents),
    });
  }, [hiddenAgents]);

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
    selectionStateInfo,
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
