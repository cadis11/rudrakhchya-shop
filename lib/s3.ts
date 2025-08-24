import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const region = 'auto'
const endpoint = process.env.S3_ENDPOINT || undefined
const bucket = process.env.S3_BUCKET || ''

export const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle: !!endpoint,
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? { accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! }
    : undefined
})

export async function putObject(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }))
  return `s3://${bucket}/${key}`
}

export async function getSignedGetUrl(key: string, seconds = 900) {
  const cmd = new GetObjectCommand({ Bucket: bucket, Key: key })
  return await getSignedUrl(s3, cmd, { expiresIn: seconds })
}

export function bucketName() {
  return bucket
}
