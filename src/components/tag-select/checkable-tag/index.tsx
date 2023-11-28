import { CommonType } from '@/types/common';
import { Tag } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './index.scss';

interface IProps extends CommonType {
  /**
   * @description 是否选中
   */
  checked: boolean;

  /**
   * @description 是否禁选
   */
  disabled: boolean;

  /**
   * 子节点
   */
  children?: ReactNode;

  /**
   * 标签大小
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * @description 标签选中后的onChange 事件
   * @param value
   * @returns
   */
  onChange: (value: boolean) => void;
}

const CustomTag = (props: IProps) => {
  const {
    className,
    style,
    checked,
    disabled,
    onChange,
    size = 'medium',
    ...rest
  } = props;

  return (
    <Tag.CheckableTag
      checked={checked}
      prefixCls="mo-tag-item"
      className={classNames(
        'me-0',
        { 'opacity-75': disabled },
        `select-${size}`,
      )}
      onChange={() => !disabled && onChange(!checked)}
      {...rest}
    >
      {props?.children}
    </Tag.CheckableTag>
  );
};

export default CustomTag;
