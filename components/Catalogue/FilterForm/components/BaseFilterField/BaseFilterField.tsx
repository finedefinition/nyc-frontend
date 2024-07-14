
import { useFilter } from '@/components/Catalogue/CatalogProps/FilterContext';
import { BASE_FILTER } from '../../constants';
import { DropDown } from '../DropDown/DropDown';
import { Range } from '../Range/Range';
import classes from './baseFilterField.module.scss';

export const BaseFilterField = () => {
  const { dropDownList, baseFilterField, handleBaseFilter } = useFilter()
  return (
    <div className={classes.baseFilter}>
      <Range
        title="Price Range"
        defaultValue={[BASE_FILTER.minPrice, BASE_FILTER.maxPrice]}
        changeMinPrice={value => handleBaseFilter('minPrice', value)}
        changeMaxPrice={value => handleBaseFilter('maxPrice', value)}
      />

      <DropDown
        title="Manufacturer"
        defaultValue='Make'
        options={dropDownList.makes}
        active={baseFilterField.make}
        selectItem={value => handleBaseFilter('make', value)}
      />

      <DropDown
        title="Model"
        defaultValue='Model'
        options={dropDownList.models}
        active={baseFilterField.model}
        selectItem={value => handleBaseFilter('model', value)}
      />

      <Range
        title="Year Built"
        defaultValue={[BASE_FILTER.minYear, BASE_FILTER.maxYear]}
        changeMinPrice={value => handleBaseFilter('minYear', value)}
        changeMaxPrice={value => handleBaseFilter('maxYear', value)}
      />

      <DropDown
        title="Country"
        defaultValue='Country'
        options={dropDownList.countries}
        active={baseFilterField.country}
        selectItem={value => handleBaseFilter('country', value)}
      />

      <DropDown
        title="Town"
        defaultValue='Town'
        options={dropDownList.towns}
        active={baseFilterField.town}
        selectItem={value => handleBaseFilter('town', value)}
      />
    </div>
  );
}

export default BaseFilterField;
