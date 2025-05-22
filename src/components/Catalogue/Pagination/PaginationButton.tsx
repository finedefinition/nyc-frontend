'use client';

import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { LeftArrow } from '@/components/SvgIcons/LeftArrow';
import { RightArrow } from '@/components/SvgIcons/RightArrow';
import { usePaginationUrl } from '@/hooks/usePaginationUrl';

type PaginationButtonProps = {
  page: number | string;
  isCurrent?: boolean;
  isArrow?: boolean;
};

export const PaginationButton = ({
  page,
  isCurrent,
  isArrow,
}: PaginationButtonProps) => {
  const createUrlWithPage = usePaginationUrl();

  if (page === '...') {
    return (
      <span className="w-8 h-8 flex justify-center items-center border border-grey-50 rounded">
        {page}
      </span>
    );
  }

  return (
    <ClickableComponent
      href={createUrlWithPage(page)}
      variants={['pagination']}
      className={`${isArrow ? 'w-8 sm:w-16' : 'w-8'} ${isCurrent ? 'border-secondary-100 pointer-events-none' : ''}`}
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
