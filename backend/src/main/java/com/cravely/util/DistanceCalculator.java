package com.cravely.util;

import org.springframework.stereotype.Component;

/**
 * Haversine formula implementation for calculating great-circle distance
 * between two geographic points (lat/lng in decimal degrees).
 *
 * Used by DeliveryService to assign the nearest available delivery agent.
 */
@Component
public class DistanceCalculator {

    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Calculate distance in kilometers between two lat/lng coordinates.
     *
     * @param lat1 Latitude of point 1
     * @param lon1 Longitude of point 1
     * @param lat2 Latitude of point 2
     * @param lon2 Longitude of point 2
     * @return Distance in kilometers
     */
    public double calculateDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    /**
     * Check if two points are within a given radius.
     *
     * @param lat1       Latitude of point 1
     * @param lon1       Longitude of point 1
     * @param lat2       Latitude of point 2
     * @param lon2       Longitude of point 2
     * @param radiusKm   Maximum radius in kilometers
     * @return true if within radius
     */
    public boolean isWithinRadius(double lat1, double lon1, double lat2, double lon2, double radiusKm) {
        return calculateDistanceKm(lat1, lon1, lat2, lon2) <= radiusKm;
    }
}
