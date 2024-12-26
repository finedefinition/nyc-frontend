'use client';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import SplitCurrencyLink from '@/components/Shared/SplitCurrencyLink';
import CurrencyList from '@/components/Shared/CurrencyList';
import DropdownWrapper from '@/components/Shared/DropdownWrapper';

const CurrencyDropdown = () => {
  return (
    <DropdownWrapper>
      {(isOpen, toggleDropdown) => (
        <>
          <ClickableComponent
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            variants={['link']}
          >
            <SplitCurrencyLink />
          </ClickableComponent>
          {isOpen && (
            <CurrencyList
              desktop
              onClose={toggleDropdown}
            />
          )}
        </>
      )}
    </DropdownWrapper>
  );
};

export default CurrencyDropdown;
