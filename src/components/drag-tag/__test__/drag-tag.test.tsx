
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import DragTag from '../index';

afterEach(cleanup);

test('renders TagList with base use', () => {
   const items = [
    {
      id: 1,
      text: 'Tag 1',
    },
    {
      id: 2,
      text: 'Tag 2',
    },
    {
      id: 3,
      text: 'Tag 3',
    },
  ]
  const { container } = render(<DragTag items={items} color="success" />);
  expect(container).toMatchSnapshot();
});








