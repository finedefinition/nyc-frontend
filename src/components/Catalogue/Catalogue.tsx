import { apiClient } from '@/utils/api/apiClient';
import { parseCatalogueParams } from '@/utils/filter/parseCatalogueParams';
import { getCatalogueFilters } from '@/utils/filter/getCatalogueFilters';
import { CatalogueList } from './CatalogueList';
import { Pagination } from './Pagination/Pagination';

import { FilterNoMatch } from './Filter/FilterNoMatch';
import { Filter } from './Filter/Filter';
import { SortingBy } from './Filter/SortingBy';

type CatalogueProps = {
  searchParams?: { [key: string]: string };
};

export const Catalogue = async ({ searchParams }: CatalogueProps) => {
  const { params, hasFilters } = parseCatalogueParams(searchParams);
  const filterParams = await getCatalogueFilters();

  const { pagination, yachts } = await apiClient.getYachtsWithPagination(
    `/yachts?${params.toString()}`
  );

  const notFilterMatched = yachts.length === 0 && hasFilters;

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
      {notFilterMatched ? (
        <FilterNoMatch />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-10 px-5 md:px-16">
          <CatalogueList yachts={yachts} />
        </div>
      )}
      <div className="px-5 md:px-16 pt-10 pb-10 xl:pb-20 mx-auto">
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};
