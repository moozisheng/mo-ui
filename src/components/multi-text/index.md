---
nav: 组件
group: 组件
title: MultiText 多文本展示
toc: component
---

# MultiText
通常在 table 中展示多个「文本」且展示区域不足

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { MultiText } from 'MO-UI';

const App: React.FC = () => {
  const dataSource = [
    "东城区",
    "西城区",
    "朝阳区",
    "丰台区",
    "石景山区",
    "海淀区",
    "门头沟区",
    "房山区",
    "通州区",
    "顺义区",
    "昌平区",
    "大兴区",
    "怀柔区",
    "平谷区",
    "密云区",
    "延庆区",
    "和平区",
    "河东区",
    "河西区",
    "南开区",
    "河北区",
    "红桥区",
    "东丽区",
    "西青区",
    "津南区",
    "北辰区",
    "武清区",
    "宝坻区",
    "滨海新区",
    "宁河区",
    "静海区",
    "蓟州区"
  ];

  return (<MultiText dataSource={dataSource} />)
};

export default App;
```

#### 展示全部

```jsx
import React from 'react';
import { MultiText } from 'MO-UI';

const App: React.FC = () => {
  const dataSource = [
    '东城区',
    '西城区',
    '朝阳区',
    '丰台区',
    '石景山区',
    '海淀区',
    '门头沟区',
    '房山区',
    '通州区',
    '顺义区',
    '昌平区',
    '大兴区',
    '怀柔区',
    '平谷区',
    '密云区',
    '延庆区',
    '和平区',
    '河东区',
    '河西区',
    '南开区',
    '河北区',
    '红桥区',
    '东丽区',
    '西青区',
    '津南区',
    '北辰区',
    '武清区',
    '宝坻区',
    '滨海新区',
    '宁河区',
    '静海区',
    '蓟州区',
  ];

  return (<MultiText dataSource={dataSource} showAll />)
};

export default App;
```

#### 彩色文字

```jsx
import React from 'react';
import { MultiText } from 'MO-UI';

const App: React.FC = () => {
  const dataSource = [
    '东城区',
    '西城区',
    '朝阳区',
    '丰台区',
    '石景山区',
    '海淀区',
    '门头沟区',
    '房山区',
    '通州区',
    '顺义区',
    '昌平区',
    '大兴区',
    '怀柔区',
    '平谷区',
    '密云区',
    '延庆区',
    '和平区',
    '河东区',
    '河西区',
    '南开区',
    '河北区',
    '红桥区',
    '东丽区',
    '西青区',
    '津南区',
    '北辰区',
    '武清区',
    '宝坻区',
    '滨海新区',
    '宁河区',
    '静海区',
    '蓟州区',
  ];

  return (<MultiText dataSource={dataSource} tagProps={{ color: 'processing' }} />)
};

export default App;
```



## API

属性说明如下：
| 参数       | 说明                 | 类型                                                              | 默认值 |
| ---------- | -------------------- | ----------------------------------------------------------------- | ------ |
| dataSource | 展示的数据 | TagListItemProps[] \| string[] | - |
| showAmount | 展示数量 | number | 5 |
| showAll | 是否展示全部 | boolean | false |
| tagProps   | antd Tag 标签的属性  | [TagProps](https://ant-design.antgroup.com/components/tag-cn#tag) | -      |


### TagListItemProps

| 参数      | 说明                                                       | 类型                 | 默认值 |
| --------- | ---------------------------------------------------------- | -------------------- | ------ |
| value     | 标签的值                                                   | string               | -      |
| closeIcon | 自定义关闭按钮                                             | boolean \| ReactNode | false  |
| color     | 标签色                                                     | string               | -      |
| icon      | 设置图标                                                   | ReactNode            | -      |
| bordered  | 是否有边框                                                 | boolean              | true   |
| onClose   | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为） | (e) => void          | -      |


