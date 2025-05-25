import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Town } from '@/interfaces/town.interface';

export const useFilteredTowns = (
  towns: Town[],
  selectedCountry: string | null
) => {
  return selectedCountry
    ? towns.filter((town) => town.town_country_name === selectedCountry)
    : towns;
};

export const useValidateTown = (
  visibleTowns: Town[],
  selectedTown: string | null
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isTownValid = visibleTowns.some(
      (town) => town.town_name === selectedTown
    );
    if (!isTownValid) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('town');
      router.replace(`/catalogue?${params.toString()}`);
    }
  }, [visibleTowns, selectedTown, router, searchParams]);
};
