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
  // console.log('in getAgentsToHide', hiddenAgents, allAgents);
  const init: SelectionEntry[] = [];
  const result = reduce(
    allAgents,
    (acc, agent) => {
      // Theoretically, this block should never be hit because `agentVisibilityMap`
      // should always contain all the agents in `agentDisplayData`
      // console.log('agent.name: ', agent.name, 'hiddenAgents: ', hiddenAgents);
      if (!hiddenAgents[agent.name]) {
        // console.log('hitting theoretically impossible block');
        return acc;
      }

      if (!agent.displayStates.length) {
        // if no tags and nothing is on, include agent name
        // console.log('no tags and nothing on before length check');
        // console.log('hiddenAgents[agent.name]: ', hiddenAgents[agent.name]);
        // if (!hiddenAgents[agent.name].length) {
        // console.log('agt, notags, name:', agent.name);
        acc.push({
          name: agent.name,
          tags: [],
        });
        // }
      } else {
        // console.log('agt, tags?, name:', agent.name);
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
  console.log('result of getAgentsToHide', result);
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
