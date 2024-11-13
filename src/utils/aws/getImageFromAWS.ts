import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CustomErrorClass } from '@/utils/error/CustomErrorClass';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function fetchImgUrl(keyFromAws: string): Promise<string | null> {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    Key: keyFromAws,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedImageUrl = await getSignedUrl(s3, command);

    const response = await fetch(signedImageUrl);

    if (response.status === 200) {
      return signedImageUrl;
    }

    throw new CustomErrorClass('Invalid image URL', response.status);
  } catch (err) {
    if (err instanceof CustomErrorClass) {
      // eslint-disable-next-line
      console.error(err.message);
      return null;
    }
    // eslint-disable-next-line
    console.error('Unexpected error:', err);
    return null;
  }
}
