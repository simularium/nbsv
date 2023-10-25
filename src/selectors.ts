import {
  AgentDisplayNode,
  SelectionEntry,
  UIDisplayData,
  VisibilitySelectionMap,
} from './types';
import { reduce } from 'lodash';

export const getHighlightedAgents = (
  highlightedAgents: VisibilitySelectionMap,
  allAgents: UIDisplayData
): SelectionEntry[] => {
  const init: SelectionEntry[] = [];
  const result = reduce(
    allAgents,
    (acc, agent) => {
      if (!highlightedAgents[agent.name]) {
        return acc;
      }
      if (!agent.displayStates.length) {
        // if no displayStates, but agent is highlighted, highlight agent
        if (highlightedAgents[agent.name].length) {
          acc.push({
            name: agent.name,
            tags: [],
          });
        }
      } else {
        const highLightedTags = agent.displayStates
          .filter((tag) => highlightedAgents[agent.name].includes(tag.id))
          .map((displayState) => displayState.id);
        // include unmodified tag if present
        if (highlightedAgents[agent.name].includes('')) {
          highLightedTags.push('');
        }
        if (highLightedTags.length) {
          acc.push({
            name: agent.name,
            tags: highLightedTags,
          });
        }
      }

      return acc;
    },
    init
  );
  // console.log('result of getHighlightedagents', result);
  return result;
};

export const getAgentsToHide = (
  hiddenAgents: VisibilitySelectionMap,
  allAgents: UIDisplayData
): SelectionEntry[] => {
  const init: SelectionEntry[] = [];
  const result = reduce(
    allAgents,
    (acc, agent) => {
      // Theoretically, this block should never be hit because `agentVisibilityMap`
      // should always contain all the agents in `agentDisplayData`
      if (!hiddenAgents[agent.name]) {
        return acc;
      }

      if (!agent.displayStates.length) {
        // if no tags and nothing is on, include agent name
        acc.push({
          name: agent.name,
          tags: [],
        });
        // }
      } else {
        const hiddenTags = agent.displayStates
          .filter((tag) => !hiddenAgents[agent.name].includes(tag.id))
          .map((displayState) => displayState.id);
        // if unmodified state isn't checked, add to hidden tags
        if (!hiddenAgents[agent.name].includes('')) {
          hiddenTags.push('');
        }
        if (hiddenTags.length) {
          acc.push({
            name: agent.name,
            tags: hiddenTags,
          });
        }
      }

      return acc;
    },
    init
  );
  return result;
};

export const getUiDisplayDataTree = (
  uiDisplayData: UIDisplayData
): AgentDisplayNode[] => {
  if (!uiDisplayData.length) {
    return [];
  }
  return uiDisplayData.map((agent) => ({
    title: agent.name,
    key: agent.name,
    color: agent.color,
    children: agent.displayStates.length
      ? [
          ...agent.displayStates.map((state) => ({
            label: state.name,
            value: state.id,
            color: state.color,
          })),
        ]
      : [],
  }));
};

// Returns an agent visibility map that indicates all states should be visible
export const getSelectAllVisibilityMap = (
  treeData: AgentDisplayNode[]
): VisibilitySelectionMap => {
  const returnData: VisibilitySelectionMap = {};
  return treeData.reduce((acc, agent: AgentDisplayNode) => {
    const { key } = agent;
    acc[key] = [];
    if (agent.children && agent.children.length) {
      acc[key] = agent.children.map(({ value }) => value as string);
    } else {
      acc[key] = [key];
    }
    return acc;
  }, returnData);
};

// Returns an agent visibility map that indicates no states should be visible
export const getSelectNoneVisibilityMap = (
  treeData: AgentDisplayNode[]
): VisibilitySelectionMap => {
  const returnData: VisibilitySelectionMap = {};
  return treeData.reduce((acc, agent) => {
    acc[agent.key] = [];
    return acc;
  }, returnData);
};
