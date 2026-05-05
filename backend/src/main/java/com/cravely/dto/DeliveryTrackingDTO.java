package com.cravely.dto;

import java.time.LocalDateTime;

/**
 * DTO for real-time delivery tracking information
 */
public class DeliveryTrackingDTO {
    private String orderId;
    private String driverId;
    private String driverName;
    private LocationDTO currentLocation;
    private LocationDTO destinationLocation;
    private LocationDTO originLocation;
    private String status; // accepted, picked_up, in_transit, delivered
    private Long estimatedArrivalTime; // minutes
    private Long distanceRemaining; // meters
    private LocalDateTime updatedAt;
    private String phoneNumber;
    private Double rating;

    public DeliveryTrackingDTO() {
    }

    public DeliveryTrackingDTO(
            String orderId,
            String driverId,
            String driverName,
            LocationDTO currentLocation,
            LocationDTO destinationLocation,
            String status,
            Long estimatedArrivalTime
    ) {
        this.orderId = orderId;
        this.driverId = driverId;
        this.driverName = driverName;
        this.currentLocation = currentLocation;
        this.destinationLocation = destinationLocation;
        this.status = status;
        this.estimatedArrivalTime = estimatedArrivalTime;
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public LocationDTO getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(LocationDTO currentLocation) {
        this.currentLocation = currentLocation;
    }

    public LocationDTO getDestinationLocation() {
        return destinationLocation;
    }

    public void setDestinationLocation(LocationDTO destinationLocation) {
        this.destinationLocation = destinationLocation;
    }

    public LocationDTO getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(LocationDTO originLocation) {
        this.originLocation = originLocation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getEstimatedArrivalTime() {
        return estimatedArrivalTime;
    }

    public void setEstimatedArrivalTime(Long estimatedArrivalTime) {
        this.estimatedArrivalTime = estimatedArrivalTime;
    }

    public Long getDistanceRemaining() {
        return distanceRemaining;
    }

    public void setDistanceRemaining(Long distanceRemaining) {
        this.distanceRemaining = distanceRemaining;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "DeliveryTrackingDTO{" +
                "orderId='" + orderId + '\'' +
                ", driverId='" + driverId + '\'' +
                ", driverName='" + driverName + '\'' +
                ", status='" + status + '\'' +
                ", estimatedArrivalTime=" + estimatedArrivalTime +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
