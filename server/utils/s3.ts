require("dotenv").config();

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION as string,
  credentials: {
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.S3_ACCESS_KEY as string,
  },
});

export const getFileUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
};

export const setImgUrl = async (doc: any) => {
  const imageUrl = await getFileUrl(doc.image);

  doc.image = imageUrl;

  return imageUrl;
};

export const addFile = async (
  fileName: string,
  fileBuffer: Buffer,
  mimeType: any
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  return await s3.send(command);
};

export const deleteDeleteS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  return await s3.send(command);
};
