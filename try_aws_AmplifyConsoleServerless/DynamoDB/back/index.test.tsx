process.env.ENV = 'staging';
process.env.TABLE_REGION = 'ap-northeast-1';
process.env.AWS_ACCESS_KEY_ID="AKIA3V7BCLJRY6MVBMPM"
process.env.AWS_SECRET_ACCESS_KEY="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"

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
