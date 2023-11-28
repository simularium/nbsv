import * as React from 'react';

import { Info } from './Icons';
import '../../css/viewer_title.css';
import { ModelInfo } from '../constants';

interface ViewerTitleProps {
  modelInfo: ModelInfo;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  const hasMetaData = (): boolean => {
    for (const key in props.modelInfo) {
      if (
        key !== 'title' &&
        props.modelInfo[key as keyof ModelInfo] !== undefined
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="title-container">
      <div className="title">
        {props.modelInfo.title}
        {hasMetaData() ? <div className="info-button"> {Info} </div> : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
