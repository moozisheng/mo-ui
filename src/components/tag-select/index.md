---
nav: 组件
group: 组件
title: TagSelect 可选择标签

toc: component
---

# TagSelect

类似 Checkbox 的效果，点击切换选中效果。

## 代码演示

#### 单选模式

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
    {
    label: 'Sports',
    value: 'Sports',
  },
];


const App: React.FC = () => (<TagSelect options={options} />);

export default App;
```

#### 多选模式

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];

const App: React.FC = () => <TagSelect options={options} mode="multiple" />;

export default App;
```

#### 标签大小

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];

const App: React.FC = () => (
  <div>
    <h4>small</h4>
    <TagSelect size='small' defaultValue="Sports" options={options} />
    <br />
    <h4>medium</h4>
    <TagSelect size='medium' defaultValue="Sports" options={options} />
    <br />
    <h4>large</h4>
    <TagSelect size='large' defaultValue="Sports" options={options} />

  </div>
);
export default App;
```




#### 没有【全部】选项

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
    disabled: true,
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];

const App: React.FC = () => <TagSelect options={options} hasAll={false} />;

export default App;
```


#### 是否可选

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options1 = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];

const options2 = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
    tip: 'Disabled movies',
  },
  {
    label: 'Books',
    value: 'Books',
    tip: 'Disabled books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];


const App: React.FC = () => <div>
    <h4>允许选择</h4>
    <TagSelect canUnselect={false} defaultValue="Sports" options={options1} />
    <br />
    <h4>禁止选择</h4>
    <TagSelect disabled={true} defaultValue="Sports" options={options2} />
    <br />
  </div>
;

export default App;
```

#### 多语言

```jsx
import React from 'react';
import { TagSelect, HelpTip } from 'MO-UI';

const options = [
  {
    label: <HelpTip help={'Movies'}>Movies</HelpTip>,
    value: 'movies',
  },
  {
    label: 'Books',
    value: 'Books',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
];

const App: React.FC = () => <TagSelect options={options} locale={{all: 'all'}} />;

export default App;
```



## API

属性说明如下：

<!-- <API id="TagSelect" type="IProps"/> -->

| 参数      | 说明                                                       | 类型                 | 默认值 |
| --------- | ---------------------------------------------------------- | -------------------- | ------ |
| options     | 标签配置选项内容                                            | IOption[]               | -      |
| value | 指定当前选中的标签，多选时为一个数组     | string \| number \| Array<string \| number> | -  |
| defaultValue     | 指定默认选中的标签              | string \| number \| Array<string \| number>              | -      |
| onChange      | 点击标签是的 onChange 事件      |(value: string \| number \| (string \| number)[] \| undefined) => void           | -     |
| mode  | 设置标签的模式是多选还是单选      | multiple \| single             | single   |
| size   | 标签大小 | small \| medium \| large         | medium    |
| hasAll | 是否显示【全部】这个选项 | boolean | true |
| disabled | 是否禁选 | boolean | - |
| canUnSelect | 单选模式时是否禁止选择| boolean | true |
| locale | 设置 all 的文字 | { all: string } | 全部 |


### IOption

| 参数       | 说明                 | 类型                                                              | 默认值 |
| ---------- | -------------------- | ----------------------------------------------------------------- | ------ |
| label | 标签要显示的文字 |string                                    | -      |
| value | 标签的值 | string \| number | - |
| tip | 标签的提示 | ReactNode \| ( ) => ReactNode | - |

