import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';

export type TransformedObjectLocation = Town | Country;

export const transformObjectsForSelect = (
  originalArray: TransformedObjectLocation[]
): {
  value: string;
}[] => {
  return originalArray.map((obj) => ({
    value: 'name' in obj ? obj.name : obj.town_name,
  }));
};
