---
nav: 组件
group: 组件
title: SafeHtml HTML内容
toc: component
---

# SafeHtml

在现代的 Web 应用中，动态生成和渲染 HTML 字符串是很常见的需求。然而，不正确地渲染 HTML 字符串可能会导致安全漏洞，例如跨站脚本攻击（XSS）。为了确保应用的安全性，SafeHtml 可以帮助你在安全的环境下渲染 HTML 字符串。

<!-- https://blog.csdn.net/Z__7Gk/article/details/132366842 -->



## 代码演示

#### 基础使用

```jsx
import React from 'react';
import { SafeHtml } from 'MO-UI';

const App: React.FC = () => (
  <div>
    <SafeHtml html={'<b>我是使用b标签加粗的HTML内容</b>'} />
   
    <p>
      <b>image: </b>
      <SafeHtml html="<img src=x onerror=alert(1)/>" />
    </p>
    <p>
      <b>iframe: </b>
      <SafeHtml html="iframe 标签注入JavaScript代码 <iframe//src=jAva&Tab;script:alert(3)>def" />
    </p>
    <p>
      <b>onload: </b>
      <SafeHtml html="svg 标签注入JavaScript代码 <svg style='width:0;height:0' /onload=alert(4)>" />
    </p>
    <p>
      <b>script: </b>
      <SafeHtml html='check source code and dom <math><mi//xlink:href="data:x,<script>alert(4)</script>">' />
    </p>
  </div>
);

export default App;
```




## API

属性说明如下：

| 参数      | 说明                                                           | 类型                 | 默认值 |
| --------- | -------------------------------------------------------------- | -------------------- | ------ |
| html | 要展示的html内容                            | string | - |
| domPurifyOptions | dompurify 配置                                | Record<string, any>                       | - |



