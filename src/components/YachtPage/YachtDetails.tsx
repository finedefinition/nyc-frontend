import Image from 'next/image';
import { YachtSpecifications } from '@/interfaces/yacht.interface';
import { yachtDetailsHelper } from '@/utils/yachtPage/yachtDetailsHelper';

type YachtDetailsProps = {
  yachtSpecifications: YachtSpecifications;
};

const YachtDetails = ({ yachtSpecifications }: YachtDetailsProps) => {
  const details = yachtDetailsHelper(yachtSpecifications);

  return (
    <>
      {details.map(({ name, icon, value }, i) => (
        <li
          key={i}
          className="text-primary text-2xl font-semibold grid grid-cols-[1fr_8fr_6fr] gap-2 mb-4 items-center"
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
