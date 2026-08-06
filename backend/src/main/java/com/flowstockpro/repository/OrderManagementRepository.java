package com.flowstockpro.repository;

import com.flowstockpro.entity.OrderManagement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderManagementRepository extends JpaRepository<OrderManagement, Long> {
}