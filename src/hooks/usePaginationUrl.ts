import { useSearchParams } from 'next/navigation';

export const usePaginationUrl = () => {
  const searchParams = useSearchParams();

  const createUrlWithPage = (page: number | string) => {
    const currentPage = Number(searchParams.get('page')) || 1;
    let normalizedPage;

    switch (page) {
      case 'left':
        normalizedPage = currentPage - 1;
        break;
      case 'right':
        normalizedPage = currentPage + 1;
        break;
      default:
        normalizedPage = Number(page);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(normalizedPage));
    return `?${params.toString()}`;
  };

  return createUrlWithPage;
};
