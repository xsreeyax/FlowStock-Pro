package com.flowstockpro.controller;

import com.flowstockpro.entity.Inventory;
import com.flowstockpro.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public Inventory addItem(@RequestBody Inventory inventory) {
        return inventoryService.addItem(inventory);
    }

    @GetMapping
    public List<Inventory> getAllItems() {
        return inventoryService.getAllItems();
    }

    @PutMapping("/{id}")
    public Inventory updateItem(@PathVariable Long id,
                                @RequestBody Inventory inventory) {
        return inventoryService.updateItem(id, inventory);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        inventoryService.deleteItem(id);
        return "Item deleted successfully";
    }
}