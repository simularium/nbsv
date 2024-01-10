import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';
import PurpleArrowPointingRight from "../../src/assets/open-arrow.svg";

export const PurpleArrow = <img src={PurpleArrowPointingRight} />;
export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
  PurpleArrow,
};
