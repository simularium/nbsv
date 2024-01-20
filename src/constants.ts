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

export enum HiddenOrHighlightedState {
  Active,
  Inactive,
  Indeterminate,
}

// maps names/display states for viewer viz status (hidden/highligted or not)
// called VisiblitySelectionMap in website repo
export interface ViewerVisibilityMap {
  [key: string]: string[];
}

// maps agent/subagent name to current ui viz status
// (hidden, visible, indeterminate) - used for visibility and highlighting
export interface UIVisibilityMap {
  [key: string]: HiddenOrHighlightedState;
}

//todo get from viewer
export interface DisplayStateEntry {
  name: string;
  id: string;
  color: string;
}

export enum DisplayAction {
  Hide = 'hidden',
  Highlight = 'highlight',
}

export interface ViewerVisibilityStates {
  hidden: ViewerVisibilityMap;
  highlight: ViewerVisibilityMap;
}
