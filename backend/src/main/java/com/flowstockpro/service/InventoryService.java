package com.flowstockpro.service;

import com.flowstockpro.entity.Inventory;

import java.util.List;

public interface InventoryService {

    Inventory addItem(Inventory inventory);

    List<Inventory> getAllItems();

    Inventory updateItem(Long id, Inventory inventory);

    void deleteItem(Long id);
}