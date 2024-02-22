import {
  SelectionEntry,
  SelectionStateInfo,
  UIDisplayData,
} from '@aics/simularium-viewer';
import {
  DisplayStateEntry,
  HiddenOrHighlightedState,
  UIDisplayEntry,
  UIVisibilityMap,
  VisibilitySelectionMap,
  ViewerVisibilityStates,
} from './constants';

const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;

export const getTopLevelDisplayStatePayload = (
  agent: UIDisplayEntry,
  viewerStatusMap: VisibilitySelectionMap
) => {
  const displayStates = agent.displayStates.map((entry) => entry.name);
  let status: HiddenOrHighlightedState = Inactive;
  if (Object.keys(viewerStatusMap).includes(agent.name)) {
    if (
      viewerStatusMap[agent.name].length === displayStates.length ||
      viewerStatusMap[agent.name].length === 0
    ) {
      status = Active;
    } else {
      status = Indeterminate;
    }
  }
  return status;
};

export const getSubAgentDisplayStatePayload = (
  agent: UIDisplayEntry,
  viewerStatusMap: VisibilitySelectionMap
) => {
  const newSubAgentMap: UIVisibilityMap = {};
  agent.displayStates.forEach((state) => {
    // default to inactive
    let subAgentStatus = Inactive;
    // if parent agent is in hidden or highlighted map
    // check for subagent or empty array (empty array means all subagents are active)
    if (viewerStatusMap[agent.name] !== undefined) {
      if (
        viewerStatusMap[agent.name].includes(state.name) ||
        viewerStatusMap[agent.name].length === 0
      ) {
        subAgentStatus = Active;
      }
    }
    newSubAgentMap[state.name] = subAgentStatus;
  });
  return newSubAgentMap;
};

export const getPayloadForHideAll = (
  uiDisplayData: UIDisplayData,
  hiddenState: HiddenOrHighlightedState
): VisibilitySelectionMap => {
  let payload: VisibilitySelectionMap = {};
  if (hiddenState === Inactive) {
    payload = uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  }
  return payload;
};

export const getPayloadTopLevelDisplayAction = (
  agent: UIDisplayEntry,
  currentAgentSelectionMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const key = agent.name;
  const displayStates: string[] = agent.displayStates.map((agent) => {
    return agent.name;
  });
  const newSelection = { ...currentAgentSelectionMap };
  const showAllOrRemoveHighlightAll =
    currentAgentSelectionMap[key] !== undefined;
  let values: string[] = [];
  if (!showAllOrRemoveHighlightAll && displayStates.length > 0) {
    values = [...displayStates];
  }
  if (currentAgentSelectionMap[key]) {
    delete newSelection[key];
  } else {
    newSelection[key] = [...values];
  }
  return newSelection;
};

export const getPayloadSubAgentDisplayAction = (
  agent: UIDisplayEntry,
  subAgent: DisplayStateEntry,
  currentAgentSelectionMap: VisibilitySelectionMap
): VisibilitySelectionMap => {
  const newSelection = { ...currentAgentSelectionMap };
  const key = subAgent.name;
  let itemEntry: string[] = [];
  if (currentAgentSelectionMap[agent.name] !== undefined) {
    itemEntry = currentAgentSelectionMap[agent.name];
    if (itemEntry.includes(key)) {
      newSelection[agent.name] = itemEntry.filter((value) => value !== key);
      if (newSelection[agent.name].length === 0) {
        delete newSelection[agent.name];
      }
      return newSelection;
    }
  }
  newSelection[agent.name] = [...itemEntry, key];
  return newSelection;
};

export const getSelectionStateInfoForViewer = (
  currentVisibilityStates: ViewerVisibilityStates
): SelectionStateInfo => {
  return {
    highlightedAgents: Object.keys(currentVisibilityStates.highlight).map(
      (key) => ({
        name: key,
        tags: currentVisibilityStates.highlight[key],
      })
    ),
    hiddenAgents: Object.keys(currentVisibilityStates.hidden).map((key) => ({
      name: key,
      tags: currentVisibilityStates.hidden[key],
    })),
    colorChange: null,
  };
};

export const getSelectionStateInfoPayload = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};
