
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  s3ForcePathStyle: true,
  endpoint: "http://localhost:4569",
  accessKeyId: "S3RVER",
  secretAccessKey: "S3RVER",
});

export interface GetPresignedUrl {
  (event: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}

export const handler: GetPresignedUrl = async (event) => {
  try {
    const key = event?.pathParameters?.key;
    if (!key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing key" }),
      };
    }

    const params = {
      Bucket: 'holding-area-bucket',
      Key: key,
      Expires: 60 * 60, // 1 hour
    };

    const preSignedUrl = await s3.getSignedUrl('getObject', params);
    
    const body = JSON.stringify({ preSignedUrl });
    return { statusCode: 200, body };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    };
  }
};
