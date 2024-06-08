import { Vessel } from '@/interfaces/vessel.interface';
import FYCard from '@/components/FYCard/FYCard';
import styles from './catalogYacht.module.scss';

type Props = {
  yachts: Vessel[];
};

const CatalogYacht = ({ yachts }: Props) => {
  return (
    <div className={`cards_container ${styles.cards_wrapper}`}>
      {yachts &&
        yachts.map((yacht: Vessel, i: number) => (
          <FYCard
            key={i}
            yacht={yacht}
            inCatalog={true}
          />
        ))}
    </div>
  );
};

export default CatalogYacht;
