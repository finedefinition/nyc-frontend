import { Metadata } from 'next';
import YachtsTable from '@/components/AdminPage/YachtsTable/YachtsTable';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/utils/constants';
import { getAdminYachtsQuery } from '@/utils/api/getAllVessels';
import { VesselTableAdmin } from '@/interfaces/vessel.interface';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Admin Page',
};

const AdminPage = async () => {
  let yachtsData: VesselTableAdmin = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    yachts: [],
  };
  let TOKEN: string | null = '';
  try {
    yachtsData = await getAdminYachtsQuery();

    TOKEN =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        : null;
  } catch (error) {
    // console.error('Error fetching vessels:', error); // Commented out to avoid ESLint warning
  }

  // if (!TOKEN) {
  //   redirect('/');
  // }

  return (
    <section className={styles.admin_container}>
      <YachtsTable yachtsResponse={yachtsData} />
    </section>
  );
};

export default AdminPage;
