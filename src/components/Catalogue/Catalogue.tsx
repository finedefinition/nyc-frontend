import { apiClient } from '@/utils/api/apiClient';
import CatalogueList from './CatalogueList';
import Pagination from './Pagination';

type CatalogueProps = {
  searchParams?: { [key: string]: string };
};

const Catalogue = async ({ searchParams }: CatalogueProps) => {
  const page = searchParams?.page || '1';

  const { pagination, yachts } = await apiClient.getYachtsWithPagination(
    `/yachts?page=${page}`
  );

  return (
    <>
      <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
        <div>
          <h4>Catalogue</h4>
        </div>
        <div>Filter & Sorting</div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-10 px-5 md:px-16">
        <CatalogueList yachts={yachts} />
      </div>
      <div className="px-5 md:px-16 pt-10 pb-10 xl:pb-20 mx-auto">
        <Pagination {...pagination} />
      </div>
    </>
  );
};

export default Catalogue;
