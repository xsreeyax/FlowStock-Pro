package com.flowstockpro.service.impl;

import com.flowstockpro.entity.StockMovement;
import com.flowstockpro.repository.StockMovementRepository;
import com.flowstockpro.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository repository;

    @Override
    public StockMovement save(StockMovement stockMovement) {
        stockMovement.setMovementDate(LocalDateTime.now());
        return repository.save(stockMovement);
    }

    @Override
    public List<StockMovement> getAll() {
        return repository.findAll();
    }

    @Override
    public StockMovement getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public StockMovement update(Long id, StockMovement stockMovement) {

        StockMovement existing = repository.findById(id).orElseThrow();

        existing.setProduct(stockMovement.getProduct());
        existing.setQuantity(stockMovement.getQuantity());
        existing.setMovementType(stockMovement.getMovementType());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}