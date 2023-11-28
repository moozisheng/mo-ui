---
nav: 组件
group: 组件
title: TagList 标签组
toc: component
---

# TagList

用于展示一组标签

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { TagList } from 'MO-UI';

const App: React.FC = () => (
  <TagList dataSource={['Fackbook', 'TikTok', 'WhatsApp', 'Instagram']}/>
);

export default App;
```

#### 统一设置标签属性

```jsx
import React from 'react';
import { TagList } from 'MO-UI';

const App: React.FC = () => (
  <TagList dataSource={['Fackbook', 'TikTok', 'WhatsApp', 'Instagram']} tagProps={{color: 'success'}} />
);

export default App;
```

#### 单独设置标签属性

```jsx
import React from 'react';
import { TagList } from 'MO-UI';

const App: React.FC = () => {

  const dataSource=[
    {
      value: 'Fackbook',
      color: 'success'
    }, 
    {
      value: 'TikTok', 
      color: 'processing'
    },
    {
      value: 'WhatsApp', 
      color: 'warning'
    },
    {
      value: 'Instagram',
      color: 'error'
    },
  ]

  return <TagList dataSource={dataSource} />

};
  
export default App;
```





## API

属性说明如下：

| 参数      | 说明                                                           | 类型                 | 默认值 |
| --------- | -------------------------------------------------------------- | -------------------- | ------ |
| dataSource | 要展示的标签列表数据                              | TagListItemProps[] \| string[] | - |
| tagProps | antd Tag 标签的属性                                 | [TagProps](https://ant-design.antgroup.com/components/tag-cn#tag)                            | - |


### TagListItemProps

| 参数      | 说明                                                           | 类型                 | 默认值 |
| --------- | -------------------------------------------------------------- | -------------------- | ------ |
| value | 标签的值                                                              | string               | - |
| closeIcon | 自定义关闭按钮                                                    | boolean \| ReactNode | false  |
| color     | 标签色                                                         | string               | -      |
| icon      | 设置图标                                                       | ReactNode            | -      |
| bordered  | 是否有边框                                                     | boolean              | true   |
| onClose   | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为）     | (e) => void          | -      |

