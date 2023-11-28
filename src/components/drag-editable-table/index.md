---
nav: 组件
group: 组件
title: DragEditableTable 可拖拽可编辑表格
toc: component
---

# DragEditableTable

可拖拽可编辑表格

## 代码演示

#### 实时保存的编辑表格

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { DragEditableTable } from 'MO-UI';
import type { MenuProps } from 'antd';
import { message, Form, Button, Radio } from 'antd';
import dayjs from 'dayjs'

interface Item {
  key: string;
  name: string;
  age: number;
  color: string;
}

const originData: Item[] = [];
const colors = ['gold', 'cyan', 'green', 'yellow', 'blue']

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    color: `${colors[i]?? ''}`,
    textArea: '我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容',
    radioGroup: 'Apple',
    checkboxGroup: ['Apple'],
    slider: 20,
    switch: true,
    mentions: 'afc163',
    datePicker: dayjs(),
    date: [dayjs(), dayjs().add(7 + i, 'day')]
  });
};

const App: React.FC = () => {

  const dragTableRef = useRef<{ current: {dataSource: any, addRow: () => void, setErrorTipToShow: () => void;} }>(null);
  const [dataSource, setDataSource] = useState(originData)
  const [position, setPosition] = useState<'left' | 'right'>('right')
  
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      valueType: 'input',
      width: '25%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showCount: true,
        maxLength: 20
      }
    },
    {
      title: 'age',
      dataIndex: 'age',
      valueType: 'inputNumber',
      width: '15%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },
    {
      title: 'color',
      dataIndex: 'color',
      valueType: 'select',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        // defaultValue: 'gold',
        options: [
          {label: 'gold', value: 'gold'},
          {label: 'cyan', value: 'cyan'},
          {label: 'green', value: 'green'}
        ]
      }
    },

    {
      title: 'textArea',
      dataIndex: 'textArea',
      valueType: 'textArea',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'radio.group',
      dataIndex: 'radioGroup',
      valueType: 'radio.group',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]
      }
    },

    {
      title: 'checkbox.group',
      dataIndex: 'checkboxGroup',
      valueType: 'checkbox.group',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]
      }
    },

    {
      title: 'slider',
      dataIndex: 'slider',
      valueType: 'slider',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'switch',
      dataIndex: 'switch',
      valueType: 'switch',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'mentions',
      dataIndex: 'mentions',
      valueType: 'mentions',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          {
            value: 'afc163',
            label: 'afc163',
          },
          {
            value: 'zombieJ',
            label: 'zombieJ',
          },
          {
            value: 'yesmeck',
            label: 'yesmeck',
          }
        ]
      }
    },

    // {
    //   title: 'timePicker',
    //   dataIndex: 'timePicker',
    //   valueType: 'timePicker',
    //   width: '40%',
    //   editable: true,
    //   formItemProps: {},
    //   formElementProps: {}
    // },

    // {
    //   title: 'timePicker.rangePicker',
    //   dataIndex: 'timePicker.rangePicker',
    //   valueType: 'timePicker.rangePicker',
    //   width: '40%',
    //   editable: true,
    //   formItemProps: {},
    //   formElementProps: {}
    // },

    {
      title: 'datePicker',
      dataIndex: 'datePicker',
      valueType: 'datePicker',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showTime: true
      }
    },

    {
      title: 'datePicker.rangePicker',
      dataIndex: 'date',
      valueType: 'datePicker.rangePicker',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showTime: true
      }
    },

    {
      title: '操作',
      render: () => {
      return null;
      },
    },
  ];

  const saveHandle = () => {
    console.log('dataSource:', dragTableRef.current.dataSource)
  }
  
  return (
    <>
      <div style={{marginBottom: 10}}>
        拖拽手柄位置：
        <Radio.Group 
          optionType='button'
          options={[
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
          ]} 
          onChange={(e) => setPosition(e.target.value)} value={position} 
        />
      </div>
      <DragEditableTable
          sortPosition={position}
          dataSource={dataSource}
          columns={columns}
          ref={dragTableRef}
          maxLength={15}
      />
      <Button type="primary" onClick={saveHandle}>保存</Button>
    </>
  );
};

export default App;
```

#### 可编辑行

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { DragEditableTable } from 'MO-UI';
import type { MenuProps } from 'antd';
import { message, Form, Button, Radio, Tag } from 'antd';
import dayjs from 'dayjs'

interface Item {
  key: string;
  name: string;
  age: number;
  color: string;
}

const originData: Item[] = [];
const colors = ['gold', 'cyan', 'green', 'yellow', 'blue']

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    color: `${colors[i]?? ''}`,
    textArea: '我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容我是多行文本内容',
    radioGroup: ['Pear', 'Orange'],
    checkboxGroup: ['Apple', 'Orange'],
    slider: 10,
    switch: false,
    mentions: 'afc163',
    datePicker: dayjs(),
    date: [dayjs(), dayjs().add(7 + i, 'day')]
  });
};

const App: React.FC = () => {

  const dragTableRef = useRef<{ current: {dataSource: any, addRow: () => void, setErrorTipToShow: () => void;} }>(null);
  const [dataSource, setDataSource] = useState(originData)
  const [position, setPosition] = useState<'left' | 'right'>('right')

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      valueType: 'input',
      width: '25%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showCount: true,
        maxLength: 20
      }
    },
    {
      title: 'age',
      dataIndex: 'age',
      valueType: 'inputNumber',
      width: '15%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },
    {
      title: 'color',
      dataIndex: 'color',
      valueType: 'select',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        // defaultValue: 'gold',
        options: [
          {label: 'gold', value: 'gold'},
          {label: 'cyan', value: 'cyan'},
          {label: 'green', value: 'green'}
        ]
      },
      render: (value) => {
        return  value ? <Tag color={value}>{value}</Tag> : '--'
      }
    },

    {
      title: 'textArea',
      dataIndex: 'textArea',
      valueType: 'textArea',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'radio.group',
      dataIndex: 'radioGroup',
      valueType: 'radio.group',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]
      }
    },

    // {
    //   title: 'checkbox',
    //   dataIndex: 'checkbox',
    //   valueType: 'checkbox',
    //   width: '40%',
    //   editable: true,
    //   formItemProps: {},
    //   formElementProps: {
    //     options: [
    //       { label: 'Apple', value: 'Apple' },
    //     ]
    //   }
    // },

    {
      title: 'checkbox.group',
      dataIndex: 'checkboxGroup',
      valueType: 'checkbox.group',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]
      }
    },

    {
      title: 'slider',
      dataIndex: 'slider',
      valueType: 'slider',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'switch',
      dataIndex: 'switch',
      valueType: 'switch',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {}
    },

    {
      title: 'mentions',
      dataIndex: 'mentions',
      valueType: 'mentions',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        options: [
          {
            value: 'afc163',
            label: 'afc163',
          },
          {
            value: 'zombieJ',
            label: 'zombieJ',
          },
          {
            value: 'yesmeck',
            label: 'yesmeck',
          },
        ]
      }
    },

    // {
    //   title: 'timePicker.rangePicker',
    //   dataIndex: 'timePicker.rangePicker',
    //   valueType: 'timePicker.rangePicker',
    //   width: '40%',
    //   editable: true,
    //   formItemProps: {},
    //   formElementProps: {}
    // },
    {
      title: 'datePicker',
      dataIndex: 'datePicker',
      valueType: 'datePicker',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showTime: true
      }
    },

    {
      title: 'datePicker.rangePicker',
      dataIndex: 'date',
      valueType: 'datePicker.rangePicker',
      width: '40%',
      editable: true,
      formItemProps: {},
      formElementProps: {
        showTime: true,
        // format: 'YYYY-MM-DD'
      }
    },

    {
      title: '操作',
      render: () => {
      return null;
      },
    },
  ];

  const saveHandle = () => {
    console.log('dataSource:', dragTableRef.current.dataSource)
  }

  return (
    <>
      <div style={{marginBottom: 10}}>
        拖拽手柄位置：
        <Radio.Group
          optionType='button'
          options={[
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
          ]}
          onChange={(e) => setPosition(e.target.value)} value={position}
        />
      </div>
      <DragEditableTable
          sortPosition={position}
          dataSource={dataSource}
          allRowsEditable={false}
          columns={columns}
          ref={dragTableRef}
          maxLength={15}
      />
      <Button type="primary" onClick={saveHandle}>保存</Button>
    </>
  );
};

export default App;
```

## API

属性说明如下：

| 参数      | 说明                 | 类型                                                                      | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------------------- | ------ |
| dataSource      | 可编辑表格的数据  | {key: string; [propKey: string]: any;}     | -      |
| columns | 表格列的配置项         | Columns[]                                                         | -      |
| maxLength   | 最大的行数，到达最大行数新建按钮会自动消失 | number    | 15     |
| sortPosition | 拖拽图标的位置 | 'left' \| 'right' | right |
| allRowsEditable | 所有行是否可编辑，默认可编辑 | boolean | true |
| recordCreatorProps | 新增一行按钮的相关配置，如果不显示按钮，可传入 false | IRecordCreatorProps \| boolean | - |


### IRecordCreatorProps
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| position | 按钮的位置 | 'top' \| 'bottom' | bottom |
| style | 按钮的颜色设置 | React.CSSProperties | - |
| text | 设置按钮文案 | React.ReactNode | - |
| icon | 设置按钮的图标| React.ReactNode | - |
| record | 新增一行的数据，如果不写 key ，会使用 index 作为行 id | ( ) => ({ id: string \| number;\[keyProps?: string\]: any;}) | - |

更多属性可查看 [ButtonProps](https://ant-design.antgroup.com/components/button-cn#api)

### Columns
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| title | 列头显示文字 | ReactNode \| ({ sortOrder, sortColumn, filters }) => ReactNode | - |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string \| string[] | - |
| valueType | 表单类型 | 'input' \| 'inputNumber' \| 'textArea' \| 'radio.group' \| 'checkbox.group' \| 'select' \| 'slider' \| 'switch' \| 'mentions' \| 'datePicker' \| 'datePicker.rangePicker'| - |
| editable | 表格列是否可编辑 | boolean | - |
| formItemProps | Ant Design 表单项 Form.Item 的属性 | [Form.Item](https://ant-design.antgroup.com/components/form-cn#formitem) | - |
| formElementProps | Ant Design 表单元素的属性 | - | - |

