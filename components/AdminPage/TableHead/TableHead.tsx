import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { sortOptions } from '@/utils/componentsData/componentsDataArray';
import '@fortawesome/fontawesome-free/css/all.css';
import { SearchLink } from '@/utils/searchHelps/SearchLink';
import styles from '@/components/AdminPage/YachtsTable/componentYachtsTable.module.scss';

const TableHead = () => {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  return (
    <tr>
      <th>Id</th>
      <th>Photo</th>
      {Object.keys(sortOptions).map((sort) => {
        const sortName = sort.toLowerCase();

        return (
          <th
            key={sort}
            className={styles.yachtsTable__tableHead_controled}
          >
            <span>
              {sort}
              <SearchLink
                params={{
                  sort: sortBy !== sortName || !orderBy ? sortName : null,
                  order: sortBy === sortName && !orderBy ? 'desc' : null,
                }}
              >
                <span className='icon'>
                  <i
                    className={classNames('fas ', {
                      'fa-sort': sortBy !== sortName,
                      'fa-sort-up': sortBy === sortName && !orderBy,
                      'fa-sort-down': orderBy && sortBy === sortName,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        );
      })}
      <th>Phone number</th>
      <th>Email</th>
      <th className={styles.yachtsTable__tableHead_controled}>
        <span>
          Date
          <SearchLink
            params={{
              sort: sortBy !== 'date' || !orderBy ? 'date' : null,
              order: sortBy === 'date' && !orderBy ? 'desc' : null,
            }}
          >
            <span className='icon'>
              <i
                className={classNames('fas ', {
                  'fa-sort': sortBy !== 'date',
                  'fa-sort-up': sortBy === 'date' && !orderBy,
                  'fa-sort-down': orderBy && sortBy === 'date',
                })}
              />
            </span>
          </SearchLink>
        </span>
      </th>
      <th>Action</th>
    </tr>
  );
};

export default TableHead;
