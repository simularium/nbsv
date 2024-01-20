import SimulariumViewer, {
  RenderStyle,
  SelectionStateInfo,
  SimulariumController,
  UIDisplayData,
} from '@aics/simularium-viewer';
import React, { useEffect, useRef, useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';
import CameraControls from './components/CameraControls';
import ModelDisplayData from './components/ModelDisplayData';
import SidePanel from './components/SidePanel';
import { ViewerVisibilityStates, agentColors } from './constants';
import {
  ModelInfo,
  TrajectoryFileInfo,
} from '@aics/simularium-viewer/type-declarations/simularium/types';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface WidgetProps {
  controller: SimulariumController;
}

function ViewerWidget(props: WidgetProps): JSX.Element {
  // Trajectory data
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>({});
  const [trajectoryTitle, setTrajectoryTitle] = useState<string | undefined>(
    ''
  );
  const [uiDisplayData, setUIDisplayData] = useState<UIDisplayData>([]);
  // UI state
  const [dimensions, setDimensions] = useState({ width: 500, height: 529 });
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [currentVisibilityStates, setCurrentVisibilityStates] =
    useState<ViewerVisibilityStates>({
      hidden: {},
      highlight: {},
    });
  // Viewer state
  const [selectionStateInfoForViewer, setSelectionStateInfoForViewer] =
    useState<SelectionStateInfo>({
      highlightedAgents: [],
      hiddenAgents: [],
      colorChange: null,
    });

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  // Resize listener
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

  // Callbacks for viewer props
  const handleTrajectoryData = (data: TrajectoryFileInfo) => {
    setTrajectoryTitle(data.trajectoryTitle);
    setModelInfo(data.modelInfo);
  };

  const handleUIDisplayDataChanged = (uidata: any) => {
    setUIDisplayData(uidata);
  };

  // Listener/setter for selection state info
  useEffect(() => {
    setSelectionStateInfoForViewer((prevState) => ({
      ...prevState,
      highlightedAgents: Object.keys(currentVisibilityStates.highlight).map(
        (key) => ({
          name: key,
          tags: currentVisibilityStates.highlight[key],
        })
      ),
      hiddenAgents: Object.keys(currentVisibilityStates.hidden).map((key) => ({
        name: key,
        tags: currentVisibilityStates.hidden[key],
      })),
    }));
  }, [currentVisibilityStates]);

  return (
    <div ref={containerRef} className="container">
      {showSidePanel && (
        <SidePanel
          uiDisplayData={uiDisplayData}
          currentVisibilityStates={currentVisibilityStates}
          setCurrentVisibilityStates={setCurrentVisibilityStates}
        />
      )}
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
          selectionStateInfo={selectionStateInfoForViewer}
          onUIDisplayDataChanged={handleUIDisplayDataChanged}
          loadInitialData={true}
          hideAllAgents={false}
          showBounds={true}
          agentColors={agentColors}
          showPaths={false}
          onError={console.log}
        />
      </div>
      <CameraControls controller={props.controller} />
    </div>
  );
}

export default ViewerWidget;
