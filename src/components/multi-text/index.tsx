import { CommonType } from '@/types/common';
import { Popover, TagProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import TagList, { TagListItemProps } from '../tag-list';

interface IProps extends CommonType {
  /**
   * @description 展示的数据
   */
  dataSource: string[] | TagListItemProps[];

  /**
   * @description 展示数量
   */
  showAmount: number;

  /**
   * @description 是否展示全部
   */
  showAll: boolean;

  tagProps?: TagProps;
}

const MultiText = (props: IProps) => {
  const {
    dataSource,
    showAmount = 5,
    showAll = false,
    tagProps,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      className={classNames('mo-multi-text flex items-center', className)}
      style={style}
      {...rest}
    >
      <TagList
        dataSource={showAll ? dataSource : dataSource.slice(0, showAmount)}
        tagProps={tagProps}
      />
      {!showAll && (
        <Popover
          content={
            <div className="w-80" style={{ maxWidth: 400, minWidth: 120 }}>
              <TagList dataSource={dataSource} tagProps={tagProps} />
            </div>
          }
        >
          <a className="text-sm ml-1.5 cursor-pointer">更多</a>
        </Popover>
      )}
    </div>
  );
};

export default MultiText;
