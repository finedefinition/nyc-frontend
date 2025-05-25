import { Country } from './country.interface';
import { FuelAndKeel } from './fuel-keel.interface';
import { Town } from './town.interface';
import { YachtModel } from './yacht-model.interface';

export interface FilterParams {
  countries: Country[];
  towns: Town[];
  fuelTypes: FuelAndKeel[];
  keelTypes: FuelAndKeel[];
  yachtModels: YachtModel[];
}
