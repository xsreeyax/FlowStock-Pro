package com.flowstockpro.service;

import com.flowstockpro.entity.SupplierPerformance;

import java.util.List;

public interface SupplierPerformanceService {

    SupplierPerformance save(SupplierPerformance performance);

    List<SupplierPerformance> getAll();

    SupplierPerformance getById(Long id);

    SupplierPerformance update(Long id, SupplierPerformance performance);

    void delete(Long id);
}