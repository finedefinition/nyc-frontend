export type FormType = {
  closeForm: () => void;
}

export type FeaturedType = {
  top: boolean,
  hotPrice: boolean,
  vat: boolean,
}

export type BaseFilterType = {
  minPrice: number,
  maxPrice: number,
  make: null | string,
  model: null | string,
  minYear: number,
  maxYear: number,
  country: null | string,
  town: null | string,
}

export type AdvancedFilterType = {
  minLengthOverall: number,
  maxLengthOverall: number,
  minBeamWidth: number,
  maxBeamWidth: number,
  minDraftDepth: number,
  maxDraftDepth: number,
  keelType: string | null,
  fuelType: string | null,
  minCabinNumber: number,
  maxCabinNumber: number,
  minBerthNumber: number,
  maxBerthNumber: number,
  minHeadsNumber: number,
  maxHeadsNumber: number,
  minShowerNumber: number,
  maxShowerNumber: number,
}
