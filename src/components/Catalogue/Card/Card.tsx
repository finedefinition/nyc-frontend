import dynamic from 'next/dynamic';
import { Yacht } from '@/interfaces/yacht.interface';

import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { CardImg } from './CardImg';
import { TopRightLabel } from './TopRightLabel';
import { CardHeart } from './CardHeart';

const DynamicYachtPrice = dynamic(
  () => import('./YachtPrice').then((mod) => mod.YachtPrice),
  {
    ssr: false,
  }
);

type CatalogueCardProps = {
  yacht: Yacht;
};

export const CatalogueCard = async ({ yacht }: CatalogueCardProps) => {
  const {
    yacht_id,
    yacht_model,
    yacht_make,
    yacht_main_image_key,
    yacht_price,
    yacht_price_old,
    yacht_country,
    yacht_town,
    yacht_year,
    yacht_top,
    yacht_hot_price,
  } = yacht;

  return (
    <ClickableComponent
      href={`/catalogue/${yacht_id}?name=${yacht_make}_${yacht_model}`}
    >
      <div className="space-y-3 hover:shadow-custom hover:rounded-lg hover:scale-105 transition ease duration-1000 group">
        <div className="relative block w-full h-96">
          <CardImg keyImg={yacht_main_image_key} />
          <span className="absolute top-6 right-8 text-white uppercase leading-7 font-medium px-4 bg-secondary-100 rounded-[2rem] rounded-tr-sm rounded-bl-sm">
            <TopRightLabel
              yachtTop={yacht_top}
              yachtHotPrice={yacht_hot_price}
            />
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <ClickableComponent
            href={`/catalogue/${yacht_id}?name=${yacht_make}_${yacht_model}`}
            className="hover:text-secondary-100 hover:underline transition"
          >
            <p className="font-baiJ text-2xl sm:text-4xl mb-2">{yacht_make}</p>
            <p className="font-baiJ text-2xl sm:text-4xl mb-3">{yacht_model}</p>
          </ClickableComponent>
          <span className="mx-4 my-4">
            <CardHeart />
          </span>
        </div>
        <DynamicYachtPrice
          price={yacht_price}
          old_price={yacht_price_old}
        />
        <p className="text-grey-100 font-normal xl:text-2xl">{`${yacht_country}, ${yacht_town} | ${yacht_year}`}</p>
      </div>
    </ClickableComponent>
  );
};
