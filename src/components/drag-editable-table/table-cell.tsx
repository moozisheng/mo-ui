import { useHover, useMemoizedFn } from 'ahooks';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  RadioChangeEvent,
  Select,
  Slider,
  Switch,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import React from 'react';
import TagList from '../tag-list';
import TextEllipsis from '../text-ellipsis';

export type FormElement =
  | 'input'
  | 'inputNumber'
  | 'textArea'
  // | 'radio'
  | 'radio.group'
  // | 'checkbox'
  | 'checkbox.group'
  | 'select'
  | 'slider'
  | 'switch'
  | 'mentions'
  // | 'timePicker'
  // | 'timePicker.rangePicker'
  | 'datePicker'
  | 'datePicker.rangePicker';
enum FormElementEnum {
  INPUT = 'input',
  INPUTNUMBER = 'inputNumber',
  TEXTAREA = 'textArea',
  // RADIO = 'radio',
  RADIO_GROUP = 'radio.group',
  SELECT = 'select',
  SLIDER = 'slider',
  SWITCH = 'switch',
  // CHECKBOX = 'checkbox',
  CHECKBOX_GROUP = 'checkbox.group',
  MENTIONS = 'mentions',
  // TIMEPICKER = 'timePicker',
  // TIMEPICKER_RANGEPICKER = 'timePicker.rangePicker',
  DATEPICKER = 'datePicker',
  DATEPICKER_RANGEPICKER = 'datePicker.rangePicker',
}

export interface EditTableItemProps {
  /**
   * @description 数据的唯一标识，key字段必传
   */
  key: string;

  [propKey: string]: any;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 当前列是否允许编辑
   */
  editing: boolean;

  /**
   * @description 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string;

  /**
   * @description 表格列头显示文字
   */
  title: any;

  /**
   * @description 表单类型
   */
  valueType: FormElement;

  record: EditTableItemProps;

  index: number;
  children: React.ReactNode;

  /**
   * @description Input 输入框的 blur 事件
   * @param e
   * @returns
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;

  /**
   * @description 表单的 onChange 事件
   * @param value
   * @returns
   */
  onChange?: (value: any) => void;

  /**
   * @description Ant Design 表单项 Form.Item 的属性
   */
  formItemProps: { [propsKey: string]: any };

  /**
   * @description  Ant Design 表单元素的属性
   */
  formElementProps: { [propsKey: string]: any };
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  valueType,
  record,
  index,
  children,
  onChange,
  onBlur,
  formItemProps,
  formElementProps,
  ...restProps
}) => {
  const id = dataIndex + '_' + record?.key;

  const isHovering = useHover(
    () => document.getElementsByClassName(id)?.[0] as any,
    {},
  );

  const format = formElementProps?.format ?? 'YYYY-MM-DD HH:mm:ss';
  const emptyStr = '--';

  const handleMap = {
    inputOnBlurHandle: useMemoizedFn(
      (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur?.(e);
      },
    ),

    inputOnChangeHandle: useMemoizedFn(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
    ),

    inputNumberOnChangeHandle: useMemoizedFn(
      (value: number | string | null) => {
        onChange?.(value);
      },
    ),

    textareaOnChangeHandle: useMemoizedFn(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
      },
    ),

    selectOnChangeHandle: useMemoizedFn((value: any) => {
      onChange?.(value);
    }),

    switchOnChangeHandle: useMemoizedFn((checked: boolean) => {
      onChange?.(checked);
    }),

    radioOnChangeHandle: useMemoizedFn((e: RadioChangeEvent) => {
      onChange?.(e.target.value);
    }),

    checkboxOnChangeHandle: useMemoizedFn((e: CheckboxChangeEvent) => {
      onChange?.(e.target.value);
    }),

    checkboxGroupOnChangeHandle: useMemoizedFn(
      (checkedValue: CheckboxValueType[]) => {
        onChange?.(checkedValue);
      },
    ),

    sliderOnChangeHandle: useMemoizedFn((value: number) => {
      onChange?.(value);
    }),

    mentionsOnChangeHandle: useMemoizedFn((text: string) => {
      onChange?.(text);
    }),

    timePickerOnChangeHandle: useMemoizedFn(
      (value: dayjs.Dayjs | null, dateString: string) => {
        onChange?.(value);
      },
    ),

    timePickerRangePickerOnChangeHandle: useMemoizedFn(
      (values: any, formatString: [string, string]) => {
        onChange?.(values);
      },
    ),

    datePickerOnChangeHandle: useMemoizedFn(
      (date: dayjs.Dayjs | null, dateString: string) => {
        onChange?.(date);
      },
    ),

    datePickerRangePickerOnChangeHandle: useMemoizedFn(
      (dates: any, dateStrings: [string, string]) => {
        onChange?.(dates);
      },
    ),
  };

  const genNode = (nodeType: FormElement) => {
    switch (nodeType) {
      case FormElementEnum.INPUT:
        return (
          <Input
            allowClear={isHovering}
            className={id}
            style={{ minWidth: 140 }}
            onBlur={handleMap.inputOnBlurHandle}
            onChange={handleMap.inputOnChangeHandle}
            {...formElementProps}
          />
        );
      case FormElementEnum.INPUTNUMBER:
        return (
          <InputNumber
            {...formElementProps}
            onChange={handleMap.inputNumberOnChangeHandle}
          />
        );
      case FormElementEnum.TEXTAREA:
        return (
          <Input.TextArea
            style={{ minWidth: 120 }}
            autoSize={{ minRows: 2, maxRows: 6 }}
            {...formElementProps}
            onChange={handleMap.textareaOnChangeHandle}
          />
        );
      case FormElementEnum.SELECT:
        return (
          <Select
            {...formElementProps}
            onChange={handleMap.selectOnChangeHandle}
          />
        );
      case FormElementEnum.SWITCH:
        return (
          <Switch
            {...formElementProps}
            onChange={handleMap.switchOnChangeHandle}
          />
        );
      // case FormElementEnum.RADIO:
      //   return (
      //     <Radio
      //       {...formElementProps}
      //       onChange={handleMap.radioOnChangeHandle}
      //     />
      //   );
      case FormElementEnum.RADIO_GROUP:
        return (
          <Radio.Group
            {...formElementProps}
            onChange={handleMap.radioOnChangeHandle}
          />
        );
      // case FormElementEnum.CHECKBOX:
      //   return (
      //     <Checkbox
      //       {...formElementProps}
      //       onChange={handleMap.checkboxOnChangeHandle}
      //     />
      //   );
      case FormElementEnum.CHECKBOX_GROUP:
        return (
          <Checkbox.Group
            {...formElementProps}
            onChange={handleMap.checkboxGroupOnChangeHandle}
          />
        );
      case FormElementEnum.SLIDER:
        return (
          <Slider
            style={{ minWidth: 120 }}
            {...formElementProps}
            onChange={handleMap.sliderOnChangeHandle}
          />
        );
      case FormElementEnum.MENTIONS:
        return (
          <Mentions
            {...formElementProps}
            onChange={handleMap.mentionsOnChangeHandle}
          />
        );
      // case FormElementEnum.TIMEPICKER:
      //   return (
      //     <TimePicker
      //       style={{ minWidth: 180 }}
      //       {...formElementProps}
      //       onChange={handleMap.timePickerOnChangeHandle}
      //     />
      //   );

      // case FormElementEnum.TIMEPICKER_RANGEPICKER:
      //   return (
      //     <TimePicker.RangePicker
      //       style={{ minWidth: 240 }}
      //       {...formElementProps}
      //       onChange={handleMap.timePickerRangePickerOnChangeHandle}
      //     />
      //   );
      case FormElementEnum.DATEPICKER:
        return (
          <DatePicker
            style={{ minWidth: 180 }}
            {...formElementProps}
            onChange={handleMap.datePickerOnChangeHandle}
          />
        );
      case FormElementEnum.DATEPICKER_RANGEPICKER:
        return (
          <DatePicker.RangePicker
            style={{ minWidth: 240 }}
            {...formElementProps}
            onChange={handleMap.datePickerRangePickerOnChangeHandle}
          />
        );
      default:
        return (
          <Input
            {...formElementProps}
            onChange={handleMap.inputOnChangeHandle}
          />
        );
    }
  };

  const textNode = (valueType: string) => {
    const isHaveValue = Array.isArray(children) && children?.[1];

    switch (valueType) {
      case FormElementEnum.TEXTAREA:
        return isHaveValue ? <TextEllipsis text={children?.[1]} /> : emptyStr;

      case FormElementEnum.CHECKBOX_GROUP:
      case FormElementEnum.RADIO_GROUP:
        return isHaveValue ? <TagList dataSource={children?.[1]} /> : emptyStr;

      case FormElementEnum.SWITCH:
        return Array.isArray(children) && children?.[1].toString()
          ? children[1]
            ? '是'
            : '否'
          : emptyStr;

      case FormElementEnum.DATEPICKER:
        return isHaveValue
          ? children?.[1][0].format(format)
          : record[dataIndex]
          ? record[dataIndex].format(format)
          : emptyStr;

      case FormElementEnum.DATEPICKER_RANGEPICKER:
        return isHaveValue
          ? `${children?.[1][0].format(format)} - ${children?.[1][1].format(
              format,
            )}`
          : emptyStr;
      default:
        return isHaveValue ? children : emptyStr;
    }
  };

  // const textNode = Array.isArray(children) && children?.[1] ? children : '--';

  return (
    <td {...(restProps || {})} key={dataIndex}>
      {editing ? (
        <Form.Item
          name={id}
          style={{ margin: 0 }}
          {...formItemProps}
          valuePropName={
            valueType === FormElementEnum.SWITCH ? 'checked' : 'value'
          }
        >
          {genNode(valueType)}
        </Form.Item>
      ) : (
        textNode(valueType)
      )}
    </td>
  );
};

export default EditableCell;
