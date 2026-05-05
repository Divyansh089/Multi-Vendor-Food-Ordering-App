package com.cravely.dto;

import java.time.LocalDateTime;

/**
 * DTO for geographic coordinates
 */
public class LocationDTO {
    private double latitude;
    private double longitude;
    private String name;
    private LocalDateTime timestamp;

    public LocationDTO() {
    }

    public LocationDTO(double latitude, double longitude, String name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.timestamp = LocalDateTime.now();
    }

    public LocationDTO(double latitude, double longitude, String name, LocalDateTime timestamp) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "LocationDTO{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                ", name='" + name + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
