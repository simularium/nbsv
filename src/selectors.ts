import { SelectionEntry, UIDisplayData } from '@aics/simularium-viewer';
import { CheckboxState, VisibilitySelectionMap } from './constants';

const { Checked } = CheckboxState;

export const getNewHiddenAgents = (
  uiDisplayData: UIDisplayData,
  oldCheckboxState: CheckboxState
): VisibilitySelectionMap => {
  let payload: VisibilitySelectionMap = {};
  if (oldCheckboxState === Checked) {
    payload = uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  }
  return payload;
};

export const getNewSelectionStateInfo = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};
