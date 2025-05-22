import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';
import { FuelAndKeel } from '@/interfaces/fuel-keel.interface';
import { YachtModel } from '@/interfaces/yacht-model.interface';
import { apiFilter } from '../api/apiFilter';

export const getCatalogueFilters = async () => {
  const countries = (await apiFilter.getAllCoutries('/countries')) as Country[];
  const towns = (await apiFilter.getAllTowns('/towns')) as Town[];
  const fuelTypes = (await apiFilter.getAllFuelTypes(
    '/fuels'
  )) as FuelAndKeel[];
  const keelTypes = (await apiFilter.getAllKeelTypes(
    '/keels'
  )) as FuelAndKeel[];
  const yachtModels = (await apiFilter.getAllYachtModels(
    '/yachtModels'
  )) as YachtModel[];

  return {
    countries,
    towns,
    fuelTypes,
    keelTypes,
    yachtModels,
  };
};
