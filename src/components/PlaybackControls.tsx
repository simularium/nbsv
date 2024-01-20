import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Slider, Tooltip } from 'antd';

import '../../css/playback_controls.css';
import { PlaybackData, PlaybackState } from '../constants';
import { FrameBack, FrameForward, Pause, Play } from './Icons';
import { SimulariumController, compareTimes } from '@aics/simularium-viewer';

const TOOLTIP_COLOR = '#3B3649';
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
  const { currentTime: currentTime } = playbackState;
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

const PlayBackControls = (props: PlayBackProps): JSX.Element => {
  const { playbackState, setPlaybackState, playbackData, controller } = props;
  const [timeInput, setTimeInput] = useState(0);

  const { timeUnits, firstFrameTime, lastFrameTime, timeStep } = playbackData;
  const { isPlaying, currentTime } = playbackState;

  const isStepForwardDisabled = currentTime + timeStep >= lastFrameTime;
  const isStepBackDisabled = firstFrameTime + timeStep > currentTime;

  const displayTimes = getDisplayTimes(playbackState, playbackData);

  // use effect listener on current time, if current time is end, call reset playback
  useEffect(() => {
    if (currentTime + timeStep >= lastFrameTime) {
      controller.gotoTime(firstFrameTime);
      setPlaybackState({
        currentTime: firstFrameTime,
        isPlaying: false,
      });
    }
  }, [currentTime]);

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

  const playHandler = (timeOverride?: number) => {
    const { currentTime } = playbackState;
    const newTime = timeOverride !== undefined ? timeOverride : currentTime;
    const timeIsBeyondLastFrameTime = newTime + timeStep >= lastFrameTime;
    controller.pause();
    if (timeIsBeyondLastFrameTime) {
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
    const { currentTime } = playbackState;
    controller.gotoTime(currentTime + timeStep);
  };

  const goToPreviousFrame = () => {
    const { currentTime } = playbackState;
    controller.gotoTime(currentTime - timeStep);
  };

  const handleTimeInputChange = (userInput: number | null): void => {
    if (userInput !== null) {
      setTimeInput(userInput as number);
    }
  };

  const skipToTime = (time: number) => {
    const isTimeGreaterThanLastFrameTime =
      compareTimes(time, lastFrameTime, timeStep) === 1;
    const isTimeLessThanFirstFrameTime =
      compareTimes(time, firstFrameTime, timeStep) === -1;
    if (isTimeGreaterThanLastFrameTime || isTimeLessThanFirstFrameTime) {
      return;
    }
    controller.gotoTime(time);
  };

  const handleTimeInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      // User input will be aligned with the displayed time values, which were multiplied
      // by timeUnits.magnitude in the getDisplayTimes selector, so we have to undo the
      // multiplication before requesting the time. timeUnits.magnitude is 1 for a vast
      // majority of the time so it shouldn't make a difference most times.
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
    const { isPlaying } = playbackState;
    skipToTime(sliderValue as number);
    if (isPlaying) {
      controller.pause();
    }
  };

  const handleSliderAfterChange = (value: number): void => {
    const { isPlaying } = playbackState;
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
          onClick={gotoNextFrame}
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
