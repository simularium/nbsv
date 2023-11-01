import * as React from 'react';

import '../../css/viewerTitle.css';
import { Info } from './Icons';

interface ViewerTitleProps {
  title: string;
  trajectoryInfo?: string;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  const renderInfoCard = () => <div> INFO CARD </div>;

  return (
    <div className="title-container">
      <div className="title">
        {' '}
        {props.title}{' '}
        {props.trajectoryInfo ? (
          <div className="info-button" onClick={renderInfoCard}>
            {' '}
            {Info}{' '}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
