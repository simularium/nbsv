import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';
import { ScaleBarIconTag } from '../assets/svgs';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const ScaleBarIcon = ScaleBarIconTag;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
