import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';
import * as React from 'react';

import ReadingIndicator from './reading-indicator';
import StoreProps from './store-props';

export interface ReadingIndicatorPlugin extends Plugin {
  ReadingIndicator: () => React.ReactElement;
}

const readingIndicatorPlugin = (): ReadingIndicatorPlugin => {
  const store = React.useMemo(() => createStore<StoreProps>({}), []);

  const ReadingIndicatorDecorator = () => <ReadingIndicator store={store} />;

  return {
    install: (pluginFunctions: PluginFunctions) => {
      store.update('getPagesContainer', pluginFunctions.getPagesContainer);
    },
    ReadingIndicator: ReadingIndicatorDecorator,
  };
};

export default readingIndicatorPlugin;
