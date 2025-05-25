import { PaginationOptions } from '@/interfaces/pagination.interface';

import {
  getPaginationWithDots,
  isEmpty,
} from '@/utils/pagination/paginationHelpers';
import { PaginationButton } from './PaginationButton';

type PaginationProps = {
  pagination: PaginationOptions;
};

export const Pagination = ({ pagination }: PaginationProps) => {
  if (isEmpty(pagination)) {
    return null;
  }

  const { currentPage, totalPages } = pagination;

  const paginationArray = getPaginationWithDots(
    currentPage as number,
    totalPages as number
  );

  return (
    <ul className="flex gap-x-2">
      <li className={`group ${currentPage === 1 ? 'pointer-events-none' : ''}`}>
        <PaginationButton
          page="left"
          isArrow={true}
        />
      </li>
      {paginationArray.map((page, idx) => (
        <li key={idx}>
          <PaginationButton
            page={page}
            isCurrent={currentPage === page}
          />
        </li>
      ))}
      <li
        className={`group ${currentPage === (totalPages as number) ? 'pointer-events-none' : ''}`}
      >
        <PaginationButton
          page="right"
          isArrow={true}
        />
      </li>
    </ul>
  );
};
