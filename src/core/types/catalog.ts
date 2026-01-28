export type Currency = 'QAR' | 'USD';

export interface Price {
  amount: number;
  currency: Currency;
  formatted: string;
}

export interface WatchImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Watch {
  id: string;
  slug?: string;
  brand: string;
  model: string;
  description?: string;
  description_ar?: string;
  price: Price;
  category: 'Men' | 'Women' | 'Unisex';
  movement?: 'Automatic' | 'Quartz' | 'Manual';
  case_material?: string;
  images: WatchImage[];
  specifications?: Record<string, string>;
  stock?: number;
}

export interface CatalogState {
  items: Watch[];
  lastUpdated: string;
  version: string;
}
