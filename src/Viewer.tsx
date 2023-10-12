import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
} from '@aics/simularium-viewer';
import React from 'react';

import { WidgetModel } from '@jupyter-widgets/base';
import PlayBackControls from './components/PlaybackControls';
import { TimeUnits } from './types';

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

function ViewerWidget(props: WidgetProps): JSX.Element {
  return (
    <div>
      <button onClick={() => props.controller.resume()}>Play</button>
      <button onClick={() => props.controller.pause()}>Pause</button>
      <button onClick={() => props.controller.stop()}>stop</button>
      <SimulariumViewer
        renderStyle={RenderStyle.WEBGL2_PREFERRED}
        backgroundColor={[0, 0, 0]}
        height={props.height}
        width={props.width}
        loggerLevel="debug"
        onTimeChange={console.log}
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
      <PlayBackControls
        controller={props.controller}
        // playHandler={() => props.controller.resume()}
        // time={time} //state variable
        // pauseHandler={() => props.controller.pause()}
        // prevHandler={console.log}
        // nextHandler={console.log}
        firstFrameTime={props.firstFrameTime} //state variable
        lastFrameTime={props.lastFrameTime} //state variable
        // isPlaying={isPlaying} //state variable
        // onTimeChange={console.log}
        // loading={loading} //state variable
        timeStep={props.timeStep} //state variable
        // displayTimes={displayTimes} //state variable
        // timeUnits={timeUnits} //state variable
        // isEmpty={isEmpty} //state variable?
      />
    </div>
  );
}

export default ViewerWidget;
