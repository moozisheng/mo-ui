import { CommonType } from '@/types/common';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './index.scss';
import {
  findChildren,
  findNode,
  generateELementNodeMap,
  winHeight,
  winWidth,
} from './utils';

export interface MenuProps extends CommonType {
  [x: string]: any;

  /**
   * @description 是否监听 contextmenu、click、scroll 事件，如果设置为false，则自定义右键菜单不生效，会显示浏览器默认的右键菜单
   * @default true
   */
  isAutoListenEvent?: boolean;

  /**
   * @description 用来设置自定义菜单是否可见
   * @default false
   */
  visible?: boolean;

  /**
   * @description 右键菜单的列表内容
   */
  menu?: React.ReactNode;
  /**
   * 设置右键菜单的位置
   */
  position?: { left: number; top: number };

  /**
   * @description 自定义菜单的样式
   */
  style?: { [propsName: string]: any };

  /**
   * @description contextmenu 事件触发时的回调函数
   * @param event
   * @returns
   */
  onContextMenu?: (event: MouseEvent, visible: boolean) => void;

  /**
   * @description 自定义右键菜单的点击事件，如果提供了该事件，则自定义右键菜单默认的点击事件将会失效
   * @param event
   * @returns
   */
  onClick?: (event: MouseEvent) => void;
}

const ContextMenu: React.FC<MenuProps> = forwardRef((props, ref) => {
  const {
    isAutoListenEvent = true,
    menu,
    visible: menuVisible = false,
    position,
    className: menuClassName,
    style,
    onContextMenu,
    onClick,
    ...rest
  } = props;

  const containerId = useId();

  const containerRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(menuVisible);
  const [currentEvent, setCurrentEvent] = useState<MouseEvent | null>(null);

  useImperativeHandle(ref, () => ({
    menuRef,
    visible,
    event: currentEvent,
    handleContextMenu,
    closeMenu,
    openMenu,
  }));

  useEffect(() => {
    setVisible(menuVisible);
  }, [menuVisible]);

  useEffect(() => {
    if (isAutoListenEvent) {
      document
        .getElementById(containerId)
        ?.addEventListener('contextmenu', handleContextMenu);

      // document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('click', handleClick);
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      document
        .getElementById(containerId)
        ?.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const { left, top } = getPosition(
        currentEvent as MouseEvent,
        menuRef.current,
      );
      menuRef.current.style.left = left + 'px';
      menuRef.current.style.top = top + 'px';
    }
  }, [visible]);

  const handleContextMenu = (event: MouseEvent) => {
    // event 触发 contextmenu 事件时的目标对象
    setCurrentEvent(event);
    onContextMenu?.(event, true);

    const findResult = findChildren(event.target, props.children);

    if (!findResult) {
      return;
    }

    // 阻止 contextmenu 事件的默认行为，即阻止默认弹出浏览器的默认菜单
    event.preventDefault();

    setVisible(true);

    const menu = menuRef.current as HTMLElement;

    const { left, top } = getPosition(event, menu);

    if (menu) {
      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
    }

    return false;
  };

  const getPosition = useMemoizedFn(
    (event: MouseEvent, element: HTMLElement) => {
      let left = event?.clientX;
      let top = event?.clientY;

      if (position) {
        left = position.left;
        top = position.top;
      }

      if (left >= winWidth() - element?.offsetWidth) {
        left = winWidth() - element?.offsetWidth;
      }

      if (top > winHeight() - element?.offsetHeight) {
        top = winHeight() - element?.offsetHeight;
      }

      return {
        left,
        top,
      };
    },
  );

  const closeMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };

  const handleClick = (event: any) => {
    event.preventDefault();

    if (menuRef.current) {
      const nodeList = generateELementNodeMap(menuRef.current);
      const findResult = findNode(event.target, nodeList);
      if (onClick && findResult) {
        onClick(event);
        return;
      }
    }

    setVisible(false);
  };
  const handleScroll = (event: any) => {
    setVisible(false);
  };

  return (
    <div className="mo-context-menu-container" ref={containerRef}>
      {visible ? (
        <div
          className={classNames('menu', menuClassName)}
          ref={menuRef}
          style={style ? style : {}}
          {...rest}
        >
          {menu}
        </div>
      ) : (
        <></>
      )}
      <div id={containerId}>{props?.children}</div>
    </div>
  );
});

export default ContextMenu;
