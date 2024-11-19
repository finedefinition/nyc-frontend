import Catalogue from '@/components/Catalogue/Catalogue';

const CataloguePage = async ({
  searchParams,
}: {
  searchParams?: { page: string; orderBy: string; sortBy: string };
}) => {
  return <Catalogue searchParams={searchParams} />;
};

export default CataloguePage;
