'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import DownArrow from '../SvgIcons/DownArrow';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import SortModal from '../Modals/SortModal';
import UpArrow from '../SvgIcons/UpArrow';

type SortingByProps = {
  title?: string;
};

const SortingBy = ({ title }: SortingByProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  params.set('modal', 'sortingBy');

  const openModal = () => {
    router.push(`/catalogue?${params.toString()}`);
  };

  const modal = searchParams.get('modal');
  const closeModal = () => {};

  return (
    <>
      <div className="flex space-x-2">
        <span>SortingBy:</span>
        <ClickableComponent
          type="button"
          onClick={openModal}
          className="flex space-x-1"
        >
          <span className="hidden xl:flex text-base text-primary">{title}</span>
          {modal === 'sortingBy' ? <UpArrow /> : <DownArrow />}
        </ClickableComponent>
      </div>
      <Suspense fallback={null}>
        <>
          {modal === 'sortingBy' && (
            <SortModal
              title={title}
              onClose={closeModal}
            />
          )}
        </>
      </Suspense>
    </>
  );
};

export default SortingBy;
