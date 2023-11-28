import { CommonType } from '@/types/common';
import classNames from 'classnames';
import { rest } from 'lodash';
import React from 'react';
import './index.scss';

export interface WaterMarkProps extends CommonType {
  waterMark?: string;
  scale?: number;
}

const WaterMark = (props: WaterMarkProps) => {
  const { className, style, waterMark, scale = 1, ...reset } = props;
  return (
    <div className="water-mark-container">
      <div
        className={classNames('water-mark-inner', className)}
        style={{
          fontSize: `${8 * scale}rem`,
          ...style,
        }}
        {...rest}
      >
        {waterMark}
      </div>
    </div>
  );
};

export default WaterMark;
