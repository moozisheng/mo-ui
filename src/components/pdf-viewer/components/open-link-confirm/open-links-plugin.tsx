import type {
  Plugin,
  PluginOnAnnotationLayerRender,
  PluginOnTextLayerRender,
  RenderViewer,
  Slot,
} from '@react-pdf-viewer/core';
import { createStore } from '@react-pdf-viewer/core';
import linkifyElement from 'linkify-element';
import * as React from 'react';
import ConfirmationModal from './confirmation-modal';
import StoreProps from './store-props';

interface OpenLinksPluginProps {
  openLinkConfirmModalCancelText?: string;
  openLinkConfirmModalOkText?: string;
  linksable?: boolean;
  modalTitle?: string | React.ReactNode;
}

const openLinksPlugin = (props: OpenLinksPluginProps): Plugin => {
  const store = React.useMemo(() => createStore<StoreProps>({}), []);

  React.useEffect(() => {
    store.update('okText', props.openLinkConfirmModalOkText);
    store.update('cancelText', props.openLinkConfirmModalCancelText);
    store.update('linksable', props.linksable);
    store.update('modalTitle', props.modalTitle);
  }, []);

  const handleClick = (e: Event) => {
    e.preventDefault();
    const href = (e.target as HTMLLinkElement).href;
    store.update('clickedTarget', href);
  };

  const findTextLayerLinks = (e: PluginOnTextLayerRender) => {
    // linksable 用于控制文档中的超链接是否可点击并直接在新页面中打开，值为 true 时可点击且在新页面打开
    // openLinkConfirmModalEnable 属性用于控制点击链接时是否弹出确认弹窗
    // 只有 linksable 值为 false 并且 openLinkConfirmModalEnable 属性的值为 true 时才触发点击超链接弹出确认弹窗
    if (store.get('linksable')) return;

    e.ele
      // `rpv-core__text-layer-text` PDF 文档中超链接元素的类名
      .querySelectorAll('.rpv-core__text-layer-text')
      .forEach((textEle) => {
        // 给目标元素添加 a 标签
        linkifyElement(textEle as HTMLElement, {});

        // 这里的 textEle 变成了 a 标签，监听 a 标签的点击事件
        textEle.addEventListener('click', handleClick);
      });
  };

  const findLinks = (e: PluginOnAnnotationLayerRender) => {
    e.container
      .querySelectorAll('a[data-target="external"]')
      .forEach((link) => {
        link.addEventListener('click', handleClick);
      });
  };

  const renderViewer = (renderViewerProps: RenderViewer): Slot => {
    const currentSlot = renderViewerProps.slot;
    if (currentSlot.subSlot) {
      currentSlot.subSlot.children = (
        <>
          <ConfirmationModal store={store} />
          {currentSlot.subSlot.children}
        </>
      );
    }

    return currentSlot;
  };

  return {
    onAnnotationLayerRender: findLinks,
    onTextLayerRender: findTextLayerLinks,

    renderViewer,
  };
};

export default openLinksPlugin;
