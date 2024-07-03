'use client';

import { useState } from 'react';
import { Vessel } from '@/interfaces/vessel.interface';
import styles from '@/components/AdminPage/YachtsTable/componentYachtsTable.module.scss';
import YachtInfo from '../YachtInfo/YachtInfo';
import TableHead from '../TableHead/TableHead';

type Props = {
  yachts: Vessel[];
};

const YachtsTable = ({ yachts }: Props) => {
  const [yachtsTable] = useState<Vessel[]>(yachts);

  return (
    <div className={styles.yachtsTable}>
      <div className="box table-container">
        <table className={styles.yachtsTable__table}>
          <thead className={styles.yachtsTable__tableHead}>
            {<TableHead />}
          </thead>

          <tbody className={styles.yachtsTable__tableBody}>
            {yachtsTable.length &&
              yachtsTable.map((yacht: Vessel) => {
                return (
                  <YachtInfo
                    key={yacht.yacht_id}
                    yacht={yacht}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YachtsTable;
