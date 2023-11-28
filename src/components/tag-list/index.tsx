import { CommonType } from '@/types/common';
import { Tag, TagProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

export interface TagListItemProps extends TagProps {
  value: string | number;
}

export interface IProps extends CommonType {
  [x: string]: any;

  /**
   * @description 要展示的标签数据
   */
  dataSource: TagListItemProps[] | string[];
  /**
   * @description 标签的属性
   */
  tagProps?: TagProps;
}

const TagList = (props: IProps) => {
  const { className, style, dataSource, tagProps, ...rest } = props;

  if (!dataSource) return <></>;

  return (
    <div
      className={classNames(
        'tag-list',
        'flex flex-wrap gap-6px',
        '[&_.ant-tag]:me-0',
        className,
      )}
      style={style}
      {...rest}
    >
      {props?.children ? (
        props.children || ''
      ) : (
        <>
          {typeof dataSource[0] === 'string' ||
          typeof dataSource[0] === 'number'
            ? (dataSource as (string | number)[]).map(
                (data: string | number) => (
                  <Tag key={data} {...tagProps}>
                    {data}
                  </Tag>
                ),
              )
            : (dataSource as TagListItemProps[]).map(
                ({ value, ...restProps }) => (
                  <Tag key={value} {...restProps}>
                    {value}
                  </Tag>
                ),
              )}
        </>
      )}
    </div>
  );
};

export default TagList;
