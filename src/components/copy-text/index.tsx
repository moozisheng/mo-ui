import { CommonType } from '@/types/common';
import { useBoolean, useLockFn } from 'ahooks';
import { message } from 'antd';
import classNames from 'classnames';
import noop from 'lodash/noop';
import React from 'react';

import { CopyIcon, IconProps } from './copy-icon';
import './index.scss';
import defaultLocale from './locale';
import { copyToClipBoard } from './utils';

export interface IProps extends CommonType {
  [x: string]: any;

  /**
   * 被复制的文本
   */
  value?: string;

  /**
   * Icon props
   */
  iconProps?: IconProps;

  /**
   * 提示语国际化代码
   */
  locale?: Partial<typeof defaultLocale>;

  /**
   *
   * @param e
   * @returns
   */
  onClick?: (e: any) => void;

  /**
   * 是否Hover时显示 copy 图标
   */
  hoverShowEdit?: boolean;

  /**
   * 是否整个标签可点击
   */
  clickable?: boolean;

  /**
   * copy 图标是否显示
   */
  iconVisible?: boolean;
}

const CopyText = (props: IProps) => {
  const {
    className,
    style,
    value,
    locale,
    hoverShowEdit,
    clickable = true,
    iconProps,
    iconVisible = true,
    ...rest
  } = props;

  const [copied, { setFalse, setTrue }] = useBoolean();

  const copyHandle = useLockFn((e) => {
    props.onClick?.(e);
    return new Promise((resolve) => {
      const value =
        props.value ??
        (typeof props?.children === 'string' ? props?.children : '');
      try {
        copyToClipBoard(value);
        setTrue();
        setTimeout(() => {
          setFalse();
          resolve(null);
        }, 2000);
      } catch (e: any) {
        resolve(null);
        message.error(e.message);
      }
    });
  });

  return (
    <span
      className={classNames('copy-text-item', 'inline-flex items-center', {
        'cursor-pointer': clickable,
        'hover:c-#666': clickable,
        '[&_>.icon-wrap]:hidden': hoverShowEdit,
        '[&:hover_>.icon-wrap]:inline-flex': hoverShowEdit,
      })}
      style={style}
      onClick={clickable ? copyHandle : noop}
      {...rest}
    >
      {props?.children}
      {(iconProps?.visible ?? iconVisible) && (
        <CopyIcon
          copied={copied}
          locale={locale}
          onClick={copyHandle}
          {...iconProps}
          className="icon-wrap"
        />
      )}
    </span>
  );
};

export default CopyText;
