import { Popover } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { CommonType } from '../../types/common';
import SafeHtml from '../safe-html';

export interface TextEllipsisProps extends CommonType {
  /**
   * 显示的文本
   */
  text: string;

  /**
   * 容器宽度
   */
  width?: number;

  /**
   * 显示的行数
   */
  lineClamp?: number;

  /**
   * 是否显示气泡卡片
   */
  popOverVisible?: boolean;
}

const TextEllipsis = (props: TextEllipsisProps) => {
  const {
    className,
    style,
    text,
    width = 120,
    lineClamp = 1,
    popOverVisible = true,
    ...rest
  } = props;
  return (
    <Popover
      content={
        popOverVisible && (
          <div className="w-80" style={{ maxWidth: 400, minWidth: 120 }}>
            <SafeHtml html={text} />
          </div>
        )
      }
    >
      <div
        className={classNames('mo-text-ellipsis', {
          'line-clamp-1': lineClamp === 1,
          'line-clamp-2': lineClamp === 2,
          'line-clamp-3': lineClamp === 3,
          'line-clamp-4': lineClamp === 4,
          'line-clamp-5': lineClamp === 5,
          'line-clamp-6': lineClamp === 6,
        })}
        style={{ width, ...style }}
        {...rest}
      >
        <SafeHtml html={text} />
      </div>
    </Popover>
  );
};

export default TextEllipsis;
