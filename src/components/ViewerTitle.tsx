import * as React from 'react';

import { Info } from './Icons';
import { ModelInfo } from '../constants';

import '../../css/viewer_title.css';
interface ViewerTitleProps {
  modelInfo: ModelInfo;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  const hasMetaData = (): boolean => {
    for (const key in props) {
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
        {/* TODO clicking Info icon will render meta data panel */}
        {hasMetaData() ? <div className="info-button"> {Info} </div> : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
