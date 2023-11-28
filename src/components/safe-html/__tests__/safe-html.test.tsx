
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import SafeHtml from '../index';

afterEach(cleanup);

test('renders TagList with base use', () => {
  const { container } = render( <SafeHtml html={'<b>我是使用b标签加粗的HTML内容</b>'} />);
  expect(container).toMatchSnapshot();
});





