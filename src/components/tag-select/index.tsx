import { CommonType } from '@/types/common';
import { useControllableValue } from 'ahooks';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Tag from './checkable-tag';

export interface IOption<T = string | number> extends CommonType {
  label: ReactNode;
  value: T;
  tip?: ReactNode | (() => ReactNode);
}

export type Primitive = string | number | any;
export type ValueType = Primitive | Primitive[];

export interface IProps extends CommonType {
  /**
   * @description 数据化配置选项内容
   */
  options?: IOption<Primitive>[];

  /**
   * @description 指定当前选中的标签，多选时为一个数组。
   */
  value?: ValueType;

  /**
   * @description 指定默认选中的标签
   */
  defaultValue?: ValueType;

  /**
   * @description onChange 事件
   * @param value
   * @returns
   */
  onChange?: (value?: string | number | Array<string | number>) => void;

  /**
   * @description 设置标签的模式是多选还是单选
   */
  mode?: 'single' | 'multiple';

  /**
   * @description 标签大小
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * @description 是否显示【全部】这个选项
   */
  hasAll?: boolean;

  /**
   * @description 是否禁选
   */
  disabled?: boolean;

  /**
   * @description 单选模式时是否禁止选择
   */
  canUnselect?: boolean;

  /**
   * 国际化语言
   */
  locale?: { all: string };
}

const TagSelect = (props: IProps) => {
  const {
    className,
    style,
    size,
    disabled,
    mode = 'single',
    hasAll = true,
    canUnselect = true,
    locale = { all: '全部' },
  } = props;

  let { options = [] } = props;

  const [value, onChange] = useControllableValue(props);

  const isMultiple = mode === 'multiple';

  // 选中所有
  if (!isMultiple && hasAll) {
    options = [{ label: locale.all, value: undefined! }, ...options];
  }

  const isChecked = (val: Primitive) => {
    return !isMultiple
      ? (value as Primitive) === val // 单选
      : (value as Primitive[])?.includes(val); // 多选
  };

  const onChangeHandle = (val: Primitive) => (checked: boolean) => {
    if (disabled) {
      return;
    }

    if (isMultiple) {
      // 多选
      const newValue = [...((value as Primitive[]) || [])];
      if (checked) {
        newValue.push(val);
        onChange(newValue);
      } else {
        const idx = newValue.findIndex((item) => item === val);
        if (idx > -1) {
          newValue.splice(idx, 1);
        }
        onChange(newValue);
      }
    } else {
      // 单选
      if (checked) {
        onChange(val);
      } else if (canUnselect) {
        onChange(undefined);
      }
    }
  };

  return (
    <div
      className={classNames(
        'tag-select-container flex items-center h-full gap-8px',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;

        const tag = (
          <Tag
            className={classNames({
              'opacity-70': selected && disabled,
            })}
            key={option.value}
            disabled={disabled! && !selected}
            size={size!}
            checked={isChecked(option.value)}
            onChange={onChangeHandle(option.value)}
          >
            {option.label}
          </Tag>
        );

        return !!option.tip ? (
          <Tooltip
            placement="top"
            key={option.value}
            trigger="hover"
            title={option.tip}
          >
            {tag}
          </Tooltip>
        ) : (
          tag
        );
      })}
    </div>
  );
};

export default TagSelect;
