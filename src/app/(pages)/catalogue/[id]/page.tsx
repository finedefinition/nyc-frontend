import { Metadata } from 'next';
import { apiClient } from '@/utils/api/apiClient';
import { loadAllImagesFromAWS } from '@/utils/aws/getImageFromAWS';
import { YachtDetail } from '@/interfaces/yacht.interface';
import ProductPage from '@/components/YachtPage/ProductPage';
import YachtPageSkeleton from '@/components/Skeletons/YachtPageSkeleton';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const yacht: YachtDetail = await apiClient.getYachtById(`/yachts/${id}`);
  const title = `Yacht ${yacht.yacht_make} ${yacht.yacht_model} | Norse Yacht Co`;
  return {
    title,
  };
}

const YachtPage = async ({ params: { id } }: Props) => {
  try {
    const yacht: YachtDetail = await apiClient.getYachtById(`/yachts/${id}`);
    const imagesForSlider = await loadAllImagesFromAWS(yacht.yacht_images);

    return (
      <ProductPage
        yacht={yacht}
        images={imagesForSlider}
      />
    );
  } catch (error) {
    return <YachtPageSkeleton />;
  }
};

export default YachtPage;
