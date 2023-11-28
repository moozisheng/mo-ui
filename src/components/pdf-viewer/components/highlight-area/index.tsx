import type {
  HighlightArea,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import { Trigger, highlightPlugin } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import * as React from 'react';

interface OpenLinksPluginProps {
  areas?: HighlightArea[];
}

const highlightAreas = (props: OpenLinksPluginProps) => {
  const { areas } = props;

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {areas &&
        areas
          .filter((area) => area.pageIndex === props.pageIndex)
          .map((area, idx) => (
            <div
              key={idx}
              className="highlight-area"
              style={Object.assign(
                {},
                {
                  background: 'yellow',
                  opacity: 0.4,
                },
                props.getCssProperties(area, props.rotation),
              )}
            />
          ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
    trigger: Trigger.None,
  });

  return {
    highlightPluginInstance,
  };
};

export default highlightAreas;
