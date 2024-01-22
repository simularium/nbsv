import React from 'react';
import miniSVGDataURI from 'mini-svg-data-uri';

export const createImageElementFromSVG = (
  svg: string,
  style?: React.CSSProperties
) => {
  const uri = miniSVGDataURI(svg);
  return <img src={uri} style={style} />;
};
