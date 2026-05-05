package com.cravely.dto;

import lombok.Data;

import java.util.List;

@Data
public class VendorDTO {
    private Long id;
    private String name;
    private String description;
    private String image; // Mapped from imageUrl
    private String cuisine;
    private String eta;
    private Double rating;
    private Double surge;
    private String priceLevel;
    private List<String> tags;
    private String address;
    private boolean isOpen;
}
