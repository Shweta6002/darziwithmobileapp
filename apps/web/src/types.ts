/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Fabric {
  id: string;
  name: string;
  type: string;
  pricePerMeter: number;
  colorHex: string;
  desc: string;
  origin: string;
  texture: string;
  breathability: string; // "High" | "Medium" | "Low"
}

export interface CustomizationOption {
  sleeveLength: "Sleeveless" | "Short" | "3/4 Sleeve" | "Full Sleeve";
  lapelStyle?: "Notch Lapel" | "Peak Lapel" | "Shawl Lapel" | "No Lapel";
  buttonStyle: "Single Breasted" | "Double Breasted" | "Hidden Placket";
  liningMaterial: "Premium Bemberg" | "Pure Silk Lining" | "Unlined Breathable";
  pocketStyle: "Classic Flap" | "Minimal Welt" | "No Pockets";
  monogramText: string;
}

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
  designedFor: string; // e.g., "Boardroom Pitch", "Executive Startup"
  outOfStock?: boolean;
}

export interface BodyMeasurements {
  height: number; // in cm
  weight: number; // in kg
  bodyType: "Hourglass" | "Pear" | "Rectangle" | "Inverted Triangle" | "Apple" | "";
  shoulder: number; // in inches
  bust: number; // in inches
  waist: number; // in inches
  hip: number; // in inches
  inseam: number; // in inches
}

export interface AIRecommendation {
  predictedSize: string; // e.g., "US 6 / M (Darzi Tailored)"
  fitConfidence: number; // e.g., 96
  bodyShapeAnalysis: string;
  recommendedFitType: "Tailored Comfort" | "Structured Slim" | "Relaxed Professional";
  suggestedAdjustments: {
    bust: string;
    waist: string;
    hip: string;
    shoulder: string;
  };
}

export interface OrderItem {
  product: Product;
  selectedFabric: Fabric;
  selectedColor: { name: string; hex: string };
  customizations: CustomizationOption;
  measurements: BodyMeasurements;
  aiRecommendation: AIRecommendation;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "In Queue" | "Pattern Drafted" | "Hand-Cut" | "Tailoring" | "Quality Check" | "Dispatched" | "Delivered";
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  tailorAssigned?: string;
  alterationHistory?: {
    date: string;
    notes: string;
    status: "Resolved" | "Assessing" | "Reworking";
  }[];
  payoutStatus: "Paid" | "Refunded" | "Pending";
}

// Mock Fabrics
export const MOCK_FABRICS: Fabric[] = [
  {
    id: "f-linen",
    name: "Banarasi Crisp Linen",
    type: "Linen-Liva Blend",
    pricePerMeter: 1200,
    colorHex: "#eae1d4",
    desc: "A breathable, lightweight blend offering natural linen texture without the extreme creasing. Ideal for Indian summers.",
    origin: "Varanasi, Uttar Pradesh",
    texture: "Textured & Crisp",
    breathability: "High"
  },
  {
    id: "f-wool",
    name: "Ultra-Light Merino Tweed",
    type: "100% Fine Merino",
    pricePerMeter: 3200,
    colorHex: "#2b303a",
    desc: "Four-season Italian-grade merino wool. Highly breathable, resists odors, stretches naturally for active boardroom movements.",
    origin: "Ludhiana Mills, Punjab",
    texture: "Superfine & Smooth",
    breathability: "Medium"
  },
  {
    id: "f-silk",
    name: "Mulberry Silk-Cotton Satin",
    type: "60% Silk / 40% Giza Cotton",
    pricePerMeter: 2400,
    colorHex: "#e3c099",
    desc: "A rich luster that reflects elegant professionalism. Unparalleled softness and cooling capabilities.",
    origin: "Bhagalpur, Bihar",
    texture: "Buttery Soft & Lustrous",
    breathability: "High"
  },
  {
    id: "f-crepe",
    name: "Tri-Acetate Stretch Crepe",
    type: "Stretch Tech Crepe",
    pricePerMeter: 1600,
    colorHex: "#121212",
    desc: "Architectural drape that stays perfectly pressed from 9 AM meetings to 9 PM venture drinks. Crease-resistant.",
    origin: "Surat, Gujarat",
    texture: "Matte & Structural",
    breathability: "Medium"
  },
  {
    id: "f-khadi",
    name: "Handspun Khadi Denim",
    type: "100% Organic Khadi Cotton",
    pricePerMeter: 1100,
    colorHex: "#45556a",
    desc: "Artisanal handwoven lightweight denim structure. Eco-conscious power-styling that gets softer with every wash.",
    origin: "Ponduru, Andhra Pradesh",
    texture: "Richly Slubbed & Earthy",
    breathability: "High"
  }
];

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-power-suit",
    name: "The Pragati Power Blazer",
    tagline: "The ultimate peak-lapel savior for venture pitches.",
    category: "Blazers",
    basePrice: 8500,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1548624149-f9c1859aa9b4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-wool", "f-crepe", "f-khadi"],
    colors: [
      { name: "Executive Charcoal", hex: "#2f3136" },
      { name: "Saffron Rust", hex: "#b85c37" },
      { name: "Ivory Shell", hex: "#f5f2eb" },
      { name: "Deep Navy Blue", hex: "#1f2b3e" }
    ],
    description: "Designed specifically with length and structural proportions optimized for working Indian professional height averages. It eliminates the standard shoulder-sag while giving a secure, slimming posture. Inner pockets are sized precisely for a 6.7” work phone and business card cases.",
    specs: [
      "Floating full canvas inner construction",
      "Bespoke sweat-guards under arms",
      "Premium functional sleeve button cuffs (surgeon cuffs)",
      "Unrestricted shoulder sleeve pleat layout for active keyboard typing"
    ],
    defaultCustomization: {
      sleeveLength: "Full Sleeve",
      lapelStyle: "Peak Lapel",
      buttonStyle: "Single Breasted",
      liningMaterial: "Premium Bemberg",
      pocketStyle: "Classic Flap",
      monogramText: "DRZ"
    },
    designedFor: "Boardroom Presentations & Fundraise Pitching"
  },
  {
    id: "p-crop-trouser",
    name: "The Shiva High-Rise Trouser",
    tagline: "Perfect ankle-length crop styled with comfortable elastic back.",
    category: "Trousers",
    basePrice: 4200,
    rating: 4.8,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-crepe", "f-linen", "f-wool"],
    colors: [
      { name: "Midnight Black", hex: "#121212" },
      { name: "Oatmeal Beige", hex: "#dcd1c4" },
      { name: "Forest Cedar", hex: "#354840" }
    ],
    description: "The Holy Grail of professional trousers. Features our patented 'Infinite Waistband' that stretches up to 1.5 inches to accommodate long sitting sessions in corporate desks. Styled in an elegant straight-leg crop that shows off block heels or Indian mules.",
    specs: [
      "Dual hidden securing buttons",
      "reinforced front crease lines that never iron out",
      "Deep anti-slip phone pockets",
      "Premium satin waist band lining to prevent shirt slip"
    ],
    defaultCustomization: {
      sleeveLength: "Short",
      buttonStyle: "Hidden Placket",
      liningMaterial: "Unlined Breathable",
      pocketStyle: "Minimal Welt",
      monogramText: ""
    },
    designedFor: "All-Day Corporate Consulting & Desk Ergonomics"
  },
  {
    id: "p-sheath-dress",
    name: "The Kiran Midi Sheath",
    tagline: "Elegant corporate luxury with modern cultural hints.",
    category: "Dresses",
    basePrice: 6800,
    rating: 4.7,
    reviewCount: 95,
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-silk", "f-crepe", "f-linen"],
    colors: [
      { name: "Rich Crimson", hex: "#812129" },
      { name: "Ivory Silk", hex: "#fcf9f2" },
      { name: "Deep Obsidian", hex: "#1a1a1a" }
    ],
    description: "An elegant, architectural wrap-mid dress that honors professional modesty while looking highly designer. It features asymmetrical pleated side ties and custom neckline tailoring choices from modest scoop to high mandarin neck.",
    specs: [
      "Back slit optimized for stepping in/out of autos or cabs",
      "Hidden bra-strap loops to prevent slips",
      "Side hidden zip access",
      "Comfort back pleating details"
    ],
    defaultCustomization: {
      sleeveLength: "3/4 Sleeve",
      buttonStyle: "Hidden Placket",
      liningMaterial: "Premium Bemberg",
      pocketStyle: "Classic Flap",
      monogramText: "KMN"
    },
    designedFor: "Startup Keynotes & Multi-Stakeholder Summits"
  },
  {
    id: "p-mandarin-shirt",
    name: "The Kiara Giza Tailored Shirt",
    tagline: "Impeccable crispness with a tailored, feminine mandarin collar.",
    category: "Shirts",
    basePrice: 3250,
    rating: 4.9,
    reviewCount: 204,
    imageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-khadi", "f-silk", "f-linen"],
    colors: [
      { name: "Crisp Snow White", hex: "#ffffff" },
      { name: "Powder Serene Blue", hex: "#dce3eb" },
      { name: "Earthy Sage Khadi", hex: "#8e998f" }
    ],
    description: "An elegant, architectural button-down Giza cotton shirt crafted for the modern woman leader. Features a refined Nehru/mandarin collar stance designed to contour beautifully under customized blazers or be styled stand-alone with work trousers.",
    specs: [
      "Reinforced stiffened mandarin collar stand styled beautifully around the neckline",
      "Hidden front button panel for a clean, sleek workspace aesthetic",
      "High density count stitch lines with darts tailored exactly to feminine dimensions",
      "Designed curved lower hem that looks perfect both tucked and untucked"
    ],
    defaultCustomization: {
      sleeveLength: "Full Sleeve",
      lapelStyle: "No Lapel",
      buttonStyle: "Hidden Placket",
      liningMaterial: "Unlined Breathable",
      pocketStyle: "No Pockets",
      monogramText: "KR"
    },
    designedFor: "Boardroom Presentations & Smart Friday Offsites"
  },
  {
    id: "p-ethnic-kurta",
    name: "The Avani Silk Bandhgala Kurta Set",
    tagline: "The absolute pinnacle of ethnic workspace elegance and luxurious handloom comfort.",
    category: "Ethnic Wear",
    basePrice: 5800,
    rating: 4.9,
    reviewCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-silk", "f-linen", "f-khadi"],
    colors: [
      { name: "Saffron Rust", hex: "#b85c37" },
      { name: "Ivory Silk", hex: "#fcf9f2" },
      { name: "Deep Navy Blue", hex: "#1f2b3e" }
    ],
    description: "Elegant, structural Indian tailoring blended perfectly for modern professional settings. This bespoke kurta set features a modest keyhole neckline, a sharp workspace-compliant collar, and dual invisible side pocket closures styled to hold 6.7” work phones without dragging the drapes.",
    specs: [
      "Hidden side pocket compartments with seamless zipper closures",
      "Hand-notched keyhole neckline with premium, subtle gold-thread piping",
      "Supple lining optimized for professional desk comfort and seasonal heat",
      "Side slit ratios custom-proportioned to prevent stretching or discomfort while seated"
    ],
    defaultCustomization: {
      sleeveLength: "3/4 Sleeve",
      lapelStyle: "No Lapel",
      buttonStyle: "Hidden Placket",
      liningMaterial: "Premium Bemberg",
      pocketStyle: "No Pockets",
      monogramText: "AVN"
    },
    designedFor: "Vibrant Client Offsites & Festive Corporate Celebrations"
  },
  {
    id: "p-ethnic-jacket",
    name: "The Meera Brocade Nehru Vest",
    tagline: "A magnificent tailored layering vest designed to empower ethnic and fusion corporate attire.",
    category: "Ethnic Wear",
    basePrice: 4800,
    rating: 4.8,
    reviewCount: 75,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-silk", "f-khadi"],
    colors: [
      { name: "Royal Indigo", hex: "#1e293b" },
      { name: "Banarasi Gold", hex: "#d97706" },
      { name: "Crimson Silk", hex: "#991b1b" }
    ],
    description: "Designed explicitly for professional layering, this structured ethnic vest integrates traditional Banarasi brocade weave motifs into a highly sharp, professional corporate frame. Looks pristine styled over shirts, kurtis, or sheath dresses.",
    specs: [
      "Floating canvas front construction for stable drape silhouette",
      "Refined Nehru stand collar contoured to prevent jacket riding",
      "Bespoke side-slashes for elegant ease around waistlines",
      "Fully lined with breathable Mulberry Silk blend"
    ],
    defaultCustomization: {
      sleeveLength: "Sleeveless",
      lapelStyle: "No Lapel",
      buttonStyle: "Single Breasted",
      liningMaterial: "Pure Silk Lining",
      pocketStyle: "Minimal Welt",
      monogramText: "MRA"
    },
    designedFor: "Executive Keynotes & Elite Networking Receptions"
  }
];

// Initial default measurements
export const INITIAL_MEASUREMENTS: BodyMeasurements = {
  height: 162,
  weight: 58,
  bodyType: "",
  shoulder: 15.0,
  bust: 34.5,
  waist: 28.0,
  hip: 37.5,
  inseam: 27.5
};

// Initial default AI Fit recommendation
export const INITIAL_AI_RECOMMENDATION: AIRecommendation = {
  predictedSize: "US 6 / IN 34 (Darzi TrueFit)",
  fitConfidence: 98,
  bodyShapeAnalysis: "Hourglass Proportion with custom average Indian vertical rise. Suggested waist suppression provides structural frame without pulling fabrics under active consult sessions.",
  recommendedFitType: "Tailored Comfort",
  suggestedAdjustments: {
    bust: "Fitted snug, perfect under blazer layering",
    waist: "+0.5 inch extra room for sit-down comfort",
    hip: "Standard flow, follows hip contour perfectly",
    shoulder: "Zero shoulder droop, precise pad placement"
  }
};

export interface UserProfile {
  name: string;
  email: string;
  role: "user" | "admin";
  company?: string;
  avatarUrl?: string;
}

export interface RelativeSizeCard {
  id: string;
  name: string;
  relationship: "Sister" | "Mother" | "Daughter" | "Aunt" | "Friend" | "Relative" | "Other" | string;
  measurements: BodyMeasurements;
  aiRecommendation: AIRecommendation;
}

export const INITIAL_RELATIVE_CARDS: RelativeSizeCard[] = [
  {
    id: "rel-1",
    name: "Maya Sen",
    relationship: "Sister",
    measurements: {
      height: 158,
      weight: 54,
      bodyType: "Pear",
      shoulder: 14.5,
      bust: 32.5,
      waist: 26.5,
      hip: 38.0,
      inseam: 26.5
    },
    aiRecommendation: {
      predictedSize: "US 4 / IN 32 (Darzi TrueFit)",
      fitConfidence: 96,
      bodyShapeAnalysis: "Pear Symmetry with lower frame emphasis. Pattern adjusted with subtle flare ease in hip drop to avoid tight pleating under executive trousers.",
      recommendedFitType: "Structured Slim",
      suggestedAdjustments: {
        bust: "Standard comfort ease",
        waist: "Fitted snug waist silhouette",
        hip: "+0.75 inch extra drape width for movement comfort",
        shoulder: "Zero shoulder droop, target alignment"
      }
    }
  }
];

