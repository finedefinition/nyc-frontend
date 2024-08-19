/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useContext, FormEvent, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterProps } from '@/interfaces/filterProps.interface';
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { AdvancedFilterType, BaseFilterType, DropDownType, FeaturedType } from '../FilterForm/types';
import { ADVANCED_FILTER, DROP_DOWNS, BASE_FILTER, FEATURED } from '../FilterForm/constants';

type FilterContextType = {
  yachtsParams: FilterProps;
  setYachtsParams: (value: FilterProps) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  handleFeatured: (value: keyof FeaturedType) => void;
  featured: FeaturedType;
  setFeatured: (value: FeaturedType) => void;
  dropDownList: DropDownType;
  setDropDownList: (value: DropDownType) => void;
  baseFilterField: BaseFilterType,
  setBaseFilterField: (value: BaseFilterType) => void;
  advancedFilterField: AdvancedFilterType,
  setAdvancedFilterField: (value: AdvancedFilterType) => void;
};

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [yachtsParams, setYachtsParams] = useState<FilterProps>({
    makes: [], 
    models: [],
    countries: [], 
    towns: [],
    fuels: [], 
    keels: [],
  });
  
  const [featured, setFeatured] = useLocalStorage<FeaturedType>('featured', {
    top: !!searchParams.get('top'),
    hotPrice: !!searchParams.get('hotPrice'),
    vat: !!searchParams.get('vat'),
  });
  
  const [baseFilterField, setBaseFilterField] = useLocalStorage<BaseFilterType>('baseFilter', BASE_FILTER);
  const [advancedFilterField, setAdvancedFilterField] = useLocalStorage<AdvancedFilterType>('advancedFilter', ADVANCED_FILTER);
  const [dropDownList, setDropDownList] = useState<DropDownType>(DROP_DOWNS);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const params = getSearchWith(searchParams, featured);
    replace(`${pathname}?${params}`);
  };

  const handleReset = useCallback(() => {
    setFeatured(FEATURED);
    setBaseFilterField(BASE_FILTER);
    setAdvancedFilterField(ADVANCED_FILTER);

    const params = getSearchWith(searchParams, FEATURED);
    replace(`${pathname}?${params}`);
  }, []);

  const handleFeatured = (value: keyof FeaturedType) =>
    setFeatured({ ...featured, [value]: !featured[value] });
  
  useEffect(() => {
    if (yachtsParams) {
      const list = {
        makes: yachtsParams.makes,
        models: yachtsParams.models.map(item => item.model),
        countries: yachtsParams.countries.map(item => item.country_name),
        towns: yachtsParams.towns.map(item => item.town_name),
        keelType: yachtsParams.keels.map(item => item.keel_type_name),
        fuelType: yachtsParams.fuels.map(item => item.fuel_type_name),
      }

      setDropDownList(list);
    }
  }, [yachtsParams])

  return (
    <FilterContext.Provider
      value={{
        yachtsParams,
        setYachtsParams,
        handleSubmit,
        handleReset,
        handleFeatured,
        featured,
        setFeatured,
        dropDownList,
        setDropDownList,
        baseFilterField,
        setBaseFilterField,
        advancedFilterField,
        setAdvancedFilterField,
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
