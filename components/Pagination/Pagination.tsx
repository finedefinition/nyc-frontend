import Link from 'next/link';
import styles from './pagination.module.scss';

type Props = {
  items: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ items, pageSize, currentPage }: Props) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <>
      <ul className={styles.pagination}>
        {pages.map((page) => {
          const isFirstOrLastPage = page === 1 || page === pages.length;
          const isInMiddle =
            currentPage === page - 3 || page + 3 === currentPage;
          const isOutOfRange =
            (page > currentPage && currentPage <= page - 3) ||
            (page < currentPage && currentPage >= page + 3);

          if (isFirstOrLastPage) {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? styles.pageItemActive : styles.pageItem
                }
              >
                <Link href={`?page=${page}&size=${pageSize}`}>{page}</Link>
              </li>
            );
          }

          if (isInMiddle) {
            return (
              <li
                key={page}
                className={styles.middle}
              >
                ...
              </li>
            );
          }

          if (isOutOfRange) {
            return;
          }

          return (
            <li
              key={page}
              className={
                page === currentPage ? styles.pageItemActive : styles.pageItem
              }
            >
              <Link href={`?page=${page}&size=${pageSize}`}>{page}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pagination;
