process.env.ENV = 'dev';
process.env.REGION = 'ap-northeast-1';
process.env.AWS_ACCESS_KEY_ID="AKIAZQ2CH423EDYKKWWG"  // IAM User
process.env.AWS_SECRET_ACCESS_KEY="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"  // IAM User

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
