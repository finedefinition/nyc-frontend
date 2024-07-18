import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const useCurrentSearchParams = () => {
  const searchParams = useSearchParams();
  const [currentSearchParams, setSearchParams] = useState<ReadonlyURLSearchParams | string>(searchParams);

  const setCurrentSearchParams = (
    newValue: ReadonlyURLSearchParams | string
  ) => {
    setSearchParams(newValue);
  };

  return [currentSearchParams, setCurrentSearchParams] as const;
};

export default useCurrentSearchParams;
