'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from 'antd';
const { Option } = Select;
import { Country } from '@/interfaces/country.interface';

type CountrySelectType = {
  countries: Country[];
};

const CountrySelect = ({ countries }: CountrySelectType) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCountry = searchParams.get('country');

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('country', option as string);

    router.push(`/catalogue?${params.toString()}`);
  };

  return (
    <>
      <label
        className="text-base text-primary"
        htmlFor="countrySelect"
      >
        Country
      </label>
      <Select
        id="countrySelect"
        placeholder="Select country"
        className="w-full"
        size="large"
        value={selectedCountry}
        onChange={handleSelect}
        autoFocus={false}
      >
        {countries.map((country) => (
          <Option
            key={country.name}
            value={country.name}
          >
            {country.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CountrySelect;
