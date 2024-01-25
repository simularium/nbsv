import React from 'react';
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

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
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
