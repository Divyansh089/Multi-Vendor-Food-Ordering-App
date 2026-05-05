import { create } from "zustand";

export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  veg?: boolean;
  image?: string;
  desc?: string;
}
export interface CartItem extends MenuItemType {
  qty: number;
}
export interface Restaurant {
  id: string;
  name: string;
  [k: string]: any;
}

interface CartState {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartItem[];
  addItem: (item: MenuItemType, restaurant: Restaurant) => void;
  removeItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearCart: () => void;
  getCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  restaurantId: null,
  restaurantName: null,
  items: [],

  addItem: (item, restaurant) => {
    const { restaurantId, items } = get();
    if (restaurantId && restaurantId !== restaurant.id) {
      set({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: [{ ...item, qty: 1 }],
      });
      return;
    }
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)),
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      });
    } else {
      set({
        items: [...items, { ...item, qty: 1 }],
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      });
    }
  },

  removeItem: (id) => {
    const items = get()
      .items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);
    set({
      items,
      ...(items.length === 0 ? { restaurantId: null, restaurantName: null } : {}),
    });
  },

  deleteItem: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    set({
      items,
      ...(items.length === 0 ? { restaurantId: null, restaurantName: null } : {}),
    });
  },

  clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),

  getCount: () => get().items.reduce((s, i) => s + i.qty, 0),
  getTotal: () => get().items.reduce((s, i) => s + i.qty * i.price, 0),
}));
