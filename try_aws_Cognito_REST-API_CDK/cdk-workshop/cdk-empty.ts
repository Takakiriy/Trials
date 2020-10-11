import cdk = require('@aws-cdk/core');

const templateName = 'CdkWorkshopStack1';
const app = new cdk.App();

class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
new CdkWorkshopStack(app, templateName);
