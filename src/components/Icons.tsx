import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import {
  ScaleBarIconTag,
  StepBackIconTag,
  StepForwardIconTag,
} from '../assets/svgs';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const ScaleBarIcon = ScaleBarIconTag;
export const FrameBack = StepBackIconTag;
export const FrameForward = StepForwardIconTag;
export const Pause = <PauseOutlined />;
export const Play = <CaretRightOutlined />;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
