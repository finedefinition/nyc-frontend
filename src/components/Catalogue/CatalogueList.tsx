// 'use client';
import { Suspense } from 'react';
import Loading from '@/app/loading';
// import { headers } from 'next/headers';
// import Loading from '@/app/(pages)/catalogue/loading';
import CardSkeleton from '@/components/Skeletons/CardSkeleton';
import { Yacht } from '@/interfaces/yacht.interface';
import Card from './Card/Card';

const YACHT_COUNT = 9;

type CatalogPageProps = {
  yachts: Yacht[];
};

const CatalogueList = ({ yachts }: CatalogPageProps) => {
  // const headersList = headers();
  // console.log(!!headers().get('accept')?.includes('text/html'));
  //   if (!headers().get('accept')?.includes('text/html')
  return yachts.length > 0 ? (
    <Suspense fallback={<Loading />}>
      {yachts.map((yacht) => (
        <Card
          key={yacht.yacht_id}
          yacht={yacht}
        />
      ))}
    </Suspense>
  ) : (
    <>
      {Array.from({ length: YACHT_COUNT }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};

export default CatalogueList;
