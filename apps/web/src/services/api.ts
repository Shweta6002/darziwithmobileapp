import { BodyMeasurements, Product, UserProfile } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/darzi/v1";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  items?: T;
};

type AuthResponse = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "CUSTOMER";
  };
  accessToken: string;
  refreshToken: string;
};

const authStorageKey = "drz_auth";

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data as T;
  }
  return payload as T;
}

function getStoredAuth(): AuthResponse | null {
  const raw = localStorage.getItem(authStorageKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const auth = getStoredAuth();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(auth?.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
      ...options.headers
    }
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(payload?.message || "API request failed");
  }

  return unwrap<T>(payload);
}

function toUserProfile(auth: AuthResponse): UserProfile {
  return {
    name: `${auth.user.firstName} ${auth.user.lastName}`.trim(),
    email: auth.user.email,
    role: auth.user.role === "ADMIN" ? "admin" : "user",
    company: auth.user.role === "ADMIN" ? "Darzi Atelier" : "Atelier Premium Member",
    avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(auth.user.email)}`
  };
}

export const authApi = {
  getStoredSession() {
    const auth = getStoredAuth();
    return auth ? toUserProfile(auth) : null;
  },

  async login(email: string, password: string) {
    const auth = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem(authStorageKey, JSON.stringify(auth));
    return toUserProfile(auth);
  },

  async register(name: string, email: string, password: string) {
    const [firstName, ...rest] = name.trim().split(/\s+/);
    await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName: rest.join(" ") || firstName
      })
    });
    return this.login(email, password);
  },

  logout() {
    localStorage.removeItem(authStorageKey);
  }
};

export const productApi = {
  list(query: Record<string, string | number | boolean | undefined> = {}) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    const qs = params.toString();
    return request<Product[]>(`/products${qs ? `?${qs}` : ""}`);
  },

  getById(id: string) {
    return request<Product>(`/products/${id}`);
  },

  create(product: Product) {
    return request<Product>("/products", {
      method: "POST",
      body: JSON.stringify({
        categoryId: product.category,
        name: product.name,
        slug: product.id,
        tagline: product.tagline,
        description: product.description,
        basePrice: product.basePrice,
        imageUrl: product.imageUrl,
        detailImages: product.detailImages,
        specs: product.specs,
        designedFor: product.designedFor,
        isFeatured: false,
        status: product.outOfStock ? "DRAFT" : "ACTIVE"
      })
    });
  },

  updateStatus(product: Product, active: boolean) {
    return request<Product>(`/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: active ? "ACTIVE" : "ARCHIVED" })
    });
  }
};

export const measurementApi = {
  save(measurements: BodyMeasurements, aiRecommendation: unknown) {
    return request("/measurement-profiles", {
      method: "POST",
      body: JSON.stringify({
        title: "Primary Fit Profile",
        fitPreference: "Regular Fit",
        measurements,
        aiRecommendation
      })
    });
  },

  list() {
    return request<any[]>("/measurement-profiles");
  }
};

export const orderApi = {
  list() {
    return request<any[]>("/orders");
  },

  initiate(payload: unknown) {
    return request<any>("/orders/initiate", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  updateStatus(orderId: string, status: string) {
    return request<any>(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  }
};

export const adminApi = {
  orders() {
    return request<any[]>("/admin/orders");
  }
};
