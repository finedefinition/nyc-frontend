import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const useCurrentSearchParams = () => {
  const searchParams = useSearchParams();
  const [currentSearchParams, setSearchParams] = useState<string>(searchParams.toString());

  const setCurrentSearchParams = (
    newValue: string
  ) => {
    setSearchParams(newValue);
  };

  return [currentSearchParams, setCurrentSearchParams] as const;
};

export default useCurrentSearchParams;
