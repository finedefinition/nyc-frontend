import Image from 'next/image';
import headerImg from '@/public/header_img.png';
import typo from '@/styles/typography.module.scss';
import Button from '../Button/Button';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Image
          src={headerImg}
          fill
          sizes="100vw"
          className={styles.image}
          alt="header_img"
          priority
        />
        <div className={styles.wrapper}>
          <h2 className={typo.typo_h2}>Select Your Dream</h2>
          <h1 className={`${typo.typo_h1} ${styles.title}`}>Yacht Now!</h1>
          <span className={styles.button}>
            <Button
              text="View Gallery"
              linkTo="/catalogue"
              primary
            />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
