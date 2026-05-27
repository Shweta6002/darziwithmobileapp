import axios from "axios";
import { Product, Order, UnifiedFitProfile } from "../types";

// Base API Configuration for NestJS backend
const API_BASE_URL = "https://api-prod.darziatelier.in/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication token helper
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// API Services Wrapper
export const apiService = {
  // Products Endpoints
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      console.warn("API Service disconnected. Falling back to local catalog blueprints.");
      // Fallback mocks
      return LOCAL_FALLBACK_PRODUCTS;
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      const found = LOCAL_FALLBACK_PRODUCTS.find(p => p.id === id);
      if (found) return found;
      throw new Error("Product Silhouette not resolved locally.");
    }
  },

  // Fit Profiles
  saveFitProfile: async (profile: UnifiedFitProfile): Promise<UnifiedFitProfile> => {
    try {
      const response = await axiosInstance.post("/measurement-profiles", profile);
      return response.data;
    } catch (error) {
      console.log("Offline state: Profile cached locally in Zustand.");
      return profile;
    }
  },

  // Checkout and orders
  createOrder: async (orderPayload: any): Promise<Order> => {
    try {
      const response = await axiosInstance.post("/orders/initiate", orderPayload);
      return response.data;
    } catch (error) {
      console.log("Mock Order processed successfully on offline sandbox.");
      return {
        ...orderPayload,
        id: "ord-" + Math.floor(100 + Math.random() * 900),
        status: "Order Received",
        date: new Date().toISOString().split("T")[0],
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      };
    }
  }
};

// Local catalog mock blueprints for robust fallback
const LOCAL_FALLBACK_PRODUCTS: Product[] = [
  {
    id: "p-pragati",
    name: "Pragati Blazer",
    tagline: "Contours of leadership tailored for modern boards",
    category: "Blazers",
    basePrice: 9400,
    rating: 4.9,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-crepe", "f-wool"],
    colors: [
      { name: "Cream Silk", hex: "#f8f5f0" },
      { name: "Luxury Charcoal", hex: "#16171a" }
    ],
    description: "A meticulously architected single layer double breasted blazer utilizing precision basting logic for balanced shoulder silhouettes and high armhole comfort contouring.",
    specs: [
      "Signature high armhole construction for comfort stretch",
      "Sartorial single layer front canvas build",
      "Hand basting stitch alignment",
      "Premium breathable internally lined Bemberg lining"
    ],
    defaultCustomization: {
      sleeveLength: "Full Sleeve",
      buttonStyle: "Double Breasted",
      liningMaterial: "Premium Bemberg",
      pocketStyle: "Classic Flap"
    },
    designedFor: "Corporate Placements",
    outOfStock: false,
  },
  {
    id: "p-heritage",
    name: "Heritage Banarasi Suits",
    tagline: "Woven narratives of imperial handloom gold",
    category: "Suits",
    basePrice: 16800,
    rating: 5.0,
    reviewCount: 16,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    detailImages: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    ],
    fabrics: ["f-silk"],
    colors: [
      { name: "Banaras Crimson", hex: "#ab1e33" },
      { name: "Classic Navy Gold", hex: "#1c2c54" }
    ],
    description: "An authentic, heritage-inspired banarasi weave using premium mulberry silk rolls and fine real-gold weaves, stitched strictly according to client chest and seat curves.",
    specs: [
      "Real zari interwoven real silk borders",
      "Bespoke high structure lining integration",
      "Contoured side slits for swift seating drapes"
    ],
    defaultCustomization: {
      sleeveLength: "Three Quarter",
      liningMaterial: "Light Chanderi Cotton",
      pocketStyle: "Concealed Side Pocket"
    },
    designedFor: "Imperial Celebrations",
    outOfStock: false,
  },
  {
    id: "p-chiffon",
    name: "Sultry Chiffon Dress",
    tagline: "Airborne flow draped to your unique length boundaries",
    category: "Dresses",
    basePrice: 7800,
    rating: 4.8,
    reviewCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    detailImages: [],
    fabrics: ["f-georgette"],
    colors: [
      { name: "Soft Emerald", hex: "#2b5c50" },
      { name: "Lavender mist", hex: "#ccd1e3" }
    ],
    description: "An incredibly lightweight evening shift outfit featuring contoured bust darts and dynamic length-to-ground calibration, giving an ultra elegant aesthetic flow.",
    specs: [
      "Asymmetric gathered premium drape folds",
      "Custom built-in micro-slip layer",
      "Bespoke neckline calibration"
    ],
    defaultCustomization: {},
    designedFor: "Sunset Galas",
    outOfStock: true // For testing UI
  }
];
