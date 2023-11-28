---
nav: 组件
group: 组件
title: ContextMenu 右键菜单
toc: component
---

# ContextMenu

自定义右键菜单

## 代码演示

#### 基础使用
<code src="./demos/default.tsx"></code>

#### 受控模式
<code src="./demos/demo.tsx"></code>


## API

属性说明如下：
<API id="ContextMenu" type="IProps"/>

通过给 ContextMenu 组件添加 ref 属性，可以获取到组件对外暴露的属性方法，便于对ContextMenu组件进行操作：
```
visible: ContextMenu组件的 visible 状态
event: 当前触发 contextmenu 事件的目标对象
closeMenu: 关闭自定义右键菜单
openMenu: 打开自定义右键菜单

```
