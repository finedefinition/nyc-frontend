export interface Model {
  yacht_model_id: number,
  make: string,
  model: string,
  year: number,
  lengthOverall: number,
  beamWidth: number,
  draftDepth: number,
  fuelType: {
    fuel_type_id: number,
    fuel_type_name: string,
    createdAt: string,
    updatedAt: string
  },
  keelType: {
    keel_type_id: number,
    keel_type_name: string,
    createdAt: string,
    updatedAt: string
  },
  createdAt: string,
  updatedAt: string | null
}
