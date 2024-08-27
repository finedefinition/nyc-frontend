import { Country } from '@/interfaces/country.interface';
import { Fuels } from '@/interfaces/fuels.interface';
import { Keels } from '@/interfaces/keels.interface';
import { Model } from '@/interfaces/model.interface';
import { Town } from '@/interfaces/town.interface';
import { DefaultError } from '@/utils/errors/defaultError';

//Move server url to .env file
// const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;


async function getData(url: string = '') {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
    next: { revalidate: 10800 },
  });

  if (!response.ok) {
    throw new DefaultError();
  }

  return response.json();
}

export const getCountries = async (): Promise<Country[]> =>
  await getData('/countries');
export const getTowns = async (): Promise<Town[]> => await getData('/towns');
export const getModels = async (): Promise<Model[]> =>
  await getData('/yachtModels');
// export const getModels = async (): Promise<Model[]> => await getData('/yachtModels');

export const getKeels = async (): Promise<Keels[]> => await getData('/keels');
export const getFuels = async (): Promise<Fuels[]> => await getData('/fuels');
