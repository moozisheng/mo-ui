import { CommonType } from '@/types/common';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useBoolean, useHover } from 'ahooks';
import { Tooltip, TooltipProps } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, MouseEvent, ReactNode, useRef } from 'react';

export interface IconProps {
  /**
   * @description 设置图标的样式名
   */
  className?: string;

  /**
   * @description 图标旋转角度（IE9 无效）
   */
  rotate?: number;

  /**
   * @description 是否有旋转动画
   */
  spin?: boolean;

  /**
   * @description 设置图标的样式，例如 fontSize 和 color
   */
  style?: CSSProperties;

  /**
   * @description 仅适用双色图标。设置双色图标的主要颜色
   */
  twoToneColor?: string;
}

export type HelpTipProps = CommonType &
  TooltipProps & {
    /**
     * @description 提示信息
     */
    help?: ReactNode;

    /**
     * @description 自定义图标
     */
    icon?: ReactNode;

    /**
     * @description 是否鼠标悬停在图标上时显示提示信息
     */
    iconOnly?: boolean;

    /**
     * @description 图标的属性
     */
    iconProps?: IconProps;

    /**
     * @description
     * @param e
     * @returns
     */
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  };

const HelpTip = (props: HelpTipProps) => {
  const {
    className,
    style,
    help,
    icon,
    iconOnly,
    onClick,
    iconProps: { className: iconClassName, ...iconRest } = { className: '' },
    ...rest
  } = props;

  const ref = useRef<any>();
  const isHovering = useHover(ref);

  const [visible, { toggle: setVisible }] = useBoolean(false);

  return (
    <span
      className={classnames(
        'help-tip',
        'inline-flex',
        'items-center',
        { 'cursor-help': !iconOnly && help },
        className,
      )}
      ref={ref}
      style={style}
      onClick={onClick}
    >
      {props?.children ?? ''}
      {help ? (
        <Tooltip
          {...rest}
          title={help}
          open={(!iconOnly && isHovering) || visible}
          onOpenChange={setVisible}
        >
          {icon ?? (
            <InfoCircleOutlined
              className={classnames(
                'text-inherit',
                'opacity-75',
                'ml-0.8',
                'mr-0.2',
                'flex',
                'cursor-help',
                iconClassName,
              )}
              {...iconRest}
            />
          )}
        </Tooltip>
      ) : null}
    </span>
  );
};

export default HelpTip;
