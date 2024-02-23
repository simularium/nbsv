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

export const TOOLTIP_COLOR = '#3B3649';

//todo get from viewer
export interface DisplayStateEntry {
  name: string;
  id: string;
  color: string;
}

export interface UIDisplayEntry {
  name: string;
  displayStates: DisplayStateEntry[];
  color: string;
}

// maps names/display states for viewer viz status (hidden/highligted, or not, in the viewport)
export interface VisibilitySelectionMap {
  [key: string]: string[];
}

// types for matching agent/subagent names to current status of checkboxes in the agent tree UI
// (hidden, visible, indeterminate) - used for visibility and highlighting
export enum HiddenOrHighlightedState {
  Active = 'Active',
  Inactive = 'Inactive',
  Indeterminate = 'Indeterminate',
}

export interface UIVisibilityMap {
  [key: string]: HiddenOrHighlightedState;
}

export interface SubAgentDisplayMaps {
  hidden: UIVisibilityMap;
  highlight: UIVisibilityMap;
}

export interface TopLevelDisplayStatus {
  hidden: HiddenOrHighlightedState;
  highlight: HiddenOrHighlightedState;
}

export enum DisplayAction {
  Hide = 'hidden',
  Highlight = 'highlight',
}

export interface ViewerVisibilityStates {
  hidden: VisibilitySelectionMap;
  highlight: VisibilitySelectionMap;
}
