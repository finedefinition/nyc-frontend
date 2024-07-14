'use client'

import Image from 'next/image';
import filter from '../../../public/icons/filter.svg';
import 'rc-slider/assets/index.css';
import styles from './filter.module.scss';

const Filter = ({ showFilter } : { showFilter: () => void }) => {
  return (
    <button onClick={showFilter} className={styles.button}>
      <span>Filter</span>
      <Image height={24} src={filter} alt='filter' />
    </button>
  );
};

export default Filter;
