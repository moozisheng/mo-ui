import { Store } from '@react-pdf-viewer/core';
import React, { useLayoutEffect } from 'react';

import classNames from 'classnames';
import './index.scss';
import StoreProps from './store-props';

interface ReadingIndicatorProps {
  store: Store<StoreProps>;
}

const ReadingIndicator: React.FC<ReadingIndicatorProps> = ({ store }) => {
  const [percentages, setPercentages] = React.useState(0);

  const handleScroll = (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLDivElement) {
      const p = Math.floor(
        (100 * target.scrollTop) / (target.scrollHeight - target.clientHeight),
      );
      setPercentages(Math.min(100, p));
    }
  };

  const handlePagesContainer = () => {
    const getPagesContainer = store.get('getPagesContainer');
    if (!getPagesContainer) {
      return;
    }

    const pagesEle = getPagesContainer();
    pagesEle.addEventListener('scroll', handleScroll);
  };

  useLayoutEffect(() => {
    store.subscribe('getPagesContainer', handlePagesContainer);

    return () => store.unsubscribe('getPagesContainer', handlePagesContainer);
  }, []);

  return (
    <div className={classNames('h-4px')}>
      <div
        className="reading-progress-bar h-100%"
        style={{
          width: `${percentages}%`,
        }}
      />
    </div>
  );
};

export default ReadingIndicator;
