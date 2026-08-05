package com.flowstockpro.service;

import com.flowstockpro.entity.StockMovement;

import java.util.List;

public interface StockMovementService {

    StockMovement save(StockMovement stockMovement);

    List<StockMovement> getAll();

    StockMovement getById(Long id);

    StockMovement update(Long id, StockMovement stockMovement);

    void delete(Long id);
}