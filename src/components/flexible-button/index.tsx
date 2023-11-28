import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, DropDownProps } from 'antd';
import React, { CSSProperties } from 'react';
import { CommonType } from '../../types/common';

type FlexibleButtonsProps = CommonType &
  DropDownProps & {
    /**
     * @description 更多按钮的文案
     */
    text?: string;

    /**
     * 文字样式
     */
    textStyle?: CSSProperties;

    /**
     * 下拉菜单项的点击事件
     */
    onClick?: MenuProps['onClick'];

    /**
     * 菜单配置项
     */
    items: MenuProps['items'];
  };

const FlexibleButtons: React.FC<FlexibleButtonsProps> = (props) => {
  const { className, style, text, textStyle, onClick, items, menu, ...rest } =
    props;

  return (
    <Dropdown menu={{ ...menu, items, onClick }} {...rest}>
      <a
        onClick={(e) => e.preventDefault()}
        style={{ ...textStyle, color: textStyle?.color ?? '#1677ff' }}
        className="text-sm"
      >
        <div className="flex items-center gap-4px">
          {text ?? '更多'}
          <DownOutlined />
        </div>
      </a>
    </Dropdown>
  );
};

export default FlexibleButtons;
