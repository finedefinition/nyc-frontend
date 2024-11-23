'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortFields, Option } from '@/data/catalogue/sortFields';
import DownArrow from '@/components/SvgIcons/DownArrow';
import UpArrow from '@/components/SvgIcons/UpArrow';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import DropdownWrapper from '../Shared/DropdownWrapper';

const SortingBy = () => {
  const [selected, setSelected] = useState<string | null>(sortFields[0].name);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (option: Option, toggleDropdown: () => void) => {
    const params = new URLSearchParams(searchParams.toString());

    const { orderBy, sortBy } = Object.fromEntries(
      new URLSearchParams(option.href)
    );

    params.set('orderBy', orderBy as string);
    params.set('sortBy', sortBy as string);

    router.push(`/catalogue?${params.toString()}`);
    setSelected(option.name);
    toggleDropdown();
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
            <span className="mr-2 text-base">Sorting By:</span>
            <span className="hidden xl:flex text-base text-primary">
              {selected}
            </span>
            {isOpen ? <UpArrow /> : <DownArrow />}
          </ClickableComponent>
          {isOpen && (
            <ul className="absolute w-56 right-0 bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-8 animate-slide-down">
              {sortFields.map((option) => (
                <li
                  key={option.name}
                  className={`cursor-pointer text-grey-100 text-center pb-2 border-b border-transparent hover:border-b-secondary-100 ${option.name === selected ? 'border-b-grey-100' : ''}`}
                  onClick={() => handleSelect(option, toggleDropdown)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </DropdownWrapper>
  );
};

export default SortingBy;
