import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('in App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello/);
  expect(linkElement).toBeInTheDocument();
});
