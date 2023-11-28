
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import TagList from '../index';

afterEach(cleanup);

test('renders TagList with base use', () => {
  const { container } = render( <TagList dataSource={['Fackbook', 'TikTok', 'WhatsApp', 'Instagram']}/>);
  expect(container).toMatchSnapshot();
});

test('renders TagList with set all attributes', () => {
  const {container,  getByTestId } = render(<TagList dataSource={['Fackbook', 'TikTok', 'WhatsApp', 'Instagram']} tagProps={{color: 'success'}} />)
  // const copyTextDom = getByTestId('copy-text')
  expect(container).toMatchSnapshot();
});

test('renders TagList with set single tag attribute', () => {

  const dataSource=[
    {
      value: 'Fackbook',
      color: 'success',
    }, 
    {
      value: 'TikTok', 
      color: 'processing',
    },
    {
      value: 'WhatsApp', 
      color: 'warning',
    },
    {
      value: 'Instagram',
      color: 'error',
    },
  ]

  const {container,  getByTestId } = render(<TagList dataSource={dataSource} />)
  // const copyTextDom = getByTestId('copy-text')
  expect(container).toMatchSnapshot();
});





