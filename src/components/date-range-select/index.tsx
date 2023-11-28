import { mapValueConvert, useValueConvert } from '@/hooks/value-convert/hooks';
import { CommonType } from '@/types/common';
import { useCreation, useMemoizedFn } from 'ahooks';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { RangePickerBaseProps } from 'antd/es/date-picker/generatePicker';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { useMemo, useRef, useState } from 'react';
import _TagSelect, { IProps as ITagSelectProps } from '../tag-select';
import { defaultDataSource, defaultLocale } from './constants';
import { flatValue, unflatValue } from './utils';

export interface IProps
  extends CommonType,
    Omit<ITagSelectProps, 'locale'>,
    Omit<RangePickerProps, keyof ITagSelectProps> {
  /**
   * @description 是否显示 自定义 选择项
   */
  hasCustom?: boolean;

  /**
   * @description 是否一直显示 自定义 选择项
   */
  alwaysShowCustom?: boolean;

  /**
   * 标签是否可选择
   */
  disabled?: boolean;

  /**
   * DatePicker 组件的属性
   */
  pickerProps?: Partial<RangePickerBaseProps<any>>;

  /**
   * @description Tag 组件的属性
   */
  tagProps?: Partial<ITagSelectProps>;

  /**
   * @description
   */
  canUnSelect?: boolean;

  /**
   * 国际化
   */
  locale?: typeof defaultLocale;

  /**
   * 选择不超过 n 天的范围
   */
  disabledSelectedDate: number;
}

const TagSelect = mapValueConvert<string | null, [Dayjs, Dayjs] | null>(
  _TagSelect,
  {
    convert(v) {
      return flatValue(v);
    },
    reverse(v) {
      return unflatValue(v) as [Dayjs, Dayjs] | null;
    },
  },
);

const DateRangeSelect = (props: IProps) => {
  const {
    className,
    options,
    disabled,
    hasCustom = true,
    alwaysShowCustom = false,
    pickerProps,
    tagProps,
    canUnSelect,
    locale = defaultLocale,
    disabledSelectedDate,
    ...rest
  } = props;

  const rangePickerRef = useRef(undefined);

  // 自定义的日期范围
  const [customValue, setCustomValue] = useState<[Dayjs, Dayjs] | null>();
  // 是否是自定义的
  const [customized, setCustomized] = useState(false);

  const [value, onChange] = useValueConvert<
    [number, number] | null,
    [Dayjs, Dayjs] | null
  >(props, {
    // 转换
    convert(v) {
      if (!v) return null;
      return v?.map((item) => dayjs(item)) as [Dayjs, Dayjs];
    },
    // 反向转换
    reverse(v) {
      return (v?.map((item) => item?.valueOf()) as [number, number]) ?? null;
    },
  });

  // convert value to string
  const selectedValue = !customized ? value : null;

  //
  const selectDataSource = useMemo(() => {
    const result =
      (options === undefined ? defaultDataSource(locale!) : options) || [];
    return result.map((item) => {
      return {
        ...item,
        value: flatValue(item.value),
      };
    });
  }, [options, locale]);

  // 被选中的日期范围
  const selectedItem = selectDataSource.find((item) => {
    return item.value === flatValue(selectedValue);
  });

  // 显示 DatePicker 的情况
  // 1. hasCustom 属性为true 且 alwaysShowCustom 为true 时显示 DatePicker
  // 2. uncontrolled and custom is on
  // 3. controlled and no selected item in data source
  const isShowCustomPicker = useCreation(() => {
    let showCustomPicker;
    if (hasCustom && alwaysShowCustom) {
      return true;
    } else if (!value) {
      showCustomPicker = customized;
    } else {
      showCustomPicker = !selectedItem;
    }
    return showCustomPicker;
  }, [hasCustom, alwaysShowCustom, customized, selectedItem]);

  const tagOnChangeHandle = useMemoizedFn((val) => {
    // 更新 value 的值
    onChange(val);

    // clean customized
    setCustomized(false);
    setCustomValue(null);

    // // 移除 class
    // const rangePickerDom =
    //   document.getElementsByClassName('custom-rangePicker');
    // const classList = (rangePickerDom?.[0] as HTMLElement).classList;
    // if (Array.from(classList).includes('ant-picker-focused')) {
    //   classList.remove('ant-picker-focused');
    // }
  });

  /**
   * 自定义选项的 onChange 事件处理函数
   * 自定义选项的 onChange 事件触发时，说明是要自定义时间范围
   * 因此需要将 customized 设置为 true，同时需要将 customValue 的值设置为当前 已经选中的value 的值
   * 自定义选项tab标签的 value 值是 true
   */
  const customTagOnChangeHandle = useMemoizedFn((val) => {
    // 将 customValue 的值设置为当前 已经选中的value 的值
    setCustomValue(value);
    // 将 customized 设置为 true
    setCustomized(!!val);
  });

  /**
   * DatePicker 的 onOk 事件处理函数
   */
  const onOkHandle = useMemoizedFn((val) => {
    // 更新 customValue
    setCustomValue(val);
    onChange(val);
  });

  /**
   * DatePicker 的 onChange 事件处理函数
   */
  const onChangeHandle = useMemoizedFn((val) => {
    // 清空 customValue
    setCustomValue(val);

    // 更新 value
    onChange(val);
  });

  /**
   * DatePicker 的 onClick 事件处理函数
   *  DatePicker 的 onClick 事件触发时，说明是自定义时间范围，
   * 需要将 customized 设置为 true，表明是自定义选择时间
   * 同时需要设置 customValue 的值
   */
  const pickerClickHandle = useMemoizedFn((val) => {
    if (!customized) {
      // 设置 customValue
      setCustomValue(value);
      // 将 customized 设置为 true
      setCustomized(true);
    }
  });

  const pickerOnOpenOnChange = (open: boolean) => {
    if (!open) {
      if (rangePickerRef.current) {
        // const rangePickerDom =
        //   document.getElementsByClassName('custom-rangePicker');
        // (rangePickerDom?.[0] as HTMLElement).classList.remove(
        //   'ant-picker-focused',
        // );
        // (rangePickerRef.current as any)?.blur();
      }
    }
  };

  const disabledDate = (current: Dayjs) => {
    if (!customValue) {
      return false;
    }
    const tooLate =
      customValue[0] &&
      current.diff(customValue[0], 'days') >= disabledSelectedDate;
    const tooEarly =
      customValue[1] &&
      customValue[1].diff(current, 'days') >= disabledSelectedDate;
    return !!tooEarly || !!tooLate;
  };

  return (
    <div
      className={classNames(
        'date-range-select-container',
        'flex',
        'items-center',
        'gap-8px',
        className,
      )}
    >
      <TagSelect
        disabled={disabled}
        hasAll={false}
        options={selectDataSource}
        value={selectedValue}
        onChange={tagOnChangeHandle}
        canUnselect={canUnSelect}
      />
      {hasCustom && (
        <_TagSelect
          disabled={disabled}
          hasAll={false}
          options={[
            {
              label: locale?.custom,
              value: true,
            },
          ]}
          value={customized}
          onChange={customTagOnChangeHandle}
          canUnselect={canUnSelect}
          {...tagProps}
        />
      )}
      {isShowCustomPicker && (
        <>
          <DatePicker.RangePicker
            className="custom-rangePicker"
            ref={rangePickerRef}
            disabled={disabled || !customized}
            value={customized ? customValue : selectedValue}
            onClick={pickerClickHandle}
            onOk={onOkHandle}
            onChange={onChangeHandle}
            onOpenChange={pickerOnOpenOnChange}
            disabledDate={disabledSelectedDate ? disabledDate : null}
            changeOnBlur={disabledSelectedDate ? true : false}
            {...rest}
            {...(pickerProps as any)}
          />
        </>
      )}
    </div>
  );
};

export default DateRangeSelect;
