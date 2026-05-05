package com.cravely.service;

import com.cravely.model.MenuItem;
import com.cravely.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {
    private final MenuRepository menuRepository;

    public List<MenuItem> getMenuByVendorId(Long vendorId) {
        return menuRepository.findAllByVendorIdAndIsAvailableTrue(vendorId);
    }
}
