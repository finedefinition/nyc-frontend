'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterSearchParams } from '@/interfaces/filter-search-params.interface';
import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { FilterParams } from '@/interfaces/filter-params.interface';
import { DropdownWrapper } from '@/components/Shared/DropdownWrapper';
import { FilterIcon } from '@/components/SvgIcons/Filter';
import { Close } from '@/components/SvgIcons/Close';
import { VisibleFilter } from './VisibleFilter';

type FilterProps = {
  filterParams: FilterParams;
};

export const Filter = ({ filterParams }: FilterProps) => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<FilterSearchParams>(
    {}
  );

  const resetFilter = () => {
    setSelectedFilters({});
    router.push('/catalogue');
  };
  const applyFilter = () => {
    const searchParams = new URLSearchParams();

    const { featuredTop3, featuredHotPrice, vatIncluded, ...rest } =
      selectedFilters;

    if (featuredTop3 || featuredHotPrice) {
      searchParams.append('featured', 'true');
    }

    if (vatIncluded) {
      searchParams.append('vatIncluded', 'true');
    }

    Object.entries(rest).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        searchParams.append(`min${key}`, String(value[0]));
        searchParams.append(`max${key}`, String(value[1]));
      } else if (value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    router.push(`/catalogue?${searchParams.toString()}`);
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
            <div className="absolute left-[-150px] md:left-[-90px] xl:left-12 w-[300px] h-[660px] bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-6 animate-slide-down flex flex-col">
              <div className="w-full flex justify-between">
                <h4>Filter</h4>
                <ClickableComponent
                  type="button"
                  onClick={toggleDropdown}
                  variants={[]}
                >
                  <Close />
                </ClickableComponent>
              </div>

              <VisibleFilter
                filterParams={filterParams}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />

              <div className="flex w-full gap-x-6">
                <ClickableComponent
                  type="button"
                  className="w-1/2"
                  variants={['primary', 'button']}
                  onClick={resetFilter}
                >
                  Reset
                </ClickableComponent>
                <ClickableComponent
                  type="button"
                  className="w-1/2"
                  variants={['primary', 'button']}
                  onClick={applyFilter}
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
