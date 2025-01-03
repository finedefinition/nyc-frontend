import { apiFilter } from '@/utils/api/apiFilter';
import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';
import { transformObjects } from '@/utils/addYachtForm/autocompleteHelper';

import AddYachtForm from '@/components/Admin/AddYachtForm';

const AddYachtPage = async () => {
  const countriesFromServer: Country[] =
    await apiFilter.getAllCoutries('/countries');
  const townsFromServer: Town[] = await apiFilter.getAllTowns('/towns');

  const countries = transformObjects(countriesFromServer);
  const towns = transformObjects(townsFromServer);

  const filterParams = {
    countries,
    towns,
  };

  return <AddYachtForm filterParams={filterParams} />;
};

export default AddYachtPage;
