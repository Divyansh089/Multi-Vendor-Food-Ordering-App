import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import api from "@/api/axios";

export type Role = "CUSTOMER" | "VENDOR" | "DELIVERY" | "ADMIN";
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const TOKEN_KEY = "cravely_token";

const safeStorage = {
  get: (k: string) => (typeof window === "undefined" ? null : window.localStorage.getItem(k)),
  set: (k: string, v: string) =>
    typeof window !== "undefined" && window.localStorage.setItem(k, v),
  del: (k: string) =>
    typeof window !== "undefined" && window.localStorage.removeItem(k),
};

function decode(token: string): User | null {
  try {
    const p = jwtDecode<any>(token);
    return {
      id: p.userId || p.sub || "u_demo",
      name: p.name || "User",
      email: p.sub || "",
      role: ((p.role || "ROLE_CUSTOMER") as string).replace("ROLE_", "").toUpperCase() as Role,
    };
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: safeStorage.get(TOKEN_KEY),
  user: (() => {
    const t = safeStorage.get(TOKEN_KEY);
    return t ? decode(t) : null;
  })(),
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken } = res.data;
    safeStorage.set(TOKEN_KEY, accessToken);
    set({ token: accessToken, user: decode(accessToken) });
  },
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    const { accessToken } = res.data;
    safeStorage.set(TOKEN_KEY, accessToken);
    set({ token: accessToken, user: decode(accessToken) });
  },
  logout: () => {
    safeStorage.del(TOKEN_KEY);
    set({ token: null, user: null });
  },
  hasRole: (role) => get().user?.role === role,
}));
