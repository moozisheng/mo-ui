---
# nav: 组件
group: hooks
toc: component
---

# usePromisePercent

假的异步获取进度

## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { usePromisePercent } from 'MO-UI';
import { Progress } from 'antd';

const App: React.FC = () => {
  const [percent] = usePromisePercent(new Promise((res) => setTimeout(res, 2000)));

  return (
    <>
      <Progress percent={percent.toFixed(1)} />
      <br />
      <br />
      <Progress type="circle" percent={percent.toFixed(1)} />
    </>
  );
};

export default App;
```

## API
```
const [percent, {
    inc,
    dec,
    set,
    reset
  },
] = usePromisePercent(promise, options?: Options);
```

### Params

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| promise  | promise 实例     | Promise | -     |
| options | 配置 | Options | -     |



### Options

| 参数             | 说明               | 类型                | 默认值 |
| ---------------- | ------------------ | ------------------- | ------ |
| step             | 进度步数 | number              | 20     |
| limit | 进度条限制数     |number | 80     |


### Result

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| percent  | 当前进度值     | number | -     |
| inc | 加，默认加 1 | (delta?: number) => void | - |
| dec | 减，默认减 1 | (delta?: number) => void | - |
| set | 设置 percent | (value: number \| ((c: number) => number)) => void | - |
| reset | 重置为默认值 | ( ) => void | - |


