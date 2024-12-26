import { apiClient } from '@/utils/api/apiClient';
import { apiFilter } from '@/utils/api/apiFilter';
import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';
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
    town = '',
  } = searchParams || {};

  const paramsObject = {
    page,
    orderBy,
    sortBy,
    minPrice,
    maxPrice,
    make,
    model,
    country,
    town,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(paramsObject).filter(([, value]) => value)
  );

  const params = new URLSearchParams(filteredParams);

  const { pagination, yachts } = await apiClient.getYachtsWithPagination(
    `/yachts?${params.toString()}`
  );

  const filterParams = {
    countries: (await apiFilter.getAllCoutries('/countries')) as Country[],
    towns: (await apiFilter.getAllTowns('/towns')) as Town[],
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
        <CatalogueList yachts={yachts} />
      </div>
      <div className="px-5 md:px-16 pt-10 pb-10 xl:pb-20 mx-auto">
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default Catalogue;
