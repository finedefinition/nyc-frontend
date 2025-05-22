import { Catalogue } from '@/components/Catalogue/Catalogue';

const CataloguePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  return <Catalogue searchParams={searchParams} />;
};

export default CataloguePage;
