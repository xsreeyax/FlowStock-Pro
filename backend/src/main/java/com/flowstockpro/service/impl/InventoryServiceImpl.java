package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Inventory;
import com.flowstockpro.repository.InventoryRepository;
import com.flowstockpro.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Override
    public Inventory addItem(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    @Override
    public List<Inventory> getAllItems() {
        return inventoryRepository.findAll();
    }

    @Override
    public Inventory updateItem(Long id, Inventory inventory) {

        Inventory existing = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        existing.setItemCode(inventory.getItemCode());
        existing.setItemName(inventory.getItemName());
        existing.setCategory(inventory.getCategory());
        existing.setQuantity(inventory.getQuantity());
        existing.setPrice(inventory.getPrice());
        existing.setWarehouseLocation(inventory.getWarehouseLocation());

        return inventoryRepository.save(existing);
    }

    @Override
    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}