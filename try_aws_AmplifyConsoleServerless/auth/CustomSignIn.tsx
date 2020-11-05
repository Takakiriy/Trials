import React from 'react';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import './App.css';
import '@aws-amplify/ui/dist/style.css';
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';

Amplify.configure(awsmobile);

class  App extends React.Component<{}, AppProps> {
  render() {
    if (!this.state.signIn) {
      return (
        <button onClick={this.signIn.bind(this)}>Sign In</button>
      );
    } else {
      if (this.state.authState !== 'signedIn') {
        return (
          <Authenticator
              hideDefault={true}
              theme={myTheme}
              onStateChange={this.handleAuthStateChange.bind(this)}
              authState={this.state.authState}>
            <SignIn/>
            <SignUp signUpConfig={signUpConfig}/>
            <ConfirmSignUp/>
            <Greetings/>
          </Authenticator>
        );
      } else {
        return (
          <button onClick={this.signOut.bind(this)}>Sign Out</button>
        );
      }
    }
  }

  constructor(props: AppProps) {
    super(props);
    this.state = new AppProps();
  }

  handleAuthStateChange(authState: string, data?: any) {
    if (this.setState) {
      this.setState({authState});
    }
  }

  signUp() {
    this.setState({signIn: true, authState: 'signUp'});
  }

  signIn() {
    this.setState({signIn: true, authState: 'signIn'});
  }

  async signOut() {
    try {
      await Auth.signOut();
      this.setState({signIn: false});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}

const myTheme = {
    button: { backgroundColor: "blue", borderColor: "gray"},
    formSection: { backgroundColor: "white" },
    sectionHeader: { backgroundColor: "white", display: "block" },
    inputLabel: { color: "white" },
    input: { color: "black", backgroundColor: "white" },
      // See "input:-webkit-autofill" in App.css
};

const signUpConfig = {
  signUpFields: [
    { label: 'ユーザーID', key: 'username', required: true, placeholder: '', type: 'email', displayOrder: 1 },
    { label: 'パスワード', key: 'password', required: true, placeholder: '', type: 'password', displayOrder: 2 }
  ],
  hiddenDefaults: ['phone_number'],
};

class AppProps {
  signIn: boolean = false;
  authState: string = 'signIn';
}

export default App;
