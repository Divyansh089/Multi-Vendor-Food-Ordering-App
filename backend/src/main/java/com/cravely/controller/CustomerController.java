package com.cravely.controller;

import com.cravely.dto.VendorDTO;
import com.cravely.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class CustomerController {

    private final VendorService vendorService;
    private final com.cravely.service.MenuService menuService;

    @GetMapping
    public ResponseEntity<List<VendorDTO>> getAllRestaurants() {
        return ResponseEntity.ok(vendorService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.getRestaurantById(id));
    }

    @GetMapping("/{id}/menu")
    public ResponseEntity<List<com.cravely.model.MenuItem>> getRestaurantMenu(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getMenuByVendorId(id));
    }
}
