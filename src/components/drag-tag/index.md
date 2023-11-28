---
nav: 组件
group: 组件
title: DragTag 可拖拽标签
toc: component
---

# DragTag

使用 [dnd kit](https://dndkit.com/) 实现的可拖拽标签。

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { DragTag } from 'MO-UI';


const App: React.FC = () => {

  const items = [
    {
      id: 1,
      text: '标签 1',
    },
    {
      id: 2,
      text: '标签 2',
    },
    {
      id: 3,
      text: '标签 3',
    },
  ]

  return (
   <DragTag items={items} closable color="#20b2aa" onChange={(data) => {console.log('onChange data', data)}}/>
  );
};

export default App;
```

## API

属性说明如下：

| 参数      | 说明                 | 类型                                                                      | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------------------- | ------ |
| items |标签项 | Item[] | - |
| color      | 标签色             | string                                                                    | -      |
| bordered | 是否有边框         | boolean                                                             | true      |
| icon | 设置图标 | ReactNode | - |
| onChange | 标签移动时的 onChange 回调 | (data: Item[]) => void | - |

### Item
| 参数  | 说明   | 类型   | 默认值 |
| ----- | ------ | ------ | ------ |
| id | 标签项的唯一id | number \| string | -      |
| text | 标签项的文字 | string | -      |



