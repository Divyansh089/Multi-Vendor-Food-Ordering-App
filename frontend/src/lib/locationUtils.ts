/**
 * Location Utilities for Map and Delivery Tracking
 * Handles GPS calculations, distance computation, and ETA estimation
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (
  from: Coordinates,
  to: Coordinates
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
};

/**
 * Estimate ETA based on distance and average speed
 * Returns time in minutes
 * Average delivery speed: 20-30 km/h (assuming traffic)
 */
export const estimateETA = (
  from: Coordinates,
  to: Coordinates,
  avgSpeed: number = 25
): number => {
  const distanceKm = calculateDistance(from, to);
  const timeInMinutes = Math.ceil((distanceKm / avgSpeed) * 60);

  // Add buffer time for traffic/stops
  return timeInMinutes + Math.floor(timeInMinutes * 0.15);
};

/**
 * Generate mock GPS coordinates for delivery tracking
 * Simulates movement from origin to destination
 */
export const getInterpolatedCoordinates = (
  from: Coordinates,
  to: Coordinates,
  progress: number // 0 to 1
): Coordinates => {
  return {
    lat: from.lat + (to.lat - from.lat) * progress,
    lng: from.lng + (to.lng - from.lng) * progress,
  };
};

/**
 * Convert coordinates to address (dummy implementation)
 * In production, this would use reverse geocoding API
 */
export const coordinatesToAddress = (coords: Coordinates): string => {
  const latStr = coords.lat.toFixed(2);
  const lngStr = coords.lng.toFixed(2);
  return `Location (${latStr}°, ${lngStr}°)`;
};

/**
 * Validate coordinates
 */
export const isValidCoordinates = (coords: Coordinates): boolean => {
  return (
    coords.lat >= -90 &&
    coords.lat <= 90 &&
    coords.lng >= -180 &&
    coords.lng <= 180
  );
};

/**
 * Mock restaurants in Delhi for demo purposes
 */
export const MOCK_RESTAURANTS = [
  {
    id: "rest_1",
    name: "Taj Express",
    lat: 28.6139,
    lng: 77.209,
    cuisine: "North Indian",
  },
  {
    id: "rest_2",
    name: "Dragon Palace",
    lat: 28.5355,
    lng: 77.391,
    cuisine: "Chinese",
  },
  {
    id: "rest_3",
    name: "Pizza Hut",
    lat: 28.5244,
    lng: 77.1855,
    cuisine: "Italian",
  },
  {
    id: "rest_4",
    name: "Biryani Paradise",
    lat: 28.6292,
    lng: 77.2201,
    cuisine: "Mughlai",
  },
];

/**
 * Calculate bearing angle between two coordinates
 * Used for navigation arrow direction
 */
export const calculateBearing = (
  from: Coordinates,
  to: Coordinates
): number => {
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos((to.lat * Math.PI) / 180);
  const x =
    Math.cos((from.lat * Math.PI) / 180) * Math.sin((to.lat * Math.PI) / 180) -
    Math.sin((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.cos(dLng);

  const bearing = Math.atan2(y, x);
  return ((bearing * 180) / Math.PI + 360) % 360;
};
