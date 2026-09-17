export interface PriceVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  variants?: PriceVariant[];
  description?: string;
  image: string;
  fallbackImage?: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  displayName: string;
  subtitle?: string;
}

export interface CartItem {
  id: string; // unique item id + variant combination
  menuItemId: string;
  name: string;
  category: string;
  selectedVariant?: PriceVariant;
  unitPrice: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  location: string;
  fullAddress: string;
  phone: string;
  internationalPhone: string;
  whatsappUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  hours: string;
  deliveryNotice: string;
}
