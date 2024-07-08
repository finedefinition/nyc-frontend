export const FEATURED = {
  top: false,
  hotPrice: false,
  vat: false,
} as const;

export const BASE_FILTER = {
  minPrice: 0,
  maxPrice: 5000000,
  make: null,
  model: null,
  minYear: 1930,
  maxYear: 2025,
  country: null,
  town: null,
} as const;

export const ADVANCED_FILTER = {
  minLengthOverall: 2.5,
  maxLengthOverall: 300,
  minBeamWidth: 1,
  maxBeamWidth: 25,
  minDraftDepth: 0.3,
  maxDraftDepth: 16,
  keelType: null,
  fuelType: null,
  minCabinNumber: 0,
  maxCabinNumber: 10,
  minBerthNumber: 0,
  maxBerthNumber: 20,
  minHeadsNumber: 0,
  maxHeadsNumber: 10,
  minShowerNumber: 0,
  maxShowerNumber: 10,
} as const;
