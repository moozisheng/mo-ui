---
nav: 组件
group: 组件
title: Image 图片画廊
toc: component
---

# Image


<!-- 使用 [dnd kit](https://dndkit.com/) 实现的可拖拽标签。 -->

## 代码演示

#### 多张图预览
点击左右切换按钮可以预览多张图片

```jsx
import React from 'react';
import { Image } from 'MO-UI';

const App: React.FC = () => {
  const items = [
    {
      title: '图片一',
      src:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      msrc:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      w: 1875,
      h: 2500,
    },
    {
      title: '图片二',
      src:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      msrc:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      w: 1669,
      h: 2500,
    },
    {
      title: '图片三',
      src:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      msrc:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      w: 2500,
      h: 1666,
    },
  ]



  return (
    <>
      <Image.PhotoSwipeGallery
        items={items}
      />
    </>
  );
};

export default App;
```


#### 图册模式
从一张图片点开相册

```jsx
import React, {useState} from 'react';
import { Image } from 'MO-UI';

const App: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)


  const items = [
    {
      title: '猫头鹰',
      src: 'https://source.unsplash.com/Volo9FYUAzU/1620x1080',
      msrc: 'https://source.unsplash.com/Volo9FYUAzU/1620x1080',
      w: 1620,
      h: 1080
    },
    {
      title: '图片一',
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      msrc: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      w: 1875,
      h: 2500,
    },
    {
      title: '图片二',
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      msrc: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      w: 1669,
      h: 2500,
    },
    {
      title: '图片三',
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      msrc: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      w: 2500,
      h: 1666,
    },
  ];

  const openHandle = () => {
    setIsOpen(true)
  }

  const closeHandle = () => {
    setIsOpen(false)
  }

  return (
    <>
    <a onClick={openHandle}><img src='https://source.unsplash.com/Volo9FYUAzU/1620x1080' width='200'/></a>
      <Image.PhotoSwipe isOpen={isOpen} items={items} onClose={closeHandle}/>
    </>
  );
};

export default App;
```


## API

属性说明如下：

| 参数     | 说明                       | 类型                   | 默认值 |
| -------- | -------------------------- | ---------------------- | ------ |
| items    | 图片列表数据                     | Item[ ]                 | -      |
| isOpen    | 是否显示                     | boolean                 | -      |
| id | id 属性                 | string                | -   |
| className     | css 类名                  | string              | -      |
| onClose | 画廊关闭的回调函数 | ( ) => void | - |
| prevClick | 向前的回调函数 | (item: Item, index: number) => void | - |
| nextClick | 向后的回调函数 | (item: Item, index: number) => void | - |

### Item

| 参数 | 说明            | 类型             | 默认值 |
| ---- | --------------- | ---------------- | ------ |
| title | 图片名称 | string | - |
| src  | 图片的链接地址 | string  | -      |
| msrc | 预览图的链接地址 | string \| undefined | - |
| w | 图片的宽度 | string \| undefined | - |
| h | 图片的高度 | string \| undefined | - |
| html | HTML内容 | string \| undefined | - |


