import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App1, {App1Props} from './App1';
const app1Props = new App1Props();

test('in App1', async () => {
  render(<App1 user={app1Props.user}/>);

  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();

  // await userEvent.click(screen.getByRole('button', { name: /Call/i }));
  // [WARN] 39:32.17 GraphQLAPI - ensure credentials error No Cognito Identity pool provided for unauthenticated access
});
