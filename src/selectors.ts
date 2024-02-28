import {
  SelectionEntry,
  SelectionStateInfo,
  UIDisplayData,
} from '@aics/simularium-viewer';
import {
  HiddenOrHighlightedState,
  VisibilitySelectionMap,
  ViewerVisibilityStates,
} from './constants';

const { Inactive } = HiddenOrHighlightedState;

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
