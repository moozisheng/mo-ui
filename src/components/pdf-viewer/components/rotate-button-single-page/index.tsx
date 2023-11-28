import { CommonType } from '@/types/common';
import {
  MinimalButton,
  Position,
  RotateDirection,
  Tooltip,
} from '@react-pdf-viewer/core';
import {
  RotateBackwardIcon,
  RotateForwardIcon,
} from '@react-pdf-viewer/rotate';
import classNames from 'classnames';
import * as React from 'react';
import './index.scss';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

export interface RotateButtonSinglePageProps extends CommonType {
  onRotatePage: (direction: RotateDirection) => void;
  rotateForwardIcon?: React.ReactNode;
  rotateForwardTooltip?: string | React.ReactNode;
  rotateBackwardIcon?: React.ReactNode;
  rotateBackwardTooltip?: string | React.ReactNode;
  toolTipOffset?: typeof TOOLTIP_OFFSET;
}

const RotateButtonSinglePage = (props: RotateButtonSinglePageProps) => {
  const {
    onRotatePage,
    rotateBackwardIcon,
    rotateForwardTooltip,
    rotateForwardIcon,
    rotateBackwardTooltip,
    toolTipOffset,
    className,
    style,
  } = props;

  return (
    <div
      className={classNames('rotate-button-container', className)}
      style={style}
    >
      <div className={classNames('rotate-button-inner')}>
        <Tooltip
          position={Position.BottomCenter}
          target={
            <MinimalButton
              onClick={() => onRotatePage(RotateDirection.Forward)}
            >
              {rotateForwardIcon ?? <RotateForwardIcon />}
            </MinimalButton>
          }
          content={() => rotateForwardTooltip ?? '顺时针旋转'}
          offset={toolTipOffset ?? TOOLTIP_OFFSET}
        />
        <Tooltip
          position={Position.BottomCenter}
          target={
            <MinimalButton
              onClick={() => onRotatePage(RotateDirection.Backward)}
            >
              {rotateBackwardIcon ?? <RotateBackwardIcon />}
            </MinimalButton>
          }
          content={() => rotateBackwardTooltip ?? '逆时针旋转'}
          offset={toolTipOffset ?? TOOLTIP_OFFSET}
        />
      </div>
    </div>
  );
};

export default RotateButtonSinglePage;
