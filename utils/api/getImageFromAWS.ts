import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function fetchImgUrl(keyFromAws: string): Promise<string> {
  let currImageUrl;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    Key: keyFromAws,
  };

  try {
    const command = new GetObjectCommand(params);
    currImageUrl = await getSignedUrl(s3, command);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return '';
  }

  try {
    const response = await fetch(currImageUrl);
    const contentType = response.headers.get('Content-Type');

    if (contentType?.startsWith('image/') === true) {
      return currImageUrl as string;
    }

    // eslint-disable-next-line
    console.error('Invalid image URL');
    return '';
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return '';
  }
}
