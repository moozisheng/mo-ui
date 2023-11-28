import { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface IProps {
  position?: 'top' | 'bottom';
  Toolbar: (
    props: ToolbarProps,
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const FloatingToolBar = (props: IProps) => {
  const { position, Toolbar } = props;

  return (
    <div
      className={classNames(
        'flex',
        'items-center',
        'border-gray-300',
        'border',
        'border-solid',
        'bg-#fafafa',
        'rounded-sm',
        'absolute',
        'p-1',
        'z-1',
        'h-30px',
        'left-50%',
        'translate-x--50%',
        'translate-y-0',
        {
          'bottom-4': position === 'bottom',
          'top-4': position === 'top',
        },
      )}
    >
      <Toolbar>
        {(props: ToolbarSlot) => {
          const {
            ShowSearchPopover,
            CurrentPageInput,
            Download,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            Print,
            Zoom,
            ZoomIn,
            ZoomOut,
          } = props;
          return (
            <>
              <div className={classNames('toolbar-item')}>
                <ShowSearchPopover />
              </div>
              <div className={classNames('toolbar-item')}>
                <GoToPreviousPage />
              </div>
              <div className={classNames('toolbar-item', 'w-12 mr-1')}>
                <CurrentPageInput />
              </div>
              <div className={classNames('toolbar-item')}>
                / <NumberOfPages />
              </div>
              <div className={classNames('toolbar-item')}>
                <GoToNextPage />
              </div>
              <div className={classNames('toolbar-item')}>
                <ZoomOut />
              </div>
              <div className={classNames('toolbar-item')}>
                <Zoom />
              </div>
              <div className={classNames('toolbar-item')}>
                <ZoomIn />
              </div>
              <div className={classNames('toolbar-item')}>
                <EnterFullScreen />
              </div>
              <div className={classNames('toolbar-item')}>
                <Download />
              </div>
              <div className={classNames('toolbar-item')}>
                <Print />
              </div>
            </>
          );
        }}
      </Toolbar>
    </div>
  );
};

export default FloatingToolBar;
