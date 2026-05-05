package com.cravely.service;

import com.cravely.dto.VendorDTO;
import com.cravely.exception.ResourceNotFoundException;
import com.cravely.model.Vendor;
import com.cravely.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;

    public List<VendorDTO> getAllRestaurants() {
        return vendorRepository.findAllByIsOpenTrueAndBlockedFalse()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public VendorDTO getRestaurantById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with ID: " + id));
        return mapToDTO(vendor);
    }

    private VendorDTO mapToDTO(Vendor vendor) {
        VendorDTO dto = new VendorDTO();
        dto.setId(vendor.getId());
        dto.setName(vendor.getName());
        dto.setDescription(vendor.getDescription());
        dto.setImage(vendor.getImageUrl()); // Frontend expects "image"
        dto.setCuisine(vendor.getCuisine());
        dto.setEta(vendor.getEta());
        dto.setRating(vendor.getRating());
        dto.setSurge(vendor.getSurge());
        dto.setPriceLevel(vendor.getPriceLevel());
        dto.setTags(vendor.getTags());
        dto.setAddress(vendor.getAddress());
        dto.setOpen(vendor.isOpen());
        return dto;
    }
}
