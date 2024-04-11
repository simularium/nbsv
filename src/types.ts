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

export interface HighlightDisplayOption {
  tooltipText: string;
  ariaLabel: 'true' | 'false' | 'mixed';
  icon: JSX.Element;
}

export enum SelectionType {
  Hide,
  Highlight,
}

export enum AgentType {
  Agent,
  DisplayState,
}

interface BaseCustomCheckboxProps {
  agentName: string;
  agentType: AgentType;
}

export interface AgentProps extends BaseCustomCheckboxProps {
  agentType: AgentType.Agent;
  displayStateName?: never;
}

export interface DisplayStateProps extends BaseCustomCheckboxProps {
  agentType: AgentType.DisplayState;
  displayStateName: string;
}

export type CustomCheckboxProps = AgentProps | DisplayStateProps;
