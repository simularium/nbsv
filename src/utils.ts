import { SelectionEntry, UIDisplayData } from '@aics/simularium-viewer';
import { VisibilitySelectionMap } from './constants';

export const getNewMapAfterTopLevelCheckboxClick = (
  agentName: string,
  currentVisibilityMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newMap: VisibilitySelectionMap = { ...currentVisibilityMap };
  if (currentVisibilityMap[agentName].includes(agentName)) {
    newMap[agentName] = [];
  } else {
    newMap[agentName] = [agentName];
  }
  return newMap;
};

export const getNewMapAfterChildAgentClick = (
  agentName: string,
  childAgentName: string,
  allChildren: string[],
  currentVisibilityMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newMap: VisibilitySelectionMap = { ...currentVisibilityMap };
  const currentStates = currentVisibilityMap[agentName] || [];

  const isAgentFullySelected = currentStates.length === 0;
  const nothingCurrentlySelected =
    currentStates.length === 1 && currentStates[0] === agentName;
  const isThisChildSelected = currentStates.includes(childAgentName);
  const isSelectionNowEmpty = (): boolean => {
    return newMap[agentName].length === 0;
  };
  const allChildrenNowSelected = (): boolean => {
    return newMap[agentName].length === allChildren.length;
  };

  if (isAgentFullySelected) {
    const allOtherChildren = allChildren.filter(
      (name) => name !== childAgentName
    );
    newMap[agentName] = allOtherChildren;
    return newMap;
  } else if (isThisChildSelected) {
    newMap[agentName] = currentStates.filter(
      (state) => state !== childAgentName
    );
    if (isSelectionNowEmpty()) {
      newMap[agentName] = [agentName];
    }
  } else {
    if (nothingCurrentlySelected) {
      newMap[agentName] = [childAgentName];
    } else {
      newMap[agentName] = [...currentStates, childAgentName];
    }
    if (allChildrenNowSelected()) {
      newMap[agentName] = [];
    }
  }
  return newMap;
};

export const convertMapToSelectionStateInfo = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};

export const mapUIDisplayDataToSelectionMap = (
  uiDisplayData: UIDisplayData,
  selectAllAgents: boolean = false
) => {
  return uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
    if (selectAllAgents) {
      acc[item.name] = [];
    } else {
      acc[item.name] = [item.name];
    }
    return acc;
  }, {});
};
