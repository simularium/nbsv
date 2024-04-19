import { SelectionEntry, UIDisplayData } from '@aics/simularium-viewer';
import { UserChangesMap } from './constants';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';

export const updateUserChangesAfterCheckboxClick = (
  name: string,
  children: string[],
  currentUserChanges: UserChangesMap
): UserChangesMap => {
  const newMap: UserChangesMap = { ...currentUserChanges };
  // for a checkbox with no children, this is just the agent name
  // for a checkbox with children it is an array of all the children
  const allPossibleCheckboxes = children.length === 0 ? [name] : children;
  // if they aren't currently all on, we turn them all on
  if (currentUserChanges[name].length !== allPossibleCheckboxes.length) {
    newMap[name] = allPossibleCheckboxes;
  } else {
    newMap[name] = [];
  }
  return newMap;
};

export const getSelectionAfterChildCheckboxClick = (
  name: string,
  parent: string,
  currentUserChanges: UserChangesMap
): UserChangesMap => {
  const newMap: UserChangesMap = { ...currentUserChanges };
  // Shouldn't ever hit this conditional, userChangesMap was not made correctly if so
  if (newMap[parent] === undefined) {
    throw new Error('Parent not found in map');
  }
  if (newMap[parent].includes(name)) {
    newMap[parent] = newMap[parent].filter((child) => child !== name);
  } else {
    newMap[parent].push(name);
  }
  return newMap;
};

export const getChildren = (agent: UIDisplayEntry): string[] => {
  if (agent.displayStates.length === 0) {
    return [];
  }
  return agent.displayStates.map((state) => state.id);
};

export const convertMapToSelectionStateInfo = (
  currentUserChangesMap: UserChangesMap,
  uiData: UIDisplayData
): SelectionEntry[] => {
  const init: SelectionEntry[] = [];
  return uiData.reduce((acc, agent) => {
    // Theoretically, this block should never be hit because `agentVisibilityMap`
    // should always contain all the agents in `agentDisplayData`
    if (!currentUserChangesMap[agent.name]) {
      return acc;
    }

    if (!agent.displayStates.length) {
      // if no tags and user has changed from default, remove agent name
      if (!currentUserChangesMap[agent.name].length) {
        acc.push({
          name: agent.name,
          tags: [],
        });
      }
    } else {
      // selected tags are either highlighted or hidden
      // for highlighted: if its in the userChangesMap, it should be highlighted
      // for hidden: if its in the userChangesMap, it should be hidden
      const selectedTags = agent.displayStates
        .filter((tag) => !currentUserChangesMap[agent.name].includes(tag.id))
        .map((displayState) => displayState.id);
      if (selectedTags.length) {
        acc.push({
          name: agent.name,
          tags: selectedTags,
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
