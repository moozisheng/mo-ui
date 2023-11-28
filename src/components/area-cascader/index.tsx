import { CommonType } from '@/types/common';
import { Cascader } from 'antd';
import classNames from 'classnames';
import React from 'react';
import pcCode from './data-source/antd-pc-code';
import pcaCode from './data-source/antd-pca-code';
import pcasCode from './data-source/antd-pcas-code';

export interface IProps extends CommonType {
  /**
   * @description 数据的类型，pc: 省市二级联动；pca: 省市区(县)三级联动；pcas:  省市区(县)乡镇四级联动
   */
  type?: 'pc' | 'pca' | 'pcas';
}

const AreaCascader = (props: IProps) => {
  const { className, type = 'pc', ...rest } = props;

  const getDataSource = () => {
    switch (type) {
      case 'pc':
        return pcCode;
      case 'pca':
        return pcaCode;
      case 'pcas':
        return pcasCode;
      default:
        return pcCode;
    }
  };

  return (
    <Cascader
      placeholder="请选择"
      allowClear
      showSearch
      expandTrigger="hover"
      className={classNames({ className })}
      options={getDataSource()}
      {...rest}
    />
  );
};

export default AreaCascader;
