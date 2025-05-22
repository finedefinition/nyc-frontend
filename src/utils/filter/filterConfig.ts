/* eslint-disable @stylistic/indent */
import { FilterParams } from '@/interfaces/filter-params.interface';
import { FilterSearchParams } from '@/interfaces/filter-search-params.interface';

type FilterType = 'select' | 'range';
type FilterSection = 'basic' | 'advanced';

type BaseFilterConfig = {
  key: keyof FilterSearchParams;
  label: string;
  type: FilterType;
  section?: FilterSection;
};

type SelectFilterConfig = BaseFilterConfig & {
  type: 'select';
  options:
    | { value: string }[]
    | ((
        filters: FilterParams & { selectedFilters: FilterSearchParams }
      ) => { value: string }[]);
  placeholder: string;
};

type RangeFilterConfig = BaseFilterConfig & {
  type: 'range';
  min: number;
  max: number;
  defaultValue: [number, number];
  unit?: string;
  step?: number;
};

export type FilterConfig = SelectFilterConfig | RangeFilterConfig;

export const filterConfig: FilterConfig[] = [
  {
    key: 'Price',
    type: 'range',
    label: 'Price Range',
    min: 0,
    max: 1000000,
    defaultValue: [0, 1000000],
    section: 'basic',
  },
  {
    key: 'make',
    type: 'select',
    label: 'Make',
    placeholder: 'Select Make',
    options: ({ yachtModels }) => {
      const uniqueMakes = Array.from(
        new Set(yachtModels.map((model) => model.make))
      );

      return uniqueMakes.map((make) => ({ value: make }));
    },
    section: 'basic',
  },
  {
    key: 'model',
    type: 'select',
    label: 'Model',
    placeholder: 'Select Model',
    options: ({ yachtModels, selectedFilters }) => {
      const make = selectedFilters?.make;
      const filtered = make
        ? yachtModels.filter((m) => m.make === make)
        : yachtModels;
      const models = Array.from(new Set(filtered.map((m) => m.model)));
      return models.sort().map((model) => ({ value: model }));
    },
    section: 'basic',
  },
  {
    key: 'Year',
    type: 'range',
    label: 'Year Range',
    min: 1900,
    max: 2025,
    defaultValue: [1900, 2025],
    section: 'basic',
  },
  {
    key: 'country',
    type: 'select',
    label: 'Country',
    placeholder: 'Select Country',
    options: ({ countries }) => {
      return countries.map((country) => ({ value: country.name }));
    },
    section: 'basic',
  },
  {
    key: 'town',
    type: 'select',
    label: 'Town',
    placeholder: 'Select Town',
    options: ({ towns, selectedFilters }) => {
      const country = selectedFilters?.country;
      const filteredTowns = country
        ? towns.filter((t) => t.town_country_name === country)
        : towns;
      const townNames = Array.from(
        new Set(filteredTowns.map((t) => t.town_name))
      );
      return townNames.sort().map((town) => ({ value: town }));
    },
    section: 'basic',
  },
  {
    key: 'LengthOverall',
    type: 'range',
    label: 'Length Overall',
    min: 2.5,
    max: 300,
    defaultValue: [2.5, 300],
    unit: 'm',
    step: 0.5,
    section: 'advanced',
  },
  {
    key: 'BeamWidth',
    type: 'range',
    label: 'Beam Width',
    min: 1,
    max: 25,
    defaultValue: [1, 25],
    unit: 'm',
    section: 'advanced',
  },
  {
    key: 'DraftDepth',
    type: 'range',
    label: 'Draft Depth',
    min: 0.1,
    max: 16,
    defaultValue: [0.3, 16],
    unit: 'm',
    step: 0.1,
    section: 'advanced',
  },
  {
    key: 'keelType',
    type: 'select',
    label: 'Keel Type',
    placeholder: 'All Keel Types',
    options: ({ keelTypes }) => {
      return keelTypes.map((kellType) => ({ value: kellType.name }));
    },
    section: 'advanced',
  },
  {
    key: 'fuelType',
    type: 'select',
    label: 'Fuel Type',
    placeholder: 'All Fuel Types',
    options: ({ fuelTypes }) => {
      return fuelTypes.map((fuelType) => ({ value: fuelType.name }));
    },
    section: 'advanced',
  },
  {
    key: 'CabinNumber',
    type: 'range',
    label: 'Cabins',
    min: 0,
    max: 10,
    defaultValue: [0, 10],
    section: 'advanced',
  },
  {
    key: 'BerthNumber',
    type: 'range',
    label: 'Berths',
    min: 0,
    max: 20,
    defaultValue: [0, 20],
    section: 'advanced',
  },
  {
    key: 'HeadsNumber',
    type: 'range',
    label: 'Heads',
    min: 0,
    max: 10,
    defaultValue: [0, 10],
    section: 'advanced',
  },
  {
    key: 'ShowerNumber',
    type: 'range',
    label: 'Showers',
    min: 0,
    max: 10,
    defaultValue: [0, 10],
    section: 'advanced',
  },
];
