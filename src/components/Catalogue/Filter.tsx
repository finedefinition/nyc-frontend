'use client';
// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
import { Country } from '@/interfaces/country.interface';
import FilterIcon from '../SvgIcons/Filter';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import DropdownWrapper from '../Shared/DropdownWrapper';
import CountryDropDown from './FilterDropDown/CountryDropDown';

type FilterProps = {
  filterParams: {
    countries: Country[];
  };
};

const Filter = ({ filterParams }: FilterProps) => {
  return (
    <DropdownWrapper>
      {(isOpen, toggleDropdown) => (
        <>
          <ClickableComponent
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            scroll={false}
          >
            <div className="flex space-x-2">
              <span className="hidden sm:flex">Filter</span> <FilterIcon />
            </div>
          </ClickableComponent>
          {isOpen && (
            <ul className="fixed right-0 w-80 bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-8 animate-slide-down">
              <li>
                <CountryDropDown countries={filterParams.countries} />
              </li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
            </ul>
          )}
        </>
      )}
    </DropdownWrapper>
  );
};

export default Filter;
