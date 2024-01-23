import React from 'react';
import miniSVGDataURI from 'mini-svg-data-uri';
import miniSVGDataURI from 'mini-svg-data-uri';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import scaleBarSVG from '../../assets/scale-bar.svg';
import stepBackSVG from '../../assets/step-back.svg';
import stepForwardSVG from '../../assets/step-forward.svg';

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
export const FrameBack = createImageElementFromSVG(stepBackSVG);
export const FrameForward = createImageElementFromSVG(stepForwardSVG);
export const Pause = <PauseOutlined />;
export const Play = <CaretRightOutlined />;

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
