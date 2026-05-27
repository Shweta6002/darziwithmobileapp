import { create } from "zustand";
import { Product, Fabric, UnifiedFitProfile, BodyMeasurements, Order } from "../types";

interface FitState {
  savedProfiles: UnifiedFitProfile[];
  activeProfile: UnifiedFitProfile | null;
  orders: Order[];
  cart: {
    product: Product;
    fabric: Fabric;
    color: { name: string; hex: string };
    customizations: any;
    finalPrice: number;
  } | null;
  addProfile: (profile: UnifiedFitProfile) => void;
  deleteProfile: (id: string) => void;
  setActiveProfile: (profile: UnifiedFitProfile) => void;
  addToCart: (item: NonNullable<FitState["cart"]>) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
}

export const useFitStore = create<FitState>((set) => ({
  savedProfiles: [
    {
      id: "prof-1",
      title: "Consul Corporate",
      fitPreference: "Slim Fit",
      measurements: {
        height: 172,
        weight: 64,
        chest: 38,
        waist: 32,
        seat: 39,
        shoulder: 17.5,
        sleeveLength: "Full Sleeve",
        inseam: 31,
      },
      createdOn: "2026-05-10",
    },
    {
      id: "prof-2",
      title: "Sanjana Casual",
      fitPreference: "Regular Fit",
      measurements: {
        height: 172,
        weight: 64,
        chest: 36,
        waist: 30,
        seat: 38,
        shoulder: 17.0,
        sleeveLength: "Full Sleeve",
      },
      createdOn: "2026-05-18",
    }
  ],
  activeProfile: {
    id: "prof-1",
    title: "Consul Corporate",
    fitPreference: "Slim Fit",
    measurements: {
      height: 172,
      weight: 64,
      chest: 38,
      waist: 32,
      seat: 39,
      shoulder: 17.5,
      sleeveLength: "Full Sleeve",
      inseam: 31,
    },
    createdOn: "2026-05-10",
  },
  orders: [
    {
      id: "ord-883",
      product: {
        id: "p-blazer",
        name: "Pragati Blazer",
        tagline: "Contours of leadership tailored for modern boards",
        category: "Blazers",
        basePrice: 9400,
        rating: 4.9,
        reviewCount: 42,
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
        detailImages: [],
        fabrics: ["f-crepe"],
        colors: [{ name: "Ivory Pearl", hex: "#f8f5f0" }],
        description: "An elegant, structured double-breasted blazer.",
        specs: [],
        defaultCustomization: {},
        designedFor: "Corporate Placements",
      },
      selectedFabric: {
        id: "f-crepe",
        name: "Imperial Moss Crepe",
        category: "Feminine Weave",
        colorHex: "#e3dbca",
        priceDelta: 0,
        description: "Bespoke textured flow crepe."
      },
      selectedColor: { name: "Midnight Charcoal", hex: "#17181c" },
      fitProfile: {
        id: "prof-1",
        title: "Consul Corporate",
        fitPreference: "Slim Fit",
        measurements: { height: 172, weight: 64 },
        createdOn: "2026-05-10"
      },
      customizations: {
        sleeveLength: "Full Sleeve",
        liningMaterial: "Premium Bemberg",
        pocketStyle: "Classic Flap",
      },
      totalPrice: 9400,
      status: "Stitching Process",
      tailorName: "Master Ramesh",
      date: "2026-05-20",
      estimatedDelivery: "2026-05-27",
    }
  ],
  cart: null,

  addProfile: (profile) => set((state) => ({ savedProfiles: [profile, ...state.savedProfiles] })),
  deleteProfile: (id) => set((state) => ({
    savedProfiles: state.savedProfiles.filter((p) => p.id !== id),
    activeProfile: state.activeProfile?.id === id ? null : state.activeProfile,
  })),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  addToCart: (item) => set({ cart: item }),
  clearCart: () => set({ cart: null }),
  placeOrder: (order) => set((state) => ({
    orders: [order, ...state.orders],
    cart: null,
  })),
}));
