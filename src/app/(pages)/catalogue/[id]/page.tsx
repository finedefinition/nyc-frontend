import { Metadata } from 'next';
import YachtPageId from '@/components/YachtPage/YachtPageId';
import { apiClient } from '@/utils/api/apiClient';
import { YachtDetail } from '@/interfaces/yacht.interface';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const yacht: YachtDetail = await apiClient.getYachtById(`/yachts/${id}`);
  return {
    title: `Yacht ${yacht.yacht_make} ${yacht.yacht_model} | Norse Yacht Co`,
  };
}

const YachtPage = async ({ params: { id } }: Props) => {
  return <YachtPageId id={id} />;
};

export default YachtPage;
