import { useEffect, useState } from 'react';
import { Image, Skeleton } from 'antd';
import { fetchImgUrl } from '@/utils/api/getImageFromAWS';
import { VesselAdmin } from '@/interfaces/vessel.interface';

type Props = {
  yachtsTable: VesselAdmin[];
  yacht_main_image_key: string;
};

const IMAGE_600_400 = 'https://fakeimg.pl/600x400?text=Norse+Yacht+Co.';

const TableImage = ({ yachtsTable, yacht_main_image_key }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<Record<string, string>[]>([{}]);

  useEffect(() => {
    const response = async () => {
      const urls = await Promise.all(
        yachtsTable.map(async (yacht) => {
          const imageUrl = await fetchImgUrl(yacht.yacht_main_image_key);
          return {
            key: yacht.yacht_main_image_key,
            url: imageUrl.length ? imageUrl : IMAGE_600_400,
          };
        })
      );
      setImageUrls(urls);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    response();
  }, [yachtsTable]);

  const imageUrl = imageUrls.find((url) => url.key === yacht_main_image_key);
  return (
    <div className='imageContainer'>
      {isLoading ? (
        <Skeleton.Image
          active={isLoading}
          className='skeletonAntd'
        />
      ) : (
        <Image
          width={56}
          height={56}
          src={imageUrl?.url}
          alt='Yacht Photo'
        />
      )}
    </div>
  );
};

export default TableImage;
