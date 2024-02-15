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
  FrameBackIconTag,
  FrameForwardIconTag,
} from '../assets/svgs';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const ScaleBarIcon = ScaleBarIconTag;
export const FrameBack = FrameBackIconTag;
export const FrameForward = FrameForwardIconTag;
export const Pause = <PauseOutlined />;
export const Play = <CaretRightOutlined />;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
