'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortFields, Option } from '@/data/catalogue/sortFields';
import DownArrow from '@/components/SvgIcons/DownArrow';
import UpArrow from '@/components/SvgIcons/UpArrow';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';

const SortingBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(sortFields[0].name);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramsToAdd = new URLSearchParams(option.href);

    const orderBy = paramsToAdd.get('orderBy');
    const sortBy = paramsToAdd.get('sortBy');

    params.set('orderBy', orderBy as string);
    params.set('sortBy', sortBy as string);

    router.push(`/catalogue?${params.toString()}`);
    setSelected(option.name);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <ClickableComponent
        type="button"
        className="flex space-x-1 items-center"
        onClick={toggleDropdown}
      >
        <span className="mr-2 text-base">Sorting By:</span>{' '}
        <span className="hidden xl:flex text-base text-primary">
          {selected}
        </span>{' '}
        {isOpen ? <UpArrow /> : <DownArrow />}
      </ClickableComponent>
      {isOpen && (
        <ul className="absolute w-56 bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-8 ">
          {sortFields.map((option) => (
            <li
              key={option.name}
              className={`cursor-pointer text-grey-100 text-center pb-2 border-b border-transparent hover:border-b-secondary-100 ${option.name === selected ? 'border-b-grey-100' : ''} transform`}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortingBy;
