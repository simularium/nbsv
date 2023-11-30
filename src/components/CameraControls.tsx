import * as React from 'react';
import { Button, Tooltip } from 'antd';
import { SimulariumController } from '@aics/simularium-viewer';

import { Reset, ZoomIn, ZoomOut } from './Icons';

import '../../css/camera_controls.css';

interface CameraControlsProps {
  controller: SimulariumController;
}

const TOOLTIP_COLOR = '#3B3649';

const CameraControls: React.FunctionComponent<CameraControlsProps> = (
  props: CameraControlsProps
): JSX.Element => {
  return (
    <div className="cc-container">
      <Tooltip
        placement="left"
        title="Zoom in ( &uarr; )"
        color={TOOLTIP_COLOR}
      >
        <Button
          id={'zoomin-button'}
          className="btn"
          icon={ZoomIn}
          onClick={props.controller.zoomIn}
        ></Button>
      </Tooltip>
      <Tooltip
        placement="left"
        title="Zoom out ( &darr; )"
        color={TOOLTIP_COLOR}
      >
        <Button
          id={'zoomout-button'}
          className="btn"
          icon={ZoomOut}
          onClick={props.controller.zoomOut}
        ></Button>
      </Tooltip>
      <Tooltip placement="left" title="Home view (H)" color={TOOLTIP_COLOR}>
        <Button
          id={'reset-button'}
          className="btn"
          icon={Reset}
          onClick={props.controller.resetCamera}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default CameraControls;
