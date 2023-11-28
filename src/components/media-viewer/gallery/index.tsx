import { useControllableValue, useMemoizedFn } from 'ahooks';
import { Image, ImageProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import {
  errorPlaceholderImg,
  musicPlaceholderImg,
  pdfPlaceholderImg,
} from '../constants';
import { AudioIcon } from '../icons/audio';
import { PlayIcon } from '../icons/play';
import { SearchIcon } from '../icons/search';
import MediaViewer, { MediaViewerProps } from '../index';
import {
  AudioItem,
  ImageItem,
  PDFItem,
  VideoItem,
  getAudios,
  getImages,
  getPDFs,
  getVideos,
} from '../utils';
import './index.scss';

export interface GalleryProps extends Omit<ImageProps, 'src'> {
  /**
   * 当前默认展示的资源序号
   */
  defaultCurrent?: number;

  /**
   * @description 图片资源
   */
  images: Array<ImageItem | string>;

  /**
   * @description 预览图的大小
   */
  imageSize?: number | string;

  /**
   * 视频资源
   */
  videos?: Array<VideoItem | string>;

  /**
   * @description MediaViewer 的属性
   */
  viewerProps?: MediaViewerProps;

  /**
   * @description 音频资源
   */
  audios?: Array<AudioItem | string>;

  pdfs?: Array<PDFItem | string>;
}

const Gallery = (props: GalleryProps) => {
  const {
    className,
    style,
    defaultCurrent,
    images = [],
    imageSize = '4.75em',
    videos = [],
    audios = [],
    pdfs = [],
    viewerProps,
    ...rest
  } = props;

  const [current, setCurrent] = useControllableValue<number | undefined>(
    props,
    {
      defaultValue: undefined,
      defaultValuePropName: 'defaultCurrent',
      valuePropName: 'current',
      trigger: 'onCurrentChange',
    },
  );

  const onCloseHandle = useMemoizedFn(() => {
    setCurrent(undefined);
  });

  const openPreviewHandle = useMemoizedFn((index) => {
    setCurrent(defaultCurrent ?? index);
  });

  const imagesData = getImages(images);
  const videosData = getVideos(videos);
  const audiosData = getAudios(audios);
  const pdfsData = getPDFs(pdfs);

  const genGalleryItem = (type: 'video' | 'image' | 'audio' | 'pdf') => {
    return (
      item: ImageItem | VideoItem | AudioItem | PDFItem,
      index: number,
    ) => {
      const genSrc = () => {
        switch (type) {
          case 'image':
            return (item as ImageItem).thumbnailSrc || errorPlaceholderImg;
          case 'video':
            return (item as VideoItem).poster || errorPlaceholderImg;
          case 'audio':
            return (item as AudioItem).poster || musicPlaceholderImg;
          case 'pdf':
            return (item as PDFItem).poster || pdfPlaceholderImg;
          default:
            return errorPlaceholderImg;
        }
      };

      return (
        <div
          className="image-viewer-thumbnail"
          data-type={type}
          key={`${item.src}-${index}`}
          onClick={openPreviewHandle.bind(null, index)}
        >
          {/.*\.mp4.*?|^[0-9]+$/.test(item.src) ? (
            <PlayIcon className="icon-before" />
          ) : /.*\.(ogg|mp3).*?|^[0-9]+$/.test(item.src) ? (
            <AudioIcon className="icon-before" />
          ) : (
            <SearchIcon className="icon-before" />
          )}
          <div className="mask"></div>

          <Image
            width={imageSize}
            height={imageSize}
            {...rest}
            src={genSrc()}
          />
        </div>
      );
    };
  };

  return (
    <>
      <div
        className={classNames('image-viewer-gallery-scope', className)}
        style={style}
      >
        {imagesData.map(genGalleryItem('image'))}
        {videosData.map((item, idx) =>
          genGalleryItem('video')(item, imagesData.length + idx),
        )}
        {audiosData.map((item, idx) =>
          genGalleryItem('audio')(
            item,
            imagesData.length + videosData.length + idx,
          ),
        )}
        {pdfsData.map((item, idx) =>
          genGalleryItem('pdf')(
            item,
            imagesData.length + videosData.length + audiosData.length + idx,
          ),
        )}
      </div>
      <MediaViewer
        videos={videosData as any}
        images={imagesData as any}
        audios={audiosData as any}
        pdfs={pdfsData}
        current={current}
        onCurrentChange={setCurrent}
        {...viewerProps}
        visible={typeof current === 'number'}
        onClose={onCloseHandle}
      />
    </>
  );
};

export default Gallery;
