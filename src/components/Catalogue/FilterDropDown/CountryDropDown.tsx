'use client';
import { useEffect, useState } from 'react';
// import { revalidatePath } from 'next/cache';
import { useRouter, useSearchParams } from 'next/navigation';
import DownArrow from '@/components/SvgIcons/DownArrow';
import UpArrow from '@/components/SvgIcons/UpArrow';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import DropdownWrapper from '@/components/Shared/DropdownWrapper';
import { Country } from '@/interfaces/country.interface';
// import Spinner from '@/components/Shared/Spinner';
import FullScreenLoader from '@/components/Skeletons/FullScreenLoader';

// const Loader = () => {
//   return (
//     <div className="fixed inset-0 h-screen">
//       <div className="flex inset-0 justify-center items-center h-full opacity-75">
//         <Spinner />
//       </div>
//     </div>
//   );
// };

const CountryDropDown = ({ countries }: { countries: Country[] }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [loader]);

  const selectedCountry = searchParams.get('country') || 'Select country';

  const handleSelect = (option: Country, toggleDropdown: () => void) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('country', option.name as string);

    // const { orderBy, sortBy } = Object.fromEntries(
    //   new URLSearchParams(option.href)
    // );

    // params.set('orderBy', orderBy as string);
    // params.set('sortBy', sortBy as string);

    // revalidatePath('/');
    router.push(`/catalogue?${params.toString()}`);
    setLoader(true);
    // revalidatePath(`/catalogue?${params.toString()}`);
    setSelected(option.name);
    toggleDropdown();
  };
  return (
    <>
      <DropdownWrapper>
        {(isOpen, toggleDropdown) => (
          <>
            <ClickableComponent
              type="button"
              className="flex flex-col space-y-2 w-full"
              onClick={toggleDropdown}
              aria-expanded={isOpen}
            >
              <p className="text-base text-primary">Country</p>
              <p className="flex justify-between w-full text-base text-grey-80 py-3 px-4 border border-grey-100 rounded-lg">
                {selectedCountry}
                {isOpen ? <UpArrow /> : <DownArrow />}
              </p>
            </ClickableComponent>

            {isOpen && (
              <ul className="absolute w-full right-0 bg-white border borber-grey-100 mt-1 shadow-lg z-10 p-6 rounded-2xl space-y-8 animate-slide-down">
                {countries.map((option) => (
                  <li
                    key={option.name}
                    className={`cursor-pointer text-grey-100 text-center pb-2 border-b border-transparent hover:border-b-secondary-100 ${option.name === selected ? 'border-b-grey-100' : ''}`}
                    onClick={() => handleSelect(option, toggleDropdown)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </DropdownWrapper>
      {loader && <FullScreenLoader />}
    </>
  );
};

export default CountryDropDown;
