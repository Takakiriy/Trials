import React from 'react';
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import Observable from 'zen-observable-ts';
import { createExample } from './graphql/mutations';  //#template: __FirstFunctionName__

class  App1 extends React.Component<App1Props, App1Props> {
  render() {
    return (
      <div>
        Welcome! <span>{this.state.user.username} !</span>
        <button onClick={this.handleChange.bind(this)}>Call</button>
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

  async handleChange(e: any) {
    console.log('calling!');
    const promise = API.graphql(graphqlOperation(
      createExample, {content: 'ABC'}  //#template: __FirstFunctionName__
    ));
    if ('then' in promise) {
      const subscription: GraphQLResult<object> | void =
        await promise.catch((e: object) => {
          console.log(e);
        });
      if (subscription) {
        console.log(subscription);
        console.log('called!');
      }
    } else if ('from' in promise) {
      const  observable = promise as Observable<object>;
      throw new Error(observable.toString());
    }
  }
}

class AWSAuthenticatedUser { // Return value of Auth.currentAuthenticatedUser()
  username: string = 'Unknown';
}

export class App1Props {
  user: AWSAuthenticatedUser = new AWSAuthenticatedUser();
}

export default App1;
