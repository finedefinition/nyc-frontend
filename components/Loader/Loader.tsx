import classNames from 'classnames';
import styles from './loader.module.scss';

type Props = {
  biggest?: boolean;
  absoluteCenter?: boolean;
  zIndex?: boolean;
};

const Loader = ({ biggest, absoluteCenter, zIndex }: Props) => (
  <div
    className={classNames(styles.loader, {
      [styles.biggest]: biggest,
      [styles.absoluteCenter]: absoluteCenter,
      [styles.zIndex]: zIndex,
    })}
  >
    <div className={styles.loader__content} />
  </div>
);

export default Loader;
