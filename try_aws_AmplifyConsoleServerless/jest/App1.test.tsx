import React from 'react';
import { render, screen } from '@testing-library/react';
import App1, {App1Props} from './App1';
const app1Props = new App1Props();

test('in App1', () => {
  render(<App1 user={app1Props.user}/>);

  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();
});
