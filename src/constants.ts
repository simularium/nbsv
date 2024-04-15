export const agentColors = [
  '#fee34d',
  '#f7b232',
  '#bf5736',
  '#94a7fc',
  '#ce8ec9',
  '#58606c',
  '#0ba345',
  '#9267cb',
  '#81dbe6',
  '#bd7800',
  '#bbbb99',
  '#5b79f0',
  '#89a500',
  '#da8692',
  '#418463',
  '#9f516c',
  '#00aabf',
];

export const TOOLTIP_COLOR = '#3B3649';

export const SIDE_PANEL_WIDTH: number = 280;
export const MIN_WIDTH_TO_SHOW_SIDE_PANEL: number = 580;
export const VIEWER_INITIAL_WIDTH: number = 500;
export const VIEWER_HEIGHT: number = 580;

/**
 * The VisibilitySelectionMap holds selection information from which we can derive the state of the agent
 * checkboxes and of the SelectionStateInfo. The keys are agent names and the array contains possible selections.
 * The VisibilitySelectionMap is generalied to be used for both hiding and highlighting selections.
 * if visMap[agentName] = [agentName] // the agent is not selected (default), and by extension, no display states are selected
 * if visMap[agentName] = [ ] // the agent is selected, and by extension all display states are selected
 * if visMap[agentName] = [ displayStateName1, displayStateName2... ] // some but not all display states are selected, the agent checkbox is by definition indeterminate
 * if a selection array would contain all the display state names, it should be changed to an empty array
 */
export interface VisibilitySelectionMap {
  [key: string]: string[];
}

export enum CheckboxState {
  Checked = 'Checked',
  Unchecked = 'Unchecked',
  Indeterminate = 'Indeterminate',
}

export const tooltipMap = {
  [CheckboxState.Checked]: 'Hide',
  [CheckboxState.Unchecked]: 'Show',
  [CheckboxState.Indeterminate]: 'Show',
};
