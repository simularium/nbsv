import * as React from 'react';

import '../../css/cameraControls.css';
import { Button, Tooltip } from 'antd';

interface CameraControlsProps {
  title: string;
}

const TOOLTIP_COLOR = '#3B3649';

const CameraControls: React.FunctionComponent<CameraControlsProps> = (
  props: CameraControlsProps
): JSX.Element => {
  console.log('CameraControls log', props.title);
  return (
    <div className="cc-container">
      <div className="zoomButtons">
        <Tooltip
          placement="left"
          title="Zoom in ( &uarr; )"
          color={TOOLTIP_COLOR}
        >
          <Button
            className="btn"
            //   icon={Icons.ZoomIn}
            //   onClick={zoomIn}
          >
            {' '}
            I{' '}
          </Button>
        </Tooltip>
        <Tooltip
          placement="left"
          title="Zoom out ( &darr; )"
          color={TOOLTIP_COLOR}
        >
          <Button
            className="btn"
            // icon={Icons.ZoomOut}
            // onClick={zoomOut}
          >
            {' '}
            O{' '}
          </Button>
        </Tooltip>
      </div>
      <Tooltip placement="left" title="Home view (H)" color={TOOLTIP_COLOR}>
        <Button
          className="btn"
          //   icon={Icons.Reset}
          //   onClick={resetCamera}
        >
          {' '}
          H{' '}
        </Button>
      </Tooltip>
    </div>
  );
};

export default CameraControls;
