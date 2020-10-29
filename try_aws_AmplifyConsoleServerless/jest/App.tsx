import React from 'react';
import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import Auth from '@aws-amplify/auth';
import { withAuthenticator } from 'aws-amplify-react';
import App1, {App1Props} from './App1';

Amplify.configure(awsmobile);

class  App extends React.Component<{}, App1Props> {
  render() {
    return (
      <div>
        <h1>
          Hello, <span>{this.state.user.username} !</span>
        </h1>
        <App1 user={this.state.user} ref={this.app1}/>
      </div>
    );
  }

  app1: React.RefObject<App1>;

  constructor(props: any) {
    super(props);
    this.state = new App1Props();
    this.app1 = React.createRef();
  }

  async componentDidMount() {
    if (autheication) {
      let user = await Auth.currentAuthenticatedUser();
      console.log('logged in.');
      console.log(user);
      this.setState({user});
      this.app1.current!.updateObjectInProps();
    }
  }
}

const myTheme = {
  button: { backgroundColor: "white", borderColor: "black" },
};

// autheication
//   - true:  export default withAuthenticator
//   - false: export default App
const autheication = true;  //export default App;
export default withAuthenticator(App, undefined, undefined, null, myTheme, {
  hiddenDefaults: ['phone_number']
});
