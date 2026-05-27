export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "Suits" | "Blazers" | "Trousers" | "Dresses" | "Shirts" | "Ethnic Wear";
  basePrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  detailImages: string[];
  fabrics: string[]; // Fabric IDs
  colors: { name: string; hex: string }[];
  description: string;
  specs: string[];
  defaultCustomization: CustomizationOption;
  designedFor: string;
  outOfStock?: boolean;
}

export interface CustomizationOption {
  sleeveLength?: string;
  lapelStyle?: string;
  buttonStyle?: string;
  liningMaterial?: string;
  pocketStyle?: string;
  monogramText?: string;
}

export interface Fabric {
  id: string;
  name: string;
  category: string;
  colorHex: string;
  priceDelta: number;
  description: string;
}

export interface BodyMeasurements {
  height: number;
  weight: number;
  chest?: number;
  waist?: number;
  seat?: number;
  shoulder?: number;
  sleeveLength?: string;
  inseam?: number;
}

export interface UnifiedFitProfile {
  id: string;
  title: string;
  fitPreference: "Slim Fit" | "Regular Fit" | "Relaxed Fit";
  measurements: BodyMeasurements;
  createdOn: string;
}

export interface Order {
  id: string;
  product: Product;
  selectedFabric: Fabric;
  selectedColor: { name: string ; hex: string };
  fitProfile: UnifiedFitProfile;
  customizations: CustomizationOption;
  totalPrice: number;
  status: "Order Received" | "Atelier Drafted" | "Stitching Process" | "Quality Check" | "Bespoke Dispatched" | "Delivered";
  tailorName?: string;
  date: string;
  estimatedDelivery: string;
}
