---
nav: 组件
group: 组件
title: AreaCascader 省市区级联
toc: component
---

# AreaCascader

省市区级联选择，组件默认使用 china-division的数据，可快速选择省市区

## 代码演示

#### 省市(直辖市/区)的选择

```jsx
import React from 'react';
import { AreaCascader } from 'MO-UI';

const App: React.FC = () => (<AreaCascader />);

export default App;
```

#### 省市区的选择

type='pca'

```jsx
import React from 'react';
import { AreaCascader } from 'MO-UI';

const App: React.FC = () => <AreaCascader type='pca' />;

export default App;
```

#### 省市区街道的选择

type='pcas'

```jsx
import React from 'react';
import { AreaCascader } from 'MO-UI';

const App: React.FC = () => <AreaCascader type="pcas" />;

export default App;
```



#### 指定默认值
默认值通过数组的方式指定。

```jsx
import React from 'react';
import { AreaCascader } from 'MO-UI';

const App: React.FC = () => <AreaCascader defaultValue={['44', '4401', '440106']} type='pca' />;

export default App;
```


## API
<!-- <API id="AreaCascader" type="IProps"/> -->
| 参数         | 说明                                       | 类型                  | 默认值 |
| ------------ | ------------------------------------------ | --------------------- | ------ |
| className | 数据的类型，pc: 省市二级联动；pca: 省市区(县)三级联动；pcas:  省市区(县)乡镇四级联动 | 'pc' \| 'pca' \| 'pcas' | 'pc' |


更多属性请查看 [CascaderProps](https://ant-design.antgroup.com/components/cascader-cn#api)



