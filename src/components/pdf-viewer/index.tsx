import { CommonType } from '@/types/common';
import type { PageLayout } from '@react-pdf-viewer/core';
import {
  LocalizationMap,
  RenderPage,
  RenderPageProps,
  Viewer,
} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {
  SidebarTab,
  defaultLayoutPlugin,
} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import zh_CN from '@react-pdf-viewer/locales/lib/zh_CN.json';
import classNames from 'classnames';
import React, { ReactNode, forwardRef } from 'react';
import FloatingToolBar from './components/floating-toolbar';
import PageContainer from './components/page-container';
import RotateButtonSinglePage, {
  RotateButtonSinglePageProps,
} from './components/rotate-button-single-page';
import SearchSidebar from './components/search-sidebar';
import WaterMark, { WaterMarkProps } from './components/water-mark/water-mark';
import './index.scss';
import { initialPlugins } from './plugins';

import { SearchIcon } from '@react-pdf-viewer/search';

export enum RotateDirection {
  Backward = 'Backward',
  Forward = 'Forward',
}

interface OpenFile {
  data: string | Uint8Array;
  name: string;
}

export interface PDFViewerProps extends CommonType {
  /**
   * @description PDF 文档的链接地址
   */
  src: string;

  /**
   * @description 水印
   */
  waterMark?: string;

  /**
   * @description 水印的属性，可设置水印的字体属性等
   */
  waterMarkProps?: WaterMarkProps;

  /**
   * @description 是否显示顺时针/逆时针旋转按钮
   */
  rotateButtonVisible?: boolean;

  /**
   * @description 顺时针/逆时针旋转按钮的属性
   */
  rotateButtonProps?: Omit<RotateButtonSinglePageProps, 'onRotatePage'>;

  /**
   * @description 设置页面之间的间距
   */
  pageMargin?: { height: number; width: number };

  /**
   * @description 是否显示默认的工具栏和侧边栏
   */
  layoutVisible?: boolean;

  /**
   * @description 是否显示阅读进度条
   */
  progressBarVisible?: boolean;

  /**
   * @description 文档中的超链接是否可点击，点击后新窗口打开链接内容
   */
  linksable?: boolean;

  /**
   * @description 是否开启点击PDF文档中的超链接跳转新页面确认弹窗，只有 linksable 值为 false 时才生效
   */
  openLinkConfirmModalEnable?: boolean;

  /**
   * @description 点击PDF文档中的超链接跳转新页面确认弹窗的 Cancel 按钮的文字
   */
  openLinkConfirmModalCancelText?: string;
  /**
   * @description 点击PDF文档中的超链接跳转新页面确认弹窗的 OK 按钮的文字
   */

  openLinkConfirmModalOkText?: string;
  /**
   * @description 点击PDF文档中的超链接跳转新页面确认弹窗的标题
   */

  openLinkConfirmModalTitle?: string | ReactNode;

  /**
   * @description 在PDF文档每一页的顶部要绘制的信息
   */
  drawMessageOnTopOfPage?: string;

  /**
   * @description 查看器的高度
   */
  height?: number;

  /**
   * @description toolbar的显示模式 default: 固定在顶部，当 layoutVisible 为true时才显示生效;  float: 浮动模式，可浮动在顶部或底部，当 layoutVisible 为false时才生效
   */
  toolbarMode?: 'default' | 'float';

  /**
   * @description toolbarMode 为 float 时，toolbar的位置 top: 顶部  bottom: 底部
   */
  toolbarPostion?: 'top' | 'bottom';

  /**
   * @description 加载文档的附加身份验证标头
   */
  httpHeaders?: Record<string, string | string[]>;

  /**
   * @description 是否允许从受保护的资源加载文档
   */
  withCredentials?: boolean;

  /**
   * @description 文档放大缩小时的回调函数
   * @param e ZoomEvent
   * @returns
   */
  onZoom?: (e: { scale: number; doc: any }) => void;

  /**
   * @description 切换主题时的回调函数
   * @param theme
   * @returns
   */
  onSwitchTheme?: (theme: 'auto' | 'dark' | 'light') => void;

  /**
   * @description 顺时针/逆时针旋转单个页面时的回调函数
   * @param e
   * @returns
   */
  onRotatePage?: (e: {
    pageIndex: number;
    rotation: number;
    direction: 'Backward' | 'Forward';
    doc: any;
  }) => void;

  /**
   * @description 顺时针/逆时针 旋转文档时的回调函数
   * @param e
   * @returns
   */
  onRotate?: (e: {
    rotation: number;
    direction: 'Backward' | 'Forward';
    doc: any;
  }) => void;

  /**
   * @description 翻页时的回调函数
   * @param e
   * @returns
   */
  onPageChange?: (e: { currentPage: number; doc: any }) => void;

  /**
   * @description 文档加载完成时的回调函数
   * @param e
   * @returns
   */
  onDocumentLoad?: (e: { file: OpenFile; doc: any }) => void;

  /**
   * @description 当受保护的文档需要密码才能打开时调用
   * @param e
   * @returns
   */
  onDocumentAskPassword?: (e: {
    verifyPassword: (password: string) => void;
  }) => void;

  // highlightAreas: HighlightArea[];

  // renderPageProps?: RenderPageProps;
}

const PDFViewer = forwardRef(
  (props: PDFViewerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      style,
      src,
      waterMark,
      waterMarkProps,
      rotateButtonVisible = false,
      rotateButtonProps,
      layoutVisible = true,
      progressBarVisible = false,
      linksable = false,
      openLinkConfirmModalEnable = false,
      openLinkConfirmModalCancelText,
      openLinkConfirmModalOkText,
      openLinkConfirmModalTitle,
      drawMessageOnTopOfPage,
      height = 600,
      toolbarMode = 'default',
      toolbarPostion = 'top',

      pageMargin = { height: 30, width: 30 },
      ...rest
    } = props;

    // const toolbarPluginInstance = toolbarPlugin();
    // const { Toolbar } = toolbarPluginInstance;

    const pageLayout: PageLayout = {
      transformSize: ({ size }) => ({
        height: size.height + pageMargin.height,
        width: size.width + pageMargin.width,
      }),
    };

    const plugins = initialPlugins({
      layoutVisible,
      progressBarVisible,
      linksable,
      openLinkConfirmModalEnable,
      openLinkConfirmModalCancelText,
      openLinkConfirmModalOkText,
      openLinkConfirmModalTitle,
      drawMessageOnTopOfPage,
      toolbarMode,
    });

    // 要在侧边栏上使用 Search 功能，需要在 这里初始化 defaultLayoutPluginInstance ，因为要在 SearchSidebar 里传入 defaultLayoutPluginInstance
    // 在侧边栏上使用 Search 功能，则需要移除 toolbar 的Search 功能
    // 如果不在侧边栏上使用 Search 功能，应在 plugins 文件中初始化 defaultLayoutPluginInstance
    if (layoutVisible) {
      const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar: plugins.pluginsMap.renderToolbar,
        sidebarTabs: (defaultTabs: SidebarTab[]) =>
          [
            {
              content: (
                <SearchSidebar
                  searchPluginInstance={
                    defaultLayoutPluginInstance.toolbarPluginInstance
                      .searchPluginInstance
                  }
                />
              ),
              icon: <SearchIcon />,
              title: zh_CN.search.search,
            },
          ].concat(defaultTabs),
      });
      plugins.pluginsArr.push(defaultLayoutPluginInstance);
    }

    const renderPage: RenderPage = (props: RenderPageProps) => (
      <PageContainer {...props}>
        {waterMark && (
          <WaterMark
            waterMark={waterMark}
            scale={props.scale}
            {...waterMarkProps}
          />
        )}

        {rotateButtonVisible && (
          <RotateButtonSinglePage {...props} {...rotateButtonProps} />
        )}
      </PageContainer>
    );

    return (
      <div
        ref={ref}
        className={classNames(
          'pdf-viewer-container',
          'rpv-core__viewer',
          'flex',
          'h-100%',
          'position-relative',
          className,
        )}
        style={{
          ...style,
        }}
      >
        {!layoutVisible && toolbarMode === 'float' && (
          <FloatingToolBar
            position={toolbarPostion}
            Toolbar={plugins.pluginsMap?.toolbarPluginInstance?.Toolbar}
          />
        )}

        <div
          className="flex-1"
          style={{
            height,
          }}
        >
          <Viewer
            fileUrl={src}
            renderPage={renderPage}
            pageLayout={pageLayout}
            plugins={[...plugins.pluginsArr]}
            localization={zh_CN as unknown as LocalizationMap}
            {...rest}
          />
        </div>
      </div>
    );
  },
);

export default PDFViewer;
