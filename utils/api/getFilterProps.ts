import { Country } from '@/interfaces/country.interface';
import { Model } from '@/interfaces/model.interface';
import { Town } from '@/interfaces/town.interface';
import { DefaultError } from '@/utils/errors/defaultError';
//Move server url to .env file
const BASE_URL = 'http://54.175.77.224:8080';

async function getData(url: string = '') {
  const response = await fetch(`${BASE_URL}${url}`, {
    next: { revalidate: 10800 },
  });

  if (!response.ok) {
    throw new DefaultError();
  }

  return response.json();
}

export const getCountries = async (): Promise<Country[]> => await getData('/countries');
export const getTowns = async (): Promise<Town[]> => await getData('/towns');
export const getModels = async (): Promise<Model[]> => await getData('/yachtModels');
