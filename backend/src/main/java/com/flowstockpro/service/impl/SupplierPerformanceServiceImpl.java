package com.flowstockpro.service.impl;

import com.flowstockpro.entity.SupplierPerformance;
import com.flowstockpro.repository.SupplierPerformanceRepository;
import com.flowstockpro.service.SupplierPerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierPerformanceServiceImpl
        implements SupplierPerformanceService {

    private final SupplierPerformanceRepository repository;

    @Override
    public SupplierPerformance save(SupplierPerformance performance) {
        return repository.save(performance);
    }

    @Override
    public List<SupplierPerformance> getAll() {
        return repository.findAll();
    }

    @Override
    public SupplierPerformance getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public SupplierPerformance update(
            Long id,
            SupplierPerformance performance) {

        SupplierPerformance existing =
                repository.findById(id).orElseThrow();

        existing.setSupplier(performance.getSupplier());
        existing.setAverageDeliveryTime(
                performance.getAverageDeliveryTime());
        existing.setLateDeliveries(
                performance.getLateDeliveries());
        existing.setQualityScore(
                performance.getQualityScore());
        existing.setTotalDeliveries(
                performance.getTotalDeliveries());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}