import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Vessel } from '@/interfaces/vessel.interface';
import { fetchImgUrl } from '@/utils/api/getImageFromAWS';
import styles from '@/components/AdminPage/YachtsTable/componentYachtsTable.module.scss';
type Props = {
  yacht: Vessel;
};

const IMAGE_600_400 = 'https://fakeimg.pl/600x400?text=Norse+Yacht+Co.';

const YachtInfo = ({ yacht }: Props) => {
  const {
    yacht_id,
    yacht_make,
    yacht_model,
    yacht_main_image_key,
    yacht_country,
    yacht_town,
    yacht_created_at,
  } = yacht;
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    async function loadImgFromAws() {
      const currImg = await fetchImgUrl(yacht_main_image_key);
      setImageUrl(currImg.length ? currImg : IMAGE_600_400);
    }
    loadImgFromAws();
  }, [yacht_main_image_key]);

  return (
    <tr>
      <td>{yacht_id}</td>
      <td>
        <div className={styles.yachtsTable__tableBody_imageContainer}>
          {
            <Image
              src={imageUrl}
              fill
              alt='feature_img'
            />
          }
        </div>
      </td>
      <td>{yacht_make}</td>
      <td>{yacht_model}</td>
      <td>{yacht_country}</td>
      <td>{yacht_town}</td>
      <td>{yacht_town}</td>
      <td>{yacht_town}</td>
      <td>{yacht_town}</td>
      <td className={styles.emailCol}>
        {yacht_created_at.slice(0, 7) + '...'}
        <button className={styles.yachtsTable__buttonEmailCopy}></button>
      </td>
      <td>{yacht_town}</td>
      <td>
        <button className={styles.yachtsTable__buttonAction}></button>
        <button className={styles.yachtsTable__buttonAction}></button>
      </td>
    </tr>
  );
};

export default YachtInfo;
