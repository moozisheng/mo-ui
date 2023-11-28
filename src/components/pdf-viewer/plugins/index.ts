import type { HighlightArea } from '@react-pdf-viewer/highlight';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { ReactNode } from 'react';
import highlightAreasPlugin from '../components/highlight-area';
import openLinksPlugin from '../components/open-link-confirm/open-links-plugin';
import { useReadingProgress } from '../components/reading-progress';
import renderDefaultToolbar from '../components/render-default-toolbar';
import drawCanvasPlugin from './draw-canvas-plugin';
import findLinksPlugin from './find-links-plugin';

interface IProps {
  layoutVisible?: boolean;
  progressBarVisible?: boolean;
  linksable?: boolean;
  openLinkConfirmModalEnable?: boolean;
  openLinkConfirmModalCancelText?: string;
  openLinkConfirmModalOkText?: string;
  openLinkConfirmModalTitle?: string | ReactNode;
  drawMessageOnTopOfPage?: string;
  highlightAreas?: HighlightArea[];
  toolbarMode?: 'default' | 'float';
}

export const initialPlugins = (props: IProps) => {
  const {
    layoutVisible,
    progressBarVisible,
    linksable,
    openLinkConfirmModalEnable,
    openLinkConfirmModalCancelText,
    openLinkConfirmModalOkText,
    openLinkConfirmModalTitle,
    drawMessageOnTopOfPage,
    highlightAreas,
    toolbarMode,
  } = props;

  let pluginsMap: any = {};
  const pluginsArr: any[] = [];

  let renderToolbar = renderDefaultToolbar;

  pluginsMap.renderToolbar = renderToolbar;

  const addPlugin = (plugin: any, name: string) => {
    pluginsMap = {
      ...pluginsMap,
      [name]: plugin,
    };
    pluginsArr.push(plugin);
  };

  if (progressBarVisible) {
    const { readingIndicatorPluginInstance, renderToolbar: progressToolBar } =
      useReadingProgress({});
    addPlugin(readingIndicatorPluginInstance, 'readingIndicatorPluginInstance');
    pluginsMap.renderToolbar = progressToolBar;
  }

  if (linksable) {
    const findLinksPluginInstance = findLinksPlugin();
    addPlugin(findLinksPluginInstance, 'findLinksPluginInstance');
  }

  if (openLinkConfirmModalEnable) {
    const openLinksPluginInstance = openLinksPlugin({
      openLinkConfirmModalCancelText,
      openLinkConfirmModalOkText,
      linksable,
      modalTitle: openLinkConfirmModalTitle,
    });
    addPlugin(openLinksPluginInstance, 'openLinksPluginInstance');
  }

  if (drawMessageOnTopOfPage) {
    const drawCanvasPluginInstance = drawCanvasPlugin({
      message: drawMessageOnTopOfPage,
    });
    addPlugin(drawCanvasPluginInstance, 'drawCanvasPluginInstance');
  }

  if (highlightAreas) {
    const { highlightPluginInstance } = highlightAreasPlugin({
      areas: highlightAreas,
    });
    addPlugin(highlightPluginInstance, 'highlightPluginInstance');
  }

  if (toolbarMode === 'float') {
    const toolbarPluginInstance = toolbarPlugin();
    addPlugin(toolbarPluginInstance, 'toolbarPluginInstance');
  }

  // 因为要在侧边栏上使用 Search 功能，所以在这里初始环 defaultLayoutPluginInstance，需要在首页index.tsx 中初始化 defaultLayoutPluginInstance
  // if (layoutVisible) {
  //   var defaultLayoutPluginInstance = defaultLayoutPlugin({
  //     renderToolbar,
  //     sidebarTabs: SidebarTabs(defaultLayoutPluginInstance),
  //   });
  //   addPlugin(defaultLayoutPluginInstance, 'defaultLayoutPluginInstance');
  // }

  return {
    pluginsMap,
    pluginsArr,
  };
};
