import CardSkeleton from '@/components/Skeletons/CardSkeleton';
import { Yacht } from '@/interfaces/yacht.interface';
import Card from './Card/Card';

const YACHT_COUNT = 9;

type CatalogPageProps = {
  yachts: Yacht[];
};

const CatalogueList = async ({ yachts }: CatalogPageProps) => {
  return yachts.length > 0 ? (
    <>
      {yachts.map((yacht) => (
        <Card
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

export default CatalogueList;
