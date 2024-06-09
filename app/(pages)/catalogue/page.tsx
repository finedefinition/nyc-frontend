import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAllVessels } from '@/utils/api/getAllVessels';
import { Vessel } from '@/interfaces/vessel.interface';

import typo from "@/styles/typography.module.scss";
import CatalogYacht from "@/components/Catalogue/CatalogYacht/catalogYacht";
import Pagination from "@/components/Pagination/Pagination";
import Sorting from '@/components/Catalogue/Sorting/Sorting';
import Filter from '@/components/Catalogue/Filter/Filter';

import styles from './page.module.scss';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Catalogue | Norse Yacht Co',
};

const CardNumber = 9;

const Catalog = async ({
  searchParams,
}: {
  searchParams?: { page: string; size: string };
}) => {
  let allYachts: Vessel[] = [];
  try {
    allYachts = await getAllVessels();
  } catch (error) {
    console.error('Error fetching vessels:', error);
  }

  let page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || CardNumber;

  if (Math.ceil(allYachts.length / size) < page) {
    page = 1;
    redirect(`?page=${page}&size=${size}`);
  }

  const toVessel = page * size;
  const fromVessel = toVessel - size;
  const yachtsPage = allYachts.length
    ? allYachts.slice(fromVessel, toVessel)
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className={styles.catalog_container}>
        <div className={styles.catalog__top}>
          <h4 className={`${styles.catalog_title} ${typo.typo_h4}`}>Catalogue</h4>
          <div className="d-flex">
            <Filter /> <Sorting />
          </div>
        </div>
        {yachtsPage.length ?
          (<CatalogYacht yachts={yachtsPage}></CatalogYacht>)
          : (<h4 className={`${styles.no_yachts}`}>No Yachts</h4>)
        }

        <Pagination
          items={allYachts.length}
          pageSize={CardNumber}
          currentPage={page}
        />
      </section>
    </Suspense>
  );
};

export default Catalog;
