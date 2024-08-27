import { Country } from "./country.interface";
import { Fuels } from "./fuels.interface";
import { Keels } from "./keels.interface";
import { Model } from "./model.interface";
import { Town } from "./town.interface";

export interface FilterProps {
  makes: string[];
  countries: Country[];
  towns: Town[];
  models: Model[];
  keels: Keels[],
  fuels: Fuels[],
};

