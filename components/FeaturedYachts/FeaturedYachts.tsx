import { Vessel } from '@/interfaces/vessel.interface';
import { getFeaturedYacht } from '@/utils/api/getAllVessels';
import typo from '@/styles/typography.module.scss';
import FYCard from '../FYCard/FYCard';
import TextButton from '../TextButton/TextButton';
import styles from './featuredYachts.module.scss';

const FeaturedYachts = async () => {
  const yachts = await getFeaturedYacht();
  yachts.sort(() => Math.random() - 0.5);

  const visibleYachts = yachts.slice(0, 3);

  return (
    <section className={styles.feature_section}>
      <div className={styles.title}>
        <h4 className={typo.typo_h4}>Featured</h4>
        <h5 className={typo.typo_h5}>yachts</h5>
      </div>
      <span className={styles.seeall}>
        <TextButton
          text="See All"
          linkTo="/catalogue"
          primary
        />
      </span>
      <div className={styles.cards_container}>
        {visibleYachts.map((yacht: Vessel) => (
          <FYCard
            key={yacht.yacht_id}
            yacht={yacht}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedYachts;
