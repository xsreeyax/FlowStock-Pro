package com.flowstockpro.service;

import com.flowstockpro.entity.Warehouse;

import java.util.List;

public interface WarehouseService {

    Warehouse addWarehouse(Warehouse warehouse);

    List<Warehouse> getAllWarehouses();

    Warehouse getWarehouse(Long id);

    Warehouse updateWarehouse(Long id, Warehouse warehouse);

    void deleteWarehouse(Long id);
}