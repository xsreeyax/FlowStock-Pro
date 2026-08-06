package com.flowstockpro.controller;

import com.flowstockpro.entity.OrderManagement;
import com.flowstockpro.service.OrderManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderManagementController {

    private final OrderManagementService service;

    @PostMapping
    public OrderManagement save(@RequestBody OrderManagement order) {
        return service.save(order);
    }

    @GetMapping
    public List<OrderManagement> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public OrderManagement getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public OrderManagement update(@PathVariable Long id,
                                  @RequestBody OrderManagement order) {
        return service.update(id, order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}