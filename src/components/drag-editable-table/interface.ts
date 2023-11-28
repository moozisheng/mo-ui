import { ButtonProps, FormInstance } from "antd";
import { EditTableItemProps } from "./table-cell";

// import type { ColumnsType } from 'antd/es/table';
type Position = 'bottom' | 'top';

export interface IProps {

  /**
   * 可编辑表格的数据
   */
  dataSource: EditTableItemProps[];
  // formRef?: React.MutableRefObject<FormInstance<any> | undefined>;

  /**
   * 表格列的配置描述
   */
  columns: Array<any>;

  /**
   * 最大的行数，到达最大行数新建按钮会自动消失
   */
  maxLength?: number;

  /**
   * 排序图标的位置
   */
  sortPosition: 'left' | 'right';

  /**
   * 所有行是否可编辑，默认可编辑
   */
  allRowsEditable?: boolean;

  /**
   * 展示在表格底部的错误提示
   */
  errorTip?: React.ReactNode | string;

  /**
   * 可编辑表格的相关配置
   */
  editableProps?: {
    onSave?: (key: string | number, row: any) => Promise<any>;
    saveText?: React.ReactNode;

    onCancel?: (key: string | number, row: any) => Promise<any>;
    cancelText?: React.ReactNode;

    onDelete?: (key: string | number, row: any) => Promise<any>;
    deleteText?: React.ReactNode;

    // table 的 scroll 属性
    scroll?: { x?: string | number | true; y?: string | number };
  };

  /**
   * @description 新增一行按钮的相关配置
   */
  recordCreatorProps?: IRecordCreatorProps | false;
}

export interface IRecordCreatorProps extends ButtonProps {

  /**
   * @description 按钮的位置
   */
  position: Position;

  /**
   * @description 按钮的颜色设置
   */
  style?: React.CSSProperties;

  /**
   * @description 设置按钮文案
   */
  text?: React.ReactNode;

  /**
   * @description 设置新建按钮的图表
   */
  icon?: React.ReactNode;

  /**
   * 新增一行的数据，如果不写 key ，会使用 index 作为行 id
   */
  record?: () =>({
    /**
     * @description 每次新增的时候需要Key
     */
    id: string | number;
    [x: string]: any;
  });

  // https://ant.design/components/button-cn/#API

}
