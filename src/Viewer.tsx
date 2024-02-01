import React, { useEffect, useRef, useState } from 'react';
import { WidgetModel } from '@jupyter-widgets/base';
import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
  TrajectoryFileInfo,
} from '@aics/simularium-viewer';
import { ModelInfo } from '@aics/simularium-viewer/type-declarations/simularium/types';

import CameraControls from './components/CameraControls';
import ModelDisplayData from './components/ModelDisplayData';
import SidePanel from './components/SidePanel';
import ScaleBar from './components/ScaleBar';
import {
  MIN_WIDTH_TO_SHOW_SIDE_PANEL,
  SIDE_PANEL_WIDTH,
  VIEWER_HEIGHT,
  VIEWER_INITIAL_WIDTH,
  agentColors,
} from './constants';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface ViewerProps {
  controller: SimulariumController;
}

function ViewerWidget(props: ViewerProps): JSX.Element {
  // UI display state
  const [dimensions, setDimensions] = useState({
    width: VIEWER_INITIAL_WIDTH,
    height: VIEWER_HEIGHT,
  });
  const [showSidePanel, setShowSidePanel] = useState(true);
  const controller = props.controller;
  // trajectory data
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>({});
  const [trajectoryTitle, setTrajectoryTitle] = useState<string | undefined>(
    ''
  );
  const [scaleBarLabel, setScaleBarLabel] = useState<string>('');

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

  const handleTrajectoryData = (data: TrajectoryFileInfo) => {
    setTrajectoryTitle(data.trajectoryTitle);
    setModelInfo(data.modelInfo);
    setScaleBarLabel(getScaleBarLabel(data.spatialUnits));
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
          onTimeChange={console.log}
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
          <ScaleBar label={scaleBarLabel} />
          <CameraControls controller={props.controller} />
        </div>
      </div>
    </div>
  );
}

export default ViewerWidget;
