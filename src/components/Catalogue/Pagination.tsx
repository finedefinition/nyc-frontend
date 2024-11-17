import { PaginationOptions } from '@/interfaces/pagination.interface';

import { getPaginationWithDots, isEmpty } from '@/utils/pagination/pagination';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import LeftArrow from '../SvgIcons/LeftArrow';
import RightArrow from '../SvgIcons/RightArrow';

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

  const renderPageButton = (page: number | string, idx: number) => {
    if (page === '...') {
      return (
        <li
          key={idx}
          className="w-8 h-8 flex justify-center items-center border border-grey-50 rounded"
        >
          {page}
        </li>
      );
    }

    return (
      <li key={idx}>
        <ClickableComponent
          href={`?page=${page}`}
          variants={['pagination']}
          className={`w-8 ${currentPage === page ? 'border-secondary-100 pointer-events-none' : ''}`}
        >
          {page}
        </ClickableComponent>
      </li>
    );
  };

  return (
    <ul className="flex gap-x-2">
      <li className={`group ${currentPage === 1 ? 'pointer-events-none' : ''}`}>
        <ClickableComponent
          href={`?page=${(currentPage as number) - 1}`}
          className="w-16 mr-8"
          variants={['pagination']}
        >
          <LeftArrow className="fill-primary group-hover:fill-white" />
        </ClickableComponent>
      </li>
      {paginationArray.map(renderPageButton)}
      <li
        className={`group ${currentPage === (totalPages as number) ? 'pointer-events-none' : ''}`}
      >
        <ClickableComponent
          href={`?page=${(currentPage as number) + 1}`}
          className="w-16 ml-8"
          variants={['pagination']}
        >
          <RightArrow className="fill-primary group-hover:fill-white" />
        </ClickableComponent>
      </li>
    </ul>
  );
};

export default Pagination;
