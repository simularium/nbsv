import React from 'react';
import {
  PauseOutlined,
  CaretRightOutlined,
  ImportOutlined,
  LoadingOutlined,
  DownOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  ShareAltOutlined,
  WarningOutlined,
  LinkOutlined,
  DownloadOutlined,
  RetweetOutlined,
  InfoOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';

// import PurpleArrowPointingRight from '../../assets/open-arrow.svg';
// import AicsLogoWhite from '../../assets/AICS-logo-full.png';
// import ClockwiseArrow from '../../assets/step-forward.svg';
// import CounterClockwiseArrow from '../../assets/step-back.svg';
// import { ReactComponent as CounterClockwiseArrow } from '../../assets/step-back.svg';

// import Beta from '../../assets/beta.svg';

export const Loading = <LoadingOutlined style={{ fontSize: 40 }} spin />;
export const Play = <CaretRightOutlined />;
export const Pause = <PauseOutlined />;
export const UploadFile = <ImportOutlined />;
export const DownArrow = <DownOutlined />;
export const CaretRight = <CaretRightOutlined />;
export const GoBack = <ArrowLeftOutlined />;
export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Share = <ShareAltOutlined />;
export const Warn = <WarningOutlined />;
export const Link = <LinkOutlined />;
export const Download = <DownloadOutlined size={32} />;
export const LoopOutlined = <RetweetOutlined />;
export const Info = <InfoOutlined />;
export const Star = <StarOutlined style={{ color: '#d3d3d3' }} />;
export const StarSolid = <StarFilled style={{ color: '#d3d3d3' }} />;

// export const PurpleArrow = <img src={PurpleArrowPointingRight} />;
// export const AicsLogo = <img src={AicsLogoWhite} style={{ width: '140px' }} />;
// export const StepForward = <ClockwiseArrow />;
// export const StepBack = <CounterClockwiseArrow />;
// export const StepBack = <img src="../../assets/step-back.svg" />;
export const SimpleSVG = () => (
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
  </svg>
);
// export const BetaTag = <img src={Beta} style={{ width: '42px' }} />;

export default {
  // StepBack,
  Play,
  Pause,
  // StepForward,
  UploadFile,
  Loading,
  DownArrow,
  CaretRight,
  ArrowLeftOutlined,
  GoBack,
  // PurpleArrow,
  // AicsLogo,
  Reset,
  ZoomIn,
  ZoomOut,
  Share,
  Warn,
  // BetaTag,
  Link,
  Download,
  LoopOutlined,
  Info,
  Star,
  StarSolid,
};
