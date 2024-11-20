import { YachtDetail } from '@/interfaces/yacht.interface';
import { apiClient } from '@/utils/api/apiClient';
import ProductPage from './ProductPage';

type YachtPageIdProps = {
  id: string;
};

const YachtPageId = async ({ id }: YachtPageIdProps) => {
  try {
    const yacht: YachtDetail = await apiClient.getYachtById(`/yachts/${id}`);

    return <ProductPage { ...yacht } />;
  } catch (error) {
    return <h3>Add yacht page sketelon here</h3>;
  }
};

export default YachtPageId;
