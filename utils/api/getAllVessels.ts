import { DefaultError } from '@/utils/errors/defaultError';
import { Vessel, VesselTableAdmin } from '@/interfaces/vessel.interface';
import { client } from '../fetchHelps/fetchClient';

const BASE_URL = 'https://nyb-project-production.up.railway.app/yachts';

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

  return yachts.filter(
    (yacht: Vessel) => yacht.yacht_top || yacht.yacht_hot_price
  );
};

export const getYachtMakes = async (): Promise<string[]> => {
  const yachts = await getData();

  const makes = yachts
    .map((yacht: Vessel) => yacht.yacht_make)
    .filter((yacht, index, arr) => arr.indexOf(yacht) === index);

  return makes;
};

// export const getAdminYachts = (): Promise<VesselTableAdmin> => {
//   return client.adminYachts(`/yachts/paginated`);
// };

export const getAdminYachtsQuery = (
  queryParams: string = 'page=1'
): Promise<VesselTableAdmin> => {
  return client.adminYachtsQuery(`/yachts/paginated?${queryParams}`);
};
