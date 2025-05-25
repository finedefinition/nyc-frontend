import Image from 'next/image';
import img from '@/public/images/filter-no-match.png';
import { ClickableComponent } from '../../ClickableComponent/ClickableComponent';

export const FilterNoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pb-4 px-4">
      <div className="relative w-full max-w-md h-64 mb-6">
        <Image
          src={img}
          alt="Background Image"
          fill
          className="object-contain"
          sizes="100vw"
          quality={75}
        />
      </div>
      <p className="font-baiJ text-3xl md:text-4xl font-medium mb-6">
        Sorry, no items matching your request
      </p>
      <ClickableComponent
        href="/catalogue"
        variants={['button', 'secondary']}
      >
        Update Filters
      </ClickableComponent>
    </div>
  );
};
