import { Fragment, useState } from 'react';
import { Divider } from 'antd';
import { FilterParams } from '@/interfaces/filter-params.interface';
import { FilterSearchParams } from '@/interfaces/filter-search-params.interface';
import { FilterConfig, filterConfig } from '@/utils/filter/filterConfig';
import { CustomSelectComponent } from '@/components/Shared/CustomSelectComponent';
import { CustomRangeSliderComponent } from '@/components/Shared/CustomRangeSliderComponent';
import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { DownArrow } from '@/components/SvgIcons/DownArrow';
import { FeaturedCheckboxes } from './FeaturedCheckboxes';

type FilterProps = {
  filterParams: FilterParams;
  selectedFilters: FilterSearchParams;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterSearchParams>>;
};

export const VisibleFilter = ({
  filterParams,
  selectedFilters,
  setSelectedFilters,
}: FilterProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const renderFilter = (config: FilterConfig) => {
    if (config.type === 'select') {
      const options =
        typeof config.options === 'function'
          ? config.options({ ...filterParams, selectedFilters })
          : config.options;

      return (
        <Fragment key={config.key}>
          <Divider style={{ borderColor: '#d9e2eb' }} />
          <CustomSelectComponent
            label={config.label}
            id={String(config.key)}
            valueKey={String(config.key)}
            placeholder={config.placeholder}
            value={selectedFilters[config.key] as string | null}
            options={options}
            onChange={(key, value) =>
              setSelectedFilters((prev) => {
                const newFilters = { ...prev, [key]: value };

                if (key === 'make') {
                  const validModels = filterParams.yachtModels
                    .filter((m) => m.make === value)
                    .map((m) => m.model);

                  if (!validModels.includes(prev.model || '')) {
                    newFilters.model = undefined;
                  }
                }

                if (key === 'country') {
                  const validTowns = filterParams.towns
                    .filter((t) => t.town_country_name === value)
                    .map((t) => t.town_name);

                  if (!validTowns.includes(prev.town || '')) {
                    newFilters.town = undefined;
                  }
                }

                return newFilters;
              })
            }
          />
        </Fragment>
      );
    }

    if (config.type === 'range') {
      return (
        <Fragment key={config.key}>
          <Divider style={{ borderColor: '#d9e2eb' }} />
          <CustomRangeSliderComponent
            label={config.label}
            value={
              (selectedFilters[config.key] as [number, number]) ??
              config.defaultValue
            }
            onChange={(val) =>
              setSelectedFilters((prev) => ({ ...prev, [config.key]: val }))
            }
            min={config.min}
            max={config.max}
            unit={config.unit}
            step={config.step}
          />
        </Fragment>
      );
    }

    return null;
  };
  return (
    <div className="overflow-y-auto scrollbar scrollbar-thumb-secondary-100 scrollbar-track-grey-20 space-y-6 flex-1 px-4 -mx-4">
      <FeaturedCheckboxes
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {filterConfig
        .filter((f) => (f.section ?? 'basic') === 'basic')
        .map(renderFilter)}
      <ClickableComponent
        type="button"
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="flex justify-between items-center text-sm font-medium w-full"
      >
        <span>Advanced filter</span>
        <span
          className={`ml-2 transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
        >
          <DownArrow />
        </span>
      </ClickableComponent>
      {showAdvanced &&
        filterConfig.filter((f) => f.section === 'advanced').map(renderFilter)}
    </div>
  );
};
