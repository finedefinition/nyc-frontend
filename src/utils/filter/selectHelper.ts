import { Country } from '@/interfaces/country.interface';
import { Town } from '@/interfaces/town.interface';
import { YachtModel } from '@/interfaces/yacht-model.interface';

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

interface SelectOption {
  value: string;
}

interface MakeModelMap {
  [make: string]: SelectOption[];
}

export function processYachts(data: YachtModel[]) {
  const makeSet = new Set<string>();
  const modelSet = new Set<string>();
  const modelsByMakeTemp: Record<string, Set<string>> = {};

  data.forEach((item) => {
    makeSet.add(item.make);
    modelSet.add(item.model);

    if (!modelsByMakeTemp[item.make]) {
      modelsByMakeTemp[item.make] = new Set<string>();
    }

    modelsByMakeTemp[item.make].add(item.model);
  });

  // Перетворення множин у масиви
  const makeList = Array.from(makeSet)
    .sort()
    .map((make) => ({ value: make }));
  const allModels = Array.from(modelSet)
    .sort()
    .map((model) => ({ value: model }));
  const modelsByMakeFinal: MakeModelMap = {};

  for (const [make, models] of Object.entries(modelsByMakeTemp)) {
    modelsByMakeFinal[make] = Array.from(models)
      .sort()
      .map((model) => ({ value: model }));
  }

  return {
    makeList,
    modelsByMake: modelsByMakeFinal,
    allModels,
  };
}
