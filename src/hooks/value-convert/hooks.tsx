import { useControllableValue, useCreation, useMemoizedFn } from 'ahooks';
import type { Props } from 'ahooks/lib/useControllableValue';
import type { ComponentType } from 'react';
import React from 'react';
import type { FormComponentStandardProps, ValueConvertOptions } from './types';

export function useValueConvert<FromType = any, ConvertedType = any>(
  props: Props,
  options: ValueConvertOptions<FromType, ConvertedType>,
): [ConvertedType, (value: ConvertedType) => void] {
  const {
    defaultValue,
    defaultValuePropName,
    trigger,
    valuePropName,
    convert,
    reverse,
  } = options;

  // 创建受控的 state
  const [originState, setOriginState] = useControllableValue<FromType>(props, {
    defaultValue,
    defaultValuePropName,
    valuePropName,
    trigger,
  });

  // 缓存值
  // useCreation 是 useMemo 或 useRef 的替代品
  const value = useCreation(() => {
    return convert(originState);
  }, [originState]);

  // 缓存函数
  const setConvertValue = useMemoizedFn((value, ...rest) => {
    const newValue = reverse(value, ...rest);
    setOriginState(newValue, ...rest);
  });

  return [value, setConvertValue];
}

export function mapValueConvert<ConvertedType = any, FromType = any>(
  Component: ComponentType<FormComponentStandardProps<FromType>> | any,
  options: ValueConvertOptions<FromType, ConvertedType>,
): ComponentType<FormComponentStandardProps<FromType>> {
  return (props) => {
    const [value, setConvertValue] = useValueConvert(props, options);
    return <Component {...props} value={value} onChange={setConvertValue} />;
  };
}
