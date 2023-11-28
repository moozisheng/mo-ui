import { CSSProperties } from 'react';

export type CommonType = {
  /**
   * 组件的 className 属性
   */
  className?: string;
  /**
   * 组件的 style 属性
   */
  style?: CSSProperties;
} & Record<`data-${string}`, string>;


export type IValueType<T = string> = {
  /**
   * 组件的 value 属性
   */
  value?: T;
  /**
   * 组件的默认 value
   */
  defaultValue?: T;
  /**
   * 组件的 onChange 事件
   * @param value
   */
  onChange?: (value: T, ...args: any) => void;
};

export type IFormType<T> = IValueType<T> & {
  /**
   * 组件是否禁用
   */
  disabled?: boolean;

  /**
   * 组件的大小
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * The state of the input
   */
  status?: 'error' | 'warning';
};

export type ArrayPartialValue<T> = Array<T> | T;
