<!--
title: 'AWS: Lambda, S3 and Step Functions with NodeJS and TypeScript'
description: 'This template demonstrates how to use the Serverless Framework to provision AWS S3 Buckets, generate pre-signed URLs via a Lambda endpoint and use the pre-signed URL to upload files to an S3 bucket. Once uploaded, `s3:CreateObject` events trigger AWS Step Functions that begin a series of validation steps on the file. The project is built with Node.js and TypeScript running on AWS Lambda and API Gateway.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS, TypeScript
authorLink: 'https://www.jonsully1.dev'
authorName: "John O'Sullivan"
authorAvatar: 'https://www.jonsully1.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.da25c720.jpeg&w=1080&q=75'
-->

# AWS: Lambda, S3 and Step Functions with NodeJS and TypeScript

This template demonstrates how to use the Serverless Framework to provision AWS S3 Buckets, generate pre-signed URLs via a Lambda endpoint and use the pre-signed URL to upload files to an S3 bucket. Once uploaded, `s3:CreateObject` events trigger AWS Step Functions that begin a series of validation steps on the file. The project is built with Node.js and TypeScript running on AWS Lambda and API Gateway.

## Local Development

Run the `yarn sls-dev` script in `package.json`. It runs `severless-offline` with a `--reloadHandler` flag that acts as hot reload after code changes:

```bash
yarn sls-dev
```

Example:

```bash
❯ yarn sls-dev
yarn run v1.22.19
warning package.json: No license field
$ sls offline --reloadHandler --stage dev
starting handler
warn: replaced cors config for bucket "validated-files-bucket"
warn: replaced cors config for bucket "holding-area-bucket"
S3 local started ( port:4569, family: IPv6, address: ::1 )

Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * getPresignedUrl: lambda-s3-step-functions-test-dev-getPresignedUrl
           * testStepFunction: lambda-s3-step-functions-test-dev-testStepFunction

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   GET | http://localhost:4000/dev/assets/{key}                                  │
│   POST |                                                                        │
│   http://localhost:4000/2015-03-31/functions/getPresignedUrl/invocations        │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:4000 🚀

```
### Test the `getPresignedUrl` endpoint locally

```bash
curl http://localhost:4000/dev/assets/testKeyPathParameter
```

Example:

```bash
❯ curl http://localhost:4000/dev/assets/testKeyPathParameter
{
  "preSignedUrl": "http://localhost:4569/holding-area-bucket/testKeyPathParameter?AWSAccessKeyId=S3RVER&Expires=1696954678&Signature=U5QoqV7K%2BTL2TQpBoQ5WJjvLWLc%3D"
}
```
### Upload a locally hosted test file

Using the returned `preSignedUrl`, make a `PUT` request with `curl` from the project root using the test file located at `./_tests_/assets/validPng.png`:

```bash
❯ curl -X PUT -d "@_tests_/assets/validPng.png" "http://localhost:4569/holding-area-bucket/testKeyPathParameter?AWSAccessKeyId=S3RVER&Expires=1696954678&Signature=U5QoqV7K%2BTL2TQpBoQ5WJjvLWLc%3D"
```

If successful the command will not return anything. Instead, check the CLI where you have run `yarn sls-dev`, you should see the following success message:

```bash
info: Stored object "testKeyPathParameter" in bucket "holding-area-bucket" successfully
info: PUT /holding-area-bucket/testKeyPathParameter?AWSAccessKeyId=S3RVER&Expires=1696954678&Signature=U5QoqV7K%2BTL2TQpBoQ5WJjvLWLc%3D 200 21ms 0b
```

### Deployment

TBC

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v3.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```