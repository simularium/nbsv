import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Slider, Tooltip } from 'antd';

import '../../css/playback_controls.css';
import { PlaybackData, PlaybackState } from '../constants';
import { FrameBack, FrameForward, Pause, Play } from './Icons';
import { SimulariumController, compareTimes } from '@aics/simularium-viewer';

const TOOLTIP_COLOR = '#3b3649';
interface PlayBackProps {
  playbackState: PlaybackState;
  setPlaybackState: (playbackState: PlaybackState) => void;
  playbackData: PlaybackData;
  controller: SimulariumController;
}

interface DisplayTimes {
  roundedTime: number;
  roundedFirstFrameTime: number;
  roundedLastFrameTime: number;
  roundedTimeStep: number;
}

const roundTimeForDisplay = (time: number) => {
  if (time === 0) {
    return 0;
  }

  return parseFloat(time.toPrecision(3));
};

const getDisplayTimes = (
  playbackState: PlaybackState,
  playbackData: PlaybackData
): DisplayTimes => {
  const { currentTime } = playbackState;
  const { timeUnits, firstFrameTime, lastFrameTime, timeStep } = playbackData;
  return {
    roundedTime: roundTimeForDisplay(currentTime * timeUnits.magnitude),
    roundedFirstFrameTime: roundTimeForDisplay(
      firstFrameTime * timeUnits.magnitude
    ),
    roundedLastFrameTime: roundTimeForDisplay(
      lastFrameTime * timeUnits.magnitude
    ),
    roundedTimeStep: roundTimeForDisplay(timeStep * timeUnits.magnitude),
  };
};

// Determine the width of the input box based on a likely max number of characters
const getTimeInputWidth = (displayTimes: DisplayTimes): string => {
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

const PlayBackControls = (props: PlayBackProps): JSX.Element => {
  const { controller, playbackData, playbackState, setPlaybackState } = props;
  const [timeInput, setTimeInput] = useState<number>(0);

  const { timeUnits, firstFrameTime, lastFrameTime, timeStep } = playbackData;
  const { isPlaying, currentTime } = playbackState;

  const nextFrameUnavailable = currentTime + timeStep >= lastFrameTime;
  const previousFrameUnavailable = firstFrameTime + timeStep > currentTime;

  const displayTimes = getDisplayTimes(playbackState, playbackData);
  const timeInputWidth = getTimeInputWidth(displayTimes);

  // useeffect to reset playback state when the last frame is reached
  useEffect(() => {
    controller.gotoTime(firstFrameTime);
    setPlaybackState({
      currentTime: firstFrameTime,
      isPlaying: false,
    });
  }, [nextFrameUnavailable]);

  const skipToTime = (time: number) => {
    const isTimePastLastFrame =
      compareTimes(time, lastFrameTime, timeStep) === 1;
    const isTimeBeforeFirstFrame =
      compareTimes(time, firstFrameTime, timeStep) === -1;
    if (isTimePastLastFrame || isTimeBeforeFirstFrame) {
      return;
    }
    controller.gotoTime(time);
  };

  const playHandler = (timeOverride?: number) => {
    const timeOverrideProvided = timeOverride !== undefined;
    const newTime = timeOverrideProvided ? timeOverride : currentTime;
    // this is the same as nextFrameUnavailable, but computing it here
    // prevents a looping bug where playback gets stuck oscillating between
    // first and last frame
    const nextFrameIsPastLastFrame = newTime + timeStep >= lastFrameTime;
    controller.pause();
    if (nextFrameIsPastLastFrame) {
      setPlaybackState({
        isPlaying: false,
        currentTime: firstFrameTime,
      });
      controller.gotoTime(firstFrameTime);
    } else {
      setPlaybackState({
        isPlaying: true,
        currentTime: newTime,
      });
      controller.playFromTime(newTime);
      controller.resume();
    }
  };

  const pauseHandler = () => {
    controller.pause();
    setPlaybackState({ ...playbackState, isPlaying: false });
  };

  const gotoNextFrame = () => {
    controller.gotoTime(currentTime + timeStep);
  };

  const goToPreviousFrame = () => {
    controller.gotoTime(currentTime - timeStep);
  };

  const handleTimeInputChange = (userInput: number | null): void => {
    if (userInput !== null) {
      setTimeInput(userInput as number);
    }
  };

  const handleTimeInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (typeof timeInput === 'number') {
        setPlaybackState({
          ...playbackState,
          currentTime: timeInput / timeUnits.magnitude,
        });
        skipToTime(timeInput / timeUnits.magnitude);
      }
    }
    if (event.key === 'Escape') {
      const inputNumberComponent = event.target as HTMLElement;
      inputNumberComponent.blur();
    }
  };

  const handleSliderChange = (sliderValue: number | [number, number]): void => {
    skipToTime(sliderValue as number);
    if (isPlaying) {
      controller.pause();
    }
  };

  const handleSliderAfterChange = (value: number): void => {
    if (isPlaying) {
      playHandler(value);
    } else {
      setPlaybackState({ ...playbackState, currentTime: value });
    }
  };

  return (
    <div className="playback-controls">
      <Tooltip placement="top" title="Skip 1 frame back" color={TOOLTIP_COLOR}>
        <Button
          id={'back-button'}
          className="btn"
          onClick={goToPreviousFrame}
          disabled={previousFrameUnavailable}
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
          onClick={gotoNextFrame}
          disabled={nextFrameUnavailable}
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
          style={{ width: timeInputWidth }}
        />
        <span className="last-frame-time">
          / {displayTimes.roundedLastFrameTime}
          {timeUnits ? timeUnits.name : 's'}
        </span>
      </div>
    </div>
  );
};
export default PlayBackControls;
