
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import CopyText from '../index';

afterEach(cleanup);

test('renders CopyText without name by snapshot', () => {
  const { container } = render(<CopyText value='我是被复制的文本内容'>复制内容</CopyText>);
  expect(container).toMatchSnapshot();
});

test('renders CopyText have text content', () => {
  const {container,  getByTestId } = render(<CopyText data-testid='copy-text' value="我是被赋值的文本内容">我是被赋值的文本内容</CopyText>);
  const copyTextDom = getByTestId('copy-text')

  expect(container).toHaveTextContent('我是被赋值的文本内容')
  expect(copyTextDom).not.toHaveClass('[&_>.icon-wrap]:hidden')
  expect(copyTextDom).not.toHaveClass('[&_>.icon-wrap]:hidden [&:hover_>.icon-wrap]:inline-flex')
  expect(container).toMatchSnapshot();
});

test('renders CopyText have class with hoverShowEdit', () => {
  const {container,  getByTestId } = render(<CopyText hoverShowEdit data-testid='copy-text' value="我是被赋值的文本内容">我是被赋值的文本内容</CopyText>);
  const copyTextDom = getByTestId('copy-text')

  expect(copyTextDom).toHaveClass('[&_>.icon-wrap]:hidden')
  expect(copyTextDom).toHaveClass('[&_>.icon-wrap]:hidden [&:hover_>.icon-wrap]:inline-flex')
  expect(container).toMatchSnapshot();
});

test('renders CopyText click', async () => {
  const onClick = jest.fn();
  const {container,  getByTestId } = render(<CopyText onClick={onClick} data-testid='copy-text' value="我是被赋值的文本内容" iconProps={{
     "data-testid": 'copy-icon'
  }}>我是被赋值的文本内容</CopyText>);
  const copyTextDom = getByTestId('copy-text')
  await fireEvent.click(copyTextDom)
  expect(onClick).toHaveBeenCalledTimes(1);
 
  //  expect(getByTestId('copy-icon')).toHaveClass('copy-success')
  expect(container).toMatchSnapshot();
});