'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (divRef.current) {
      if (!divRef.current.contains(event.target as Node) && showFilterForm) {
        setShowFilterForm(false);
      }
    }
  }, [showFilterForm]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div>
      <div ref={divRef} className={styles.catalogProps__buttons}>
        <Filter showFilter={() => setShowFilterForm(!showFilterForm)}/>
        <Sorting />
      </div>

      {showFilterForm && (
        <div ref={divRef} className={styles['catalogProps__filter-form']} >
          <FilterForm
            yachtsParams={yachtsParams}
            closeForm={() => setShowFilterForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogProps;
