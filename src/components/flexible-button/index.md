---
nav: 组件
group: 组件
title: FlexibleButtons 更多按钮
toc: component
---

# FlexibleButtons

在 table 操作区等需要展示较多的按钮集合的场景，可折叠按钮可提供灵活的展示形式和可配置的属性

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { FlexibleButtons } from 'MO-UI';
import type { MenuProps } from 'antd';
import { message } from 'antd';

const App: React.FC = () => {

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const items: MenuProps['items'] = [
    {
      label: '拷贝',
      key: '1',
    },
    {
      label: '删除',
      key: '2',
    },
  ];

  return <span style={{display: 'inline-block'}}><FlexibleButtons items={items} onClick={onClick} /></span>
}

export default App;
```




## API

属性说明如下：

| 参数       | 说明                 | 类型                                                              | 默认值 |
| ---------- | -------------------- | ----------------------------------------------------------------- | ------ |
| text | 按钮文字 | string                                    | -      |
| textStyle | 按钮文字样式 |CSSProperties | - |
| onClick | 下拉菜单项的点击事件 | function({ item, key, keyPath, domEvent }) | - |
| items | 菜单配置项 | [ItemType[]](https://ant-design.antgroup.com/components/menu-cn#itemtype)| - |


> 更多属性查看 [dropdown](https://ant-design.antgroup.com/components/dropdown-cn#dropdown)
