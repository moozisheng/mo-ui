---
nav: 组件
group: 组件
title: DateRangeSelect 时间范围选择
toc: component
---

# DateRangeSelect

通过标签的方式快速选择某个时间范围

## 代码演示



```jsx
/**
 title: 基础使用
*/
import React from 'react';
import { DateRangeSelect } from 'MO-UI';
import { message } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const viewData = (data = null) => {
    if (Array.isArray(data)) {
      data = data.map((val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('data', data);
    // message.info(JSON.stringify(data, null, 2));
  };

  return (
    <DateRangeSelect onChange={viewData} showTime />
  );
};

export default App;
```

```jsx
/**
 title: 没有自定义选项
*/
import React from 'react';
import { DateRangeSelect } from 'MO-UI';
import { message } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const viewData = (data = null) => {
    if (Array.isArray(data)) {
      data = data.map((val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('data', data);
    // message.info(JSON.stringify(data, null, 2));
  };

  return <DateRangeSelect onChange={viewData} hasCustom={false} showTime={true} />;
};

export default App;
```

```jsx
/**
 title: 自定义数据源
*/
import React from 'react';
import { DateRangeSelect } from 'MO-UI';
import { message } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const options = [
    {
      label: '过去 30 分钟',
      value: [dayjs().subtract(30, 'minute'), dayjs()],
    },
    {
      label: '过去 6 小时',
      value: [dayjs().subtract(6, 'hour'), dayjs()],
    },
    {
      label: '过去 12 小时',
      value: [dayjs().subtract(12, 'hour'), dayjs()],
    },
  ];

  const viewData = (data = null) => {
    if (Array.isArray(data)) {
      data = data.map((val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('data', data);
    // message.info(JSON.stringify(data, null, 2));
  };

  return (
    <DateRangeSelect options={options} onChange={viewData} showTime={true} />
  );
};

export default App;
```


<!-- #### 总是显示 DatePicker -->
```jsx
/**
 title: 总是显示 DatePicker
*/
import React from 'react';
import { DateRangeSelect } from 'MO-UI';
import {message} from 'antd'
import dayjs from 'dayjs'

const App: React.FC = () => {

  const viewData = (data = null) => {
    if (Array.isArray(data)) {
      data = data.map(val => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('data', data)
    // message.info(JSON.stringify(data, null, 2))
  }

  return <DateRangeSelect onChange={viewData} alwaysShowCustom={true} showTime />
};

export default App;
```


```jsx
/**
 title: 受控模式
*/
import React, {useState} from 'react';
import { DateRangeSelect } from 'MO-UI';
import { message } from 'antd';
import dayjs from 'dayjs';
import clonedeep from 'lodash/clonedeep';

const App: React.FC = () => {

const [date, setDate] = useState<any>([dayjs().startOf('day'), dayjs().endOf('day')])

  const viewData = (data = null) => {
    let newData = clonedeep(data)
    if (Array.isArray(newData)) {

      newData = newData.map((val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('newData', newData);
    message.destroy()
    // message.info(JSON.stringify(newData, null, 2));

    setDate([dayjs(data[0]), dayjs(data[1])])
  };

  return <DateRangeSelect onChange={viewData} showTime value={date} />;
};

export default App;
```

```jsx
/**
 title: 选择不超过七天的范围
 description: 通过 disabledSelectedDate 属性指定允许选择的时间范围
*/
import React from 'react';
import { DateRangeSelect } from 'MO-UI';
import { message } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const viewData = (data = null) => {
    if (Array.isArray(data)) {
      data = data.map((val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
    }
    console.log('data', data);
    // message.info(JSON.stringify(data, null, 2));
  };

  return <DateRangeSelect onChange={viewData} showTime disabledSelectedDate={7} />;
};

export default App;
```



## API

属性说明如下：

| 参数         | 说明                                 | 类型                                  | 默认值 |
| ------------ | ------------------------------------ | ----------------------------- | ------ |
| options      | 标签配置选项内容                     | IOption[ ]                                                 | -      |
| value        | 指定当前时间 | [Day.js, Day.js]                           | -      |
| hasCustom | 是否显示 自定义 选择项 | boolean | true |
| alwaysShowCustom | 是否一直显示 自定义 选择项 | boolean | true |
| pickerProps | DatePicker.RangePicker 的属性 | [RangePickerProps](https://ant-design.antgroup.com/components/date-picker-cn#rangepicker) | - |
| tagProps | TagSelect 组件的属性 | [ITagSelectProps](/components/tag-select#api) | - |
| disabledSelectedDate | 选择不超过 n 天的范围 | number | - |
| onChange     | onChange 事件     | ([number, number]) => void | -      |
| disabled     | 是否禁选                             | boolean                                         | -      |
| locale   | 默认选项的国际化语言   | ILocale   | - |


### IOption

| 参数  | 说明             | 类型             | 默认值 |
| ----- | ---------------- | ---------------- | ------ |
| label | 标签要显示的文字 | string           | -      |
| value | 标签的值         | [Day.js, Day.js] | -      |


### ILocale
| 参数  | 说明             | 类型             | 默认值 |
| ----- | ---------------- | ---------------- | ------ |
| today | - | string           |  今天   |
| yesterday | - | string | 昨天 |
| past7Days | - | string | 过去7天 |
| past15Days | - | string | 过去15天 |
| past30Days | - | string | 过去30天 |
| custom | - | string | 自定义 |




