import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
} from '@aics/simularium-viewer';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { WidgetModel } from '@jupyter-widgets/base';
import CameraControls from './components/CameraControls';
import ViewerTitle from './components/ModelDisplayData';
import MetaDataPanel from './components/MetaDataPanel';
import SidePanel from './components/SidePanel';
import { agentColors } from './constants';
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

export interface PublicationData {
  data: any;
  title: string;
  journal: string;
  year: string;
  url: string;
}

function ViewerWidget(props: WidgetProps): JSX.Element {
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>({});
  const [trajectoryTitle, setTrajectoryTitle] = useState<string | undefined>(
    ''
  );
  const [publicationData, setPublicationData] =
    useState<PublicationData | null>(null);

  const [dimensions, setDimensions] = useState({ width: 500, height: 529 });
  // Decided to hide side panel when width is low enough that viewer is too small to be functional
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [showMetaDataPanel, setShowMetaDataPanel] = useState(true);

  const viewerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Initialize ResizeObserver if it doesn't exist
    if (!observerRef.current && viewerRef.current) {
      observerRef.current = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          for (const entry of entries) {
            // get the size of viewer container
            const { width } = entry.contentRect;
            let { height } = entry.contentRect;
            // hide side panel if viewer is too small
            setShowSidePanel(width > 300);
            // TODO, more elegant fix? a bug was causing the viewer size to grow uncontrollably...
            if (height > 529) {
              height = 529;
            }
            // pass size to viewer
            setDimensions({ width, height });
            console.log('ResizeObserver values', height, width);
          }
        }
      );
      // observe the viewer container
      observerRef.current.observe(viewerRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        if (viewerRef.current) {
          observerRef.current.unobserve(viewerRef.current);
        }
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [viewerRef]);

  const fetchAndDisplayPublicationData = async (doi: string) => {
    // const testdoi = '10.7554/eLife.82863.sa0';
    // try {
    //   const response = await axios.get(`http://doi.org/${testdoi}`, {
    //     headers: { Accept: 'application/json' },
    //   });
    try {
      const response = await axios.get(`http://doi.org/${doi}`, {
        headers: { Accept: 'application/json' },
      });

      const data = response.data;
      console.log('fetched data: ', data);
      setPublicationData({
        data: data,
        title: data.title,
        journal: data['container-title'],
        year: data.published['date-parts'][0][0],
        url: data.URL,
      });
    } catch (error) {
      console.error('Error fetching DOI data:', error);
    }
  };

  const handleTrajectoryData = (data: TrajectoryFileInfo) => {
    setTrajectoryTitle(data.trajectoryTitle);
    setModelInfo(data.modelInfo);
    if (data.modelInfo?.doi) {
      fetchAndDisplayPublicationData(data.modelInfo.doi);
    }
  };

  const hasMetaData = (() => {
    for (const key in modelInfo) {
      if (modelInfo[key as keyof ModelInfo] !== undefined) {
        return true;
      }
    }
    return false;
  })();

  const showMetaDataPanelHandler = (value: boolean) => {
    setShowMetaDataPanel(value);
  };

  return (
    <div className="container">
      {showSidePanel && (
        <div className="side-panel">
          <SidePanel />
        </div>
      )}
      <div ref={viewerRef} className="viewer-container">
        {showMetaDataPanel && (
          <MetaDataPanel
            {...modelInfo}
            publicationData={publicationData}
            showPanel={showMetaDataPanelHandler}
          />
        )}
        <div className="viewer-header">
          <ViewerTitle
            hasMetaData={hasMetaData}
            trajectoryTitle={trajectoryTitle}
            title={modelInfo?.title}
            showPanel={showMetaDataPanelHandler}
          />
        </div>
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
      </div>
      <div className="viewer-controls">
        <CameraControls controller={props.controller} />
      </div>
    </div>
  );
}

export default ViewerWidget;
