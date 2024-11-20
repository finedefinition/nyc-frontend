import { YachtDetail } from '@/interfaces/yacht.interface';
import YachtPrice from '../Catalogue/Card/YachtPrice';

const ProductPage = ({
  yacht_make,
  yacht_model,
  yacht_year,
  yacht_country,
  yacht_town,
  yacht_price,
  yacht_price_old,
}: YachtDetail) => {
  return (
    <div className="w-full px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <div className="text-2xl 2xl:text-4xl font-medium font-baiJ">{`${yacht_make} ${yacht_model}, ${yacht_year}, ${yacht_country}, ${yacht_town}`}</div>
      <div>
        <YachtPrice
          price={yacht_price}
          old_price={yacht_price_old}
        />
      </div>
      <div className='flex gap-2'>
        <p>Tax / VAT status</p>
        <p>Paid / Included</p>
      </div>
    </div>
  );
};

export default ProductPage;
