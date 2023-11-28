import classnames from 'classnames';
import pick from 'lodash/pick';
import { Item } from 'photoswipe';
import React from 'react';
import events from './events';
import PhotoSwipe from './photo-swipe';
import './photoswipe.css';

interface IProps {
  isOpen: boolean;
  items: Item[];
  options: PhotoSwipe.Options;
  onClose: Function;
  id?: string;
  className?: string;
  thumbnailContent: (item: PhotoItem) => React.ReactNode;
  prevClick?: (item: Item, index: number) => void;
  nextClick?: (item: Item, index: number) => void;
}
interface IState {}

interface PhotoItem extends Item {
  title?: string;
}

class PhotoSwipeGallery extends React.Component<IProps, IState> {
  static defaultProps = {
    options: {},
    thumbnailContent: (item: Item) => (
      <img
        src={item.src}
        width="100"
        // height="100"
        alt=""
      />
    ),
    id: '',
    className: '',
    isOpen: false,
    onClose: () => {},
  };

  thumbnails: PhotoItem[] = [];

  state = {
    isOpen: this.props.isOpen,
    options: this.props.options,
  };

  componentWillReceiveProps = (nextProps: IProps) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.setState({ isOpen: true });
      }
    } else if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  showPhotoSwipe =
    (itemIndex: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      const getThumbBoundsFn = (index: number) => {
        const thumbnail = this.thumbnails[index] as HTMLElement;
        if (thumbnail) {
          const img = thumbnail?.getElementsByTagName('img')?.[0];
          const pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          const rect = img.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
        return { x: 0, y: 0, w: 0 };
      };
      const { options } = this.state;
      options.index = itemIndex;
      options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
      this.setState({
        isOpen: true,
        options,
      });
    };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
    this.props.onClose();
  };

  render() {
    const { id, items, thumbnailContent, ...other } = this.props;
    let { className } = this.props;
    className = classnames(['pswp-gallery', className]).trim();
    const eventProps = pick(other, events);
    const { isOpen, options } = this.state;
    return (
      <div id={id} className={className}>
        <div className="pswp-thumbnails">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(node) => {
                this.thumbnails = this.thumbnails || [];
                this.thumbnails[index] = node as any;
              }}
              className="pswp-thumbnail"
              onClick={this.showPhotoSwipe(index)}
            >
              {thumbnailContent(item)}
            </div>
          ))}
        </div>
        <PhotoSwipe
          {...eventProps}
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}
          prevClick={this.props.prevClick}
          nextClick={this.props.nextClick}
        />
      </div>
    );
  }
}

export default PhotoSwipeGallery;
