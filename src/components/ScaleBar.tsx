import * as React from 'react';

import { ScaleBarIcon } from './Icons';

import '../../css/scale_bar.css';

interface ScaleBarProps {
  label: string;
}

const ScaleBar = (scaleBarProps: ScaleBarProps): JSX.Element => {
  const { label } = scaleBarProps;
  const scaleBarNode = label ? (
    <div className="scale-bar-container">
      <div className="text">{label}</div>
      <div className="icon">{ScaleBarIcon}</div>
    </div>
  ) : (
    <div />
  );

  return scaleBarNode;
};
export default ScaleBar;
