import { DefaultError } from '@/utils/errors/defaultError';
import { Vessel } from '@/interfaces/vessel.interface';
// import { getCurrencyRates } from './getCurrencyExange';

const BASE_URL = 'https://nyb-project-production.up.railway.app/yachts';
// const BASE_URL = 'https://nyb-project-production.up.railway.app/vessels';
// const BASE_URL = 'https://nyb-project-production.up.railway.app/vessels/cards';

function getData(): Promise<Vessel[]>;
function getData(url: string): Promise<Vessel>;
function getData(url: string): Promise<Vessel[]>;

async function getData(
  url: string = '',
  search: string = ''
): Promise<Vessel[] | Vessel> {
  const response = await fetch(`${BASE_URL}${url}?${search}`, {
    next: { revalidate: 10800 },
  });

  if (!response.ok) {
    throw new DefaultError();
  }

  return response.json();
}

export const getAllVessels = async (): Promise<Vessel[]> => await getData(); //  Promise<Vessel[]>
export const getVesselById = async (id: string): Promise<Vessel> =>
  await getData(id); // Promise<Vessel>
export const getFeaturedYacht = async (): Promise<Vessel[]> => {
  const yachts = await getData();

  return yachts.filter((yacht: Vessel) => yacht.yacht_featured);
};
