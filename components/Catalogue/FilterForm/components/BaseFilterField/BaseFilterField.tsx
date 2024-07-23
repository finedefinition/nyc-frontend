/* eslint-disable react-hooks/exhaustive-deps */

import { useFilter } from '@/components/Catalogue/CatalogProps/FilterContext';
import { BASE_FILTER } from '../../constants';
import { DropDown } from '../DropDown/DropDown';
import { Range } from '../Range/Range';
import { BaseFilterType } from '../../types';
import classes from './baseFilterField.module.scss';

export const BaseFilterField = () => {
  const {
    dropDownList,
    baseFilterField,
    yachtsParams,
    setDropDownList,
    setBaseFilterField,
  } = useFilter();

  const handleMake = (value: string) => {
    const modelsList = yachtsParams.models.filter(item => item.make === value);
    setDropDownList({ ...dropDownList, models: modelsList.map(item => item.model) });
    setBaseFilterField({ ...baseFilterField, make: value })
  };

  const handleModel = (value: string) => {
    const currentMake = yachtsParams.models.find(item => item.model === value);
    setBaseFilterField({
      ...baseFilterField,
      model: value,
      make: currentMake?.make || null,
    });
  };

  const handleCountry = (value: string) => {
    const townsList = yachtsParams.towns.filter(item => item.town_country_name === value);
    setDropDownList({ ...dropDownList, towns: townsList.map(item => item.town_name) });
    setBaseFilterField({ ...baseFilterField, country: value })
  };

  const handleTown = (value: string) => {
    const currentTown = yachtsParams?.towns.find(item => item.town_name === value);
    setBaseFilterField({
      ...baseFilterField,
      town: value,
      country: currentTown?.town_country_name || null,
    });
  };

  const handleRange = (value: number, key: keyof BaseFilterType) => {
    setBaseFilterField({
      ...baseFilterField,
      [key]: value,
    });
  };

  return (
    <div className={classes.baseFilter}>
      <Range
        title="Price Range"
        defaultValue={[BASE_FILTER.minPrice, BASE_FILTER.maxPrice]}
        pattern={/^[0-9]*$/}
        changeMinPrice={value => handleRange(value, 'minPrice')}
        changeMaxPrice={value => handleRange(value, 'maxPrice')}
      />

      <DropDown
        title="Manufacturer"
        defaultValue='Make'
        options={dropDownList.makes}
        active={baseFilterField.make}
        selectItem={handleMake}
      />

      <DropDown
        title="Model"
        defaultValue='Model'
        options={dropDownList.models}
        active={baseFilterField.model}
        selectItem={handleModel}
      />

      <Range
        title="Year Built"
        defaultValue={[BASE_FILTER.minYear, BASE_FILTER.maxYear]}
        pattern={/^[0-9]*$/}
        changeMinPrice={value => handleRange(value, 'minYear')}
        changeMaxPrice={value => handleRange(value, 'maxYear')}
      />

      <DropDown
        title="Country"
        defaultValue='Country'
        options={dropDownList.countries}
        active={baseFilterField.country}
        selectItem={handleCountry}
      />

      <DropDown
        title="Town"
        defaultValue='Town'
        options={dropDownList.towns}
        active={baseFilterField.town}
        selectItem={handleTown}
      />
    </div>
  );
}

export default BaseFilterField;
