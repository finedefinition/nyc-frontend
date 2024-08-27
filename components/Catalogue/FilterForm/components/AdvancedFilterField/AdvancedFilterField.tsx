/* eslint-disable react-hooks/exhaustive-deps */

import { useFilter } from '@/components/Catalogue/CatalogProps/FilterContext';
import { ADVANCED_FILTER } from '../../constants';
import { DropDown } from '../DropDown/DropDown';
import { Range } from '../Range/Range';
import { AdvancedFilterType } from '../../types';
import classes from './advancedFilterField.module.scss';

export const AdvancedFilterField = () => {
  const { advancedFilterField, setAdvancedFilterField, dropDownList } = useFilter();

  const handleRange = (value: number, key: keyof AdvancedFilterType) => {
    setAdvancedFilterField({
      ...advancedFilterField,
      [key]: value,
    });
  };

  return (
    <div className={classes.advancedFilter}>
      <Range
        title="Length Overall"
        defaultValue={[ADVANCED_FILTER.minLengthOverall, ADVANCED_FILTER.maxLengthOverall]}
        changeMinPrice={value => handleRange(value, 'minLengthOverall')}
        changeMaxPrice={value => handleRange(value, 'maxLengthOverall')}
      />

      <Range
        title="Beam Width"
        defaultValue={[ADVANCED_FILTER.minBeamWidth, ADVANCED_FILTER.maxBeamWidth]}
        changeMinPrice={value => handleRange(value, 'minBeamWidth')}
        changeMaxPrice={value => handleRange(value, 'maxBeamWidth')}
      />

      <Range
        title="Draft Depth"
        defaultValue={[ADVANCED_FILTER.minDraftDepth, ADVANCED_FILTER.maxDraftDepth]}
        changeMinPrice={value => handleRange(value, 'minDraftDepth')}
        changeMaxPrice={value => handleRange(value, 'maxDraftDepth')}
      />

      <DropDown
        title="Keel Type"
        defaultValue='Keel'
        options={dropDownList.keelType}
        active={advancedFilterField.keelType}
        selectItem={value => setAdvancedFilterField({ ...advancedFilterField, keelType: value })}
      />

      <DropDown
        title="Fuel Type"
        defaultValue='Fuel'
        options={dropDownList.fuelType}
        active={advancedFilterField.fuelType}
        selectItem={value => setAdvancedFilterField({ ...advancedFilterField, fuelType: value })}
      />

      <Range
        title="Cabins"
        pattern={/^[0-9]*$/}
        defaultValue={[ADVANCED_FILTER.minCabinNumber, ADVANCED_FILTER.maxCabinNumber]}
        changeMinPrice={value => handleRange(value, 'minCabinNumber')}
        changeMaxPrice={value => handleRange(value, 'maxCabinNumber')}
      />

      <Range
        title="Berths"
        pattern={/^[0-9]*$/}
        defaultValue={[ADVANCED_FILTER.minBerthNumber, ADVANCED_FILTER.maxBerthNumber]}
        changeMinPrice={value => handleRange(value, 'minBerthNumber')}
        changeMaxPrice={value => handleRange(value, 'maxBerthNumber')}
      />

      <Range
        title="Heads"
        pattern={/^[0-9]*$/}
        defaultValue={[ADVANCED_FILTER.minHeadsNumber, ADVANCED_FILTER.maxHeadsNumber]}
        changeMinPrice={value => handleRange(value, 'minHeadsNumber')}
        changeMaxPrice={value => handleRange(value, 'maxHeadsNumber')}
      />

      <Range
        title="Showers"
        pattern={/^[0-9]*$/}
        defaultValue={[ADVANCED_FILTER.minShowerNumber, ADVANCED_FILTER.maxShowerNumber]}
        changeMinPrice={value => handleRange(value, 'minShowerNumber')}
        changeMaxPrice={value => handleRange(value, 'maxShowerNumber')}
      />
    </div>
  );
}

export default AdvancedFilterField;
