import { StaticImageData } from 'next/image';
import * as icons from '@/public/icons/yachtDetails';

export interface YachtDetailsType {
  name: string;
  icon: StaticImageData;
  value: string | number;
}

export const yachtDetailsHelper = (
  yacht_loa: number,
  yacht_beam: number,
  yacht_draft: number,
  yacht_cabin: number,
  yacht_berth: number,
  yacht_shower: number,
  yacht_heads: number,
  yacht_keel_type: string,
  yacht_fuel_type: string
): YachtDetailsType[] => {
  return [
    {
      name: 'Length Overall',
      icon: icons.loa,
      value: `${yacht_loa} feet`,
    },
    {
      name: 'Beam',
      icon: icons.beam,
      value: `${yacht_beam} feet`,
    },
    {
      name: 'Draft',
      icon: icons.draft,
      value: `${yacht_draft} feet`,
    },
    {
      name: 'Cabin',
      icon: icons.cabin,
      value: yacht_cabin,
    },
    {
      name: 'Berth',
      icon: icons.berth,
      value: yacht_berth,
    },
    {
      name: 'Shower',
      icon: icons.shower,
      value: yacht_shower,
    },
    {
      name: 'Heads',
      icon: icons.heads,
      value: yacht_heads,
    },
    {
      name: 'Kell Type',
      icon: icons.kell,
      value: yacht_keel_type,
    },
    {
      name: 'Fuel Type',
      icon: icons.fuel,
      value: yacht_fuel_type,
    },
  ];
};
