import { UIDisplayData } from '@aics/simularium-viewer';
import {
  DisplayStateEntry,
  HiddenOrHighlightedState,
  UIDisplayEntry,
  UIVisibilityMap,
  ViewerVisibilityMap,
} from './constants';

const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;

export const getTopLevelDisplayStatus = (
  agent: UIDisplayEntry,
  viewerStatusMap: ViewerVisibilityMap
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

export const getSubAgentDisplayStateMap = (
  agent: UIDisplayEntry,
  viewerStatusMap: ViewerVisibilityMap
) => {
  const newSubAgentMap: UIVisibilityMap = {};
  agent.displayStates.forEach((state) => {
    // default to inactive
    let subAgentStatus = HiddenOrHighlightedState.Inactive;
    // if parent agent is in hidden or highlighted map
    //check for subagent or empty array (empty array means all subagents are active)
    if (viewerStatusMap[agent.name] !== undefined) {
      if (
        viewerStatusMap[agent.name].includes(state.name) ||
        viewerStatusMap[agent.name].length === 0
      ) {
        subAgentStatus = HiddenOrHighlightedState.Active;
      }
    }
    newSubAgentMap[state.name] = subAgentStatus;
  });
  return newSubAgentMap;
};

export const getPayloadForHideAll = (
  uiDisplayData: UIDisplayData,
  hiddenState: HiddenOrHighlightedState
): ViewerVisibilityMap => {
  let payload: ViewerVisibilityMap = {};
  if (hiddenState === HiddenOrHighlightedState.Inactive) {
    payload = uiDisplayData.reduce<ViewerVisibilityMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  }
  return payload;
};

export const getPayloadTopLevelDisplayAction = (
  agent: UIDisplayEntry,
  currentAgentSelectionMap: ViewerVisibilityMap
): ViewerVisibilityMap => {
  const key = agent.name;
  const displayStates: string[] = agent.displayStates.map((agent) => {
    return agent.name;
  });
  const newSelection = { ...currentAgentSelectionMap };
  // this top level status can be the same as asking
  // is agent present in currentAgentSelectionMap
  const showAllOrRemoveHighlightAll =
    // topLevelStatus !== HiddenOrHighlightedState.Inactive;
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
  currentAgentSelectionMap: ViewerVisibilityMap
): ViewerVisibilityMap => {
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
