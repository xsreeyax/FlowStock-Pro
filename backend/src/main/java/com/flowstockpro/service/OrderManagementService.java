package com.flowstockpro.service;

import com.flowstockpro.entity.OrderManagement;

import java.util.List;

public interface OrderManagementService {

    OrderManagement save(OrderManagement order);

    List<OrderManagement> getAll();

    OrderManagement getById(Long id);

    OrderManagement update(Long id, OrderManagement order);

    void delete(Long id);
}