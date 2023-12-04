import * as React from 'react';

import { Info } from './Icons';
import { ModelInfo } from '../constants';

import '../../css/viewer_title.css';

interface ModelDisplayDataProps extends ModelInfo {
  trajectoryTitle?: string;
}

const ViewerTitle: React.FunctionComponent<ModelDisplayDataProps> = (
  props: ModelDisplayDataProps
): JSX.Element => {
  const { title, trajectoryTitle } = props;

  const hasMetaData = (): boolean => {
    for (const key in props) {
      if (key !== 'trajectoryTitle') {
        if (props[key as keyof ModelDisplayDataProps] !== undefined) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="title-container">
      <div className="title">
        {trajectoryTitle || title}
        {/* TODO clicking Info icon will render meta data panel */}
        {hasMetaData() ? <div className="info-button"> {Info} </div> : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
