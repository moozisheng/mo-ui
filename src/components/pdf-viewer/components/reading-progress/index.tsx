import { ToolbarProps } from '@react-pdf-viewer/default-layout';
import React from 'react';

import readingIndicatorPlugin from './reading-indicator-plugin';

export const useReadingProgress = (props?: any) => {
  const readingIndicatorPluginInstance = readingIndicatorPlugin();
  const { ReadingIndicator } = readingIndicatorPluginInstance;

  const renderToolbar = React.useCallback(
    (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
      <>
        <Toolbar />
        <div className="-bottom-1 absolute left-0 w-100%">
          <ReadingIndicator />
        </div>
      </>
    ),
    [],
  );

  return {
    renderToolbar,
    readingIndicatorPluginInstance,
  };
};
