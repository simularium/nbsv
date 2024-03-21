import { SelectionEntry } from '@aics/simularium-viewer';
import { VisibilitySelectionMap } from './constants';

export const getSelectionStateInfo = (
  currentVisibilityMap: VisibilitySelectionMap
): SelectionEntry[] => {
  return Object.keys(currentVisibilityMap).map((key) => ({
    name: key,
    tags: currentVisibilityMap[key],
  }));
};
