---
nav: 组件
group: 组件
title: PDFViewer PDF查看器
toc: component
demo:
  cols: 1

---

# PDFViewer
PDF 文件查看器


## 代码演示

#### 简洁模式
<code src="./demos/no-toolbar.tsx"></code>

#### 默认模式
<code src="./demos/default.tsx"></code>

#### 浮动工具栏
工具栏可浮动在顶部或底部
<code src="./demos/floating-bar.tsx"></code>

#### 添加水印
<code src="./demos/water-mark.tsx"></code>

#### 显示阅读进度条
<code src="./demos/progress.tsx"></code>

#### 旋转页面
顺时针或逆时针旋转某一个页面
<code src="./demos/rotate-button.tsx"></code>

#### 超链接可点击
点击文档中的超链接时，弹窗确认是否跳转到新页面
<code src="./demos/linkable.tsx"></code>

#### 在页面顶部绘制信息
<code src="./demos/draw-message-on-top.tsx"></code>


## API

属性说明如下：
<API id="PDFViewer" type="IProps"/>


### OpenFile
| 参数       | 说明                 | 类型                                                              | 默认值 |
| ---------- | -------------------- | ----------------------------------------------------------------- | ------ |
| data | 文件名或“Uint8Array”，具体取决于文件 url 的类型 | string \| Uint8Array                            | -      |
| name   | 文件名称  | string | -      |

