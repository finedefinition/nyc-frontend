'use client'

import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { FilterProps } from '@/interfaces/filterProps.interface';
import Sorting from '../Sorting/Sorting';
import Filter from '../Filter/Filter';
import { FilterForm } from '../FilterForm/FilterForm';

import styles from './catalogProps.module.scss';
import { FilterProvider } from './FilterContext';

interface Props {
  yachtsParams: FilterProps;
}

export const YachtsParamsContext = createContext<FilterProps | null>(null);

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
        <FilterProvider>
          <div ref={divRef} className={styles['catalogProps__filter-form']} >
            <FilterForm
              yachtsParams={yachtsParams}
              closeForm={() => setShowFilterForm(false)}
            />
          </div>
        </FilterProvider>
      )}
    </div>
  );
};

export default CatalogProps;
