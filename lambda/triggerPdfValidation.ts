
import { S3CreateEvent } from "aws-lambda";

export interface TriggerPdfValidation {
  (event: S3CreateEvent): Promise<void>;
}

export const handler: TriggerPdfValidation = async (event) => {
  try {
    // Access the S3 event data
    const s3Event = event.Records[0].s3;
    console.log({s3Event});
  } catch (e) {
    console.error(e);
  }
};
