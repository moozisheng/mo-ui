import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import HelpTip from '../index';

afterEach(cleanup);

test('renders TagList with base use', () => {
  const { container } = render(
    <HelpTip help="这里是帮助提示信息">帮助提示</HelpTip>,
  );
  expect(container).toMatchSnapshot();
});

test('renders TagList with base use', () => {
  const { container } = render(
    <HelpTip help="这里是帮助提示信息" iconOnly>
      帮助提示
    </HelpTip>,
  );
  expect(container).toMatchSnapshot();
});
