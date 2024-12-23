'use client';
import { useRouter } from 'next/navigation';
import { Divider } from 'antd';
import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import DropdownWrapper from '../Shared/DropdownWrapper';
import FilterIcon from '../SvgIcons/Filter';
import CountrySelect from './FilterDropDown/CountrySelect';
import TownSelect from './FilterDropDown/TownSelect';

type FilterProps = {
  filterParams: {
    countries: Country[];
    towns: Town[];
  };
};

const Filter = ({ filterParams }: FilterProps) => {
  const router = useRouter();

  const resetFilter = () => {
    router.push('/catalogue');
  };
  return (
    <DropdownWrapper>
      {(isOpen, toggleDropdown) => (
        <>
          <ClickableComponent
            type="button"
            className="flex space-x-1 items-center"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
          >
            <div className="flex space-x-2">
              <span className="hidden sm:flex">Filter</span> <FilterIcon />
            </div>
          </ClickableComponent>
          {isOpen && (
            <div className="absolute w-[360px] h-96 left-0 bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-8 animate-slide-down">
              <CountrySelect
                countries={filterParams.countries}
              />
              <Divider style={{ borderColor: '#d9e2eb' }} />
              <TownSelect towns={filterParams.towns} />
              <div className="flex justify-between">
                <ClickableComponent
                  type="button"
                  variants={['primary', 'button']}
                  onClick={resetFilter}
                >
                  Reset
                </ClickableComponent>
                <ClickableComponent
                  type="button"
                  variants={['primary', 'button']}
                  onClick={toggleDropdown}
                >
                  Apply
                </ClickableComponent>
              </div>
            </div>
          )}
        </>
      )}
    </DropdownWrapper>
  );
};

export default Filter;
