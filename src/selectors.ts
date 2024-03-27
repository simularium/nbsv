import { SelectionEntry } from '@aics/simularium-viewer';
import { VisibilitySelectionMap } from './constants';

export const getNewHiddenAgents = (
  agentName: string,
  hiddenAgents: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newHidden: VisibilitySelectionMap = { ...hiddenAgents };
  if (hiddenAgents[agentName].length === 0) {
    newHidden[agentName] = [agentName];
  } else {
    newHidden[agentName] = [];
  }
  return newHidden;
};

export const getSelectionStateInfo = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};
