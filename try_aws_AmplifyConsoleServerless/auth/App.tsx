import React from 'react';
import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(awsmobile);

function App() {
  return (
    <h1>
      Hello World!
    </h1>
  );
}

const myTheme = {
  button: { /* backgroundColor: "white", borderColor: "black" */ },
};

export default withAuthenticator(App, undefined, undefined, null, myTheme, {
  hiddenDefaults: ['phone_number']
});
