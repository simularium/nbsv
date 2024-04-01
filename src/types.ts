export interface TimeUnits {
  magnitude: number;
  name: string;
}

export interface PlaybackState {
  currentTime: number;
  isPlaying: boolean;
}

export interface PlaybackData {
  timeStep: number;
  lastFrameTime: number;
  firstFrameTime: number;
  timeUnits: TimeUnits;
}

export interface CheckboxDisplayOptionsHide {
  hideTooltipText: string;
}

export interface CheckboxDisplayOptionsHighlight {
  highlightTooltipText: string;
  highlightAriaLabel: 'true' | 'false' | 'mixed';
  highlightIcon: JSX.Element;
}

export enum SelectionType {
  Hide,
  Highlight,
}