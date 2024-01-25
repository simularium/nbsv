import React from 'react';
import miniSVGDataURI from 'mini-svg-data-uri';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  StarOutlined,
  StarTwoTone,
  StarFilled,
  CaretRightFilled,
  CaretDownFilled,
} from '@ant-design/icons';
import scaleBarSVG from '../../assets/scale-bar.svg';

const createImageElementFromSVG = (
  svg: string,
  style?: React.CSSProperties
) => {
  const uri = miniSVGDataURI(svg);
  return <img src={uri} style={style} />;
};

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const ScaleBarIcon = createImageElementFromSVG(scaleBarSVG, {
  width: '60px',
});
export const NoHighlightStar = <StarOutlined />;
export const HighlightStar = <StarFilled />;
export const IndeterminateHighlightStar = (
  <StarTwoTone twoToneColor="#b59ff6" />
);
export const CaretRight = <CaretRightFilled />;
export const CaretDown = <CaretDownFilled />;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
