import styles from './cardSkeleton.module.scss';

const CardSkeleton = () => {
  return (
    <div className={styles.loadingSkeleton}>
      <div className={styles.loading_image}></div>
      <div className={styles.loading_text}></div>
      <div className={styles.loading_text}></div>
      <div className={styles.loading_text}></div>
    </div>
  );
};

export default CardSkeleton;
