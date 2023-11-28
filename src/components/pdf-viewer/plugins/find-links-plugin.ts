import { LayerRenderStatus, Plugin, PluginOnTextLayerRender } from '@react-pdf-viewer/core';
import linkifyElement from "linkify-element";

const findLinksPlugin = (): Plugin => {
    const findLinks = (e: PluginOnTextLayerRender) => {
        if (e.status !== LayerRenderStatus.DidRender) {
            return;
        }

        // `e.ele` represents the element containing all text elements in each page
        // Find all text elements
        e.ele
            // `rpv-core__text-layer-text` PDF 文档中超链接元素的类名
            .querySelectorAll('.rpv-core__text-layer-text')
            .forEach((textEle) => {
                linkifyElement(textEle as HTMLElement, {
                    attributes: {
                        // 自定义样式
                        style: 'color: transparent; text-decoration: none;',
                        // 新窗口打开
                        target: '_blank',
                    },
                });
            });
    };

    return {
        onTextLayerRender: findLinks,

        // renderViewer
    };
};

export default findLinksPlugin;
