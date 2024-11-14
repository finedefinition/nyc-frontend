import Catalogue from '@/components/Catalogue/Catalogue';

const CataloguePage = ({
  searchParams,
}: {
  searchParams?: { page: string };
}) => {
  return <Catalogue searchParams={searchParams} />;
};

export default CataloguePage;
