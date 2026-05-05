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

    /**
     * Estimate ETA (Estimated Time of Arrival) in minutes based on distance.
     * Assumes average delivery speed of 25 km/h + 15% traffic buffer.
     *
     * @param distanceKm Distance in kilometers
     * @return Estimated time in minutes
     */
    public long estimateETA(double distanceKm) {
        double avgSpeedKmh = 25.0; // Average delivery speed
        double timeMinutes = (distanceKm / avgSpeedKmh) * 60;
        // Add 15% buffer for traffic
        long etaWithBuffer = Math.round(timeMinutes * 1.15);
        return Math.max(etaWithBuffer, 5); // Minimum 5 minutes
    }

    /**
     * Estimate ETA between two coordinates.
     *
     * @param lat1 Latitude of origin
     * @param lon1 Longitude of origin
     * @param lat2 Latitude of destination
     * @param lon2 Longitude of destination
     * @return Estimated time in minutes
     */
    public long estimateETABetweenCoordinates(double lat1, double lon1, double lat2, double lon2) {
        double distanceKm = calculateDistanceKm(lat1, lon1, lat2, lon2);
        return estimateETA(distanceKm);
    }

    /**
     * Validate coordinates.
     *
     * @param latitude  Latitude value
     * @param longitude Longitude value
     * @return true if valid
     */
    public boolean isValidCoordinates(double latitude, double longitude) {
        return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
    }

    /**
     * Calculate bearing (direction angle) between two points in degrees.
     * 0° = North, 90° = East, 180° = South, 270° = West
     *
     * @param lat1 Latitude of point 1
     * @param lon1 Longitude of point 1
     * @param lat2 Latitude of point 2
     * @param lon2 Longitude of point 2
     * @return Bearing in degrees (0-360)
     */
    public double calculateBearing(double lat1, double lon1, double lat2, double lon2) {
        double dLon = Math.toRadians(lon2 - lon1);
        double y = Math.sin(dLon) * Math.cos(Math.toRadians(lat2));
        double x = Math.cos(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2))
                - Math.sin(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(dLon);
        double bearing = Math.atan2(y, x);
        return (Math.toDegrees(bearing) + 360) % 360;
    }
}
