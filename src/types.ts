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

export enum AgentLevel {
  Agent,
  ChildAgent,
}

interface BaseCustomCheckboxProps {
  agentName: string;
  agentLevel: AgentLevel;
}

export interface ParentAgentProps extends BaseCustomCheckboxProps {
  agentLevel: AgentLevel.Agent;
  childName?: never;
}

export interface ChildAgentProps extends BaseCustomCheckboxProps {
  agentLevel: AgentLevel.ChildAgent;
  childName: string;
}

export type CustomCheckboxProps = ParentAgentProps | ChildAgentProps;
