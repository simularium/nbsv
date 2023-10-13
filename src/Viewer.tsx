import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
} from '@aics/simularium-viewer';
import React, { useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';
import PlayBackControls from './components/PlaybackControls';
import { TimeUnits } from './types';
import ViewerTitle from './components/ViewerTitle';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface WidgetProps {
  controller: SimulariumController;
  height: number;
  width: number;
  // time: number;
  firstFrameTime: number;
  lastFrameTime: number;
  // isPlaying: boolean;
  // loading: boolean;
  timeStep: number;
  // displayTimes: any;
  timeUnits: TimeUnits;
  // isEmpty: boolean;
  title: string;
}

const agentColors = [
  '#fee34d',
  '#f7b232',
  '#bf5736',
  '#94a7fc',
  '#ce8ec9',
  '#58606c',
  '#0ba345',
  '#9267cb',
  '#81dbe6',
  '#bd7800',
  '#bbbb99',
  '#5b79f0',
  '#89a500',
  '#da8692',
  '#418463',
  '#9f516c',
  '#00aabf',
];

// let currentFrame = 0;
// let currentTime = 0;

// const handleTimeChange = (timeData: any): void => {
//   currentFrame = timeData.frameNumber;
//   currentTime = timeData.time;
//   // this.setState({ currentFrame, currentTime });
//   // if (this.state.pauseOn === currentFrame) {
//     props.controller.pause();
//     // this.setState({ pauseOn: -1 });
//   }
// };

function ViewerWidget(props: WidgetProps): JSX.Element {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayingStateChange = (change: boolean) => {
    setIsPlaying(change);
  };

  const handleTimeChange = (timeData: any): void => {
    if (timeData.time === props.lastFrameTime) {
      props.controller.pause();
      props.controller.gotoTime(props.firstFrameTime);
      setIsPlaying(false);
    }
    setTime(timeData.time);
  };

  return (
    <div className="v-container">
      {/* <button onClick={() => props.controller.pause()}>Pause</button>
      <button onClick={() => props.controller.stop()}>stop</button> */}
      <ViewerTitle title={props.title} />
      <div className="viewer-container">
        <SimulariumViewer
          renderStyle={RenderStyle.WEBGL2_PREFERRED}
          backgroundColor={[0, 0, 0]}
          height={props.height}
          width={props.width}
          loggerLevel="debug"
          onTimeChange={handleTimeChange}
          simulariumController={props.controller}
          onJsonDataArrived={console.log}
          showCameraControls={false}
          onTrajectoryFileInfoChanged={console.log}
          selectionStateInfo={{
            highlightedAgents: [],
            hiddenAgents: [],
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
      </div>
      <PlayBackControls
        controller={props.controller}
        // playHandler={() => props.controller.resume()}
        time={time} //state variable
        handlePlayPause={handlePlayingStateChange}
        // pauseHandler={() => props.controller.pause()}
        // prevHandler={console.log}
        // nextHandler={console.log}
        firstFrameTime={props.firstFrameTime} //state variable
        lastFrameTime={props.lastFrameTime} //state variable
        isPlaying={isPlaying} //state variable
        // onTimeChange={console.log}
        // loading={loading} //state variable
        timeStep={props.timeStep} //state variable
        // displayTimes={displayTimes} //state variable
        timeUnits={props.timeUnits} //state variable
        // isEmpty={isEmpty} //state variable?
      />
    </div>
  );
}

export default ViewerWidget;
