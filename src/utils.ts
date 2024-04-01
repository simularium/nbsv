import { SelectionEntry } from '@aics/simularium-viewer';
import { VisibilitySelectionMap } from './constants';

export const getNewSelectionMap = (
  agentName: string,
  currentVisibilityMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newMap: VisibilitySelectionMap = { ...currentVisibilityMap };
  if (currentVisibilityMap[agentName].length === 0) {
    newMap[agentName] = [agentName];
  } else {
    newMap[agentName] = [];
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
