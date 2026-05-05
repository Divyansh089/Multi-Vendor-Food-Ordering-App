package com.cravely.model;

/**
 * Enumeration of all roles in the Cravely system.
 * Used for role-based access control (RBAC) via Spring Security.
 */
public enum Role {
    CUSTOMER,
    VENDOR,
    DELIVERY,
    ADMIN
}
