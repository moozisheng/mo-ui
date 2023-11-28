import React, { CSSProperties } from 'react';
import { Tooltip } from 'antd';
import { CopyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon'

import classNames from 'classnames';
import DEFAULT_LOCAL from './locale'
import './index.scss'


export interface IProps {
  copied: boolean;
  locale?: Partial<{ 'copy': string; copied: string }>;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: any) => void;
  [x: string]: any;
}

export interface IconProps  extends AntdIconProps {
  visible?: boolean;
  [x: string]: any
}

export const CopyIcon = (props: IProps) => {

  const { className, locale = DEFAULT_LOCAL, copied, style, onClick, ...restProp } = props;


  return (
    <Tooltip 
      title={<span className="icon-copy-tooltip-title">{copied ? locale.copied : locale.copy}</span>}
      trigger="hover"
      placement="top"
    >
      {
        copied ? (<CheckCircleOutlined {...restProp} className={classNames('icon-copy-text', 'copy-success', className)} />) : (
          <CopyOutlined {...restProp} className={classNames('icon-copy-text', className)} />
        )
      }
    </Tooltip>
  )
}