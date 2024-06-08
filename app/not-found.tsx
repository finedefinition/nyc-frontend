import Button from '@/components/Button/Button';
import styles from './not-found.module.scss';

export default function Custom404() {
  return (
    <div className={styles.body}>
      <div className={styles.body__top}>
        <p className={styles.four}>4</p>
        <p className={styles.zero}>0</p>
        <p className={styles.four}>4</p>
      </div>
      <div className={styles.body__bottom}>
        <p className={styles.text}>Oops, something went wrong...</p>
        <Button
          text="Return to the main page"
          linkTo="/"
        />
      </div>
    </div>
  );
};
