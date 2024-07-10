/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useContext, FormEvent, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterProps } from '@/interfaces/filterProps.interface';
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { BaseFilterType, DropDownType, FeaturedType } from '../FilterForm/types';
import { BASE_FILTER, FEATURED } from '../FilterForm/constants';

type FilterContextType = {
  setYachtsParams: (value: FilterProps) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  handleFeatured: (value: keyof FeaturedType) => void;
  featured: FeaturedType;
  setFeatured: (value: FeaturedType) => void;
  dropDownList: DropDownType;
  baseFilterField: BaseFilterType,
  handleBaseFilter: (key: string, value: string | number | null) => void
};

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [yachtsParams, setYachtsParams] = useState<FilterProps | null>(null);
  
  const [featured, setFeatured] = useLocalStorage<FeaturedType>('featured', {
    top: !!searchParams.get('top'),
    hotPrice: !!searchParams.get('hotPrice'),
    vat: !!searchParams.get('vat'),
  });
  
  const [baseFilterField, setBaseFilterField] = useLocalStorage<BaseFilterType>('baseFilter', BASE_FILTER);
  const [dropDownList, setDropDownList] = useState<DropDownType>({
    makes: [],
    countries: [],
    towns: [],
    models: [],
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const params = getSearchWith(searchParams, featured);
    replace(`${pathname}?${params}`);
  };

  const handleReset = () => {
    setFeatured(FEATURED);
    setBaseFilterField(BASE_FILTER)

    const params = getSearchWith(searchParams, FEATURED);
    replace(`${pathname}?${params}`);
  };

  const handleFeatured = (value: keyof FeaturedType) =>
    setFeatured({ ...featured, [value]: !featured[value] });
  
  const handleBaseFilter = useCallback((
    key: string,
    value: string | number | null,
  ) => setBaseFilterField({ ...baseFilterField, [key]: value }), [])
  
  useEffect(() => {
    if (yachtsParams) {
      setDropDownList({
        makes: yachtsParams.makes,
        models: yachtsParams.models.map(item => item.model),
        countries: yachtsParams.countries.map(item => item.country_name),
        towns: yachtsParams.towns.map(item => item.town_name),
      })
    }
  }, [yachtsParams])

  // useEffect(() => {
  //   const {town, country, make, model} = baseFilterField;
    
  //   console.log(baseFilterField);

  //   // if (town) {
  //   //   const currentTown = yachtsParams?.towns.find(item => item.town_name === town);

  //   //   handleBaseFilter('country', currentTown?.town_country_name || null)

  //   //   console.log(currentTown, baseFilterField.country);
  //   // }

  //   // if (country) {
  //   // }
  // }, [baseFilterField])

  return (
    <FilterContext.Provider
      value={{
        setYachtsParams,
        handleSubmit,
        handleReset,
        handleFeatured,
        featured,
        setFeatured,
        dropDownList,
        baseFilterField,
        handleBaseFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterContextProvider');
  }
  return context;
};
