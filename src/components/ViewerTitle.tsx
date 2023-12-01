import * as React from 'react';

import { Info } from './Icons';
import { ModelInfo } from '../constants';

import '../../css/viewer_title.css';

interface ViewerTitleProps extends ModelInfo {
  trajectoryTitle?: string;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  const { title, trajectoryTitle } = props;

  const hasMetaData = (): boolean => {
    for (const key in props) {
      // Check if any key other than 'title' has a value
      if (
        key !== 'title' &&
        props[key as keyof ViewerTitleProps] !== undefined
      ) {
        return true;
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
