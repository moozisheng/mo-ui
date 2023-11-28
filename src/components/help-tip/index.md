---
nav: 组件
group: 组件
title: HelpTip 提示信息
toc: component
---

# HelpTip

用于展示帮助提示信息

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { HelpTip } from 'MO-UI';

const App: React.FC = () => (
   <>
    <div><HelpTip help="这里是帮助提示信息">帮助提示</HelpTip></div>
    <div><HelpTip help="这里是帮助提示信息" iconOnly>鼠标悬停图标上</HelpTip></div>
  </>

);

export default App;
```

#### 设置图标属性

```jsx
import React from 'react';
import { HelpTip } from 'MO-UI';

const App: React.FC = () => (
   <>
    <div><HelpTip help="这里是帮助提示信息" iconProps={{style: {color: '#20b2aa'}}}>帮助提示</HelpTip></div>
    <div><HelpTip help="这里是帮助提示信息" iconOnly iconProps={{style: {color: '#20b2aa'}}}>鼠标悬停图标上</HelpTip></div>
  </>

);

export default App;
```

#### 自定义图标

```jsx
import React from 'react';
import { HelpTip } from 'MO-UI';
import { InfoCircleFilled } from '@ant-design/icons';

const App: React.FC = () => (
   <>
    <div><HelpTip help="这里是帮助提示信息" icon={<InfoCircleFilled style={{marginLeft: 4, color: '#20b2aa'}} />}>帮助提示</HelpTip></div>
    <div><HelpTip help="这里是帮助提示信息" icon={<InfoCircleFilled style={{marginLeft: 4,  color: '#20b2aa', cursor: 'help'}} />} iconOnly>鼠标悬停图标上</HelpTip></div>
  </>
);

export default App;
```


## API

属性说明如下：

| 参数      | 说明                 | 类型                                                                      | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------------------- | ------ |
| help      | 提示信息             | ReactNode                                    | -      |
| iconOnly | 是否鼠标悬停在图标上时显示提示信息      | boolean                   | -      |
| onClick   | 点击事件 | (e: MouseEvent) => void                  | -      |
|iconProps| 图标的属性 | [AntdIconProps](https://ant-design.antgroup.com/components/icon-cn#api) |- |


更多属性请查看 [Tooltip](https://ant-design.antgroup.com/components/tooltip-cn)

