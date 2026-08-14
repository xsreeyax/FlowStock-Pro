package com.flowstockpro.repository;

import com.flowstockpro.entity.SupplierPerformance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierPerformanceRepository
        extends JpaRepository<SupplierPerformance, Long> {
}