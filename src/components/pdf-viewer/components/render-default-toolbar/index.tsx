import { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';
import classNames from 'classnames';
import React from 'react';
import './index.scss';

export default (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
  <>
    {/* <Toolbar /> */}
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
          Open,
          SwitchTheme,
        } = slots;
        return (
          <div
            className={classNames(
              'flex',
              'items-center',
              'w-100%',
              'justify-around',
              'pl-1',
              'pr-1',
            )}
          >
            <div className={classNames('flex', 'items-center', 'grow')}>
              {/* 在侧边栏开启 Search 功能，因此移除 toolbar 的 Search 功能 */}
              {/* <div className={classNames('toolbar-item')}>
                <ShowSearchPopover />
              </div> */}

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
            </div>

            <div
              className={classNames(
                'flex',
                'items-center',
                'justify-center',
                'grow',
              )}
            >
              <div className={classNames('toolbar-item')}>
                <ZoomOut />
              </div>
              <div className={classNames('toolbar-item')}>
                <Zoom />
              </div>
              <div className={classNames('toolbar-item')}>
                <ZoomIn />
              </div>
            </div>

            <div
              className={classNames(
                'flex',
                'items-center',
                'justify-end',
                'grow',
              )}
            >
              <div className={classNames('toolbar-item')}>
                <SwitchTheme />
              </div>
              <div className={classNames('toolbar-item')}>
                <EnterFullScreen />
              </div>
              <div className={classNames('toolbar-item')}>
                <Open />
              </div>
              <div className={classNames('toolbar-item')}>
                <Download />
              </div>
              <div className={classNames('toolbar-item')}>
                <Print />
              </div>
            </div>
          </div>
        );
      }}
    </Toolbar>
  </>
);
