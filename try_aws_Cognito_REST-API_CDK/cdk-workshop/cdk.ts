import cdk        = require('@aws-cdk/core');
import lambda     = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');
import cognito    = require('@aws-cdk/aws-cognito');
import { Construct, CallOnceFunction } from './cdk-mylib';

// https://stackoverflow.com/questions/52726914/aws-cdk-user-pool-authorizer
// https://github.com/aws/aws-cdk/issues/906
// https://stackoverflow.com/questions/57547947/api-gateway-failing-to-enable-cors

const cloudformationTemplateName = 'cdk-cognito-example';
console.warn('CDK TypeScript: ' + cloudformationTemplateName);
function main() {
	new MyStack(new cdk.App(), cloudformationTemplateName);
}
class MyStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		Construct();
	}

	RestApiEndpoint = CallOnceFunction<apigateway.RestApi>(() => {
		const restApi = new apigateway.RestApi(this, 'RestApiEndpoint', {
			// apiKeySourceType: apigateway.ApiKeySourceType.HEADER,
			// deployOptions: { stageName: 'Prod' },
		});
		this.addCorsOptions(restApi.root, 'GET,OPTIONS');
		return restApi;
	});

	RootGetLambda = CallOnceFunction<apigateway.Method>(() => {
		return this.RestApiEndpoint().root.addMethod(
			'GET',
			new apigateway.LambdaIntegration( new lambda.Function(this, 'RootGetLambda', {
				runtime: lambda.Runtime.NODEJS_12_X,
				handler: 'index.handler',
				code: this.CodeAsset(),
			})),
			{}
		);
	});

	MyResource = CallOnceFunction<apigateway.Resource>(() => {
		const resource = this.RestApiEndpoint().root.addResource('My');
		this.addCorsOptions(resource, 'GET,OPTIONS');
		return resource;
	});

	MyGetLambda = CallOnceFunction<apigateway.Method>(() => {
		return this.MyResource().addMethod(
			'GET',
			new apigateway.LambdaIntegration(
				new lambda.Function(this, 'MyGetLambda', {
					runtime: lambda.Runtime.NODEJS_12_X,
					handler: 'hello.handler',
					code: this.CodeAsset(),
				})
			),
			{
				// apiKeyRequired: true,
				authorizationType: apigateway.AuthorizationType.COGNITO,
				authorizer : { authorizerId: this.Authorizer().ref },
			}
		);
	});

	CodeAsset = CallOnceFunction<lambda.AssetCode>(() => {
		return lambda.Code.asset('cdk.out/lambda');
	});

	addCorsOptions(resource: apigateway.IResource, methods: string) {
		resource.addMethod('OPTIONS', new apigateway.MockIntegration({
			integrationResponses: [{
				statusCode: '200',
				responseParameters: {
					'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
					'method.response.header.Access-Control-Allow-Origin': "'*'",
					// 'method.response.header.Access-Control-Allow-Credentials': "'false'",
					'method.response.header.Access-Control-Allow-Methods': "'"+ methods +"'",
				}
			}],
			passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_MATCH,
			requestTemplates: {
				"application/json": "{\"statusCode\": 200}"
			}
		}), {
			methodResponses: [{
				statusCode: '200',
				responseParameters: {
					'method.response.header.Access-Control-Allow-Headers': true,
					'method.response.header.Access-Control-Allow-Methods': true,
					'method.response.header.Access-Control-Allow-Credentials': true, // COGNITO
					'method.response.header.Access-Control-Allow-Origin': true,
				}
			}]
		})
	}

	Authorizer = CallOnceFunction<apigateway.CfnAuthorizer>(() => {
		return new apigateway.CfnAuthorizer(this, 'Authorizer', {
			name: 'Authorizer',
			restApiId: this.RestApiEndpoint().restApiId,
			type: apigateway.AuthorizationType.COGNITO,
			identitySource: 'method.request.header.Authorization',
			providerArns: [ this.CognitoUserPool().userPoolArn ],
		});
	});

	CognitoUserPool = CallOnceFunction<cognito.UserPool>(() => {
		const userPool = new cognito.UserPool(this, 'CognitoUserPool', {
			selfSignUpEnabled: true,
			signInAliases: { username: true, email: true, },
			autoVerify: { email: true },
			storage: window.sessionStorage,
			// signInType: cognito.SignInType.USERNAME,
			// usernameAliasAttributes: [cognito.UserPoolAttribute.EMAIL],
			// autoVerifiedAttributes: [cognito.UserPoolAttribute.EMAIL],
		});
		const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;
		cfnUserPool.policies = {
			passwordPolicy: {
				minimumLength: 6,
				requireLowercase: false,
				requireNumbers: false,
				requireUppercase: false,
				requireSymbols: false
			}
		};
		return userPool;
	});

	CognitoUserPoolClient = CallOnceFunction<cognito.UserPoolClient>(() => {
		return new cognito.UserPoolClient(this, 'CognitoUserPoolClient', {userPool: this.CognitoUserPool()});
	});

	CognitoIDPool = CallOnceFunction<cognito.CfnIdentityPool>(() => {
		return new cognito.CfnIdentityPool(this, 'CognitoIDPool', {
			allowUnauthenticatedIdentities: false,
			cognitoIdentityProviders: [{
				clientId: this.CognitoUserPoolClient().userPoolClientId,
				providerName: this.CognitoUserPool().userPoolProviderName,
			}],
		});
	});
}
main();
