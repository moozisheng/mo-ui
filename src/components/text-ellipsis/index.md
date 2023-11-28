---
nav: 组件
group: 组件
title: TextEllipsis 长文本截断
toc: component
---

# TextEllipsis

长文本截断，超出部分显示省略号

## 代码演示

#### 显示一行

```jsx
import React from 'react';
import { TextEllipsis } from 'MO-UI';

const App: React.FC = () => (
  <TextEllipsis text="这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，
需要省略显示" />
);

export default App;
```

#### 显示多行

```jsx
import React, {useState} from 'react';
import { TextEllipsis } from 'MO-UI';

const App: React.FC = () => (<TextEllipsis
    lineClamp={2}
    text="这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，需要省略显示"
  />
);

export default App;
```

#### 不显示气泡卡片

```jsx
import React, { useState } from 'react';
import { TextEllipsis } from 'MO-UI';

const App: React.FC = () => (
  <TextEllipsis
    lineClamp={2}
    popOverVisible={false}
    text="这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，这是一段很长很长很长的文本，需要省略显示"
  />
);

export default App;
```


## API

属性说明如下：

| 参数       | 说明                 | 类型                                                              | 默认值 |
| ---------- | -------------------- | ----------------------------------------------------------------- | ------ |
| text | 显示的文字内容    | string    | -      |
| width | 文字内容显示的宽度 | number | 120px |
| lineClamp | 显示的行数，最大可设置行数为6 | number | 1 |
| popOverVisible |是否显示气泡卡片 | boolean | true |


