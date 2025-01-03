type OriginalObject = {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string | null;
  town_id?: number;
  town_name?: string;
  town_country_name?: string;
};

export type TransformedObject = {
  value: string;
};

export const transformObjects = (
  originalArray: OriginalObject[]
): TransformedObject[] => {
  return originalArray.map((obj) => ({
    value: obj.name || obj.town_name || '',
  }));
};
