import { Metadata } from 'next';
import YachtPageId from '@/components/YachtPage/YachtPageId';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: `Yacht ${id} | Norse Yacht Co`,
  };
}

const YachtPage = async ({ params: { id } }: Props) => {
  return <YachtPageId id={id} />;
};

export default YachtPage;
