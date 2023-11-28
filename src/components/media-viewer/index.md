---
nav: 组件
group: 组件
title: MediaViewer 多媒体查看器
toc: component
---

# MediaViewer

查看图片、PDF文件或者播放视频、音频

## 代码演示

#### 相册模式

```jsx
import React, { useState } from 'react';
import { MediaViewer } from 'MO-UI';
import { Button } from 'antd';

const App: React.FC = () => {
 
  const imgs = [
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      thumbnailSrc: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      width: 1875,
      height: 2500,
    },
    {
      src:'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      thumbnailSrc:'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      width: 1669,
      height: 2500,
    },
    {
      src:'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      thumbnailSrc:'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      width: 2500,
      height: 1666,
    },
  ];

  const videos = [
    {
      poster: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4',
    },
    
  ];

  const audios = [{src: 'https://www.runoob.com/try/demo_source/horse.ogg'}]

  const pdfs = ['https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf']

  const [visible, setVisible] = useState<boolean>(false)

  const onCloseHandle = () => {
    setVisible(false)
  }

  const onClickHandle = () => {
    setVisible(true)
  }

  const onCurrentChangeHandle = (current: number) => {
    console.log('current', current)
  }

  return (
    <div>
      <Button onClick={onClickHandle} type="primary">
        show image preview
      </Button>
      <MediaViewer 
        visible={visible} 
        videos={videos} 
        audios={audios} 
        images={imgs} 
        pdfs={pdfs}
        onClose={onCloseHandle} 
        onCurrentChange={onCurrentChangeHandle} 
      />
    </div>
  );

};

export default App;
```

#### 多张图片预览
点击左右切换按钮可以预览多张图片


```jsx
import React from 'react';
import { MediaViewer } from 'MO-UI';

const App: React.FC = () => {
  const imgs = [
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      width: 1875,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      width: 1669,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      width: 2500,
      height: 1666,
    },
  ];

  const videos = [
    {
      poster:'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4',
    },
  ];

  const audios = [{src: 'https://www.runoob.com/try/demo_source/horse.ogg'}]

  const pdfs = ['https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf']

  return (
    <MediaViewer.Gallery
      images={imgs}
      videos={videos}
      audios={audios}
      pdfs={pdfs}
    />
  );
};

export default App;
```

## API

属性说明如下：

### MediaViewer

| 参数            | 描述                               | 类型                                                  | 默认值 |
| --------------- | ---------------------------------- | ----------------------------------------------------- | ------ |
| videos          | 视频资源                           | string[ ] \| { src: string; poster?: string; }[ ] | -      |
| videoProps      | video 元素的属性                   | { }                                                   | -      |
| images          | 图片资源         | string[ ] \| { src: string; thumbnailSrc?: string; }[ ]| -      |
| audios          | 音频资源                           | string[ ] \| { src: string; poster?: string; }[ ]       | -      |
| audioProps      | audio 元素的属性                   | { }                                                   | -      |
| pdfs | pdf 文件 | string[ ] \| { src: string; poster?: string; }[ ] | - |
| maskClosable    | 是否可以点击遮罩关闭图片           | boolean                                               | -      |
| current         | 当前展示的资源序号                 | number                                                | -      |
| defaultCurrent  | 当前默认展示的资源序号             | number                                                | -      |
| onCurrentChange | 当前展示资源改变是的 onChange 事件 | ( current: number ) => void                             | -      |
| onClose         | 查看器关闭时的回调函数             | ( ) => void                                           | -      |
| onOpen          | 查看器打开时的回调函数             | ( ) => void                                           | -      |
| visible         | 是否显示                           | boolean                                               | -      |
| defaultVisible  | 是否默认显示                       | boolean                                               | -      |
| onVisibleChange | 当 visible 发生改变时的回调        | { }                                                   | -      |


### Gallery

| 参数      | 描述                 | 类型                                                                      | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------------------- | ------ |
| images      | 图片资源             | string[ ] \| { src: string; thumbnailSrc?: string; }[ ]             | -      |
| videos | 视频资源     | string[ ] \| { src: string; poster?: string; }[ ]             | -      |
| audios   | 音频资源 | string[ ] \| { src: string; poster?: string; }[ ]                              | -      |
| pdfs          | pdf 文件     | string[ ] \| { src: string; poster?: string; }[ ]       | -      |
| defaultCurrent | 当前默认展示的资源序号 | number | - |
| imageSize | 预览图的大小 | number | - |
| viewerProps | MediaViewer 的属性 | [MediaViewerProps](/components/media-viewer#mediaviewer-1)| - |

video 标签的属性见 [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes)
<br />
audio 标签的属性见 [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#attributes)
