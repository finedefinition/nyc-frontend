// import { Suspense } from 'react';
// import { headers } from 'next/headers';
// import { revalidatePath } from 'next/cache';
import { apiClient } from '@/utils/api/apiClient';
import { allCountriees } from '@/utils/filter/countries';
import { Country } from '@/interfaces/country.interface';
// import Loading from '@/app/(pages)/catalogue/loading';
import CatalogueList from './CatalogueList';
import Pagination from './Pagination/Pagination';
import SortingBy from './SortingBy';
import Filter from './Filter';

type CatalogueProps = {
  searchParams?: { [key: string]: string };
};

const Catalogue = async ({ searchParams }: CatalogueProps) => {
  const {
    page = '1',
    orderBy = 'asc',
    sortBy = 'yacht_price',
    minPrice = '',
    maxPrice = '',
    make = '',
    model = '',
    country = '',
  } = searchParams || {};

  const params = new URLSearchParams({
    page,
    orderBy,
    sortBy,
    minPrice,
    maxPrice,
    make,
    model,
    country,
  });

  const { pagination, yachts } = await apiClient.getYachtsWithPagination(
    `/yachts?${params.toString()}`
  );

  // console.log(!!headers().get('accept')?.includes('text/html'));

  // const x = !!headers().get('accept')?.includes('text/html');

  // revalidatePath(`catalogue?${params.toString()}`);

  const filterParams = {
    countries: (await allCountriees()) as Country[],
  };

  return (
    <>
      <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
        <div>
          <h4>Catalogue</h4>
        </div>
        <div className="flex space-x-2 sm:space-x-4 md:space-x-6 3xl:space-x-10">
          <Filter filterParams={filterParams} />
          <SortingBy />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-10 px-5 md:px-16">
        {/* <Suspense fallback={<Loading />}> */}
        <CatalogueList yachts={yachts} />
        {/* </Suspense> */}
        {/* {x ? (
          <Suspense fallback={<Loading />}>
            <CatalogueList yachts={yachts} />
          </Suspense>
        ) : (
          <CatalogueList yachts={yachts} />
        )} */}
      </div>
      <div className="px-5 md:px-16 pt-10 pb-10 xl:pb-20 mx-auto">
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default Catalogue;
