import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import React, { useState } from 'react';
import MediaViewer from '../index';

afterEach(cleanup);

test('renders MediaViewer with album mode', () => {
  const imgs = [
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      width: 1875,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      width: 1669,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      width: 2500,
      height: 1666,
    },
  ];

  const videos = [
    {
      poster:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4',
    },
  ];

  const audios = [{ src: 'https://www.runoob.com/try/demo_source/horse.ogg' }];

  const [visible, setVisible] = useState(false);

  const { container } = render(
    <MediaViewer
      visible={visible}
      videos={videos}
      audios={audios}
      images={imgs}
    />,
  );
  expect(container).toMatchSnapshot();
});

test('renders MediaViewer with preview multiple images', () => {
  const imgs = [
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      width: 1875,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      width: 1669,
      height: 2500,
    },
    {
      src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      thumbnailSrc:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      width: 2500,
      height: 1666,
    },
  ];

  const videos = [
    {
      poster:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4',
    },
  ];

  const audios = [{ src: 'https://www.runoob.com/try/demo_source/horse.ogg' }];

  const { container } = render(
    <MediaViewer.Gallery images={imgs} videos={videos} audios={audios} />,
  );
  expect(container).toMatchSnapshot();
});
