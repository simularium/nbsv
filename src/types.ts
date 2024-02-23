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
