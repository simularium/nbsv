import React from 'react';
import { Button, InputNumber, Slider, Tooltip } from 'antd';

import '../../css/playback_controls.css';
import { PlaybackState } from '../constants';
import { TimeUnits } from '../constants';
import { FrameBack, FrameForward, Pause, Play } from './Icons';

const TOOLTIP_COLOR = '#3B3649';
interface PlayBackProps {
  playbackState: PlaybackState;
  timeUnits: TimeUnits;
  firstFrameTime: number;
  lastFrameTime: number;
  timeStep: number;
  displayTimes: DisplayTimes;
  playHandler: () => void;
  pauseHandler: () => void;
  prevHandler: () => void;
  nextHandler: () => void;
  handleSliderChange: (time: number | [number, number]) => void;
  handleSliderAfterChange: (time: any) => void;
  handleTimeInputChange: (event: any) => void;
  handleTimeInputKeyDown: (event: any) => void;
  scaleBarLabel: string;
}

interface DisplayTimes {
  roundedTime: number;
  roundedFirstFrameTime: number;
  roundedLastFrameTime: number;
  roundedTimeStep: number;
}

const PlayBackControls = (props: PlayBackProps): JSX.Element => {
  const {
    playbackState,
    timeUnits,
    firstFrameTime,
    lastFrameTime,
    timeStep,
    displayTimes,
    nextHandler,
    prevHandler,
    handleSliderChange,
    handleSliderAfterChange,
    playHandler,
    pauseHandler,
    handleTimeInputChange,
    handleTimeInputKeyDown,
  } = props;

  const { isPlaying, currentTime } = playbackState;

  const isStepForwardDisabled = currentTime + timeStep >= lastFrameTime;
  const isStepBackDisabled = firstFrameTime + timeStep > currentTime;

  // Determine the width of the input box based on a likely max number of characters
  const getTimeInputWidth = (): string => {
    const { roundedFirstFrameTime, roundedLastFrameTime, roundedTimeStep } =
      displayTimes;
    return `${
      Math.max(
        roundedFirstFrameTime.toString().length,
        roundedLastFrameTime.toString().length,
        roundedTimeStep.toString().length
      ) + 1.5
    }ch`;
  };

  return (
    <div className="playback-controls">
      <Tooltip placement="top" title="Skip 1 frame back" color={TOOLTIP_COLOR}>
        <Button
          id={'back-button'}
          className="btn"
          onClick={prevHandler}
          disabled={isStepBackDisabled}
        >
          {FrameBack}
        </Button>
      </Tooltip>
      <Tooltip
        placement="top"
        title={isPlaying ? 'Pause' : 'Play'}
        color={TOOLTIP_COLOR}
      >
        <Button
          id={'play-button'}
          className="btn"
          onClick={
            isPlaying
              ? pauseHandler
              : () => {
                  playHandler();
                }
          }
        >
          {isPlaying ? Pause : Play}
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Skip 1 frame ahead" color={TOOLTIP_COLOR}>
        <Button
          id={'next-button'}
          className="btn"
          onClick={nextHandler}
          disabled={isStepForwardDisabled}
        >
          {FrameForward}
        </Button>
      </Tooltip>
      <Slider
        value={currentTime}
        onChange={handleSliderChange}
        onAfterChange={handleSliderAfterChange}
        className="slider"
        step={timeStep}
        min={firstFrameTime}
        max={lastFrameTime}
      />
      <div className="time-input-display">
        <InputNumber
          // key is necessary to re-render this component and override user input
          key={displayTimes.roundedTime}
          size="small"
          value={displayTimes.roundedTime}
          controls={false}
          onChange={handleTimeInputChange}
          onKeyDown={handleTimeInputKeyDown}
          disabled={isPlaying}
          style={{ width: getTimeInputWidth() }}
        />
        <span className="lastFrameTime">
          / {displayTimes.roundedLastFrameTime}
          {timeUnits ? timeUnits.name : 's'}
        </span>
      </div>
    </div>
  );
};
export default PlayBackControls;
