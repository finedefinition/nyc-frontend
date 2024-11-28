import { YachtDetail } from '@/interfaces/yacht.interface';
import { apiClient } from '@/utils/api/apiClient';
import { loadAllImagesFromAWS } from '@/utils/aws/getImageFromAWS';
import YachtPageSkeleton from '../Skeletons/YachtPageSkeleton';
import ProductPage from './ProductPage';

type YachtPageIdProps = {
  id: string;
};

const YachtPageId = async ({ id }: YachtPageIdProps) => {
  try {
    const yacht: YachtDetail = await apiClient.getYachtById(`/yachts/${id}`);
    const imagesForSlider = await loadAllImagesFromAWS(yacht.yacht_images);

    // console.log(imagesForSlider)

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

export default YachtPageId;
