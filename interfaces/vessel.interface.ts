export interface Images {
  yacht_image_id: number;
  yacht_image_key: string;
}

type VesselKeys = {
  [key: string]: number | string | boolean | Images[];
};

export interface Vessel extends VesselKeys {
  yacht_id: number;
  yacht_featured: boolean;
  yacht_top: boolean;
  yacht_hot_price: boolean;
  yacht_vat: boolean;
  yacht_make: string;
  yacht_model: string;
  yacht_price: number;
  yacht_price_old: number;
  yacht_year: number;
  yacht_country: string;
  yacht_town: string;
  yacht_loa: number;
  yacht_beam: number;
  yacht_draft: number;
  yacht_cabin: number;
  yacht_berth: number;
  yacht_fuel_type: string;
  yacht_keel_type: string;
  yacht_engine: number;
  yacht_shower: number;
  yacht_description: string;
  yacht_created_at: string;
  yacht_main_image_key: string;
  yacht_images: [
    {
      yacht_image_id: number;
      createdAt: string;
      yacht_image_key: string;
    },
  ];
}
