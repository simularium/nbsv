import * as React from 'react';

import { Info } from './Icons';
import '../../css/viewer_title.css';

interface ViewerTitleProps {
  title: string;
  trajectoryInfo?: string;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  return (
    <div className="title-container">
      <div className="title">
        {' '}
        {props.title}{' '}
        {props.trajectoryInfo ? (
          <div className="info-button"> {Info} </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
