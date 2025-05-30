import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CustomErrorClass } from '@/utils/error/CustomErrorClass';
import { YachtImage } from '@/interfaces/yacht.interface';

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

const DEFAULT_IMG_URL = 'https://fakeimg.pl/600x400?text=Norse+Yacht+Co.';

export async function loadAllImagesFromAWS(images: YachtImage[]) {
  const imagePromises = images.map((image) =>
    fetchImgUrl(image.yacht_image_key).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`Error fetching image ${image.yacht_image_key}:`, err);
      return null;
    })
  );

  const urls = await Promise.all(imagePromises);

  // Повертаємо завжди валідний масив картинок (навіть якщо з деякими були проблеми)
  return urls.map((url) => url || DEFAULT_IMG_URL);
}
