package com.flowstockpro.controller;

import com.flowstockpro.entity.SupplierPerformance;
import com.flowstockpro.service.SupplierPerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier-performance")
@RequiredArgsConstructor
public class SupplierPerformanceController {

    private final SupplierPerformanceService service;

    @PostMapping
    public SupplierPerformance save(
            @RequestBody SupplierPerformance performance) {
        return service.save(performance);
    }

    @GetMapping
    public List<SupplierPerformance> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public SupplierPerformance getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public SupplierPerformance update(
            @PathVariable Long id,
            @RequestBody SupplierPerformance performance) {

        return service.update(id, performance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}