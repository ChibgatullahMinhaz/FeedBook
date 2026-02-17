import dotenv from "dotenv";
import path from "path";
import {
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";


dotenv.config({ path: path.join(process.cwd(), ".env") });

export const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CF_R2_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
});

export const deleteFromR2 = async (key: string) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    })
  );
};