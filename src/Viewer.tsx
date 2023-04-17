import SimulariumViewer, {
  RenderStyle,
  SimulariumController,
} from '@aics/simularium-viewer';
import React from 'react';

import { WidgetModel } from '@jupyter-widgets/base';

export interface WidgetModelWithState extends WidgetModel {
  controller: SimulariumController;
}

export interface WidgetProps {
  controller: SimulariumController;
  height: number;
  width: number;
}

// import 'antd/dist/antd.css';
// TODO: this starts as .less and needs to be converted to .css in tsc step

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
    <SimulariumViewer
      renderStyle={RenderStyle.WEBGL2_PREFERRED}
      backgroundColor={[0, 0, 0]}
      height={props.height}
      width={props.width}
      loggerLevel="debug"
      onTimeChange={console.log}
      simulariumController={props.controller}
      onJsonDataArrived={console.log}
      showCameraControls={true}
      onTrajectoryFileInfoChanged={console.log}
      selectionStateInfo={{
        highlightedAgents: [],
        hiddenAgents: [],
      }}
      onUIDisplayDataChanged={(uidata) => console.log('new ui data, ', uidata)}
      loadInitialData={true}
      hideAllAgents={false}
      showBounds={true}
      agentColors={agentColors}
      showPaths={false}
      onError={console.log}
    />
  );
}

// function withModelContext(Component: (props: WidgetProps) => JSX.Element) {
//   return (props: WidgetProps) => (
//     <WidgetModelContext.Provider value={props.model}>
//       <Component {...props} />
//     </WidgetModelContext.Provider>
//   );
// }

export default ViewerWidget;
