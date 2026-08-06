package com.flowstockpro.service.impl;

import com.flowstockpro.entity.OrderManagement;
import com.flowstockpro.repository.OrderManagementRepository;
import com.flowstockpro.service.OrderManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderManagementServiceImpl implements OrderManagementService {

    private final OrderManagementRepository repository;

    @Override
    public OrderManagement save(OrderManagement order) {
        order.setOrderDate(LocalDate.now());
        return repository.save(order);
    }

    @Override
    public List<OrderManagement> getAll() {
        return repository.findAll();
    }

    @Override
    public OrderManagement getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public OrderManagement update(Long id, OrderManagement order) {

        OrderManagement existing = repository.findById(id).orElseThrow();

        existing.setOrderNumber(order.getOrderNumber());
        existing.setCustomerName(order.getCustomerName());
        existing.setProduct(order.getProduct());
        existing.setQuantity(order.getQuantity());
        existing.setTotalAmount(order.getTotalAmount());
        existing.setOrderStatus(order.getOrderStatus());
        existing.setPaymentStatus(order.getPaymentStatus());
        existing.setDeliverySlot(order.getDeliverySlot());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}