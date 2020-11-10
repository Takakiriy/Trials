import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import {AppSyncResolverEvent} from 'aws-lambda/trigger/appsync-resolver';
import {CreateExampleMutationVariables} from '../../../../../src/API';
import 'source-map-support/register';

// S3
let bucketName = "own-amplify-storage134338";
if (process.env.ENV && process.env.ENV !== "NONE") {
  bucketName = bucketName + '-' + process.env.ENV;
}
AWS.config.update({ region: process.env.REGION });
const  s3 = new AWS.S3({apiVersion: '2006-03-01'});

const folderInS3 = 'private/ap-northeast-1:54a92713-8c47-42f5-b29a-60fe2ad3fbfc';
const textFileName = '_a.txt';
const binaryFileName = '_pic.png';

// handler
export async function handler(
  event: AppSyncResolverEvent<CreateExampleMutationVariables>,
  _context: any,
  _callback: any
) {
  console.log(event);

  await  listS3Buckets();
  await  putTextToS3();
  await  getTextFromS3();
  //await  putBinaryToS3();
  //await  getBinaryFromS3();
  console.log('done')
}

// listS3Buckets
async function  listS3Buckets() {
	const  buckets = await s3.listBuckets().promise();
	console.log(buckets);
}

// putTextToS3
async function  putTextToS3() {

	await s3.upload({
		Bucket: bucketName,
		Key:  folderInS3 +'/'+ textFileName,
    Body: 'Hello!!!',
    ACL: 'public-read',  // Notice: Default ACL is ownder only
	}).promise();
}

// getTextFromS3
async function  getTextFromS3() {

  const  text = (await s3.getObject({
    Bucket: bucketName,
    Key: folderInS3 +'/'+ textFileName,
  }).promise()).Body!.toString();

  console.log(text);
}

// putBinaryToS3
async function  putBinaryToS3(): Promise<S3.ManagedUpload.SendData> {

  var file = fs.createReadStream(binaryFileName); // A local file
  file.on('error', function(err: any) {
    console.log(err);
  });

  return  s3.upload({
    Bucket: bucketName,
    Key:  folderInS3 +'/'+ binaryFileName,
    Body: file,
    ACL: 'public-read',  // Notice: Default ACL is ownder only
  }).promise();
}

// getBinaryFromS3
async function  getBinaryFromS3(): Promise<void> {
  return new Promise( ( resolveFunction,  rejectFunction ) => {

    var file = fs.createWriteStream('_' + binaryFileName); // A local file
    file.on('close', () => {
      resolveFunction();
    });
    file.on('error', (err: any) => {
      console.log(err);
      rejectFunction();
    });

    s3.getObject({
      Bucket: bucketName,
      Key: folderInS3 +'/'+ binaryFileName,
    }).createReadStream().pipe(file);
  });
}
