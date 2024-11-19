import React from 'react';
import FilterIcon from '../SvgIcons/Filter';

const Filter = () => {
  return (
    <div className="flex space-x-2">
      <span className="hidden sm:flex">Filter</span> <FilterIcon />
    </div>
  );
};

export default Filter;
