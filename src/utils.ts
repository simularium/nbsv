import { SelectionEntry, UIDisplayData } from '@aics/simularium-viewer';
import { UserChangesMap } from './constants';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

export const getSelectionAfterCheckboxClick = (
  name: string,
  children: string[],
  currentVisibilityMap: UserChangesMap
): UserChangesMap => {
  const newMap: UserChangesMap = { ...currentVisibilityMap };
  const selectionValue = children.length === 0 ? [name] : children;
  if (currentVisibilityMap[name].length !== selectionValue.length) {
    newMap[name] = selectionValue;
  } else {
    newMap[name] = [];
  }
  return newMap;
};

export const getSelectionAfterChildCheckboxClick = (
  name: string,
  parent: string,
  currentVisibilityMap: UserChangesMap
): UserChangesMap => {
  const newMap: UserChangesMap = { ...currentVisibilityMap };
  if (newMap[parent].includes(name)) {
    newMap[parent] = newMap[parent].filter((child) => child !== name);
  } else {
    newMap[parent].push(name);
  }
  return newMap;
};

export const getChildren = (agent: UIDisplayEntry): string[] => {
  if (agent === undefined || agent.displayStates.length === 0) {
    return [];
  }
  return agent.displayStates.map((state) => state.name);
};

export const convertMapToSelectionStateInfo = (
  currentVisibilityMap: UserChangesMap,
  uiData: UIDisplayData
): SelectionEntry[] => {
  const init: SelectionEntry[] = [];
  return uiData.reduce((acc, agent) => {
    // Theoretically, this block should never be hit because `agentVisibilityMap`
    // should always contain all the agents in `agentDisplayData`
    if (!currentVisibilityMap[agent.name]) {
      return acc;
    }

    if (!agent.displayStates.length) {
      // if no tags and nothing is on, include agent name
      if (!currentVisibilityMap[agent.name].length) {
        acc.push({
          name: agent.name,
          tags: [],
        });
      }
    } else {
      const hiddenTags = agent.displayStates
        .filter((tag) => !currentVisibilityMap[agent.name].includes(tag.id))
        .map((displayState) => displayState.id);
      if (hiddenTags.length) {
        acc.push({
          name: agent.name,
          tags: hiddenTags,
        });
      }
    }
    return acc;
  }, init);
};

export const mapUIDisplayDataToSelectionMap = (
  uiDisplayData: UIDisplayData
) => {
  return uiDisplayData.reduce<UserChangesMap>((acc, agent) => {
    if (agent.displayStates && agent.displayStates.length > 0) {
      acc[agent.name] = [...agent.displayStates.map((state) => state.id)];
    } else {
      acc[agent.name] = [agent.name];
    }
    return acc;
  }, {});
};
