import typo from '@/styles/typography.module.scss';
import styles from './titlePlace.module.scss';

type Props = {
  title: string;
  subtitle: string;
  order: boolean;
};

const TitlePlace = ({
  title,
  subtitle,
  order
}: Props) => {
  return (
    <div className={`${styles.title_container} ${order ? styles.title_container__odd : ''}`}>
      <h3 className={`${typo.typo_h3} ${order ? typo.typo_h3_gray : ''}`}>
        {order ? (
          <>
            <span className={typo.typo_uitxt}>{subtitle}{' '}</span>
            {title}
          </>
        ) : (
          <>
            {title}
            <span className={typo.typo_uitxt}>{' '}{subtitle}</span>
          </>
        )}
      </h3>
    </div>
  )
}

export default TitlePlace;
