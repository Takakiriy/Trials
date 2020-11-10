// process.env... = ...;  from env.bat

import {AppSyncResolverEvent} from 'aws-lambda/trigger/appsync-resolver';
import {CreateExampleMutationVariables} from '../../../../../src/API';
import {handler} from './index';

test('in App', () => {
  testEvent.arguments = {content:"c"};

  handler(testEvent, undefined, callback);
});

function callback(_dymmy: any, _event: any) {
}

const  testEvent: AppSyncResolverEvent<CreateExampleMutationVariables> = {
  arguments: {
    content: '',
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
