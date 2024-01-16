import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  PlusCircleOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const Close = (
  <PlusCircleOutlined
    style={{ transform: 'rotate(45deg)', fontSize: '24px' }}
  />
);
export const CloseHover = (
  <PlusCircleFilled style={{ transform: 'rotate(45deg)', fontSize: '24px' }} />
);
export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
