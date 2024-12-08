import { apiFilter } from '../api/getAllCountriesAndTowns';

export const allCountriees = async () =>
  await apiFilter.getAllCoutries('/countries');

