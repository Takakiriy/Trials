import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import {AppSyncResolverEvent} from 'aws-lambda/trigger/appsync-resolver';
import {CreateUserMutationVariables} from '../../../../../src/API';

// dynamodb
let tableName = "casha7users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

// handler of createUser
export async function handler(
  event: AppSyncResolverEvent<CreateUserMutationVariables>,
  _context: any,
  _callback: any
) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let putItemParams = {
    TableName: tableName,
    Item: event.arguments,
  }

  
  await dynamodb.put(putItemParams).promise()
    .catch( (reason: any) => {
      console.log(reason);
    });
}
