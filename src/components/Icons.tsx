import React from 'react';
import miniSVGDataURI from 'mini-svg-data-uri';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import scaleBarSVG from '../../assets/scale-bar.svg';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const FrameBack = <StepBackwardOutlined />;
export const FrameForward = <StepForwardOutlined />;
export const Pause = <PauseOutlined />;
export const Play = <CaretRightOutlined />;
export const ScaleBarIcon = (
  <img src={miniSVGDataURI(scaleBarSVG)} style={{ width: '60px' }} />
);

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
