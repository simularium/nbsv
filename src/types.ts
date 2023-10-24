import { CheckboxOptionType } from 'antd';

export interface DisplayTimes {
  roundedTime: number;
  roundedLastFrameTime: number;
  roundedTimeStep: number;
  maxNumChars: number;
}

export interface TimeUnits {
  magnitude: number;
  name: string;
}

export interface VisibilitySelectionMap {
  [key: string]: string[];
}

export const CHECKBOX_TYPE_STAR = 'star';
export type CHECKBOX_TYPE_STAR = typeof CHECKBOX_TYPE_STAR;

export interface SelectionEntry {
  name: string;
  tags: string[];
}

interface CheckBoxWithColor extends CheckboxOptionType {
  color: string;
}

export interface AgentDisplayNode {
  title: string;
  key: string;
  children: CheckBoxWithColor[];
  color: string;
}

interface DisplayStateEntry {
  name: string;
  id: string;
  color: string;
}
export interface UIDisplayEntry {
  name: string;
  displayStates: DisplayStateEntry[];
  color: string;
}
export declare type UIDisplayData = UIDisplayEntry[];
