import classnames from 'classnames';
import Photoswipe, { Item, Options } from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import React from 'react';

import events from './events';
import './photoswipe.css';

interface PhotoItem extends Item {
  title?: string;
}

interface IProps {
  isOpen: boolean;
  items: Item[];
  options: PhotoSwipe.Options;
  onClose: Function;
  id?: string;
  className?: string;
  prevClick?: (item: Item, index: number) => void;
  nextClick?: (item: Item, index: number) => void;

  [x: string]: any;
}
interface IState {
  isOpen: boolean;
  currItem: PhotoItem;
}

class PhotoSwipe extends React.Component<IProps, IState> {
  static defaultProps = {
    options: {},
    onClose: () => {},
    prevClick: () => {},
    nextClick: () => {},
    id: 'pswpContainer',
    className: '',
  };

  pswpElement: HTMLElement | null = null;
  photoSwipe: Photoswipe<Options> | null = null;

  state = {
    isOpen: this.props.isOpen,
    currItem: {},
  };

  componentDidMount = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.openPhotoSwipe(this.props);
    }
  };

  componentWillReceiveProps = (nextProps: IProps) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.openPhotoSwipe(nextProps);
      } else {
        this.updateItems(nextProps.items);
      }
    } else if (isOpen) {
      this.closePhotoSwipe();
    }
  };

  componentWillUnmount = () => {
    this.closePhotoSwipe();
  };

  openPhotoSwipe = (props: IProps) => {
    const { items, options } = props;
    const pswpElement = this.pswpElement;
    this.photoSwipe = new Photoswipe(
      pswpElement!,
      PhotoswipeUIDefault,
      items,
      options,
    );
    events.forEach((event) => {
      const callback = props[event];
      if (callback || event === 'destroy') {
        // 此处的 this 指向 组件实例
        const self = this;
        this.photoSwipe!.listen(event, function (...args: any[]) {
          // 当前匿名函数内的 this 指向 Photoswipe 实例
          if (callback) {
            args.unshift(this);
            callback(...args);
          }
          if (event === 'destroy') {
            self.handleClose();
          }
        });
      }
    });
    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.photoSwipe!.init();
        // currItem 属性在 photoSwipe 初始化后才有的
        this.setState({
          currItem: this.photoSwipe!.currItem,
        });
      },
    );
  };

  updateItems = (items: Item[] = []) => {
    this.photoSwipe!.items.length = 0;
    items.forEach((item) => {
      this.photoSwipe!.items.push(item);
    });
    this.photoSwipe!.invalidateCurrItems();
    this.photoSwipe!.updateSize(true);
  };

  closePhotoSwipe = () => {
    if (!this.photoSwipe) {
      return;
    }
    this.photoSwipe!.close();
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState(
      {
        isOpen: false,
      },
      () => {
        if (onClose) {
          onClose();
        }
      },
    );
  };

  // 放大
  handleZoomIn = () => {
    let zoomLevel = this.photoSwipe!.getZoomLevel() + 1;
    if (zoomLevel >= 10) zoomLevel = 10;
    const viewportSize = this.photoSwipe!.viewportSize;
    const centerPoint = { x: viewportSize.x / 2, y: viewportSize.y / 2 };
    this.photoSwipe!.zoomTo(zoomLevel, centerPoint, 0);
  };

  // 缩小
  handleZoomOut = () => {
    let zoomLevel = this.photoSwipe!.getZoomLevel() - 0.5;
    if (zoomLevel <= 0) zoomLevel = 0.5;
    const viewportSize = this.photoSwipe!.viewportSize;
    const centerPoint = { x: viewportSize.x / 2, y: viewportSize.y / 2 };
    this.photoSwipe!.zoomTo(zoomLevel, centerPoint, 0);
  };

  handleNext = () => {
    const { nextClick } = this.props;
    this.setState({
      currItem: this.photoSwipe!.currItem,
    });
    nextClick &&
      nextClick(this.photoSwipe!.currItem, this.photoSwipe!.getCurrentIndex());
  };

  handelPrev = () => {
    const { prevClick } = this.props;
    this.setState({
      currItem: this.photoSwipe!.currItem,
    });
    prevClick &&
      prevClick(this.photoSwipe!.currItem, this.photoSwipe!.getCurrentIndex());
  };

  // 设置 photoswipe 容器的 display 属性
  // 在调用 当前组件的页面中使用 Promise load 图片，会出现无法移除 this.pswpElement 的 class 的情况，导致 photoswipe 无法关闭，未排查到原因
  // 故通过设置 display 属性来控制 photoswipe 的显示/隐藏
  resetPhotoSwipeContainterDisplay = () => {
    if (this.pswpElement) {
      if (!this.state.isOpen) {
        this.pswpElement.style.setProperty('display', 'none');
      } else {
        this.pswpElement.style.setProperty('display', 'block');
      }
    }
  };

  render() {
    const { id } = this.props;
    let { className } = this.props;
    className = classnames(['pswp', className]).trim();
    this.resetPhotoSwipeContainterDisplay();

    return (
      <div
        id={id}
        className={className}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={(node) => {
          this.pswpElement = node;
        }}
      >
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />
              {/* <button
                className="pswp__button pswp__button--share"
                title="Share"
              /> */}
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />
              {/* <button className="pswp__button pswp__button--zoom" title="Zoom in/out" /> */}
              <button
                className="pswp__button pswp__button__in"
                title="Zoom in"
                onClick={this.handleZoomIn}
              />
              <button
                className="pswp__button pswp__button__out"
                title="Zoom out"
                onClick={this.handleZoomOut}
              />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
              onClick={this.handelPrev}
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
              onClick={this.handleNext}
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>

            <div className="custom_bottom">
              图片名称: {(this.state.currItem as PhotoItem)?.title}&nbsp;&nbsp;
              <span>
                原始尺寸: {(this.state.currItem as Item).w}x
                {(this.state.currItem as Item).h}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoSwipe;
