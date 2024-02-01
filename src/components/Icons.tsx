import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  CaretRightFilled,
  CaretDownFilled,
} from '@ant-design/icons';
import {
  HighlightStarTag,
  IndeterminateHighlightStarTag,
  NoHighlightStarTag,
  ScaleBarIconTag,
} from '../assets/svgs';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;

export const CaretRight = <CaretRightFilled />;
export const CaretDown = <CaretDownFilled />;
export const ScaleBarIcon = ScaleBarIconTag;
export const IndeterminateHighlightStar = IndeterminateHighlightStarTag;
export const HighlightStar = HighlightStarTag;
export const NoHighlightStar = NoHighlightStarTag;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
