import Image from 'next/image';
import { PaginationOptions } from '@/interfaces/pagination.interface';
import RightArrowImg from '@/public/icons/rightArrow.svg';
import LeftArrowImg from '@/public/icons/leftArrow.svg';
import { getPaginationWithDots, isEmpty } from '@/utils/pagination/pagination';
import ClickableComponent from '../ClickableComponent/ClickableComponent';

type PaginationProps = {
  pagination: PaginationOptions;
}

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
      <li className={currentPage === 1 ? 'pointer-events-none' : ''}>
        <ClickableComponent
          href={`?page=${(currentPage as number) - 1}`}
          variant="pagination"
        >
          <Image
            src={LeftArrowImg}
            alt="LeftArrowImg"
          />
        </ClickableComponent>
      </li>
      {paginationArray.map((page: number | string, idx: number) => {
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
          <li
            key={idx}
            className={
              currentPage === page ? 'border rounded border-secondary-100' : ''
            }
          >
            <ClickableComponent
              href={`?page=${page}`}
              variant="pagination"
            >
              {page}
            </ClickableComponent>
          </li>
        );
      })}
      <li
        className={
          currentPage === (totalPages as number) ? 'pointer-events-none' : ''
        }
      >
        <ClickableComponent
          href={`?page=${(currentPage as number) + 1}`}
          variant="pagination"
        >
          <Image
            src={RightArrowImg}
            alt="RightArrow"
          />
        </ClickableComponent>
      </li>
    </ul>
  );
};

export default Pagination;
