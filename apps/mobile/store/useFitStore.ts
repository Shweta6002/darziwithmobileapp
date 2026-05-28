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
  savedProfiles: [],
  activeProfile: null,
  orders: [],
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
