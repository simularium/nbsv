import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
  TrajectoryFileInfo,
} from '@aics/simularium-viewer';
import { ModelInfo } from '@aics/simularium-viewer/type-declarations/simularium/types';

import { WidgetModel } from '@jupyter-widgets/base';
import CameraControls from './components/CameraControls';
import ModelDisplayData from './components/ModelDisplayData';
import SidePanel from './components/SidePanel';
import PlayBackControls from './components/PlaybackControls';
import ScaleBar from './components/ScaleBar';
import {
  MIN_WIDTH_TO_SHOW_SIDE_PANEL,
  SIDE_PANEL_WIDTH,
  VIEWER_HEIGHT,
  VIEWER_INITIAL_WIDTH,
  agentColors,
  PlaybackData,
  PlaybackState,
} from './constants';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface ViewerProps {
  controller: SimulariumController;
}

const initialPlaybackData: PlaybackData = {
  timeStep: 0,
  lastFrameTime: 0,
  firstFrameTime: 0,
  timeUnits: {
    name: '',
    magnitude: 1,
  },
};

function ViewerWidget(props: ViewerProps): JSX.Element {
  // UI and viewer states
  const [dimensions, setDimensions] = useState({
    width: VIEWER_INITIAL_WIDTH,
    height: VIEWER_HEIGHT,
  });
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentTime: 0,
    isPlaying: false,
  });
  const controller = props.controller;
  // Trajectory data
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>({});
  const [trajTitle, setTrajTitle] = useState<string | undefined>('');
  const [scaleBarLabel, setScaleBarLabel] = useState<string>('');
  const [playbackData, setPlaybackData] =
    useState<PlaybackData>(initialPlaybackData);

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
            const { height } = entry.contentRect;
            // hide side panel if space is small
            setShowSidePanel(width > MIN_WIDTH_TO_SHOW_SIDE_PANEL);
            if (showSidePanel) {
              width = width - SIDE_PANEL_WIDTH;
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

  // Viewer callbacks
  const handleTrajectoryData = (data: TrajectoryFileInfo) => {
    console.log('handleTrajectoryData', data);
    setTrajTitle(data.trajectoryTitle);
    setModelInfo(data.modelInfo);
    setScaleBarLabel(getScaleBarLabel(data.spatialUnits));
    setPlaybackData({
      timeStep: data.timeStepSize,
      lastFrameTime: (data.totalSteps - 1) * data.timeStepSize,
      firstFrameTime: 0,
      timeUnits: data.timeUnits,
    });
  };

  const getScaleBarLabel = (spatialUnits: {
    magnitude: number;
    name: string;
  }): string => {
    const tickIntervalLength = controller.tickIntervalLength;
    let scaleBarLabelNumber = tickIntervalLength * spatialUnits.magnitude;
    scaleBarLabelNumber = parseFloat(scaleBarLabelNumber.toPrecision(2));
    const scaleBarLabelUnit = spatialUnits.name;

    return scaleBarLabelNumber.toString() + ' ' + scaleBarLabelUnit;
  };

  const handleTimeChange = (timeData: any): void => {
    setPlaybackState({ ...playbackState, currentTime: timeData.time });
  };

  return (
    <div ref={containerRef} className="container">
      {showSidePanel && <SidePanel />}
      <div className="viewer-container">
        <ModelDisplayData {...modelInfo} trajectoryTitle={trajTitle} />
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
        <div className="scalebar-controls">
          <PlayBackControls
            playbackState={playbackState}
            setPlaybackState={setPlaybackState}
            playbackData={playbackData}
            controller={controller}
          />
          <ScaleBar label={scaleBarLabel} />
          <CameraControls controller={controller} />
        </div>
      </div>
    </div>
  );
}

export default ViewerWidget;
