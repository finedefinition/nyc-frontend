'use client';

import { useSearchParams } from 'next/navigation';
import { Country } from '@/interfaces/country.interface';
import CustomSelectComponent from '@/components/Shared/CustomSelectComponent';
import { transformObjectsForSelect } from '@/utils/filter/selectHelper';

type CountrySelectType = {
  countries: Country[];
};

const CountrySelect = ({ countries }: CountrySelectType) => {
  const searchParams = useSearchParams();

  const selectedCountry = searchParams.get('country');

  const options = transformObjectsForSelect(countries);

  return (
    <CustomSelectComponent
      label="Country"
      valueKey="country"
      id="countrySelect"
      placeholder="Select country"
      value={selectedCountry}
      options={options}
    />
  );
};

export default CountrySelect;
