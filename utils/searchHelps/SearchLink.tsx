import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SearchParams, getSearchWith } from '../functions/searchHelper';

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children, // this is the content between open and closing tags
  params, // the params to be updated in `search`
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Link
      href={pathname + '?' + getSearchWith(searchParams, params)}
      {...props}
    >
      {children}
    </Link>
  );
};
