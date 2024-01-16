import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
  compareTimes,
} from '@aics/simularium-viewer';
import React, { useEffect, useRef, useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';
import CameraControls from './components/CameraControls';
import ModelDisplayData from './components/ModelDisplayData';
import SidePanel from './components/SidePanel';
import PlayBackControls from './components/PlaybackControls';
import { TimeUnits, agentColors } from './constants';
import {
  ModelInfo,
  TrajectoryFileInfo,
} from '@aics/simularium-viewer/type-declarations/simularium/types';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface ViewerProps {
  controller: SimulariumController;
}

export interface PlaybackState {
  currentTime: number;
  isPlaying: boolean;
}

function ViewerWidget(props: ViewerProps): JSX.Element {
  const controller = props.controller;
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>({});
  const [trajectoryTitle, setTrajectoryTitle] = useState<string | undefined>(
    ''
  );
  const [dimensions, setDimensions] = useState({ width: 500, height: 529 });
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [timeStep, setTimeStep] = useState<number>(0);
  const [lastFrameTime, setLastFrameTime] = useState<number>(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentTime: 0,
    isPlaying: false,
  });
  const [timeInput, setTimeInput] = useState(0);
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    name: '',
    magnitude: 1,
  });

  // this seems redundant, but there is commentary in other parts of the code base
  // about not assuming this is 0 in the future
  // so I'm declaring it instead of using 0
  // throughout the code so we are flexible in the future
  const firstFrameTime = 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Initialize ResizeObserver if it doesn't exist
    if (!observerRef.current && containerRef.current) {
      observerRef.current = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          for (const entry of entries) {
            // get the size of viewer container
            let { width } = entry.contentRect;
            // const { height } = entry.contentRect;
            const height = 529;
            // hide side panel if space is small
            setShowSidePanel(width > 580);
            if (showSidePanel) {
              width = width - 280;
            }
            // pass size to viewer
            setDimensions({ width, height });
          }
        }
      );
      // observe the container size
      observerRef.current.observe(containerRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        if (containerRef.current) {
          observerRef.current.unobserve(containerRef.current);
        }
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [containerRef, showSidePanel]);

  const handleTrajectoryData = (data: TrajectoryFileInfo) => {
    console.log('handleTrajectoryData', data);
    setTrajectoryTitle(data.trajectoryTitle);
    setModelInfo(data.modelInfo);
    setTimeUnits(data.timeUnits);
    setTimeStep(data.timeStepSize);
    setLastFrameTime((data.totalSteps - 1) * data.timeStepSize);
    setPlaybackState({
      isPlaying: false,
      currentTime: 0,
    });
  };

  // use effect listener on current time, if current time is end, call reset playback
  useEffect(() => {
    if (playbackState.currentTime + timeStep >= lastFrameTime) {
      controller.gotoTime(firstFrameTime);
      setPlaybackState({
        currentTime: firstFrameTime,
        isPlaying: false,
      });
    }
  }, [playbackState.currentTime]);

  const handleTimeChange = (timeData: any): void => {
    setPlaybackState({ ...playbackState, currentTime: timeData.time });
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

  // Called after every keystroke
  const handleTimeInputChange = (userInput: number | null): void => {
    if (userInput !== null) {
      setTimeInput(userInput as number);
    }
  };

  const handleTimeInputKeyDown = (event: KeyboardEvent): void => {
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

  const roundTimeForDisplay = (time: number) => {
    if (time === 0) {
      return 0;
    }

    return parseFloat(time.toPrecision(3));
  };

  const displayTimes = {
    roundedTime: roundTimeForDisplay(
      playbackState.currentTime * timeUnits.magnitude
    ),
    roundedFirstFrameTime: roundTimeForDisplay(
      firstFrameTime * timeUnits.magnitude
    ),
    roundedLastFrameTime: roundTimeForDisplay(
      lastFrameTime * timeUnits.magnitude
    ),
    roundedTimeStep: roundTimeForDisplay(timeStep * timeUnits.magnitude),
  };

  return (
    <div ref={containerRef} className="container">
      {showSidePanel && <SidePanel />}
      <div className="viewer-container">
        <ModelDisplayData {...modelInfo} trajectoryTitle={trajectoryTitle} />
        <SimulariumViewer
          renderStyle={RenderStyle.WEBGL2_PREFERRED}
          backgroundColor={[0, 0, 0]}
          height={dimensions.height}
          width={dimensions.width}
          loggerLevel="off"
          onTimeChange={handleTimeChange}
          simulariumController={props.controller}
          onJsonDataArrived={console.log}
          showCameraControls={false}
          onTrajectoryFileInfoChanged={handleTrajectoryData}
          selectionStateInfo={{
            highlightedAgents: [],
            hiddenAgents: [],
            colorChange: null,
          }}
          onUIDisplayDataChanged={(uidata) =>
            console.log('new ui data, ', uidata)
          }
          loadInitialData={true}
          hideAllAgents={false}
          showBounds={true}
          agentColors={agentColors}
          showPaths={false}
          onError={console.log}
        />
        <PlayBackControls
          playbackState={playbackState}
          timeUnits={timeUnits}
          firstFrameTime={firstFrameTime}
          lastFrameTime={lastFrameTime}
          timeStep={timeStep}
          displayTimes={displayTimes}
          playHandler={playHandler}
          pauseHandler={pauseHandler}
          prevHandler={goToPreviousFrame}
          nextHandler={gotoNextFrame}
          handleSliderChange={handleSliderChange}
          handleSliderAfterChange={handleSliderAfterChange}
          handleTimeInputChange={handleTimeInputChange}
          handleTimeInputKeyDown={handleTimeInputKeyDown}
        />
      </div>
      <CameraControls controller={props.controller} />
    </div>
  );
}

export default ViewerWidget;
