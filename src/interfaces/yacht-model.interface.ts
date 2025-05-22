export interface YachtModel {
  id: number;
  make: string;
  model: string;
  year: number;
  lengthOverall: number;
  beamWidth: number;
  draftDepth: number;

  keelTypeId: number;
  keelTypeName: string;
  keelTypeCreatedAt: string;
  keelTypeUpdatedAt: string | null;

  fuelTypeId: number;
  fuelTypeName: string;
  fuelTypeCreatedAt: string; // ISO-формат дати
  fuelTypeUpdatedAt: string | null;

  createdAt: string;
  updatedAt: string | null;
}
