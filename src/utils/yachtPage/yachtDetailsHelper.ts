import { StaticImageData } from 'next/image';
import * as icons from '@/public/icons/yachtDetails';
import { YachtSpecifications } from '@/interfaces/yacht.interface';

type YachtDetailsType = {
  name: string;
  icon: StaticImageData;
  value: string | number;
};

export const yachtDetailsHelper = (
  yacht: YachtSpecifications
): YachtDetailsType[] => {
  return [
    {
      name: 'Length Overall',
      icon: icons.loa,
      value: `${yacht.yacht_loa} feet`,
    },
    {
      name: 'Beam',
      icon: icons.beam,
      value: `${yacht.yacht_beam} feet`,
    },
    {
      name: 'Draft',
      icon: icons.draft,
      value: `${yacht.yacht_draft} feet`,
    },
    {
      name: 'Cabin',
      icon: icons.cabin,
      value: yacht.yacht_cabin,
    },
    {
      name: 'Berth',
      icon: icons.berth,
      value: yacht.yacht_berth,
    },
    {
      name: 'Shower',
      icon: icons.shower,
      value: yacht.yacht_shower,
    },
    {
      name: 'Heads',
      icon: icons.heads,
      value: yacht.yacht_heads,
    },
    {
      name: 'Kell Type',
      icon: icons.kell,
      value: yacht.yacht_keel_type,
    },
    {
      name: 'Fuel Type',
      icon: icons.fuel,
      value: yacht.yacht_fuel_type,
    },
  ];
};
