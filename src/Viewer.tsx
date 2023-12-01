import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
} from '@aics/simularium-viewer';
import React, { useState } from 'react';

import { WidgetModel } from '@jupyter-widgets/base';
import CameraControls from './components/CameraControls';
import ViewerTitle from './components/ViewerTitle';
import { ModelInfo, agentColors } from './constants';

import '../css/viewer.css';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface WidgetProps {
  controller: SimulariumController;
  height: number;
  width: number;
}

function ViewerWidget(props: WidgetProps): JSX.Element {
  const [modelInfo, setModelInfo] = useState<ModelInfo>({});

  const handleTrajectoryData = (data: any) => {
    setModelInfo(data.modelInfo);
  };

  return (
    <div>
      <ViewerTitle {...modelInfo} />
      <div className="viewer-container">
        <SimulariumViewer
          renderStyle={RenderStyle.WEBGL2_PREFERRED}
          backgroundColor={[0, 0, 0]}
          height={props.height}
          width={props.width}
          loggerLevel="off"
          onTimeChange={console.log}
          simulariumController={props.controller}
          onJsonDataArrived={console.log}
          showCameraControls={false}
          onTrajectoryFileInfoChanged={handleTrajectoryData}
          selectionStateInfo={{
            highlightedAgents: [],
            hiddenAgents: [],
            colorChanges: [],
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
      <CameraControls controller={props.controller} />
    </div>
  );
}

export default ViewerWidget;
