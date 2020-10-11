import cdk        = require('@aws-cdk/core');
import iam        = require('@aws-cdk/aws-iam');
import lambda     = require('@aws-cdk/aws-lambda');
import dynamodb   = require('@aws-cdk/aws-dynamodb');

const awsResources = new Array();
let index: number = 0;

export function Construct() {
  for (const wrapper of awsResources) {
    wrapper();
  }
}

export function CallOnceFunction<ReturnType>(calleeFunction: () => ReturnType ) {
  var called = false;
  var calling = false;
  var result: ReturnType = {} as ReturnType;
  const wrapper = function(){
    if (!called){
      index ++;
      console.warn('aws Resource ' + index + '/' + awsResources.length);
      if (calling) {
        throw new Error('ERROR: circular reference');
      }
      calling = true;

      result = calleeFunction();
      calling = false;
      called = true;
    }
    return result;
  };
  awsResources.push(wrapper);
  return wrapper;
};

export function NodeJS(sourceFileName: string, usingResources?: Array<cdk.Resource>, role?: iam.IRole): lambda.FunctionProps {
  const props: lambda.FunctionProps = {
    runtime: lambda.Runtime.NODEJS_8_10,  // 言語環境は、Node.js 8.10
    code: lambda.Code.asset('cdk.out/lambda'),  // Lambda に入れる *.js ファイルは、cdk.out/lambda フォルダーにある
    handler: sourceFileName +'.handler',  // Lambda が実行する関数は、(sourceFileName).js ファイルの中の export.handler 関数
    environment: { REGION: 'ap-northeast-1' },
    role
  };

  // lambda.FunctionProps.environment = ...
  if (usingResources instanceof Array) {
    usingResources.forEach ((usingResource: cdk.Resource) => {
      if (usingResource instanceof DynamoDBTable) {
        const table: DynamoDBTable = usingResource;

        props.environment![table.environmentVariableName] = table.tableName;
      }
    });
  }
  return props;
}

export class DynamoDBTable extends dynamodb.Table {
	environmentVariableName: string = 'UNDEFINED';

	constructor(scope: cdk.Construct, id: string, props: IDynamoDBTableProps) {
		super(scope, id, props);
		this.environmentVariableName = props.environmentVariableName;
	}
}

export interface IDynamoDBTableProps extends dynamodb.TableProps {
	readonly environmentVariableName: string;
}

export function DynamoDBTableProps(customProps: IDynamoDBTableProps): IDynamoDBTableProps {
  let props = Object.assign( customProps );

  // Overwrite default values
  if (props.billingMode === undefined) {
    props.billingMode = dynamodb.BillingMode.PAY_PER_REQUEST;  // On demand mode
  }
  if (props.removalPolicy === undefined) {
    props.removalPolicy = cdk.RemovalPolicy.DESTROY;
  }
  return props;
}
