import { CardSkeleton } from '@/components/Skeletons/CardSkeleton';
import { Yacht } from '@/interfaces/yacht.interface';
import { CatalogueCard } from './Card/Card';

const YACHT_COUNT = 9;

type CatalogPageProps = {
  yachts: Yacht[];
};

export const CatalogueList = ({ yachts }: CatalogPageProps) => {
  return yachts.length > 0 ? (
    <>
      {yachts.map((yacht) => (
        <CatalogueCard
          key={yacht.yacht_id}
          yacht={yacht}
        />
      ))}
    </>
  ) : (
    <>
      {Array.from({ length: YACHT_COUNT }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};
