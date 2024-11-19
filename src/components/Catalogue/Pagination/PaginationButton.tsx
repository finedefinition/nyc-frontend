'use client';
import { useSearchParams } from 'next/navigation';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import LeftArrow from '@/components/SvgIcons/LeftArrow';
import RightArrow from '@/components/SvgIcons/RightArrow';

type PaginationButtonProps = {
  page: number | string;
  isCurrent: boolean;
  isArrow?: boolean;
};

const PaginationButton = ({
  page,
  isCurrent,
  isArrow,
}: PaginationButtonProps) => {
  const searchParams = useSearchParams();
  const createUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  if (page === '...') {
    return (
      <li className="w-8 h-8 flex justify-center items-center border border-grey-50 rounded">
        {page}
      </li>
    );
  }

  return (
    <ClickableComponent
      href={createUrlWithPage(Number(page))}
      variants={['pagination']}
      className={`${isArrow ? 'w-16' : 'w-8'} ${isCurrent && !isArrow ? 'border-secondary-100 pointer-events-none' : ''}`}
    >
      {isArrow ? (
        page === 'left' ? (
          <LeftArrow className="fill-primary group-hover:fill-white" />
        ) : (
          <RightArrow className="fill-primary group-hover:fill-white" />
        )
      ) : (
        page
      )}{' '}
    </ClickableComponent>
  );
};

export default PaginationButton;
