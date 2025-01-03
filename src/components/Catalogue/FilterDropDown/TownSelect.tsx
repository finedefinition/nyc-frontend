'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from 'antd';
const { Option } = Select;
import { Town } from '@/interfaces/town.interface';

const TownSelect = ({ towns }: { towns: Town[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let visibleTowns = towns;

  const selectedCountry = searchParams.get('country');
  const selectedTown = searchParams.get('town');

  if (selectedCountry) {
    visibleTowns = towns.filter(
      (town) => town.town_country_name === selectedCountry
    );
  }

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('town', option as string);

    router.push(`/catalogue?${params.toString()}`);
  };
  return (
    <>
      <label
        className="text-base text-primary"
        htmlFor="townSelect"
      >
        Town
      </label>
      <Select
        id="townSelect"
        placeholder="Select town"
        className="w-full"
        size="large"
        value={selectedTown}
        onChange={handleSelect}
        autoFocus={false}
      >
        {visibleTowns.map((town) => (
          <Option
            key={town.town_name}
            value={town.town_name}
          >
            {town.town_name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default TownSelect;
