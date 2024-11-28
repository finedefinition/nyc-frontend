import { StaticImageData } from 'next/image';
import * as icons from '@/public/icons/yachtDetails';
import { YachtDetailsType } from '@/utils/yachtPage/yachtDetailsHelper';

const YachtDetails = ({ details }: YachtDetailsType[]) => {
  return (
    <>
      {details.map(({ name, icon, value }, i) => (
        <li
          key={i}
          className="text-primary text-2xl font-semibold grid grid-cols-[1fr_7fr_3fr] gap-4"
        >
          <Image
            src={icon}
            alt={name}
          />

          {name}
          <span className="text-black text-xl font-normal">{value}</span>
        </li>
      ))}
    </>
  );
};

export default YachtDetails;
