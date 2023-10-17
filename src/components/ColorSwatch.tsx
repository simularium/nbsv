import * as React from 'react';

import '../../css/colorSwatch.css';

interface ColorSwatchProps {
  color: string;
}

const ColorSwatch = ({ color }: ColorSwatchProps): JSX.Element => {
  return <div className="container" style={{ backgroundColor: color }} />;
};

export default ColorSwatch;
