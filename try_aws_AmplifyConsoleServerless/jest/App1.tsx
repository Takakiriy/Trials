import React from 'react';

class  App1 extends React.Component<App1Props, App1Props> {
  render() {
    return (
      <div>
        Welcome! <span>{this.state.user.username} !</span>
      </div>
    );
  }

  constructor(props: App1Props) {
    super(props);
    this.state = {user: this.props.user};
  }

  updateObjectInProps() {
    this.setState({user: this.props.user});
  }
}

class AWSAuthenticatedUser { // Return value of Auth.currentAuthenticatedUser()
  username: string = 'Unknown';
}

export class App1Props {
  user: AWSAuthenticatedUser = new AWSAuthenticatedUser();
}

export default App1;
