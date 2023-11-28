import { CommonType } from '@/types/common';
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { useControllableValue, useCreation } from 'ahooks';
import { Image, Space } from 'antd';
import classNames from 'classnames';
import get from 'lodash/get';
import React from 'react';
import PDFViewer from '../pdf-viewer';
import { meidaAudioClassName, pdfContainerClassName } from './constants';
import Gallery from './gallery';
import './index.scss';
import {
  AudioItem,
  ImageItem,
  PDFItem,
  VideoItem,
  getAudios,
  getImages,
  getPDFs,
  getVideos,
} from './utils';

export interface MediaViewerProps extends CommonType {
  /**
   * 视频资源
   */
  videos?: Array<ImageItem | string>;

  /**
   * 视频元素的属性
   */
  videoProps?: { [x: string]: any };

  /**
   * @description 图片资源
   */
  images?: Array<VideoItem | string>;

  /**
   * @description 音频资源
   */
  audios?: Array<AudioItem | string>;

  /**
   * @description audio 元素的属性
   */
  audioProps?: CommonType;

  /**
   * 是否可以点击遮罩关闭图片
   */
  maskClosable?: boolean;

  /**
   * 当前展示的资源序号
   */
  current?: number;

  /**
   * 当前默认展示的资源序号
   */
  defaultCurrent?: number;

  /**
   * @description 当前展示资源改变是的onChange事件
   * @param current 当前的图片资源序号
   * @returns
   */
  onCurrentChange?: (current: number) => void;

  /**
   * @description 查看器关闭时的回调函数
   * @returns
   */
  onClose?: () => void;

  /**
   * @description 查看器打开时的回调函数
   * @returns
   */
  onOpen?: () => void;

  /**
   * @description 是否显示
   */
  visible?: boolean;

  /**
   * @description 是否默认显示
   */
  defaultVisible?: boolean;

  /**
   * @description 当 visible 发生改变时的回调
   * @param visible
   * @returns
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * @description pdf 文件
   */
  pdfs?: Array<PDFItem | string>;
}

const MediaViewer = (props: MediaViewerProps) => {
  const {
    className,
    style,
    videos,
    videoProps,
    images,
    audios,
    audioProps = { className: '' },
    pdfs,
  } = props;

  const { className: audioClassName, ...audioRest } = audioProps as CommonType;

  let videoRef: any;
  let audioRef: any;
  let pdfsRef: any;

  // 设置受控的 current
  const [current, setCurrent] = useControllableValue(props, {
    defaultValue: 0,
    defaultValuePropName: 'defaultCurrent',
    valuePropName: 'current',
    trigger: 'onCurrentChange',
  });

  // 设置受控的 visible
  const [visible, setVisible] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultVisible',
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
  });

  const visibleChangeHandle = (visible: boolean) => {
    if (visible) {
      props.onOpen?.();
    } else {
      // 弹窗关闭后将展示的资源重置为第一个
      setCurrent(0);
      // 弹窗关闭后停止视频播放
      (videoRef?.current as HTMLVideoElement)?.pause();
      // 弹窗关闭后停止音频播放
      (audioRef?.current as HTMLAudioElement)?.pause();

      props.onClose?.();
    }
    setVisible(visible);
  };

  const videosData = useCreation(() => getVideos(videos), [videos]);

  return (
    <div
      className={classNames('media-viewer-container', className)}
      style={style}
    >
      <Image.PreviewGroup
        preview={{
          visible,
          current,
          getContainer: '.media-viewer-container',
          onChange: setCurrent,
          onVisibleChange: visibleChangeHandle,

          imageRender: (imgEle, { transform }) => {
            const src = get(imgEle, 'props.src');
            const scale = transform.scale;
            const transformCss = `translate3d(${transform.x / 2}px, ${
              transform.y / 2
            }px, 0) scale3d(${transform.flipX ? -scale : scale}, ${
              transform.flipY ? -scale : scale
            }, 1) rotate(${transform.rotate}deg)`;

            // 渲染音频
            if (getAudios(audios)?.some((item) => item.src === src)) {
              const props = (imgEle as any)!.props;
              audioRef = props.imgRef;

              return (
                <audio
                  className={classNames(meidaAudioClassName, audioClassName)}
                  controls
                  preload="auto"
                  loop={true}
                  style={{
                    transform: transformCss,
                  }}
                  ref={props.imgRef}
                  {...audioRest}
                >
                  <source src={props.src} />
                </audio>
              );
            }

            // 渲染视频
            if (videosData?.some((item) => item.src === src)) {
              const props = (imgEle as any)!.props;
              videoRef = props.imgRef;

              return (
                <video
                  controls
                  loop={true}
                  autoPlay={true}
                  style={{
                    transform: transformCss,
                  }}
                  className={className}
                  {...videoProps}
                  ref={props.imgRef}
                >
                  {/*@ts-ignore*/}
                  <source src={props.src!} autoPlay />
                </video>
              );
            }

            // 渲染 PDF
            if (getPDFs(pdfs)?.some((item) => item.src === src)) {
              const props = (imgEle as any)!.props;

              pdfsRef = props.imgRef;

              return (
                <div ref={props.imgRef} className={pdfContainerClassName}>
                  <PDFViewer
                    // layoutVisible
                    src={props.src}
                    style={{
                      width: 1024,
                      transform: transformCss,
                    }}
                  />
                </div>
              );
            }

            // 渲染图片
            return imgEle;
          },
          toolbarRender: (
            _,
            {
              transform: { scale },
              actions: {
                onFlipY,
                onFlipX,
                onRotateLeft,
                onRotateRight,
                onZoomOut,
                onZoomIn,
              },
            },
          ) => {
            const pdfZoomOutDisiabled =
              pdfsRef?.current?.className === pdfContainerClassName;

            const audioZoomOutDisiabled =
              audioRef?.current?.className === meidaAudioClassName;

            return (
              <Space size={12} className="media-viewer-toolbar-wrapper">
                {/* <DownloadOutlined onClick={() => {}} /> */}
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined
                  disabled={
                    pdfZoomOutDisiabled || audioZoomOutDisiabled || scale === 1
                  }
                  onClick={onZoomOut}
                />
                <ZoomInOutlined
                  disabled={
                    pdfZoomOutDisiabled || audioZoomOutDisiabled || scale === 50
                  }
                  onClick={onZoomIn}
                />
              </Space>
            );
          },
        }}
      >
        {/* 图片 */}
        {getImages(images)?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.thumbnailSrc}
              preview={{ src: item.src }}
              style={{ display: 'none' }}
              data-video
            />
          );
        })}
        {/* 视频 */}
        {videosData?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.poster}
              preview={{ src: item.src }}
              style={{ display: 'none' }}
              data-image
            />
          );
        })}

        {/* 音频 */}
        {getAudios(audios)?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.src}
              preview={{ src: item.src }}
              style={{ display: 'none' }}
              data-audio
            />
          );
        })}

        {getPDFs(pdfs)?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.src}
              preview={{ src: item.src }}
              style={{ display: 'none' }}
              data-pdf
            />
          );
        })}
      </Image.PreviewGroup>
    </div>
  );
};
MediaViewer.Gallery = Gallery;

export default MediaViewer;
