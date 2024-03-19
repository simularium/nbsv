import { SelectionEntry, UIDisplayData } from '@aics/simularium-viewer';
import { CheckboxState, VisibilitySelectionMap } from './constants';

const { Checked } = CheckboxState;

export const getNewHiddenAgents = (
  uiDisplayData: UIDisplayData,
  prevCheckboxState: CheckboxState
): VisibilitySelectionMap => {
  let payload: VisibilitySelectionMap = {};
  if (prevCheckboxState === Checked) {
    payload = uiDisplayData.reduce<VisibilitySelectionMap>((acc, item) => {
      acc[item.name] = [];
      return acc;
    }, {});
  }
  return payload;
};

export const getSelectionStateInfo = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};
