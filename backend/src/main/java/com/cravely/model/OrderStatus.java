package com.cravely.model;

/**
 * Lifecycle statuses of an Order on the Cravely platform.
 */
public enum OrderStatus {
    PLACED,
    ACCEPTED,
    PREPARING,
    PICKED,
    DELIVERED,
    CANCELLED
}
