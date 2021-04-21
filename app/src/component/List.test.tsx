import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

test('renders List component', () => {
  render(<List />);
  const linkElement = screen.getByText(/Get repos/i);
  expect(linkElement).toBeInTheDocument();
});
