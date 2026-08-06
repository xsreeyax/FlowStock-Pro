package com.flowstockpro.controller;

import com.flowstockpro.entity.Shipment;
import com.flowstockpro.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService service;

    @PostMapping
    public Shipment save(@RequestBody Shipment shipment) {
        return service.save(shipment);
    }

    @GetMapping
    public List<Shipment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Shipment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Shipment update(@PathVariable Long id,
                           @RequestBody Shipment shipment) {
        return service.update(id, shipment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}