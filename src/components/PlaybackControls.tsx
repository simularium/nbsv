import React, { useState } from 'react';
import { Button, InputNumber, Slider, Tooltip } from 'antd';

import '../../css/playbackControls.css';
import { SimulariumController, compareTimes } from '@aics/simularium-viewer';
import { TimeUnits } from '../types';

const TOOLTIP_COLOR = '#3B3649';

interface PlayBackProps {
  controller: SimulariumController;
  // playHandler: (timeOverride?: number) => void;
  // pauseHandler: () => void;
  // prevHandler: () => void;
  // nextHandler: () => void;
  firstFrameTime: number;
  lastFrameTime: number;
  // isPlaying: boolean;
  // onTimeChange: (time: number) => void;
  // loading: boolean;
  timeStep: number;
  // displayTimes: DisplayTimes;
  timeUnits: TimeUnits;
  // isEmpty: boolean;
}

const PlayBackControls = ({
  controller,
  // playHandler,
  // pauseHandler,
  // prevHandler,
  // isPlaying,
  // nextHandler,
  firstFrameTime,
  lastFrameTime,
  // onTimeChange,
  // loading,
  timeStep,
  timeUnits,
}: // isEmpty,
// displayTimes,
PlayBackProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);

  const playHandler = () => {
    setIsPlaying(true);
    controller.resume();
  };

  const pauseHandler = () => {
    setIsPlaying(false);
    controller.pause();
  };

  const skipToTime = (time: number) => {
    // const {
    //     simulariumController,
    //     firstFrameTime,
    //     lastFrameTime,
    //     timeStep,
    //     isBuffering,
    //     setBuffering,
    // } = this.props;
    // if (isBuffering) {
    //   return;
    // }

    const isTimeGreaterThanLastFrameTime =
      compareTimes(time, lastFrameTime, timeStep) === 1;
    const isTimeLessThanFirstFrameTime =
      compareTimes(time, firstFrameTime, timeStep) === -1;
    if (isTimeGreaterThanLastFrameTime || isTimeLessThanFirstFrameTime) {
      return;
    }

    // setBuffering(true);
    controller.gotoTime(time);
  };

  const frameForwardHandler = () => {
    // const { time, timeStep } = this.props;
    console.log('firing frameForwardHandler');
    skipToTime(displayTime + timeStep);
    setDisplayTime(displayTime + timeStep);
  };

  const frameBackHandler = () => {
    // const { time, timeStep } = this.props;
    console.log('firing frameBackHandler');
    skipToTime(displayTime - timeStep);
    setDisplayTime(displayTime - timeStep);
  };

  const handleScrubTime = (event: any) => {
    controller.gotoTime(parseFloat(event));
    setDisplayTime(parseFloat(event));
  };

  const roundTimeForDisplay = (time: number): number => {
    if (time === 0) {
      return 0;
    }
    return parseFloat(time.toPrecision(3));
  };

  // Determine the likely max number of characters for the time input box
  const getMaxNumChars = (
    firstFrameTime: number,
    lastFrameTime: number,
    timeStep: number
  ) => {
    // These two time values are likely to have the most digits
    const refTime1Value = firstFrameTime + timeStep;
    const refTime2Value = lastFrameTime + timeStep;
    const roundedRefTime1 = roundTimeForDisplay(refTime1Value).toString();
    const roundedRefTime2 = roundTimeForDisplay(refTime2Value).toString();

    // Edge case: If firstFrameTime is a very small but long number like 0.000008,
    // we need to accommodate that.
    const maxNumChars = Math.max(
      firstFrameTime.toString().length,
      roundedRefTime1.length,
      roundedRefTime2.length
    );

    return maxNumChars;
  };

  // Determine the width of the input box based on a likely max number of characters
  const getTimeInputWidth = (): string => {
    // If maxNumChars is 5 then the input box width will be 6 character widths long
    // (+ 1 is arbitrary padding)
    return `${getMaxNumChars(firstFrameTime, lastFrameTime, timeStep) + 1}ch`;
  };

  return (
    <div className="pbcontainer">
      <Tooltip placement="top" title="Skip 1 frame back" color={TOOLTIP_COLOR}>
        <Button
          className="btn"
          onClick={frameBackHandler}
          // disabled={isStepBackDisabled || loading || isEmpty}
          // loading={loading}
        >
          {/* icon change if loading... */}
        </Button>
      </Tooltip>
      <Tooltip
        placement="top"
        title={isPlaying ? 'Pause' : 'Play'}
        color={TOOLTIP_COLOR}
      >
        <Button
          className="btn"
          onClick={isPlaying ? () => pauseHandler : playHandler}
        >
          {isPlaying ? 'Pause' : 'Play'}
          {/* icon change if loading... */}
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Skip 1 frame ahead" color={TOOLTIP_COLOR}>
        <Button
          className="btn"
          onClick={frameForwardHandler}
          // disabled={isStepForwardDisabled || loading || isEmpty}
          // loading={loading}
        >
          {/* icon change if loading... */}
        </Button>
      </Tooltip>
      <Slider
        value={displayTime}
        onChange={handleScrubTime}
        className="slider"
        step={timeStep}
        min={firstFrameTime}
        max={lastFrameTime}
      />
      <div className="time">
        <InputNumber
          // key is necessary to re-render this component and override user input
          key={displayTime}
          size="small"
          value={displayTime}
          // onChange={handleTimeInputChange}
          // onKeyDown={handleTimeInputKeyDown}
          // disabled={loading || isEmpty || isPlaying}
          style={{ width: getTimeInputWidth() }}
        />
        <span className="lastFrameTime">
          / {lastFrameTime} {timeUnits ? timeUnits.name : 's'}
        </span>
      </div>
    </div>
  );
};
export default PlayBackControls;
