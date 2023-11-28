import { ReactNode } from "react";
import { CommonType } from "../../types/common";
 interface IDragTagProps extends CommonType {
  /**
   * @description 标签项
   */
  items: Item[],

  /**
   * @description 标签色
   */
  color?: string;

  /**
   * @description 是否有边框
   */
  bordered?: boolean;

  /**
   * @description 设置图标
   */
  icon?: ReactNode

  /**
   * @description 标签移动时的onChange回调
   * @param data 
   * @returns 
   */
  onChange?: (data: Item[]) => void

  onClose?: (e: MouseEvent) => void
  closeIcon?: ReactNode;
  closable?: boolean;
}

export type DragTagProps = Omit<IDragTagProps, 'onClose' | 'closeIcon' | 'closable'>;

export type Item = {
  id: number | string;
  text: string;
};

export type DraggableTagProps = CommonType & {
  tag: Item;
};