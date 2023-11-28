---
nav: 组件
group: 组件
title: CopyText 复制文本
toc: component
---

# CopyText

用于复制一段文本

## 代码演示


#### 基础使用


```jsx
import React from 'react';
import { CopyText } from 'MO-UI';


const App: React.FC = () => (
  <CopyText value="我是被复制的内容">复制内容</CopyText>
)

export default App;

```

#### 鼠标悬停显示图标

```tsx
import React from 'react';
// @ts-ignore
import { CopyText } from 'MO-UI';

export default () => (
  <CopyText hoverShowEdit value="我是被复制的内容">
    复制内容
  </CopyText>
);
```

## API

属性说明如下：


| 参数        | 说明                                                                 | 类型                    | 默认值                                    |
| ----------- | -------------------------------------------------------------------- | ----------------------- | ----------------------------------------- | 
| value       | 被复制的文本                                                        | string               | -                                         |
| hoverShowEdit  | 是否 hover 时显示 copy 图标                                       | boolean              | false                                         |
| clickable      | 是否整个标签可点击                                                    | boolean                 | true                                   |
| iconVisible   | 是否显示 copy 图标                                                   | boolean              | true                     |
| locale       | 提示语国际化                                                           | Object             | {copy: 'Copy',copied: 'Copied.'}     |
| iconProps | Antd Icon 的 props                               | AntdIconProps & {visible: boolean}       | -                    |
| onClick     | 标签的点击事件                                                 | (e: MouseEvent) => void | -                                         |       |


### 图标属性

copy 图标的属性说明如下：

| 参数         | 说明                                       | 类型                  | 默认值 |
| ------------ | ------------------------------------------ | --------------------- | ------ |
| className    | 设置图标的样式名                           | string                | -      | 
| rotate       | 图标旋转角度（IE9 无效）                   | number                | -      |  
| spin         | 是否有旋转动画                             | boolean               | false  | 
| style        | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties         | -      | 
| twoToneColor | 仅适用双色图标。设置双色图标的主要颜色     | string (十六进制颜色) | -      | 
| visible | 是否显示图标 | boolean | false |

