import {
  LayerRenderStatus,
  Plugin,
  PluginOnCanvasLayerRender,
} from '@react-pdf-viewer/core';

interface IProps {
  message?: string;
}

const drawCanvasPlugin = (props: IProps): Plugin => {
  const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
    // Return if the canvas isn't rendered completely
    if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }

    // `e.ele` is the canvas element
    const canvas = e.ele;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const fonts = ctx.font.split(' ');
    const fontSize = parseInt(fonts[0], 10);

    ctx.textAlign = 'center';
    ctx.font = `${fontSize * e.scale * 4}px ${fonts[1]}`;

    ctx.fillStyle = '#CCC';
    ctx.fillText(props?.message ?? '', centerX, 100);
  };

  return {
    onCanvasLayerRender,
  };
};

export default drawCanvasPlugin;
