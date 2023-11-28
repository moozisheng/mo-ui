import { Options, Props, StandardProps } from 'ahooks/lib/useControllableValue';

export type ValueConvertOptions<FromType = any, NextType = any> = {
  /**
   * 反向转换值
   * @param value
   * @param rest
   * @returns
   */
  reverse: (value: NextType, ...rest: any[]) => FromType;
  /**
   * 将当前格式的值转换为目标格式的值
   * @param value
   * @returns
   */
  convert: (value: FromType) => NextType;

} & Options<FromType>;

export type FormComponentStandardProps<T> = Props & Partial<StandardProps<T>>;
