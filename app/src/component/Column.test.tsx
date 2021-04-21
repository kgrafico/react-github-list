import React from 'react';
import { render, screen } from '@testing-library/react';
import Column from './Column';

const prop = {
  name: 'test',
  html_url: 'www.test.com',
  forks: '23',
  stargazers_count: '23'
}

test('renders column component', () => {
  render(<Column column={prop} />);
});
