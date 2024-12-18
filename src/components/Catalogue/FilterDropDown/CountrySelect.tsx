'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from 'antd';
const { Option } = Select;
import { Country } from '@/interfaces/country.interface';

type CountrySelectType = {
  countries: Country[];
  resetFilter: () => void;
};

const CountrySelect = ({ countries, resetFilter }: CountrySelectType) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const selectedCountry = searchParams.get('country') || 'Select country';

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('country', option as string);

    router.push(`/catalogue?${params.toString()}`);
  };

  return (
    <>
      <label
        className="text-base text-primary"
        htmlFor="mySelect"
      >
        Country
      </label>
      <Select
        id="mySelect"
        allowClear
        onClear={resetFilter}
        // placeholder={selectedCountry}
        placeholder="Select country"
        className="w-full"
        size="large"
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
