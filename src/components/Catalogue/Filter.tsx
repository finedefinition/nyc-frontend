import React from 'react';
import FilterIcon from '../SvgIcons/Filter';
import ClickableComponent from '../ClickableComponent/ClickableComponent';

const Filter = () => {
  return (
    <ClickableComponent
      href=""
      scroll={false}
    >
      <div className="flex space-x-2">
        <span className="hidden sm:flex">Filter</span> <FilterIcon />
      </div>
    </ClickableComponent>
  );
};

export default Filter;
