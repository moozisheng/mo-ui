import { CommonType } from '@/types/common';
import { DownOutlined, LoadingOutlined, UpOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import React, { Children, ReactNode } from 'react';

import { useMoreData } from './hooks';

import './index.scss';

export * from './hooks';

export interface IProps extends CommonType {
  /**
   * @description 展示的数据
   */
  dataSource?: any[];

  /**
   * @description 按钮的加载状态
   */
  loading?: boolean;

  /**
   * @description 按钮大小
   */
  buttonSize?: ButtonProps['size'];

  /**
   * @description 展示更多按钮的属性
   */
  buttonProps?: ButtonProps;

  /**
   * @description 按钮是否保持显示
   */
  keepButton?: boolean;

  /**
   * @description 是否显示展示更多按钮
   */
  showButton?: boolean;

  /**
   * @description
   */
  align?: 'left' | 'center' | 'right';

  /**
   * @description
   */
  type?: 'normal' | 'embed' | 'text';

  /**
   * @description 设置是否默认展开
   */
  defaultExpanded?: boolean;

  /**
   * @description 设置是否展开
   */
  expanded?: boolean;

  /**
   * @description 显示更多按钮的自定义渲染
   */
  expandRender?: ({
    icon,
    trigger,
    isExpanded,
  }: {
    icon: ReactNode;
    trigger: () => void;
    isExpanded: boolean;
  }) => ReactNode;

  /**
   * @description
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * @description
   */
  children?:
    | ReactNode
    | ((expanded?: boolean, dataSource?: any[]) => ReactNode);

  /**
   * @description 默认要显示的数据
   */
  limitLength?: number;

  /**
   * @description 国际化
   */
  locale?: Partial<typeof defaultLocale>;
}

const defaultLocale = {
  more: '显示更多',
  less: '显示更少',
};

function Expand(props: IProps) {
  const {
    style,
    className,
    dataSource,
    loading = false,
    buttonSize = 'small',
    buttonProps,
    keepButton = false,
    showButton = true,
    align = 'center',
    type = 'text',
    defaultExpanded = false,
    expanded: propsExpanded,
    expandRender,
    onExpandedChange = noop,
    children,
    limitLength = 0,
    locale: propsLocale,
    ...rest
  } = props;
  const [expanded, { set: setExpanded }] = useBoolean(defaultExpanded);
  const isControlled = propsExpanded !== undefined;
  const locale = { ...defaultLocale, ...propsLocale };

  const isExpanded = isControlled ? propsExpanded : expanded;
  let hideButton = !showButton || (isExpanded && !keepButton);

  let content;
  if (isFunction(children)) {
    let newDataSource = dataSource;
    if (dataSource !== undefined) {
      const limitExceeded = dataSource.length > limitLength;
      if (limitExceeded && !isExpanded) {
        // array.slice() 返回一个新的数组，原数组不会被修改
        newDataSource = dataSource.slice(0, limitLength);
      }
      if (!limitExceeded) {
        hideButton = true;
      }
    }
    content = children(isExpanded, newDataSource);
    // children must be a JSX.Element, otherwise they will not be rendered
    // reference: https://github.com/facebook/react/issues/11888
    Children.only(content);
  } else {
    content = children;
  }

  const onClickHandle = () => {
    const newExpanded = !isExpanded;
    if (isControlled) {
      // 受控模式，是否展开由外部控制
      onExpandedChange(newExpanded);
    } else {
      // 非受控模式 是否展开由组件内部控制
      setExpanded(newExpanded);
    }
  };

  const icon = loading ? (
    <LoadingOutlined />
  ) : isExpanded ? (
    <UpOutlined className="important-ms-1" />
  ) : (
    <DownOutlined className="important-ms-1" />
  );

  return (
    <div
      style={style}
      className={classNames('expand-container', className, {
        'expand-container-open': isExpanded,
      })}
      {...rest}
    >
      <div
        className={classNames('expand-body', {
          'expand-body-open': isExpanded,
        })}
      >
        {content}
      </div>
      <div
        className={classNames(
          'expand-footer',
          `expand-footer-${type}`,
          `expand-footer-${align}`,
        )}
      >
        {!hideButton &&
          (expandRender?.({ isExpanded, trigger: onClickHandle, icon }) || (
            <Button
              className={classNames('expand-trigger', `expand-trigger-${type}`)}
              type={type === 'text' ? 'link' : 'default'}
              size={buttonSize}
              onClick={onClickHandle}
              {...buttonProps}
            >
              {isExpanded ? locale.less : locale.more}
              {icon}
            </Button>
          ))}
      </div>
    </div>
  );
}

Expand.useMoreData = useMoreData;

export default Expand;
