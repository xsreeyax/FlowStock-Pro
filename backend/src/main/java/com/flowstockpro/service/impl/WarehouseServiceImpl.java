package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Warehouse;
import com.flowstockpro.repository.WarehouseRepository;
import com.flowstockpro.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository repository;

    @Override
    public Warehouse addWarehouse(Warehouse warehouse) {
        return repository.save(warehouse);
    }

    @Override
    public List<Warehouse> getAllWarehouses() {
        return repository.findAll();
    }

    @Override
    public Warehouse getWarehouse(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    @Override
    public Warehouse updateWarehouse(Long id, Warehouse warehouse) {

        Warehouse existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        existing.setWarehouseCode(warehouse.getWarehouseCode());
        existing.setWarehouseName(warehouse.getWarehouseName());
        existing.setLocation(warehouse.getLocation());
        existing.setCapacity(warehouse.getCapacity());
        existing.setManagerName(warehouse.getManagerName());

        return repository.save(existing);
    }

    @Override
    public void deleteWarehouse(Long id) {
        repository.deleteById(id);
    }
}