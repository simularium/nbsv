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
 * The UserChangesMap stores user changes to highlighting and hiding checkboxes.
 * If a user highlights an agent or display state, that "star" checkbox will be checked.
 * If a user hides an agent or display state, that checkbox will be checked.
 * The selection state info for the viewer is derived from these maps.
 * The default state is to include the agent name, or if an agent has multiple display states,
 * all of the display state names.
 * userChangesMap[agentName] = [] means nothing is selected
 * userChangesMap[agentName] = [agentName] means the agent is selected in a case with no display states
 * userChangesMap[agentName] = [displayState1, displayState2] means whatever display states are in the array are selected
 */
export interface UserChangesMap {
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
