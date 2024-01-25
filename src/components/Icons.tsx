import React from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
  InfoCircleFilled,
  CaretRightFilled,
  CaretDownFilled,
} from '@ant-design/icons';
import { ScaleBarIconTag } from '../assets/svgs';

export const Reset = <HomeOutlined />;
export const ZoomIn = <PlusOutlined />;
export const ZoomOut = <MinusOutlined />;
export const Info = <InfoCircleFilled />;
export const CaretRight = <CaretRightFilled />;
export const CaretDown = <CaretDownFilled />;
export const ScaleBarIcon = ScaleBarIconTag;
export const IndeterminateHighlightStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 1080 1080"
  >
    <path
      transform="scale(1,-1) translate(0, -1080)"
      d="M870.748-64l-334.367 174.15-327.401-174.15 62.694 369.197-271.673 264.707 369.197 55.728 167.184 334.367 167.184-334.367 369.197-55.728-271.673-264.707 69.66-369.197zM146.286 521.143l195.048-188.082-48.762-264.707 236.844 125.388 243.81-125.388-41.796 264.707 195.048 188.082-264.707 34.83-125.388 243.81-118.422-243.81-271.673-34.83zM397.061 479.347h278.639v-139.32h-278.639v139.32z"
    ></path>
  </svg>
);
export const HighlightStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 1080 1080"
  >
    <path
      transform="scale(1,-1) translate(0, -1080)"
      d="M540.22 113.386l-338.646-177.386 64.504 370.898-266.079 266.079 370.898 48.378 169.323 338.646 161.26-338.646 370.898-48.378-266.079-266.079 64.504-370.898z"
    ></path>
  </svg>
);
export const NoHighlightStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 1080 1080"
  >
    <path
      transform="scale(1,-1) translate(0, -1080)"
      d="M870.748-64l-334.367 174.15-327.401-174.15 62.694 369.197-271.673 264.707 369.197 55.728 167.184 334.367 167.184-334.367 369.197-55.728-271.673-264.707 69.66-369.197zM146.286 521.143l195.048-188.082-48.762-264.707 236.844 125.388 243.81-125.388-41.796 264.707 195.048 188.082-264.707 34.83-125.388 243.81-118.422-243.81-271.673-34.83z"
    ></path>
  </svg>
);

export default {
  Reset,
  ZoomIn,
  ZoomOut,
};
