import React from 'react';
// @ts-ignore
import { ContextMenu } from 'MO-UI';
import { message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const App: React.FC = () => {
  const onCopy = (text: any, result: any) => {
    message.info(`${text}`);
  };

  return (
    <>
      <ContextMenu
        menu={
          <ul className="menu-container-ul menu-list-container">
            <li>
              <CopyToClipboard onCopy={onCopy} text="自定义菜单一">
                <span>自定义菜单一</span>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard onCopy={onCopy} text="自定义菜单二">
                <span>自定义菜单二</span>
              </CopyToClipboard>
            </li>
          </ul>
        }
      >
        <span>自定义右键菜单</span>
      </ContextMenu>
    </>
  );
};

export default App;
