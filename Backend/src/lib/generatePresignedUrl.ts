import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../Config/r2Client";

export const generatePresignedUrl = async (fileName: string, expiresIn = 300) => {
  const command = new GetObjectCommand({
    Bucket: process.env.CF_R2_BUCKET_NAME!,
    Key: fileName,
  });
  return await getSignedUrl(s3Client, command, { expiresIn }); 
};