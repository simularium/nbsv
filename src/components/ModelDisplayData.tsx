import * as React from 'react';

import { Info } from './Icons';

import '../../css/model_display_data.css';
import { ModelInfo } from '@aics/simularium-viewer/type-declarations/simularium/types';

interface ModelDisplayDataProps extends ModelInfo {
  trajectoryTitle?: string;
}

const ModelDisplayData: React.FunctionComponent<ModelDisplayDataProps> = (
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
    <div className="mdd-container">
      {trajectoryTitle || title || '<Untitled trajectory>'}
      {hasMetaData() ? <div className="info-button"> {Info} </div> : null}
    </div>
  );
};

export default ModelDisplayData;
