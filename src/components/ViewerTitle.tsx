import * as React from 'react';

import { Info } from './Icons';
import '../../css/viewer_title.css';
import { ModelInfo } from '../constants';

interface ViewerTitleProps {
  modelInfo: ModelInfo;
}

const hasMetaData = (modelInfo: ModelInfo): boolean => {
  for (const key in modelInfo) {
    if (
      Object.prototype.hasOwnProperty.call(modelInfo, key) &&
      key !== 'title' &&
      modelInfo[key as keyof ModelInfo] !== undefined
    ) {
      return true;
    }
  }
  return false;
};

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  return (
    <div className="title-container">
      <div className="title">
        {props.modelInfo.title}
        {hasMetaData(props.modelInfo) ? (
          <div className="info-button"> {Info} </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
