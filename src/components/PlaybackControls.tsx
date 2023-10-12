import React, { useState } from 'react';
import { Button, Slider, Tooltip } from 'antd';

import '../../css/playbackControls.css';
import { SimulariumController } from '@aics/simularium-viewer';

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
  // timeUnits: TimeUnits;
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
}: // timeUnits,
// isEmpty,
// displayTimes,
PlayBackProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playHandler = () => {
    setIsPlaying(true);
    controller.resume();
  };

  const pauseHandler = () => {
    setIsPlaying(false);
    controller.pause();
  };

  const handleScrubTime = (event: any) => {
    console.log(event);
    controller.gotoTime(parseFloat(event));
  };

  return (
    <div className="pbcontainer">
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
      <Slider
        onChange={handleScrubTime}
        className="slider"
        step={timeStep}
        min={firstFrameTime}
        max={lastFrameTime}
      />
    </div>
  );
};
export default PlayBackControls;
