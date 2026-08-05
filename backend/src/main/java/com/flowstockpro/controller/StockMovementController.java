package com.flowstockpro.controller;

import com.flowstockpro.entity.StockMovement;
import com.flowstockpro.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockMovementController {

    private final StockMovementService service;

    @PostMapping
    public StockMovement create(@RequestBody StockMovement stockMovement) {
        return service.save(stockMovement);
    }

    @GetMapping
    public List<StockMovement> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public StockMovement getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public StockMovement update(@PathVariable Long id,
                                @RequestBody StockMovement stockMovement) {
        return service.update(id, stockMovement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}