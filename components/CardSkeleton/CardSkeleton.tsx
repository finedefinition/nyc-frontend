import classNames from 'classnames';
import styles from './cardSkeleton.module.scss';

interface Props {
  isFavourite?: boolean;
}

const CardSkeleton = ({ isFavourite }: Props) => {
  return (
    <div
      className={classNames(styles.loadingSkeleton, {
        [styles.loadingSkeleton80]: isFavourite,
      })}
    >
      <div className={styles.loading_image}></div>
      <div className={styles.loading_text}></div>
      <div className={styles.loading_text}></div>
      <div className={styles.loading_text}></div>
    </div>
  );
};

export default CardSkeleton;
