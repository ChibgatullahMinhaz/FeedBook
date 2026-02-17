import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../config/r2Client";
import config from "../../Config/Config";

export const generatePresignedUrl = async (fileName: string, expiresIn = 300) => {
  const command = new GetObjectCommand({
    Bucket: config.cloudBucketName,
    Key: fileName,
  });
  return await getSignedUrl(s3Client, command, { expiresIn });
};


export const uploadToR2 = async (fileName: string, buffer: Buffer, mimeType: string) => {
  const command = new PutObjectCommand({
    Bucket: config.cloudBucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimeType,
  });
  await s3Client.send(command);
};

export const deleteFromR2 = async (key: string) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.cloudBucketName!,
      Key: key,
    })
  );
};