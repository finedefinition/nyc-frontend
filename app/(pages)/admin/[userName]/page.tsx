import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import YachtsTable from '@/components/AdminPage/YachtsTable/YachtsTable';
import { getAllVessels } from '@/utils/api/getAllVessels';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Admin Page',
};

const CardNumber = 9;

const AdminPage = async ({
  searchParams,
}: {
  searchParams?: { page: string; size: string };
}) => {
  const allYachts = await getAllVessels();
  const page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || CardNumber;
  const LOCAL_STORAGE_TOKEN_KEY = 'authToken';

  try {
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        : null;
    if (token !== null) {
      redirect('/');
    }
  } catch (error) {
    /* empty */
  }

  const toVessel = page * size;
  const fromVessel = toVessel - size;
  const yachtsPage = allYachts?.length
    ? allYachts.slice(fromVessel, toVessel)
    : [];

  return (
    <section className={styles.admin_container}>
      <YachtsTable yachts={yachtsPage} />
    </section>
  );
};

export default AdminPage;
