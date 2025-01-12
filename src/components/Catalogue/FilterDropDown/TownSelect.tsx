'use client';
import { useSearchParams } from 'next/navigation';
import { Town } from '@/interfaces/town.interface';
import CustomSelectComponent from '@/components/Shared/CustomSelectComponent';
import { transformObjectsForSelect } from '@/utils/filter/selectHelper';
import { useFilteredTowns, useValidateTown } from '@/hooks/useTownSelect';

const TownSelect = ({ towns }: { towns: Town[] }) => {
  const searchParams = useSearchParams();

  const selectedCountry = searchParams.get('country');
  const selectedTown = searchParams.get('town');

  const visibleTowns = useFilteredTowns(towns, selectedCountry);
  useValidateTown(visibleTowns, selectedTown);

  const options = transformObjectsForSelect(visibleTowns);

  return (
    <CustomSelectComponent
      label="Town"
      id="townSelect"
      valueKey="town"
      placeholder="Select city"
      value={selectedTown}
      options={options}
    />
  );
};

export default TownSelect;
