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
  const index = currentStates.indexOf(displayStateName);
  if (currentStates.length === 0) {
    const allOtherDisplayStates = allDisplayStates.filter(
      (name) => name !== displayStateName
    );
    newMap[agentName] = allOtherDisplayStates;
    return newMap;
  }
  if (index !== -1) {
    // Display state is currently selected, so unselect it
    newMap[agentName] = currentStates.filter(
      (state) => state !== displayStateName
    );
    if (newMap[agentName].length === 0) {
      newMap[agentName] = [agentName]; // No display states left selected, so set to agent name only
    }
  } else {
    // if array only includes agent name, replace it with clicked display state
    if (currentStates.length === 1 && currentStates.includes(agentName)) {
      newMap[agentName] = [displayStateName];
    } else {
      // if other display states are selected, add clicked display state
      newMap[agentName] = [...currentStates, displayStateName];
    }
    if (newMap[agentName].length === allDisplayStates.length) {
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
