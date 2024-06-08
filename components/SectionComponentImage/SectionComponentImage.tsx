import Image, { StaticImageData } from 'next/image';
import styles from './sectionComponentImage.module.scss';

type Props = {
  imgSrc: StaticImageData;
}

const SectionComponentImage = ({ imgSrc }: Props) => {
  return (
    <div className={styles.image_container}>
      <Image
        src={imgSrc}
        fill
        sizes="100vw"
        className={styles.image}
        alt="section image"
      />
    </div>
  );
};

export default SectionComponentImage;
