// Product Types
export interface Product {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  benefits_en: string[];
  benefits_ar: string[];
  howToUse_en: string;
  howToUse_ar: string;
  ingredients_en: string;
  ingredients_ar: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  sku: string;
  brand: Brand;
  category: Category;
  subcategory?: Subcategory;
  tags: string[];
  variants?: Variant[];
  filters: ProductFilters;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

export interface Brand {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  logo?: string;
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  image?: string;
}

export interface Subcategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  categoryId: string;
}

export interface Variant {
  id: string;
  type: 'shade' | 'size' | 'scent';
  name_en: string;
  name_ar: string;
  value?: string;
  price?: number;
  stock: number;
  sku: string;
}

export interface ProductFilters {
  skinType?: string[];
  concern?: string[];
  finish?: string;
  coverage?: string;
  spf?: number;
  crueltyFree?: boolean;
  vegan?: boolean;
  halal?: boolean;
}

export interface CartItem {
  product: Product;
  variantId?: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}

export interface SiteSettings {
  logo: string;
  announcementBar?: {
    text_en: string;
    text_ar: string;
    enabled: boolean;
  };
  freeShippingThreshold: number;
  currency: string;
}
