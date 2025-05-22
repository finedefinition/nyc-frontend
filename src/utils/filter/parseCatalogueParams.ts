export const parseCatalogueParams = (searchParams?: {
  [key: string]: string;
}) => {
  const {
    page = '1',
    orderBy = 'asc',
    sortBy = 'yacht_price',
    featured = '',
    vatIncluded = '',
    minPrice = '',
    maxPrice = '',
    make = '',
    model = '',
    minYear = '',
    maxYear = '',
    country = '',
    town = '',
    minLengthOverall = '',
    maxLengthOverall = '',
    minBeamWidth = '',
    maxBeamWidth = '',
    minDraftDepth = '',
    maxDraftDepth = '',
    keelType = '',
    fuelType = '',
    minCabinNumber = '',
    maxCabinNumber = '',
    minBerthNumber = '',
    maxBerthNumber = '',
    minHeadsNumber = '',
    maxHeadsNumber = '',
    minShowerNumber = '',
    maxShowerNumber = '',
  } = searchParams || {};

  const paramsObject = {
    page,
    orderBy,
    sortBy,
    featured,
    vatIncluded,
    minPrice,
    maxPrice,
    make,
    model,
    country,
    town,
    keelType,
    fuelType,
    minYear,
    maxYear,
    minLengthOverall,
    maxLengthOverall,
    minBeamWidth,
    maxBeamWidth,
    minDraftDepth,
    maxDraftDepth,
    minCabinNumber,
    maxCabinNumber,
    minBerthNumber,
    maxBerthNumber,
    minHeadsNumber,
    maxHeadsNumber,
    minShowerNumber,
    maxShowerNumber,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(paramsObject).filter(([, value]) => value !== '')
  );

  const params = new URLSearchParams(filteredParams);
  const hasFilters = Object.keys(filteredParams).length > 0;

  return { paramsObject, filteredParams, params, hasFilters };
};
