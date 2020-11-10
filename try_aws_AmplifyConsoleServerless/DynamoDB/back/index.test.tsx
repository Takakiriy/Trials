// process.env... = ...;  from env.bat

import {AppSyncResolverEvent} from 'aws-lambda/trigger/appsync-resolver';
import {CreateUserMutationVariables} from '../../../../../src/API';
import {handler} from './index';

test('in App', () => {
  testEvent.arguments = {name:"c", userNumber:"5"};

  handler(testEvent, undefined, callback);
});

function callback(dymmy: any, event: any) {
}

const  testEvent: AppSyncResolverEvent<CreateUserMutationVariables> = {
  arguments: {
    name: '',
    userNumber: '',
  },
  request: {
    headers: {},
  },
  info: {
    selectionSetList: [],
    selectionSetGraphQL: '',
    parentTypeName: '',
    fieldName: '',
    variables: {},
  },
}
