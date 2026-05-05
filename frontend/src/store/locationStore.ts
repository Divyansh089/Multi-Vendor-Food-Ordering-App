import { create } from "zustand";
import { Coordinates } from "@/lib/locationUtils";

export interface DeliveryLocation {
  id: string;
  orderId: string;
  driverId: string;
  current: Coordinates;
  destination: Coordinates;
  origin: Coordinates;
  status: "accepted" | "picked_up" | "in_transit" | "delivered";
  updatedAt: number;
  estimatedArrival: number; // timestamp
}

interface LocationStore {
  // Current delivery tracking
  activeDelivery: DeliveryLocation | null;
  setActiveDelivery: (delivery: DeliveryLocation | null) => void;

  // Live locations of nearby drivers
  nearbyDrivers: DeliveryLocation[];
  updateNearbyDrivers: (drivers: DeliveryLocation[]) => void;

  // User's current location
  userLocation: Coordinates | null;
  setUserLocation: (location: Coordinates) => void;

  // Tracking history
  locationHistory: Coordinates[];
  addToHistory: (location: Coordinates) => void;
  clearHistory: () => void;

  // Permissions
  isLocationEnabled: boolean;
  setLocationEnabled: (enabled: boolean) => void;

  // Real-time updates
  startTracking: () => void;
  stopTracking: () => void;
  isTracking: boolean;
}

export const useLocationStore = create<LocationStore>((set) => ({
  // Active delivery
  activeDelivery: null,
  setActiveDelivery: (delivery) => set({ activeDelivery: delivery }),

  // Nearby drivers
  nearbyDrivers: [],
  updateNearbyDrivers: (drivers) => set({ nearbyDrivers: drivers }),

  // User location
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),

  // Tracking history
  locationHistory: [],
  addToHistory: (location) =>
    set((state) => ({
      locationHistory: [...state.locationHistory, location],
    })),
  clearHistory: () => set({ locationHistory: [] }),

  // Permissions
  isLocationEnabled: false,
  setLocationEnabled: (enabled) => set({ isLocationEnabled: enabled }),

  // Tracking status
  isTracking: false,
  startTracking: () => set({ isTracking: true }),
  stopTracking: () => set({ isTracking: false }),
}));

/**
 * Request user's current location using Geolocation API
 */
export const requestUserLocation = async (): Promise<Coordinates | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        resolve(null);
      }
    );
  });
};

/**
 * Watch user's location for real-time updates
 */
export const watchUserLocation = (
  onLocationChange: (location: Coordinates) => void
): number | null => {
  if (!navigator.geolocation) {
    console.error("Geolocation not supported");
    return null;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      onLocationChange({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.error("Geolocation watch error:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};
