import { Checkbox } from 'antd';
import type { GetProp } from 'antd';
import { FilterSearchParams } from '@/interfaces/filter-search-params.interface';

type FeaturedCheckboxesProps = {
  selectedFilters: FilterSearchParams;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterSearchParams>>;
};

const plainOptions = ['Top 3', 'Hot Price', 'VAT'];

export const FeaturedCheckboxes = ({
  selectedFilters,
  setSelectedFilters,
}: FeaturedCheckboxesProps) => {
  const getCheckedValues = (): string[] => {
    const values: string[] = [];
    if (selectedFilters.featuredTop3) values.push('Top 3');
    if (selectedFilters.featuredHotPrice) values.push('Hot Price');
    if (selectedFilters.vatIncluded) values.push('VAT');
    return values;
  };

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      featuredTop3: checkedValues.includes('Top 3'),
      featuredHotPrice: checkedValues.includes('Hot Price'),
      vatIncluded: checkedValues.includes('VAT'),
    }));
  };

  return (
    <Checkbox.Group
      className="w-full flex justify-between"
      options={plainOptions}
      value={getCheckedValues()}
      onChange={onChange}
    />
  );
};
