import axios from "axios";
import { Product, Order, UnifiedFitProfile } from "../types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000/api/darzi/v1";

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

const unwrap = <T,>(payload: any): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }
  return payload as T;
};

export const apiService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get("/products");
    return unwrap<Product[]>(response.data);
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return unwrap<Product>(response.data);
  },

  saveFitProfile: async (profile: UnifiedFitProfile): Promise<UnifiedFitProfile> => {
    const response = await axiosInstance.post("/measurement-profiles", profile);
    return unwrap<UnifiedFitProfile>(response.data);
  },

  createOrder: async (orderPayload: any): Promise<Order> => {
    const response = await axiosInstance.post("/orders/initiate", orderPayload);
    return unwrap<Order>(response.data);
  }
};
