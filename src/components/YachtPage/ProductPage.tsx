'use client';
import dynamic from 'next/dynamic';

import { YachtDetail } from '@/interfaces/yacht.interface';
import ContactForm from '../MainPageContent/ContactSection/ContactForm';
// import ScrollForm from './ScrollForm';

const DynamicYachtPrice = dynamic(
  () => import('../Catalogue/Card/YachtPrice'),
  {
    ssr: false,
  }
);

const ProductPage = ({
  yacht_make,
  yacht_model,
  yacht_year,
  yacht_country,
  yacht_town,
  yacht_price,
  yacht_price_old,
  yacht_vat,
  yacht_description,
  yacht_loa,
  yacht_beam,
  yacht_draft,
  yacht_cabin,
  yacht_berth,
  yacht_shower,
  yacht_heads,
  yacht_keel_type,
  yacht_fuel_type,
}: YachtDetail) => {
  return (
    <div className="w-full px-5 md:px-16 pb-4 md:pb-6 xl:pb-8">
      <div className="grid space-x-2 gap-x-6 xl:grid-cols-12 xl:mb-6">
        <div className="xl:col-start-1 xl:col-end-9 xl:flex">
          <div className="text-2xl 2xl:text-4xl font-medium font-baiJ mb-2">{`${yacht_make} ${yacht_model}, ${yacht_year}, ${yacht_country}, ${yacht_town}`}</div>
          <div className="mb-2">
            <DynamicYachtPrice
              price={yacht_price}
              old_price={yacht_price_old}
            />
          </div>
        </div>
        <div className="flex gap-2 xl:col-start-9 xl:col-end-13 xl:justify-items-end mb-2">
          <p>Tax / VAT status</p>
          <p className="text-secondary-100">
            {yacht_vat ? 'Paid / Included' : 'Unpaid / Excluded'}
          </p>
        </div>
      </div>
      <div className="grid gap-x-6 xl:grid-cols-12">
        <div className="xl:col-start-1 xl:col-end-9">
          <div>images slider</div>
          <div>
            <p>About</p>
            <p>{yacht_description}</p>
          </div>
          <ul>
            <li>
              Length Overall: <span>{yacht_loa}</span>{' '}
            </li>
            <li>
              Beam: <span>{yacht_beam}</span>{' '}
            </li>
            <li>
              Draft: <span>{yacht_draft}</span>{' '}
            </li>
            <li>
              Cabin: <span>{yacht_cabin}</span>{' '}
            </li>
            <li>
              Berth: <span>{yacht_berth}</span>{' '}
            </li>
            <li>
              Shower: <span>{yacht_shower}</span>{' '}
            </li>
            <li>
              Heads: <span>{yacht_heads}</span>{' '}
            </li>
            <li>
              Kell Type: <span>{yacht_keel_type}</span>{' '}
            </li>
            <li>
              Fuel Type: <span>{yacht_fuel_type}</span>{' '}
            </li>
          </ul>
        </div>
        <div className="xl:col-start-9 xl:col-end-13">
          {/* <ScrollForm /> */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
