'use client'

import { useState } from 'react'

import { FilterProps } from '@/interfaces/filterProps.interface';
import Sorting from '../Sorting/Sorting';
import Filter from '../Filter/Filter';
import { FilterForm } from '../FilterForm/FilterForm';

import styles from './catalogProps.module.scss';

interface Props {
  yachtsParams: FilterProps;
}

const CatalogProps: React.FC<Props> = ({ yachtsParams }) => {
  const [showFilterForm, setShowFilterForm] = useState(false);

  return (
    <div>
      <div className={styles.catalogProps__buttons}>
        <Filter showFilter={() => setShowFilterForm(!showFilterForm)}/>
        <Sorting />
      </div>

      {showFilterForm && (
        <aside className={styles['catalogProps__filter-form']}
        >
          <FilterForm
            yachtsParams={yachtsParams}
            closeForm={() => setShowFilterForm(false)}
          />
        </aside>
      )}
    </div>
  );
};

export default CatalogProps;
