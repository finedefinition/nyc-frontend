import Image from 'next/image';
import CopyrightIcon from '@/public/icons/copyright.svg';
import styles from './copyright.module.scss';

const Copyright = () => {
  return (
    <span className={styles.copyright}>
      <Image
        src={CopyrightIcon}
        alt="Copyright"
        priority
      />{' '}
      Norse Yachts Co. All rights reserved.
    </span>
  );
};

export default Copyright;
