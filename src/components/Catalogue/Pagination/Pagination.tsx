import { PaginationOptions } from '@/interfaces/pagination.interface';

import { getPaginationWithDots, isEmpty } from '@/utils/pagination/pagination';
import PaginationButton from './PaginationButton';

type PaginationProps = {
  pagination: PaginationOptions;
};

const Pagination = ({ pagination }: PaginationProps) => {
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
      <li
        className={`mr-8 group ${currentPage === 1 ? 'pointer-events-none' : ''}`}
      >
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
        className={`ml-8 group ${currentPage === (totalPages as number) ? 'pointer-events-none' : ''}`}
      >
        <PaginationButton
          page="right"
          isArrow={true}
        />
      </li>
    </ul>
  );
};

export default Pagination;
