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

export const getNewMapAfterDisplayStateClick = (
  agentName: string,
  displayStateName: string,
  allDisplayStates: string[],
  currentVisibilityMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newMap: VisibilitySelectionMap = { ...currentVisibilityMap };
  const currentStates = currentVisibilityMap[agentName] || [];

  const isAgentFullySelected = currentStates.length === 0;
  const nothingCurrentlySelected =
    currentStates.length === 1 && currentStates[0] === agentName;
  const isThisDisplayStateSelected = currentStates.includes(displayStateName);
  const isSelectionNowEmpty = (): boolean => {
    return newMap[agentName].length === 0;
  };
  const allDisplayStatesNowSelected = (): boolean => {
    return newMap[agentName].length === allDisplayStates.length;
  };

  if (isAgentFullySelected) {
    const allOtherDisplayStates = allDisplayStates.filter(
      (name) => name !== displayStateName
    );
    newMap[agentName] = allOtherDisplayStates;
    return newMap;
  } else if (isThisDisplayStateSelected) {
    newMap[agentName] = currentStates.filter(
      (state) => state !== displayStateName
    );
    if (isSelectionNowEmpty()) {
      newMap[agentName] = [agentName];
    }
  } else {
    if (nothingCurrentlySelected) {
      newMap[agentName] = [displayStateName];
    } else {
      newMap[agentName] = [...currentStates, displayStateName];
    }
    if (allDisplayStatesNowSelected()) {
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
